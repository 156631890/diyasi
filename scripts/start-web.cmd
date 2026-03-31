@echo off
cd /d C:\Users\Administrator\ai-factory-global-lead-engine\apps\web
npm.cmd run start -- --hostname 127.0.0.1 --port 3000 > web-live.log 2>&1
