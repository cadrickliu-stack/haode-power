// Execute the existing route with a mocked Lark adapter. Never connects to CRM.
const fs=require('node:fs'),ts=require('typescript'),Module=require('node:module'),assert=require('node:assert/strict');
const original=Module.prototype.require;let captured;
Module.prototype.require=function(id){if(id==='@/lib/lark')return {createLarkInquiry:async record=>{captured=record;}};return original.call(this,id);};
require.extensions['.ts']=(mod,file)=>mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,file);
const {POST}=require('../app/api/inquiries/route.ts');
(async()=>{for(const locale of ['en','ru','es']){
const message='Нужна ДГУ 50Hz. Cotización: minería, Perú. 客户原始留言';
const input={name:'CRM MOCK ONLY',company:'HAODE I18N MOCK TEST',country:'Test',email:'i18n@example.com',whatsapp:'+123456789',product:'Cummins Diesel Generator Series',quantity:'3',message,sourcePageUrl:`https://www.haodepower.com/${locale==='en'?'':locale+'/'}contact?product=Cummins`};
const res=await POST(new Request('http://localhost/api/inquiries',{method:'POST',body:JSON.stringify(input)}));assert.equal(res.status,201);assert.equal(captured.message,message);assert.equal(captured.product,input.product);assert.equal(captured.quantity,3);assert.equal(captured.sourceUrl,input.sourcePageUrl);assert.equal(captured.sourcePage,locale==='en'?'/contact':`/${locale}/contact`);
captured=null;const invalid=await POST(new Request('http://localhost/api/inquiries',{method:'POST',body:JSON.stringify({...input,quantity:'0'})}));assert.equal(invalid.status,400);assert.equal(captured,null);
console.log('PASS',locale,'real inquiry handler -> mocked Lark adapter, original Unicode and source URL retained');
}})().catch(e=>{console.error(e);process.exitCode=1;});
