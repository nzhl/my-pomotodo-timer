// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, Tray} = require('electron')

const url = require('url')
const fs = require('fs')
const path = require('path')
const FILE_NAME = 'records.json'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let tray

function initData () {
  if (!fs.existsSync(FILE_NAME)) {
    fs.writeFileSync(FILE_NAME, JSON.stringify([]))
  }
  let data = fs.readFileSync(FILE_NAME) || "[]"
  let tasks = JSON.parse(data)
  global.shared = { tasks }
}

function saveData () {
  fs.writeFileSync(FILE_NAME, JSON.stringify(global.shared.tasks))
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 600, height: 500})
  mainWindow.setResizable(false)

  // remove the menu bar
  // Menu.setApplicationMenu(null)

  // and load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format(
    {
      pathname: path.join(__dirname, '/build/index.html'),
      protocol: 'file:',
      slashes: true
    });
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('show', function () {
    // windows only
    mainWindow.setSkipTaskbar(false)

    // mac only
    // app.dock.show()
  })

  mainWindow.on('close', function (event) {
    // for the timer, just let it be hidden inside the tray
    // windows only
    mainWindow.hide()

    // mac only
    // app.dock.hide()
    
    mainWindow.setSkipTaskbar(true)
    event.preventDefault();
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function createTray () {
  const iconPath = path.join(__dirname, '/public/favicon.png')
  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示',
      click () {
        mainWindow.show()
      }
    },
    {
      label: '退出', 
      click () {
        mainWindow.destroy()
        saveData()
        app.quit()
      }
    },
  ])

  tray.setToolTip('My Pomotodo Timer')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => mainWindow.show())
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  initData()
  createWindow()
  createTray()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
