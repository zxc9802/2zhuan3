"""
Blueprint3D - FastAPI 后端主入口
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from api.generate import router as generate_router


# 加载环境变量
load_dotenv()

# 创建FastAPI应用
app = FastAPI(
    title="Blueprint3D API",
    description="工程图纸转3D效果图 - AI生成服务",
    version="1.0.0"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js开发服务器
        "http://localhost:3001",
        "https://*.vercel.app",  # Vercel部署域名
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(generate_router, prefix="/api", tags=["生成"])


@app.get("/")
async def root():
    """根路径"""
    return {
        "name": "Blueprint3D API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }


@app.get("/health")
async def health():
    """健康检查"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", "8000"))

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True  # 开发模式启用热重载
    )
