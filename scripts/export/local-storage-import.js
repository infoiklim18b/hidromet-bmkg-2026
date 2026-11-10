// Run manually in DevTools on the local application after reviewing this code.
// It does not send the selected file to a server.
(() => {
  const input=document.createElement('input');input.type='file';input.accept='.json,application/json';
  input.addEventListener('change',async()=>{
    try{
      const file=input.files?.[0];if(!file)return;
      if(file.size>5*1024*1024)throw new Error('Backup exceeds 5 MB.');
      const backup=JSON.parse(await file.text());
      if(backup.format!=='hidromet-demo-local-storage'||backup.version!==1||!backup.data||typeof backup.data!=='object'||Array.isArray(backup.data))throw new Error('Unsupported backup.');
      const allowed=['hidromet-demo-jobs-v1','hidromet-demo-feedback'];
      if(Object.keys(backup.data).some(k=>!allowed.includes(k)))throw new Error('Unknown key in backup.');
      const jobs=backup.data['hidromet-demo-jobs-v1'];
      if(jobs!==undefined&&(!Array.isArray(jobs)||jobs.some(j=>!j||['id','title','region','status','hash','note'].some(k=>typeof j[k]!=='string')||!['DRAFT','VALIDATING','APPROVED','PUBLISHED'].includes(j.status))))throw new Error('Invalid demo jobs.');
      const feedback=backup.data['hidromet-demo-feedback'];
      if(feedback!==undefined&&(!feedback||typeof feedback!=='object'||Array.isArray(feedback)||Object.values(feedback).some(v=>typeof v!=='string')))throw new Error('Invalid feedback.');
      const entries=Object.entries(backup.data);
      if(!entries.length){console.log('Backup contains no application data.');return;}
      if(!confirm('Replace '+entries.length+' demo storage keys on '+location.origin+'? Existing values for these keys will be overwritten.'))return;
      const previous=entries.map(([k])=>[k,localStorage.getItem(k)]);
      try{for(const [k,v] of entries)localStorage.setItem(k,JSON.stringify(v));}
      catch(error){for(const [k,v] of previous){if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v);}throw error;}
      console.log('Imported demo data. Reload the application to load it.');
    }catch(error){console.error('Import did not complete:',error.message);}
  },{once:true});
  input.click();
})();
