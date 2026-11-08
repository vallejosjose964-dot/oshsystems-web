#!/usr/bin/env python3
"""Offline checks for the static page's security policy and safe authoring rules."""
from html.parser import HTMLParser
from pathlib import Path
import re
import json

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
analytics_source = (ROOT / 'assets/analytics.js').read_text()
analytics_enabled = 'const ANALYTICS_ENABLED = true;' in analytics_source
review = json.loads((ROOT / 'tests/analytics-csp.json').read_text())
assert policy == review['proposed' if analytics_enabled else 'current'], 'CSP and analytics guard must agree'
directives = dict((parts[0], parts[1:]) for part in policy.split(';') if (parts := part.split()))
for directive in ['default-src', 'object-src', 'frame-src', 'worker-src',
                  'base-uri', 'form-action', 'script-src-attr', 'style-src-attr']:
    assert directives.get(directive) == ["'none'"], directive
for directive in ['style-src', 'img-src', 'font-src']:
    assert directives.get(directive) == ["'self'"], directive
assert directives['script-src'] == (["'self'", 'https://www.googletagmanager.com/gtag/js'] if analytics_enabled else ["'self'"])
assert directives['connect-src'] == (['https://www.google-analytics.com/g/collect', 'https://region1.google-analytics.com/g/collect'] if analytics_enabled else ["'none'"])
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
    if path.name == 'analytics.js':
        assert not re.search(r'document\.write\b|\bsessionStorage\b', text), path.name
        assert re.search(r'const ANALYTICS_ENABLED = (true|false);', text), 'Explicit activation guard required'
        assert "'osh_analytics_consent_v1'" in text
        assert "script.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;" in text
        assert 'cookie_update: false' in text and 'allow_google_signals: false' in text
        assert 'location.search' not in text and 'location.hash' not in text
    else:
        assert not re.search(r'document\.(write|cookie)\b|\b(localStorage|sessionStorage)\b', text), path.name
privacy = Page()
privacy.feed((ROOT / 'privacy.html').read_text())
assert not any(t == 'script' for t, a in privacy.elements), 'Privacy page has no analytics or JavaScript'
assert [a['content'] for t, a in privacy.elements if t == 'meta' and a.get('http-equiv', '').lower() == 'content-security-policy'] == [review['current']]
print('PASS: restrictive meta CSP, local scripts/styles, no inline handlers, no HTML injection sink, safe new-window links, and no-referrer policy.')
