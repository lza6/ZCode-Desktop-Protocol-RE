var e=require("electron"),r="zcode-browser-video-recorder:port";e.ipcRenderer.once(r,s=>{let[o]=s.ports;o&&window.postMessage(r,"*",[o])});
