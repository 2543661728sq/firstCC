const { app, BrowserWindow, Notification, ipcMain, Tray, Menu } = require('electron');
const path = require('path');

let mainWindow;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 380,
    height: 520,
    resizable: false,
    frame: false,
    transparent: false,
    backgroundColor: '#1a1a2e',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  mainWindow.setMenu(null);

  mainWindow.on('close', (e) => {
    if (!app.isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });
}

// Tray
function createTray() {
  // Skip if no tray support
  if (process.platform === 'win32') {
    app.setAppUserModelId('Pomodoro Timer');
  }
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
  else mainWindow.show();
});

// IPC: show notification
ipcMain.on('show-notification', (_, { title, body }) => {
  const notif = new Notification({ title, body, silent: false });
  notif.show();
});

// IPC: window controls
ipcMain.on('minimize-window', () => mainWindow.minimize());
ipcMain.on('close-window', () => mainWindow.close());
ipcMain.on('show-window', () => mainWindow.show());

// Quit handler
ipcMain.on('quit-app', () => {
  app.isQuitting = true;
  app.quit();
});
