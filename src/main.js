const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 959,
                                    height: 473,
                                    maxHeight: 473
                                    });
    const startUrl = process.env.ELECTRON_START_URL || url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
        });
    //mainWindow.loadURL(startUrl);
    mainWindow.loadURL("http://localhost:5000");
    //mainWindow.loadURL(`file:///home/gustas/Electron/everythin2/public/index.html`);
    //mainWindow.setMenu(null);

    mainWindow.on('closed', function () {

        mainWindow = null
    });

}

app.on('ready', createWindow);

app.on('window-all-closed', function () {

    if (process.platform !== 'darwin') {
        app.quit()
    }
});
