/* Basic consent mode: no Google code or requests before an affirmative choice. */
(() => {
  'use strict';
  // Enabled with the approved, narrowly scoped Google Analytics CSP.
  const ANALYTICS_ENABLED = true;
  const MEASUREMENT_ID = 'G-9TLWQDVEFQ';
  const CONSENT_KEY = 'osh_analytics_consent_v1';
  const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000;
  const COOKIE_LIFETIME = 180 * 24 * 60 * 60;
  const DISABLE_KEY = 'ga-disable-' + MEASUREMENT_ID;
  const PAGE_URL = 'https://oshsystems.com/';
  const PAGE_TITLE = 'OSH Global Systems | FARO';
  const banner = document.getElementById('analytics-banner');
  const dialog = document.getElementById('analytics-dialog');
  const status = document.getElementById('analytics-status');
  const settings = document.getElementById('analytics-settings');
  if (!banner || !dialog || !status || !settings) return;
  let choice = readChoice();
  let started = false;
  let memoryOnly = false;
  window[DISABLE_KEY] = choice !== 'accepted';

  function readChoice() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(CONSENT_KEY));
      if (saved && saved.version === 1 && ['accepted', 'rejected'].includes(saved.choice)
          && Number.isFinite(saved.expiresAt) && saved.expiresAt > Date.now()
          && saved.expiresAt <= Date.now() + CONSENT_LIFETIME) return saved.choice;
    } catch { /* Unavailable or invalid storage never grants consent. */ }
    return null;
  }
  function saveChoice(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify({version: 1, choice: value, expiresAt: Date.now() + CONSENT_LIFETIME}));
      memoryOnly = false;
    } catch { memoryOnly = true; }
  }
  function clearAnalyticsCookies() {
    const domains = ['', location.hostname, '.' + location.hostname, 'oshsystems.com', '.oshsystems.com'];
    for (const pair of document.cookie.split(';')) {
      const name = pair.split('=')[0].trim();
      if (!/^_ga(?:_[A-Za-z0-9]+)?$/.test(name)) continue;
      for (const domain of domains) {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + (domain ? '; domain=' + domain : '');
      }
    }
  }
  function render() {
    banner.hidden = choice !== null;
    status.textContent = choice === 'accepted' ? 'Analytics: accepted.' : choice === 'rejected' ? 'Analytics: rejected.' : 'Analytics is off until you choose Accept analytics.';
    if (memoryOnly) status.textContent += ' Your browser could not save this choice. It applies to this page only.';
  }
  function startAnalytics() {
    if (!ANALYTICS_ENABLED || started || choice !== 'accepted'
        || !['oshsystems.com', 'www.oshsystems.com'].includes(location.hostname)) return;
    started = true;
    window[DISABLE_KEY] = false;
    window.dataLayer = window.dataLayer || [];
    const gtag = function () { window.dataLayer.push(arguments); };
    window.gtag = gtag;
    gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
    });
    gtag('set', 'ads_data_redaction', true);
    gtag('set', 'url_passthrough', false);
    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: COOKIE_LIFETIME,
      cookie_update: false,
      cookie_flags: 'SameSite=Lax;Secure',
      page_location: PAGE_URL,
      page_title: PAGE_TITLE,
      page_referrer: '',
      ignore_referrer: true
    });
    // Only fixed, public metadata: never a query, fragment, referrer, or form value.
    gtag('event', 'page_view', {page_location: PAGE_URL, page_title: PAGE_TITLE, page_referrer: ''});
    const script = document.createElement('script');
    script.id = 'osh-google-analytics';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
    script.referrerPolicy = 'no-referrer';
    document.head.append(script);
  }
  function stopAnalytics() {
    const wasStarted = started;
    window[DISABLE_KEY] = true;
    started = false;
    clearAnalyticsCookies();
    document.getElementById('osh-google-analytics')?.remove();
    // Do not send a denied-consent ping. Reload removes the already executed tag.
    if (wasStarted) location.reload();
  }
  function choose(value) {
    choice = value;
    saveChoice(value);
    render();
    if (dialog.open) dialog.close();
    if (value === 'accepted') startAnalytics();
    else stopAnalytics();
  }
  for (const button of document.querySelectorAll('[data-analytics-choice]')) {
    button.addEventListener('click', () => choose(button.dataset.analyticsChoice));
  }
  settings.hidden = false;
  settings.addEventListener('click', () => { render(); dialog.showModal(); });
  document.getElementById('analytics-close').addEventListener('click', () => dialog.close());
  window.addEventListener('storage', event => {
    if (event.key !== CONSENT_KEY && event.key !== null) return;
    choice = readChoice();
    render();
    if (choice === 'accepted') startAnalytics(); else stopAnalytics();
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    choice = readChoice();
    render();
    if (choice === 'accepted') startAnalytics(); else stopAnalytics();
  });
  render();
  if (choice === 'accepted') startAnalytics(); else clearAnalyticsCookies();
})();
