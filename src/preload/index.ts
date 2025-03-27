import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

window.navigator.mediaDevices.getDisplayMedia = async () => {
  throw new Error('Screen sharing is disabled.')
}

Object.defineProperty(window, 'MediaRecorder', {
  get: () => {
    throw new Error('MediaRecorder is disabled for security reasons.')
  }
})

// Custom APIs for renderer
const api = {
  fetchEvents: () => ipcRenderer.invoke('fetch-data')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
