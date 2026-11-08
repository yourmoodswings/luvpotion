import {createHash,createCipheriv,createDecipheriv,randomBytes} from 'node:crypto';
const fail=(message,status=400)=>Object.assign(new Error(message),{status});
export function paymentSettings({db,input,json,origin,production,defaults,fetcher=fetch,encryptionKey=process.env.SETTINGS_ENCRYPTION_KEY}){
 db.exec('CREATE TABLE IF NOT EXISTS private_settings(id TEXT PRIMARY KEY,payload TEXT NOT NULL,version INTEGER NOT NULL)');
 const key=encryptionKey?.length>=32?createHash('sha256').update(encryptionKey).digest():null;
 function read(){const row=db.prepare("SELECT * FROM private_settings WHERE id='paystack'").get();if(!row)return {...defaults,version:0,testedAt:null};if(!key)throw fail('Payment settings encryption key is unavailable.',503);try{const data=JSON.parse(row.payload),decipher=createDecipheriv('aes-256-gcm',key,Buffer.from(data.iv,'hex'));decipher.setAuthTag(Buffer.from(data.tag,'hex'));return {...JSON.parse(Buffer.concat([decipher.update(Buffer.from(data.data,'hex')),decipher.final()]).toString()),version:row.version};}catch{throw fail('Payment settings could not be unlocked. Restore the original server encryption key.',503);}}
 function write(config,expected){if(!key)throw fail('The server needs SETTINGS_ENCRYPTION_KEY before keys can be saved.',503);const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',key,iv);const data=Buffer.concat([cipher.update(JSON.stringify(config)),cipher.final()]);const payload=JSON.stringify({iv:iv.toString('hex'),tag:cipher.getAuthTag().toString('hex'),data:data.toString('hex')});db.exec('BEGIN IMMEDIATE');try{const row=db.prepare("SELECT version FROM private_settings WHERE id='paystack'").get();if((row?.version||0)!==expected)throw fail('Settings changed. Reload this page before saving.',409);db.prepare("INSERT INTO private_settings VALUES('paystack',?,1) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload,version=version+1").run(payload);db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}}
 function view(){const c=read();return {version:c.version,storageReady:!!key,secretConfigured:!!c.paystackKey,webhookConfigured:!!c.webhookSecret,mode:c.paystackKey?.startsWith('sk_live_')?'live':c.paystackKey?'test':'unconfigured',enabled:!!c.enabled,testedAt:c.testedAt||null,production,webhookUrl:origin+'/api/paystack/webhook',callbackUrl:origin+'/auctions',publicWebhook:origin.startsWith('https://'),source:c.version?'admin':'environment'};}
 async function route(req,res,p){if(!p.startsWith('/api/admin/payments'))return false;
  if(p==='/api/admin/payments'&&req.method==='GET'){json(res,200,view());return true;}
  const current=read(),d=await input(req);if(d.version!==current.version)throw fail('Settings changed. Reload before continuing.',409);
  if(p==='/api/admin/payments'&&req.method==='PUT'){
   const secret=typeof d.secretKey==='string'?d.secretKey.trim():'',webhook=typeof d.webhookSecret==='string'?d.webhookSecret.trim():'';
   if(secret&&!/^sk_(test|live)_[a-zA-Z0-9_-]{8,200}$/.test(secret))throw fail('Enter a Paystack secret key beginning sk_test_ or sk_live_.');
   if(webhook&&!/^whsec_[a-zA-Z0-9_=-]{8,300}$/.test(webhook))throw fail('Enter the webhook signing secret beginning whsec_.');
   const next={...current,paystackKey:secret||current.paystackKey,webhookSecret:d.clearWebhook?'':webhook||current.webhookSecret,enabled:d.enabled===true};
   const changed=next.paystackKey!==current.paystackKey,webhookChanged=next.webhookSecret!==current.webhookSecret;
   if((changed||webhookChanged)&&db.prepare("SELECT 1 FROM auction_results WHERE status='awaiting_payment' LIMIT 1").get())throw fail('Resolve outstanding auction payments before changing credentials.',409);
   if(changed&&db.prepare("SELECT 1 FROM live_bids b LEFT JOIN auction_results r ON r.lot=b.lot WHERE r.lot IS NULL LIMIT 1").get())throw fail('An auction has accepted bids. Keep its payment credentials until it closes and settles.',409);
   if(changed){next.testedAt=null;next.enabled=false;}
   if(next.enabled&&(!next.paystackKey||!next.testedAt))throw fail('Save your key and test the connection before enabling auctions.');
   if(next.enabled&&production&&!next.paystackKey.startsWith('sk_live_'))throw fail('Test credentials are saved. Production live auctions require a live key.');
   write(next,current.version);db.prepare('INSERT INTO audit(at,action,kind,recordId) VALUES(?,?,?,?)').run(new Date().toISOString(),'payment settings updated','payments','paystack');json(res,200,view());return true;
  }
  if(p==='/api/admin/payments/test'&&req.method==='POST'){
   if(!current.paystackKey)throw fail('Save a Paystack secret key first.');
   let result;try{const r=await fetcher('https://api.paystack.co/balance',{headers:{Authorization:'Bearer '+current.paystackKey},signal:AbortSignal.timeout(12000)});const body=await r.json();result=r.ok&&body.status===true;}catch{throw fail('Could not reach Paystack. Check the server connection and try again.',502);}
   if(!result)throw fail('Paystack did not accept this key or its API permissions. Check the key in your Paystack dashboard.',400);
   write({...current,testedAt:new Date().toISOString()},current.version);json(res,200,{...view(),message:'Connection verified. No payment was created. This does not verify webhook delivery or a checkout.'});return true;
  }
  throw fail('Payment settings route not found.',404);
 }
 return {read,route};
}
