@echo off
setlocal

cd /d "%~dp0"

start "Project Folder Builder Dev Server" cmd /k "npm run dev -- -p 3010"

timeout /t 3 /nobreak >nul
start "" "http://localhost:3010"
