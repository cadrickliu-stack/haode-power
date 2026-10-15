const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE);
const base = process.argv[2] || 'http://localhost:3100';
const labels = {en:['Cookie Settings','Reject Non-Essential'],ru:['Настройки cookie','Отклонить необязательные'],es:['Configuración de cookies','Rechazar no esenciales']};
(async()=>{
  const browser = await chromium.launch({channel:'chrome'});
  try {
    for (const locale of ['en','ru','es']) {
      const context = await browser.newContext();
      await context.addCookies([{name:'haode_cookie_consent',value:'accepted',url:base}]);
      const page = await context.newPage();
      let release;
      const gate = new Promise(resolve=>{release=resolve;});
      // Hold the real Google script until AFTER consent has been revoked.
      await page.route('https://www.googletagmanager.com/gtag/js?*',async route=>{await gate;await route.continue();});
      await page.goto(base+(locale==='en'?'':'/'+locale),{waitUntil:'domcontentloaded'});
      await page.waitForFunction(()=>window.dataLayer?.some(x=>x[0]==='config'));
      await page.getByRole('button',{name:labels[locale][0],exact:true}).click();
      await page.getByRole('button',{name:labels[locale][1],exact:true}).click();
      const loaded = page.waitForResponse(r=>r.url().includes('googletagmanager.com/gtag/js?'),{timeout:60000});
      release();
      assert.equal((await loaded).status(),200);
      await page.waitForTimeout(5000);
      assert.equal((await context.cookies(base)).some(c=>c.name==='_ga'||c.name.startsWith('_ga_')),false);
      assert.equal(await page.evaluate(()=>Array.from(window.dataLayer.filter(x=>x[0]==='consent').at(-1))[2].analytics_storage),'denied');
      console.log('PASS',locale,'late Google script after revoke leaves no first-party GA cookies');
      await context.close();
    }
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
