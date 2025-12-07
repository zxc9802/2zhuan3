@echo off
echo Starting Blueprint3D Backend...
echo.

REM 检查.env文件
if not exist .env (
    echo [ERROR] .env file not found!
    echo Please copy .env.example to .env and configure your API key.
    pause
    exit /b 1
)

REM 安装依赖
echo Installing dependencies...
pip install -r requirements.txt

echo.
echo Starting FastAPI server on http://localhost:8000
echo.

REM 启动服务器
python main.py
