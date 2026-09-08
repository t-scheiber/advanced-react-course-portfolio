import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
const lock=JSON.parse(fs.readFileSync('package-lock.json','utf8'));
assert.equal(pkg.packageManager,'npm@12.0.2');assert.equal(pkg.engines.node,'>=22.23.2 <23');assert.equal(lock.lockfileVersion,3);
assert.deepEqual(lock.packages[''].dependencies,pkg.dependencies);assert.deepEqual(lock.packages[''].devDependencies,pkg.devDependencies);
for(const [name,version] of Object.entries({...pkg.dependencies,...pkg.devDependencies})){
 assert.match(version,/^\d+\.\d+\.\d+$/);assert.equal(lock.packages[`node_modules/${name}`].version,version);
}
for(const [location,entry] of Object.entries(lock.packages))if(location){assert.ok(!entry.link);assert.match(entry.resolved,/^https:\/\/registry\.npmjs\.org\//);assert.match(entry.integrity,/^sha512-/);}
assert.equal(JSON.parse(fs.readFileSync('tsconfig.json','utf8')).compilerOptions.checkJs,true);
assert.ok(!fs.existsSync('public/index.html'),'CRA template must not duplicate the built index');
const allowed= /^(index\.html|favicon\.ico|logo192\.png|logo512\.png|manifest\.json|robots\.txt|assets\/[A-Za-z0-9_-]+\.(js|css|jpg))$/;
const files=[];
function walk(directory,relative=''){
 for(const name of fs.readdirSync(directory)){
  const file=path.join(directory,name),key=relative+name,stat=fs.lstatSync(file);
  if(stat.isDirectory()){assert.equal(key,'assets');walk(file,key+'/');}
  else{assert.ok(stat.isFile()&&allowed.test(key),`Unexpected build artifact: ${key}`);files.push(key);}
 }
}
walk('build');assert.ok(files.length>=12&&files.length<=20);
const html=fs.readFileSync('build/index.html','utf8');assert.ok(!html.includes('%PUBLIC_URL%'));assert.ok(!html.includes('/src/'));
for(const [,ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
 assert.ok(ref.startsWith('/')&&!ref.startsWith('//')&&!ref.includes('..'));assert.ok(files.includes(ref.slice(1)),`Missing local entry asset: ${ref}`);
}
for(const name of ['favicon.ico','logo192.png','logo512.png','manifest.json','robots.txt'])assert.deepEqual(fs.readFileSync('public/'+name),fs.readFileSync('build/'+name));
const sha=b=>createHash('sha256').update(b).digest('hex');
for(let i=1;i<=4;i++){
 const output=files.filter(p=>new RegExp(`^assets/photo${i}-.*\\.jpg$`).test(p));assert.equal(output.length,1);assert.equal(sha(fs.readFileSync(output[0].replace(/^/,'build/'))),sha(fs.readFileSync(`src/images/photo${i}.jpg`)));
}
console.log(`Validated frozen dependencies, checked JavaScript and ${files.length} allowlisted build artifacts, including all four unchanged photos.`);
