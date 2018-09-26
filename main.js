
const {app, Menu, shell, BrowserWindow} = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');


let mainWindow;

function createWindow () {
  // Create the browser window.
  //webPreferences: {webSecurity: false}  允许跨域请求
  mainWindow = new BrowserWindow({width: 1200, height: 1000,webPreferences: {webSecurity: false,allowRunningInsecureContent:true}})

  // 加载应用----适用于 vue/react 调试
  mainWindow.loadURL('http://localhost:8080/');

  //加载应用----打包
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, './dist/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))


  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});

//自定义memu
let template = [
  {
    label:'文件',
    submenu:[
      {
        label:'重载',
        accelerator:'Ctrl+R',
        click:function(item, focusedWindow){
          if (focusedWindow) {
            // on reload, start fresh and close any old
            // open secondary windows
            if (focusedWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach(function (win) {
                if (win.id > 1) {
                  win.close()
                }
              })
            }
            focusedWindow.reload()
          }
        }
      },
      {
        label:'退出',
        accelerator:'Ctrl+W',
        role:'close'

      }
    ]
  },
  {
    label:'帮助',
    submenu:[
      {
        label:'主页',
        click:function(){
          shell.openExternal('https://cirolee.github.io/blog')
        }
      },
      {
        label:'github',
        click:function(){
          shell.openExternal('https://github.com/CiroLee/hotspotEditor')
        }
        
      }
    ]
  }
];

app.on('ready', function(){
  createWindow();
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
});


