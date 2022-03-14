const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('calendarAPI', {
    createCalendar: (data) => ipcRenderer.invoke('createCalendar', data)
});