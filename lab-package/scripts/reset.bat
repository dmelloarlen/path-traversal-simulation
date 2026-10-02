@echo off
cd /d "%~dp0.."
docker compose down --volumes --remove-orphans
docker compose up --build -d