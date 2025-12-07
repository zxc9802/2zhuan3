"""
生成API路由
"""

from fastapi import APIRouter, HTTPException, File, UploadFile, Form
from pydantic import BaseModel
from typing import Optional
import time
import base64

from services.doubao_service import DoubaoService
from templates.prompt_templates import build_prompt, DEFAULT_DESCRIPTION


router = APIRouter()
doubao_service = DoubaoService()


class GenerateRequest(BaseModel):
    """生成请求模型"""
    image: str  # base64编码的图片
    description: Optional[str] = DEFAULT_DESCRIPTION
    viewAngle: str = "perspective"
    style: str = "realistic"


class GenerateResponse(BaseModel):
    """生成响应模型"""
    success: bool
    imageUrl: Optional[str] = None
    processingTime: Optional[float] = None
    error: Optional[str] = None


@router.post("/generate", response_model=GenerateResponse)
async def generate_3d_image(request: GenerateRequest):
    """
    生成3D效果图接口

    Args:
        request: 包含图片、描述、视角、风格的请求

    Returns:
        生成结果，包含图片URL和处理时间
    """
    start_time = time.time()

    try:
        # 1. 解码base64图片
        if "," in request.image:
            # 移除 data:image/xxx;base64, 前缀
            image_data = base64.b64decode(request.image.split(",")[1])
        else:
            image_data = base64.b64decode(request.image)

        # 2. 构建Prompt
        prompt = build_prompt(
            description=request.description,
            view_angle=request.viewAngle,
            style=request.style
        )

        # 3. 调用豆包API生成图片
        result = await doubao_service.generate_3d_image(
            image_data=image_data,
            prompt=prompt,
            size="2K",
            watermark=False
        )

        # 4. 计算处理时间
        processing_time = round(time.time() - start_time, 2)

        # 5. 返回结果
        if result["success"]:
            return GenerateResponse(
                success=True,
                imageUrl=result["imageUrl"],
                processingTime=processing_time
            )
        else:
            return GenerateResponse(
                success=False,
                error=result.get("error", "生成失败"),
                processingTime=processing_time
            )

    except Exception as e:
        processing_time = round(time.time() - start_time, 2)
        return GenerateResponse(
            success=False,
            error=f"处理请求时发生错误: {str(e)}",
            processingTime=processing_time
        )


@router.post("/generate-upload", response_model=GenerateResponse)
async def generate_3d_image_upload(
    file: UploadFile = File(...),
    description: str = Form(DEFAULT_DESCRIPTION),
    viewAngle: str = Form("perspective"),
    style: str = Form("realistic")
):
    """
    生成3D效果图接口（支持文件上传）

    Args:
        file: 上传的图片文件
        description: 图纸描述
        viewAngle: 视角
        style: 风格

    Returns:
        生成结果
    """
    start_time = time.time()

    try:
        # 1. 读取上传的文件
        image_data = await file.read()

        # 2. 验证文件大小（10MB限制）
        max_size = 10 * 1024 * 1024  # 10MB
        if len(image_data) > max_size:
            raise HTTPException(status_code=400, detail="文件大小超过10MB限制")

        # 3. 构建Prompt
        prompt = build_prompt(
            description=description,
            view_angle=viewAngle,
            style=style
        )

        # 4. 调用豆包API生成图片
        result = await doubao_service.generate_3d_image(
            image_data=image_data,
            prompt=prompt,
            size="2K",
            watermark=False
        )

        # 5. 计算处理时间
        processing_time = round(time.time() - start_time, 2)

        # 6. 返回结果
        if result["success"]:
            return GenerateResponse(
                success=True,
                imageUrl=result["imageUrl"],
                processingTime=processing_time
            )
        else:
            return GenerateResponse(
                success=False,
                error=result.get("error", "生成失败"),
                processingTime=processing_time
            )

    except HTTPException:
        raise
    except Exception as e:
        processing_time = round(time.time() - start_time, 2)
        return GenerateResponse(
            success=False,
            error=f"处理请求时发生错误: {str(e)}",
            processingTime=processing_time
        )


@router.get("/health")
async def health_check():
    """健康检查接口"""
    return {"status": "ok", "service": "Blueprint3D API"}
