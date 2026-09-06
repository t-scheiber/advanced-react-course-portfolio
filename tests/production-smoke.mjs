import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
const port=18741;
const server=spawn(process.execPath,['node_modules/serve/build/main.js','-s','build','-l',`tcp://127.0.0.1:${port}`,'--no-clipboard'],{stdio:'ignore',env:{PATH:process.env.PATH,HOME:'/tmp',NO_UPDATE_CHECK:'1'}});
function request(urlPath){
 return new Promise((resolve,reject)=>{
  const req=http.request({hostname:'127.0.0.1',port,path:urlPath,method:'GET',timeout:1000},response=>{
   const chunks=[];let bytes=0;
   response.on('data',chunk=>{bytes+=chunk.length;if(bytes>4000000)req.destroy(new Error('Response byte bound exceeded'));else chunks.push(chunk);});
   response.on('end',()=>resolve({status:response.statusCode,contentType:response.headers['content-type']||'',body:Buffer.concat(chunks)}));response.on('error',reject);
  });req.on('timeout',()=>req.destroy(new Error('Local server timeout')));req.on('error',reject);req.end();
 });
}
try{
 let index;
 for(let attempt=0;attempt<30;attempt++){try{index=await request('/');break;}catch{await delay(100);}}
 assert.equal(index?.status,200);assert.deepEqual(index.body,await fs.readFile('build/index.html'));
 const files=await fs.readdir('build',{recursive:true});let checked=0,totalBytes=0;
 for(const name of files){
  const stat=await fs.lstat('build/'+name);if(stat.isDirectory())continue;
  assert.ok(stat.isFile());assert.match(name,/^[A-Za-z0-9_./-]+$/);assert.ok(!name.split('/').includes('..'));assert.ok(++checked<=20);
  const response=await request(name==='index.html'?'/':'/'+name);assert.equal(response.status,200);const expected=await fs.readFile('build/'+name);assert.deepEqual(response.body,expected,`Served bytes differ: ${name}`);
  if(name.endsWith('.js'))assert.match(response.contentType,/javascript/);if(name.endsWith('.css'))assert.match(response.contentType,/css/);if(name.endsWith('.jpg'))assert.match(response.contentType,/image\/jpeg/);
  totalBytes+=expected.length;assert.ok(totalBytes<=12000000);
 }
 assert.ok(checked>=12);console.log(JSON.stringify({productionStaticServer:'serve 14.2.6',result:'passed',files:checked,bytes:totalBytes,loopbackOnly:true,outputDirectory:'build'}));
}finally{
 server.kill('SIGTERM');
 if(server.exitCode===null)await Promise.race([new Promise(resolve=>server.once('exit',resolve)),delay(2000).then(()=>server.kill('SIGKILL'))]);
}
