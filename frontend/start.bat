@echo off
echo Starting Blueprint3D Frontend...
echo.

REM 检查.env.local文件
if not exist .env.local (
    echo [WARNING] .env.local file not found!
    echo Creating from .env.local.example...
    copy .env.local.example .env.local
)

REM 检查node_modules
if not exist node_modules (
    echo Installing dependencies...
    npm install
) else (
    echo Dependencies already installed.
)

echo.
echo Starting Next.js development server on http://localhost:3000
echo.

REM 启动开发服务器
npm run dev
