@echo off
cd /d C:\Users\Administrator\ai-factory-global-lead-engine\services\api
.\.venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8010 > api-live.log 2>&1
