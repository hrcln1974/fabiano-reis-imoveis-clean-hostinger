/* Analytics opcional e seguro: ativa GA4 somente quando o ID real
   estiver configurado no ambiente da Hostinger. */
(function(){
  'use strict';
  function validId(v){ return /^G-[A-Z0-9]+$/i.test(String(v||'').trim()); }
  function loadGA4(id){
    if(!validId(id) || window.__ga4Loaded) return;
    window.__ga4Loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', id, { anonymize_ip: true });
    var s=document.createElement('script');
    s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
    document.head.appendChild(s);
  }
  fetch('/api/site-config',{credentials:'same-origin',cache:'no-store'})
    .then(function(r){return r.ok?r.json():null;})
    .then(function(c){ if(c && c.analytics_id) loadGA4(c.analytics_id); })
    .catch(function(){});
})();
