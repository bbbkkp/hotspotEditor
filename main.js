
const {app, BrowserWindow} = require('electron');
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

app.on('ready', createWindow);

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


