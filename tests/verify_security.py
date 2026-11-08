#!/usr/bin/env python3
"""Offline checks for the static page's security policy and safe authoring rules."""
from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.elements = []

    def handle_starttag(self, tag, attributes):
        self.elements.append((tag, dict(attributes)))


page = Page()
page.feed((ROOT / 'index.html').read_text())
policies = [(i, a['content']) for i, (t, a) in enumerate(page.elements)
            if t == 'meta' and a.get('http-equiv', '').lower() == 'content-security-policy']
assert len(policies) == 1, 'Exactly one enforcing CSP is required'
position, policy = policies[0]
directives = dict((parts[0], parts[1:]) for part in policy.split(';') if (parts := part.split()))
for directive in ['default-src', 'connect-src', 'object-src', 'frame-src', 'worker-src',
                  'base-uri', 'form-action', 'script-src-attr', 'style-src-attr']:
    assert directives.get(directive) == ["'none'"], directive
for directive in ['script-src', 'style-src', 'img-src', 'font-src']:
    assert directives.get(directive) == ["'self'"], directive
assert directives['media-src'] == ["'self'", 'https://raw.githubusercontent.com/vallejosjose964-dot/oshsystems-web/main/demo.mp4']
assert not {'frame-ancestors', 'sandbox', 'report-uri', 'report-to'} & directives.keys(), 'Unsupported meta-CSP directive'
assert 'unsafe-inline' not in policy and 'unsafe-eval' not in policy
assert any(t == 'meta' and a.get('name') == 'referrer' and a.get('content') == 'no-referrer'
           for t, a in page.elements)

for i, (tag, attrs) in enumerate(page.elements):
    assert not any(name.startswith('on') for name in attrs), 'Inline event handler'
    assert 'style' not in attrs and tag != 'style', 'Inline style'
    assert tag not in ['base', 'iframe', 'object', 'embed'], 'Unexpected active element'
    if tag == 'script':
        assert attrs.get('src', '').startswith('./assets/'), 'Only local scripts are allowed'
        assert i > position, 'CSP must precede scripts'
    if tag == 'link' and attrs.get('rel') == 'stylesheet':
        assert attrs.get('href', '').startswith('./assets/') and i > position
    if attrs.get('target') == '_blank':
        assert {'noopener', 'noreferrer'} <= set(attrs.get('rel', '').split())
    for key in ['src', 'href', 'action', 'data-photo', 'data-fallback']:
        value = attrs.get(key, '').strip().lower()
        assert not value.startswith(('javascript:', 'http:', '//')), value
    if tag == 'form':
        assert not attrs.get('action'), 'No form collection endpoint is expected'

for path in (ROOT / 'assets').glob('*.js'):
    text = path.read_text()
    assert not re.search(r'\b(innerHTML|outerHTML|insertAdjacentHTML|eval)\b', text), path.name
    assert not re.search(r'document\.(write|cookie)\b|\b(localStorage|sessionStorage)\b', text), path.name
print('PASS: restrictive meta CSP, local scripts/styles, no inline handlers, no HTML injection sink, safe new-window links, and no-referrer policy.')
