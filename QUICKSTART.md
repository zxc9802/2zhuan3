# Blueprint3D 快速启动指南

## 5分钟快速上手

### 步骤 1: 配置后端 API Key

```bash
cd backend
copy .env.example .env
```

编辑 `.env` 文件，确认 API Key 正确：
```env
DOUBAO_API_KEY=95d2a060-7ab5-4fdc-92bf-d9da19aa652c
API_TIMEOUT_MS=600000
PORT=8000
```

### 步骤 2: 一键启动（Windows）

在项目根目录双击运行：
```
start-all.bat
```

这将自动启动后端和前端服务！

### 步骤 3: 访问应用

打开浏览器访问：
```
http://localhost:3000
```

## 手动启动

### 启动后端

```bash
cd backend
pip install -r requirements.txt
python main.py
```

后端将运行在: `http://localhost:8000`

### 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端将运行在: `http://localhost:3000`

## 常见问题

### 1. 端口被占用

修改后端端口：
```bash
# backend/.env
PORT=8001
```

修改前端配置：
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8001
```

### 2. Python 依赖安装失败

建议使用虚拟环境：
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

### 3. Node.js 依赖安装慢

使用国内镜像：
```bash
cd frontend
npm install --registry=https://registry.npmmirror.com
```

### 4. API 调用失败

检查：
- API Key 是否正确配置
- 网络连接是否正常
- 后端服务是否正常运行
- 查看后端日志获取详细错误信息

## 验证安装

### 测试后端

访问: `http://localhost:8000/health`

应该看到:
```json
{"status": "healthy"}
```

### 测试前端

访问: `http://localhost:3000`

应该能看到 Blueprint3D 的主界面

## 下一步

1. 上传一张工程图纸
2. 填写图纸描述（可选）
3. 选择视角和风格
4. 点击"生成3D效果图"
5. 等待生成完成并下载

## 获取帮助

- 查看详细文档: [README.md](README.md)
- 查看产品需求: [PRD.md](PRD.md)
- 报告问题: GitHub Issues

祝使用愉快！🎉
