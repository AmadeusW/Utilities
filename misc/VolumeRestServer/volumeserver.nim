import winim/lean
import asyncdispatch
import jester

let shellHandle = GetShellWindow()

routes:
    get "/up":
        PostMessage(shellHandle, 0x0319, 0, 0xa0000) # send to all windows, WM_APPCOMMAND, no source, volume up
        resp "ok up"
    get "/down":
        PostMessage(shellHandle, 0x0319, 0, 0x90000) # send to all windows, WM_APPCOMMAND, no source, volume down
        resp "ok down"
    get "/pp":
        PostMessage(shellHandle, 0x0319, 0, 0xe0000) # send to all windows, WM_APPCOMMAND, no source, play/pause
        resp "ok pp"
    get "/":
        resp "ok hi"

runForever()