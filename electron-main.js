const {app,BrowserWindow,Menu}=require('electron');const path=require('path');
if(process.argv.includes('--safe-gpu'))app.disableHardwareAcceleration();
function create(){
 const w=new BrowserWindow({width:1280,height:720,show:false,backgroundColor:'#1a1208',title:'みかんの大冒険',autoHideMenuBar:true,webPreferences:{backgroundThrottling:false}});
 Menu.setApplicationMenu(null);
 w.once('ready-to-show',()=>w.show());setTimeout(()=>{if(!w.isVisible())w.show()},2500);
 w.loadFile(path.join(__dirname,'index.html'));
 w.webContents.on('before-input-event',(e,i)=>{if(i.type==='keyDown'&&i.key==='F11')w.setFullScreen(!w.isFullScreen())})}
app.whenReady().then(create);app.on('window-all-closed',()=>app.quit());
