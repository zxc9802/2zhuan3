"""
豆包SeeDream 4.5 API 调用服务
"""

import httpx
import os
from typing import Dict, Any
import base64
from io import BytesIO
from PIL import Image


class DoubaoService:
    """豆包API服务类"""

    def __init__(self):
        self.api_url = "https://ark.cn-beijing.volces.com/api/v3/images/generations"
        self.api_key = os.getenv("DOUBAO_API_KEY", "95d2a060-7ab5-4fdc-92bf-d9da19aa652c")
        self.model = "doubao-seedream-4-5-251128"
        self.timeout = int(os.getenv("API_TIMEOUT_MS", "600000")) / 1000  # 转换为秒

    async def generate_3d_image(
        self,
        image_data: bytes,
        prompt: str,
        size: str = "2K",
        watermark: bool = False
    ) -> Dict[str, Any]:
        """
        调用豆包API生成3D效果图

        Args:
            image_data: 原始图片的字节数据
            prompt: 生成提示词
            size: 图片尺寸 (1K/2K/4K)
            watermark: 是否添加水印

        Returns:
            包含生成图片URL和元数据的字典
        """
        try:
            # 将图片上传到临时存储并获取URL
            # 注意：豆包API需要图片URL，而不是base64
            # 这里需要将图片上传到一个可访问的URL
            # 简化处理：将base64直接传递（实际应该上传到OSS）

            # 将bytes转为base64 URL格式（如果API支持）
            # 或者需要先上传到云存储获取URL

            # 实际部署时，需要：
            # 1. 上传到火山引擎TOS或其他云存储
            # 2. 获取可访问的HTTPS URL
            # 3. 将URL传递给API

            # 临时方案：保存到本地并返回本地路径（仅供开发测试）
            temp_image_path = await self._save_temp_image(image_data)

            # 构建请求
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.api_key}"
            }

            payload = {
                "model": self.model,
                "prompt": prompt,
                "image": temp_image_path,  # 实际部署时这里应该是云存储URL
                "size": size,
                "watermark": watermark
            }

            # 调用API
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    self.api_url,
                    headers=headers,
                    json=payload
                )
                response.raise_for_status()
                result = response.json()

            # 解析响应
            if "data" in result and len(result["data"]) > 0:
                image_url = result["data"][0].get("url", "")
                return {
                    "success": True,
                    "imageUrl": image_url,
                    "metadata": {
                        "model": self.model,
                        "size": size,
                        "prompt": prompt
                    }
                }
            else:
                return {
                    "success": False,
                    "error": "API返回数据格式异常"
                }

        except httpx.TimeoutException:
            return {
                "success": False,
                "error": "API请求超时，请稍后重试"
            }
        except httpx.HTTPStatusError as e:
            return {
                "success": False,
                "error": f"API请求失败: {e.response.status_code} - {e.response.text}"
            }
        except Exception as e:
            return {
                "success": False,
                "error": f"生成失败: {str(e)}"
            }

    async def _save_temp_image(self, image_data: bytes) -> str:
        """
        临时保存图片并返回路径

        实际部署时应该：
        1. 上传到火山引擎TOS (https://www.volcengine.com/docs/6349/74914)
        2. 获取可访问的HTTPS URL
        3. 返回URL

        Args:
            image_data: 图片字节数据

        Returns:
            图片URL（开发环境返回本地路径）
        """
        # 这里仅作为示例，实际需要上传到云存储
        import hashlib
        import time

        # 生成唯一文件名
        timestamp = int(time.time() * 1000)
        hash_obj = hashlib.md5(image_data)
        filename = f"{timestamp}_{hash_obj.hexdigest()[:8]}.png"

        # 保存到临时目录
        temp_dir = "temp_uploads"
        os.makedirs(temp_dir, exist_ok=True)
        filepath = os.path.join(temp_dir, filename)

        # 保存图片
        image = Image.open(BytesIO(image_data))
        image.save(filepath)

        # 返回路径（实际应该返回云存储URL）
        return f"file://{os.path.abspath(filepath)}"

    async def upload_to_tos(self, image_data: bytes) -> str:
        """
        上传图片到火山引擎TOS（对象存储）

        需要配置：
        - TOS Access Key
        - TOS Secret Key
        - Bucket Name
        - Region

        参考文档：https://www.volcengine.com/docs/6349/74914

        Args:
            image_data: 图片字节数据

        Returns:
            图片的HTTPS URL
        """
        # TODO: 实现TOS上传逻辑
        # 1. 使用volcengine-python-sdk
        # 2. 上传到指定bucket
        # 3. 返回可访问URL

        raise NotImplementedError("TOS上传功能待实现，请参考火山引擎文档")
