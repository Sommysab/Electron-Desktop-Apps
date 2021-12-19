const electron = require('electron'); 
const { Tray, app, Menu } = electron; 

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath); 

    this.mainWindow = mainWindow;

    this.setToolTip('Timer App');

    this.on('click', (event, bounds) => { 
      
      // Click event bounds
      const { x, y } = bounds;
  
      // Window height and width
      const { height, width } = this.mainWindow.getBounds();
  
      if (this.mainWindow.isVisible()) {
        this.mainWindow.hide();
      } else {
        const yPosition = process.platform === 'darwin' ? y : y - height;
        this.mainWindow.setBounds({
          x: x - width / 2,
          y: yPosition,
          height,
          width
        });
        this.mainWindow.show();
      }
    }); // this.onClick.bind(this); 


    this.on('right-click', () => { 
      const menuConfig = Menu.buildFromTemplate([ 
        {
          label: 'Quit', 
          click: () => app.quit() 
        } 
      ]); 
  
      this.popUpContextMenu(menuConfig); 
    }); // this.onRightClick.bind(this) 
  }
}

module.exports = TimerTray;