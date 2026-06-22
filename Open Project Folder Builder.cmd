@echo off
setlocal

cd /d "%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$portOpen = Get-NetTCPConnection -LocalPort 3010 -State Listen -ErrorAction SilentlyContinue; " ^
  "if (-not $portOpen) { " ^
  "  Remove-Item -LiteralPath '.next' -Recurse -Force -ErrorAction SilentlyContinue; " ^
  "  Start-Process -FilePath 'cmd.exe' -ArgumentList '/k','npm run dev -- -p 3010' -WorkingDirectory (Get-Location).Path; " ^
  "  Start-Sleep -Seconds 4; " ^
  "} " ^
  "Start-Process 'http://localhost:3010';"
