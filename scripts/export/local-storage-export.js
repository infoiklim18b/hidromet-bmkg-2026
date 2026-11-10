// Run manually in DevTools on the original Site after reviewing this code.
// No network requests; only the application's two demo data keys are read.
(() => {
  const keys=['hidromet-demo-jobs-v1','hidromet-demo-feedback'];
  const data={};
  for(const key of keys){
    const value=localStorage.getItem(key);
    if(value!==null){try{data[key]=JSON.parse(value);}catch{throw new Error('Invalid JSON at '+key);}}
  }
  const backup={format:'hidromet-demo-local-storage',version:1,exportedAt:new Date().toISOString(),origin:location.origin,data};
  const url=URL.createObjectURL(new Blob([JSON.stringify(backup,null,2)],{type:'application/json'}));
  const a=document.createElement('a');a.href=url;a.download='local-storage-backup-hidromet.json';a.click();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
  console.log('Exported '+Object.keys(data).length+' demo storage keys. No data was sent to a server.');
})();
