const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
    send: async (channel, data) => {
        // whitelist channels
        let validChannels = [
            'item:add',
            'item:error',
            'item:clear',
            'item:clearSelected',
            'item:openAddWindow',
        ];
        if (validChannels.includes(channel)) {
            await ipcRenderer.invoke(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = ['item:add', 'item:clear', 'item:error'];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
});
