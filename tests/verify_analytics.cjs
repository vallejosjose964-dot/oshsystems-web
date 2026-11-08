'use strict';
// Dependency-free contract tests. No Google code is loaded and no network is used.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(ROOT, 'assets/analytics.js'), 'utf8');
const KEY = 'osh_analytics_consent_v1';
const ID = 'G-9TLWQDVEFQ';
const lifetime = 180 * 24 * 60 * 60 * 1000;
const saved = choice => JSON.stringify({version:1,choice,expiresAt:Date.now()+lifetime-1000});
function fixture({preference, enabled=true, hostname='oshsystems.com', brokenStorage=false, cookie='_ga=old; _ga_9TLWQDVEFQ=session; other=keep'}={}) {
  const storage = new Map();if(preference!==undefined)storage.set(KEY,preference);
  const scripts=[];const handlers={};const cookies=[];let reloads=0;
  const elements={};
  function element(id) {return {id,hidden:false,open:false,textContent:'',dataset:{},events:{},addEventListener(name,fn){this.events[name]=fn;},showModal(){this.open=true;},close(){this.open=false;},remove(){this.removed=true;}};}
  for(const id of ['analytics-banner','analytics-dialog','analytics-status','analytics-settings','analytics-close'])elements[id]=element(id);
  const buttons=['rejected','accepted','rejected','accepted'].map(choice=>Object.assign(element(choice),{dataset:{analyticsChoice:choice}}));
  const document={getElementById:id=>elements[id]||scripts.find(x=>x.id===id),querySelectorAll:()=>buttons,createElement:()=>element(''),head:{append(script){scripts.push(script);}}};
  Object.defineProperty(document,'cookie',{get(){return cookie;},set(value){cookies.push(value);cookie=cookie.split(';').filter(pair=>pair.split('=')[0].trim()!==value.split('=')[0]).join(';');}});
  const window={localStorage:{getItem:key=>{if(brokenStorage)throw Error('blocked');return storage.get(key)||null;},setItem:(key,val)=>{if(brokenStorage)throw Error('blocked');storage.set(key,val);}},addEventListener:(name,fn)=>{handlers[name]=fn;}};
  const context={window,document,location:{hostname,reload(){reloads++;}},Date,Number,JSON};
  vm.runInNewContext(source.replace(/const ANALYTICS_ENABLED = (true|false);/, 'const ANALYTICS_ENABLED = '+enabled+';'),context);
  const click=value=>buttons.find(x=>x.dataset.analyticsChoice===value).events.click();
  return {window,elements,scripts,storage,cookies,handlers,click,get reloads(){return reloads;},commands:()=>Array.from(window.dataLayer||[],x=>Array.from(x))};
}
let t=fixture();assert.equal(t.scripts.length,0);assert.equal(t.elements['analytics-banner'].hidden,false);assert.equal(t.window['ga-disable-'+ID],true);assert.equal(t.window.dataLayer,undefined);assert(!t.cookies.some(x=>x.startsWith('other=')));
t.click('rejected');assert.equal(t.scripts.length,0);assert.equal(t.window.dataLayer,undefined);assert.equal(JSON.parse(t.storage.get(KEY)).choice,'rejected');assert.equal(t.elements['analytics-banner'].hidden,true);
t=fixture({preference:saved('rejected')});assert.equal(t.scripts.length,0);assert.equal(t.elements['analytics-banner'].hidden,true);
t=fixture();t.click('accepted');assert.equal(t.scripts.length,1);assert.equal(t.scripts[0].src,'https://www.googletagmanager.com/gtag/js?id='+ID);assert.equal(t.scripts[0].referrerPolicy,'no-referrer');assert.equal(t.window['ga-disable-'+ID],false);
const commands=t.commands();const consent=commands.find(x=>x[0]==='consent')[2];assert.equal(consent.analytics_storage,'granted');for(const p of ['ad_storage','ad_user_data','ad_personalization'])assert.equal(consent[p],'denied');
const config=commands.find(x=>x[0]==='config')[2];assert.equal(config.send_page_view,false);assert.equal(config.allow_google_signals,false);assert.equal(config.allow_ad_personalization_signals,false);assert.equal(config.cookie_update,false);assert.equal(config.cookie_expires,15552000);assert.equal(config.page_location,'https://oshsystems.com/');assert.equal(config.page_referrer,'');
assert.equal(commands.filter(x=>x[0]==='event').length,1);assert.equal(commands.find(x=>x[0]==='event')[1],'page_view');assert(!source.includes("'file_download'"));
t.click('accepted');assert.equal(t.scripts.length,1);assert.equal(t.commands().filter(x=>x[0]==='event').length,1);
t.click('rejected');assert.equal(t.window['ga-disable-'+ID],true);assert.equal(t.reloads,1);assert(t.scripts[0].removed);assert.equal(t.commands().length,commands.length,'No denied-consent ping or other event on withdrawal');
t=fixture({preference:saved('accepted')});assert.equal(t.scripts.length,1);assert.equal(t.elements['analytics-banner'].hidden,true);
for(const preference of ['invalid',JSON.stringify({version:1,choice:'accepted',expiresAt:Date.now()-1}),JSON.stringify({version:99,choice:'accepted',expiresAt:Date.now()+10000}),JSON.stringify({version:1,choice:'accepted',expiresAt:Date.now()+lifetime*2})]){t=fixture({preference});assert.equal(t.scripts.length,0);assert.equal(t.elements['analytics-banner'].hidden,false);}
t=fixture({brokenStorage:true});assert.equal(t.scripts.length,0);t.click('accepted');assert.equal(t.scripts.length,1);assert(t.elements['analytics-status'].textContent.includes('could not save'));t.click('rejected');assert.equal(t.reloads,1);
t=fixture({preference:saved('accepted')});t.storage.set(KEY,saved('rejected'));t.handlers.storage({key:KEY});assert.equal(t.reloads,1);assert.equal(t.window['ga-disable-'+ID],true);
t=fixture({preference:saved('accepted')});t.storage.clear();t.handlers.pageshow({persisted:true});assert.equal(t.reloads,1);
t=fixture();t.elements['analytics-settings'].events.click();assert(t.elements['analytics-dialog'].open);t.elements['analytics-close'].events.click();assert.equal(t.elements['analytics-dialog'].open,false);assert.equal(t.scripts.length,0);
for(const opts of [{enabled:false},{hostname:'localhost'},{hostname:'malicious-oshsystems.com'}]){t=fixture(opts);t.click('accepted');assert.equal(t.scripts.length,0);}
assert.equal(fixture({hostname:'www.oshsystems.com',preference:saved('accepted')}).scripts.length,1);
console.log('PASS: consent lifecycle, persistence, expiry, denied/corrupt/unavailable storage, repeat clicks, withdrawal, cross-tab changes, BFCache, exact script URL, fixed page metadata, only page_view, advertising denial, cookie lifetime, review guard and production hostname guard.');
console.log('LIMIT: DOM/storage simulation, not an end-to-end Google Analytics or browser network validation.');
