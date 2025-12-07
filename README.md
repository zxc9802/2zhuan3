# Blueprint3D

> 一键将复杂的工程平面图纸，转化为直观易懂的3D可视化效果图

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/zxc9802/2zhuan3)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🚀 在线演示

- **前端应用**: [部署到 Vercel 后填写此处]
- **API文档**: [后端部署后填写此处]
- **GitHub**: [https://github.com/zxc9802/2zhuan3](https://github.com/zxc9802/2zhuan3)

## 项目简介

Blueprint3D 是一款基于 AI 的工程图纸 3D 可视化工具，能够将 2D 平面图纸快速转换为直观的 3D 效果图，帮助工程师、学生和项目经理更好地理解和展示设计方案。

### 核心功能

- **智能图纸识别** - 支持上传 JPG、PNG 格式的工程图纸
- **多视角生成** - 提供正视图、侧视图、俯视图、透视图四种视角
- **多种风格选择** - 写实风格、技术线稿、简约卡通三种渲染风格
- **一键生成** - 基于豆包 SeeDream 4.5 AI 模型，快速生成高质量 3D 效果图
- **便捷下载** - 支持直接下载生成的效果图

## 技术栈

### 前端
- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: CSS Modules

### 后端
- **框架**: FastAPI (Python)
- **AI 服务**: 豆包 SeeDream 4.5 (字节跳动火山引擎)

## 快速开始

### 环境要求

- Node.js 18+
- Python 3.9+
- 豆包 API Key

### 安装步骤

#### 1. 克隆项目

```bash
git clone https://github.com/yourusername/blueprint3d.git
cd blueprint3d
```

#### 2. 配置后端

```bash
cd backend

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入你的豆包 API Key

# 启动后端服务
python main.py
```

后端服务将在 `http://localhost:8000` 启动

#### 3. 配置前端

```bash
cd frontend

# 安装依赖
npm install

# 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local 文件，确认 API 地址正确

# 启动开发服务器
npm run dev
```

前端服务将在 `http://localhost:3000` 启动

#### 4. 访问应用

打开浏览器访问 `http://localhost:3000`

## 使用说明

1. **上传图纸** - 点击或拖拽上传工程图纸（支持 JPG、PNG，最大 10MB）
2. **填写描述** - （可选）输入图纸的描述信息，帮助 AI 更好地理解
3. **选择视角** - 在右侧面板选择想要的视角（透视图、正视图、侧视图、俯视图）
4. **选择风格** - 选择渲染风格（写实、技术线稿、简约卡通）
5. **生成效果图** - 点击"生成 3D 效果图"按钮
6. **下载结果** - 生成完成后，可以下载保存或重新生成

## 豆包 API 配置

本项目使用字节跳动火山引擎的豆包 SeeDream 4.5 API。

### API 信息

- **Endpoint**: `https://ark.cn-beijing.volces.com/api/v3/images/generations`
- **模型**: `doubao-seedream-4-5-251128`
- **功能**: 图生图（Image-to-Image）

### 获取 API Key

1. 访问 [火山引擎控制台](https://console.volcengine.com/)
2. 开通豆包模型服务
3. 创建 API Key
4. 将 API Key 配置到 `backend/.env` 文件中

### 注意事项

- 豆包 API 需要图片 URL 而非 base64 数据
- 实际部署时需要配置火山引擎 TOS（对象存储）用于图片上传
- 开发环境使用本地文件系统作为临时方案

## 项目结构

```
blueprint3d/
├── frontend/                # Next.js 前端
│   ├── app/
│   │   ├── page.tsx        # 主页面
│   │   ├── layout.tsx      # 布局
│   │   ├── globals.css     # 全局样式
│   │   └── page.module.css # 页面样式
│   ├── components/         # UI 组件
│   │   ├── ImageUpload.tsx
│   │   ├── ControlPanel.tsx
│   │   └── ResultPreview.tsx
│   ├── hooks/              # 业务逻辑
│   │   └── useImageGeneration.ts
│   └── package.json
│
├── backend/                # FastAPI 后端
│   ├── api/
│   │   └── generate.py     # 生成接口
│   ├── services/
│   │   └── doubao_service.py # 豆包 API 服务
│   ├── templates/
│   │   └── prompt_templates.py # Prompt 模板
│   ├── main.py             # 主入口
│   └── requirements.txt
│
├── PRD.md                  # 产品需求文档
├── README.md               # 本文件
└── .gitignore
```

## API 文档

### 生成 3D 效果图

**POST** `/api/generate`

**请求体**:
```json
{
  "image": "base64...",
  "description": "钢结构厂房平面图",
  "viewAngle": "perspective",
  "style": "realistic"
}
```

**响应**:
```json
{
  "success": true,
  "imageUrl": "https://...",
  "processingTime": 12.5
}
```

### 健康检查

**GET** `/health`

## 部署

### 前端部署（Vercel）

```bash
cd frontend
vercel deploy
```

### 后端部署（Railway）

```bash
cd backend
railway up
```

记得在部署平台设置环境变量：
- `DOUBAO_API_KEY`
- `API_TIMEOUT_MS`
- 其他必要的配置

## 开发路线图

- [x] MVP 版本
  - [x] 基础图纸上传
  - [x] 多视角生成
  - [x] 多风格选择
  - [x] 结果下载
- [ ] V2 功能
  - [ ] 用户账户系统
  - [ ] 历史记录
  - [ ] 批量生成
  - [ ] 参数微调
- [ ] V3 功能
  - [ ] 多场景支持（服装、房屋设计等）
  - [ ] 可交互 3D 模型
  - [ ] CAD 文件导入

## 常见问题

### Q: 为什么生成失败？
A: 可能的原因：
- API Key 配置错误
- 图片格式不支持
- 网络连接问题
- API 调用限额已满

### Q: 生成需要多长时间？
A: 通常需要 10-30 秒，取决于图片大小和 API 负载

### Q: 支持哪些图纸格式？
A: 当前支持 JPG 和 PNG 格式，单个文件最大 10MB

### Q: 如何提高生成质量？
A:
- 上传清晰的高分辨率图纸
- 填写详细的图纸描述
- 选择合适的视角和风格

## 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 致谢

- [豆包 SeeDream 4.5](https://www.volcengine.com/) - AI 生成服务
- [Next.js](https://nextjs.org/) - 前端框架
- [FastAPI](https://fastapi.tiangolo.com/) - 后端框架

## 联系方式

- 项目主页: [https://github.com/zxc9802/2zhuan3](https://github.com/zxc9802/2zhuan3)
- 问题反馈: [Issues](https://github.com/zxc9802/2zhuan3/issues)
- 部署指南: [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Made with ❤️ by Blueprint3D Team**
