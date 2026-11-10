import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../../',import.meta.url));
const manifest=JSON.parse(readFileSync(path.join(root,'EXPORT_MANIFEST.json'),'utf8'));
const failures=[];
for(const item of manifest.original_files){
 try{
  const bytes=readFileSync(path.join(root,item.export_path));
  const actual=createHash('sha256').update(bytes).digest('hex');
  if(actual!==item.sha256)failures.push(item.original_path+': checksum differs');
 }catch{failures.push(item.original_path+': missing');}
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
else console.log(`Verified ${manifest.original_file_count} original source files from ${manifest.source_commit}.`);
