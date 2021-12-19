const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      height: 500,
      width: 800,
      frame: false,
      resizable: false,
      show: false,
      webPreferences: { 
        nodeIntegration: true,
        backgroundThrottling: false 
      }
    });

    this.loadURL(url);
    this.on('blur', () => {
      this.hide();
    });  // this.onBlur.bind(this)
  }

  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
