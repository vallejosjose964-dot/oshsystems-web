#!/usr/bin/env python3
"""Dependency-free integrity and local-link checks. Run: python3 tests/verify_site.py."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import hashlib, json
import xml.etree.ElementTree as ET
ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.elements=[]
    def handle_starttag(self, tag, attrs):
        self.elements.append((tag,dict(attrs)))
p=Page(); content=(ROOT/'index.html').read_text();p.feed(content)
m=json.loads((ROOT/'preservation-manifest.json').read_text())
for name,digest in m['original_files'].items():
    assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==digest, 'Changed original: '+name
for asset in m['embedded_assets']:
    assert hashlib.sha256((ROOT/asset['path']).read_bytes()).hexdigest()==asset['sha256'], 'Changed extracted bytes: '+asset['path']
ids=[a['id'] for _,a in p.elements if 'id' in a];assert len(ids)==len(set(ids)), 'Duplicate ID'
for tag,a in p.elements:
    for key in ('src','href','poster','data-photo','data-fallback'):
        value=a.get(key) or ''
        if value.startswith('./'):assert (ROOT/unquote(urlsplit(value).path[2:])).is_file(), value
        if key=='href' and value.startswith('#'):
            assert value!='#' and unquote(value[1:]) in ids, 'Broken anchor: '+value
    for key in ('aria-controls','aria-labelledby','aria-describedby'):
        for target in (a.get(key) or '').split():assert target in ids, key+': '+target
    if tag=='img':assert 'alt' in a, 'Missing image alt'
downloads={a['href'] for t,a in p.elements if t=='a' and 'download' in a}
assert len(downloads)==14, 'Expected thirteen reports and original BMP'
assert ';base64,' not in content, 'Unexpected embedded binary'
assert len(content.encode()) < 200_000, 'HTML budget exceeded'
print(f'PASS: {len(m["original_files"])} original files + {len(m["embedded_assets"])} extracted assets have exact SHA-256.')
print(f'PASS: {len(ids)} unique IDs, local links, ARIA references, image descriptions and {len(downloads)} native downloads.')
print(f'PASS: HTML {len(content.encode()):,} bytes; no binary payloads or placeholder links.')

# Discovery URLs must agree with the existing custom domain and canonical page.
origin = 'https://' + (ROOT/'CNAME').read_text().strip() + '/'
canonical = [a.get('href') for tag,a in p.elements if tag=='link' and a.get('rel')=='canonical']
assert canonical == [origin], 'Canonical differs from custom domain'
robots = (ROOT/'robots.txt').read_text()
assert 'User-agent: *' in robots and 'Allow: /' in robots, 'Expected public crawling policy'
assert 'Disallow:' not in robots, 'Unexpected crawl exclusion'
assert 'Sitemap: '+origin+'sitemap.xml' in robots, 'Wrong sitemap URL'
sitemap = ET.parse(ROOT/'sitemap.xml').getroot()
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
assert sitemap.tag == '{http://www.sitemaps.org/schemas/sitemap/0.9}urlset'
locations = [node.text for node in sitemap.findall('s:url/s:loc', ns)]
assert locations == [origin], 'Sitemap must include only the public homepage'
assert not sitemap.findall('.//s:lastmod', ns), 'No invented modification date'
print('PASS: robots.txt, sitemap.xml, CNAME and canonical consistently use '+origin)

