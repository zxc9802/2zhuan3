@echo off
echo ===================================
echo Blueprint3D - Quick Start
echo ===================================
echo.

REM 检查配置文件
if not exist backend\.env (
    echo [ERROR] Backend .env file not found!
    echo Please run: cd backend ^&^& copy .env.example .env
    echo Then edit .env to add your DOUBAO_API_KEY
    pause
    exit /b 1
)

echo Starting Backend and Frontend...
echo.

REM 启动后端（在新窗口）
start "Blueprint3D Backend" cmd /k "cd backend && start.bat"

REM 等待2秒
timeout /t 2 /nobreak >nul

REM 启动前端（在新窗口）
start "Blueprint3D Frontend" cmd /k "cd frontend && start.bat"

echo.
echo Both services are starting in separate windows!
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul
