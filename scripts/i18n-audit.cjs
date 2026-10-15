const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE);
const ts=require('typescript');
require.extensions['.tsx']=(mod,file)=>mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,file);
const {text}=require('../i18n/text.tsx');
const base=process.argv[2]||'http://localhost:3100';
const out=process.argv[3]||'output/i18n';fs.mkdirSync(out,{recursive:true});
const routes=['/','/products','/about','/contact','/privacy-policy','/products/diesel-generators','/products/mobile-light-towers',...['cummins','perkins','volvo','mtu','yuchai','weichai','sdec-shangchai','doosan'].map(x=>'/products/diesel-generators/'+x),...['bma4000','bmn4000','bmnvh1600','4hvp1600m','4tnve600'].map(x=>'/products/mobile-light-towers/'+x)];
(async()=>{
 const sitemap=await (await fetch(base+'/sitemap.xml')).text();assert.equal((sitemap.match(/<loc>/g)||[]).length,60);assert.equal((sitemap.match(/hreflang=/g)||[]).length,240);
 const robots=await (await fetch(base+'/robots.txt')).text();assert(robots.includes('Disallow: /api/'));assert(robots.includes('Allow: /'));
 const redirect=await fetch(base+'/en/products',{redirect:'manual'});assert([307,308].includes(redirect.status));assert.equal(new URL(redirect.headers.get('location'),base).pathname,'/products');
 for(const invalid of ['/ru/products/diesel-generators/not-a-brand','/es/products/mobile-light-towers/not-a-model'])assert.equal((await fetch(base+invalid)).status,404);
 for(const prefix of ['','/ru','/es']){const image=await fetch(base+prefix+'/opengraph-image');assert.equal(image.status,200);assert.equal(image.headers.get('content-type'),'image/png');assert((await image.arrayBuffer()).byteLength>1000);}
 const b=await chromium.launch({channel:'chrome',headless:true});
 const ctx=await b.newContext({viewport:{width:1440,height:1000}});const p=await ctx.newPage();const errors=[],missing=new Set(),report=[],technical=new Map();
 p.on('pageerror',e=>errors.push(e.message));
 try{for(const locale of ['en','ru','es'])for(const route of routes){
 const pathname=(locale==='en'?'':'/'+locale)+(route==='/'?'':route)||'/';
 const response=await p.goto(base+pathname,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200,pathname);
 await p.waitForTimeout(250);
 assert.equal(await p.locator('html').getAttribute('lang'),locale,pathname+' lang');
 const canonical=await p.locator('link[rel="canonical"]').getAttribute('href');assert.equal(new URL(canonical).href,new URL('https://www.haodepower.com'+pathname).href,pathname+' canonical');
 const alternates=await p.locator('link[rel="alternate"][hreflang]').evaluateAll(nodes=>Object.fromEntries(nodes.map(n=>[n.hreflang,n.href])));
 for(const lang of ['en','ru','es','x-default']){const suffix=(lang==='en'||lang==='x-default'?'':'/'+lang)+(route==='/'?'':route);assert.equal(new URL(alternates[lang]).href,new URL('https://www.haodepower.com'+suffix).href,pathname+' '+lang);}
 const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false,pathname+' desktop overflow');
 const nodes=await p.evaluate(()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const a=[];let n;while(n=w.nextNode()){if(!n.parentElement.closest('script,style'))a.push(n.textContent.trim());}return a;});
 if(route.startsWith('/products/diesel-generators/')){
   const values=await p.locator('table tbody tr').evaluateAll(rows=>rows.map(row=>Array.from(row.children).map(cell=>cell.textContent)));
   if(locale==='en')technical.set(route,values);else assert.deepEqual(values,technical.get(route),pathname+' exact generator technical data');
 }
 if(locale==='en')for(const v of nodes){if(/[a-z]{2,}/i.test(v)&&text(v,'ru')===v&&/\s/.test(v)&&!/^\d|^[+©]|^Haode Power Equipment|^Changzhou Haode Electromechanical|^English \/|^Language \/|^HD logo/.test(v))missing.add(v);}
 if(route==='/'){await p.waitForTimeout(1500);await p.screenshot({path:path.join(out,locale+'-desktop.png')});}
 const title=await p.title();const description=await p.locator('meta[name="description"]').getAttribute('content');
 if(locale==='ru'){assert(/[А-Яа-я]/.test(title),pathname+' translated title');assert(/[А-Яа-я]/.test(description),pathname+' translated description');}
 report.push({pathname,title,description,canonical,alternates});
 console.log('PASS',pathname);
 }
 await p.setViewportSize({width:390,height:844});
 for(const locale of ['en','ru','es'])for(const route of ['/','/products','/products/diesel-generators/cummins','/products/mobile-light-towers/4tnve600','/contact','/privacy-policy']){
  const pathname=(locale==='en'?'':'/'+locale)+(route==='/'?'':route)||'/';await p.goto(base+pathname,{waitUntil:'domcontentloaded'});await p.waitForTimeout(350);
  const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  if(overflow){console.log('OVERFLOW',pathname,await p.evaluate(()=>Array.from(document.querySelectorAll('body *')).filter(el=>el.getBoundingClientRect().right>innerWidth+1).slice(0,15).map(el=>[el.tagName,el.className,el.textContent.slice(0,100)])));}
  assert.equal(overflow,false,pathname+' mobile overflow');
  if(route==='/'){await p.screenshot({path:path.join(out,locale+'-mobile.png')});}
 }
 assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(out,'audit.json'),JSON.stringify({base,report,errors,missing:[...missing]},null,2));
 console.log('ALL 60 PAGES + 18 MOBILE CHECKS PASSED; missing strings:',missing.size);
 console.log(JSON.stringify([...missing],null,2));
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
