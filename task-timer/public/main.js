const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');
const isDev = require('electron-is-dev');

const { app, ipcMain } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    
  const url = (
      isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    )
  
  mainWindow = new MainWindow(url); 
  
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'; 
  const iconPath = path.join(__dirname, `../src/assets/${iconName}`); 
  tray = new TimerTray(iconPath, mainWindow); 

});

ipcMain.on('update-timer', (event, timeLeft) => {
  tray.setTitle(timeLeft); 
});
