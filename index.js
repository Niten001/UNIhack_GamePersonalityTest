const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
var jquery = require('jquery');
var http = require('http');
const io = require('socket.io-client');

let window

function createWindow() {
    window = new BrowserWindow({width:1920, height:1080, frame: true, autoHideMenuBar: true});

    window.loadURL(url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true
    }));

    window.on('closed', () => {
        window = null;
    });

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
    }
});