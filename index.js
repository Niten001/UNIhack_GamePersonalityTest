const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
var jquery = require('jquery');

let window

function createWindow() {
    window = new BrowserWindow({width:1200, height:800, frame: true});

    window.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    window.on('closed', () => {
        window = null;
    });

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(proces.platform !== 'darwin'){
    }
});