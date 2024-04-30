const API_URL="https://api.oceanwebturk.com/";
var options={
  appToken:document.querySelectorAll('meta[property="oceanwebturk:token"]')[0].content
};

const cipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

  return text => text.split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
}
  
const decipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
  return encoded => encoded.match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
}

function init(args){
    for (const [key, value] of Object.entries(args)) {
      options[key]=value;
    }
}

const OwtQuery=(collection)=>{};

const owt=(...args)=>{
  if(typeof args[0]==='function'){
    document.addEventListener("DOMContentLoaded",args[0]);
  }else if(typeof args[0]==='string'){
   const selector=args[0];
   const collection=document.querySelectorAll(selector);
   OwtQuery(collection);
   return collection;
  }else if(args[0] instanceof HTMLElement){
    const collection=[args[0]];   
    OwtQuery(collection);
    return collection;
   }
};

owt.exec=()=>{
  if(options.autoPWA==true){
    var link=document.createElement("link");
    link.rel="manifest";
    link.href=API_URL+"sites/"+options.appToken+"/manifest.json";
    document.querySelector("head").append(link);
  }
}