"""
Prompt模板 - 工程图纸转3D效果图
"""

# 视角映射
VIEW_ANGLE_MAP = {
    "front": "正视图",
    "side": "侧视图",
    "top": "俯视图",
    "perspective": "透视图"
}

# 风格映射
STYLE_MAP = {
    "realistic": "超写实摄影风格，高清渲染",
    "technical": "技术线稿风格，工程制图",
    "cartoon": "简约卡通风格，彩色插画"
}

def build_prompt(description: str, view_angle: str, style: str) -> str:
    """
    构建完整的Prompt

    Args:
        description: 用户输入的图纸描述
        view_angle: 视角 (front/side/top/perspective)
        style: 风格 (realistic/technical/cartoon)

    Returns:
        完整的Prompt字符串
    """
    view_text = VIEW_ANGLE_MAP.get(view_angle, "透视图")
    style_text = STYLE_MAP.get(style, "超写实摄影风格，高清渲染")

    prompt = f"""请将这张工程平面图纸转换为3D可视化效果图。

图纸说明：{description}

要求：
1. 视角：{view_text}
2. 风格：{style_text}
3. 保持原图纸的结构比例和关键设计元素
4. 增强立体感和空间深度
5. 添加适当的材质、光影和环境氛围
6. 确保专业性和准确性

输出：高质量的3D效果图"""

    return prompt


# 默认Prompt（当用户未提供描述时）
DEFAULT_DESCRIPTION = "工程结构图纸"
