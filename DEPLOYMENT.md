# Blueprint3D 部署指南

## 前端部署到 Vercel

### 方式 1：通过 Vercel 网站部署（推荐）

1. **登录 Vercel**
   - 访问 [https://vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New" → "Project"
   - 选择 GitHub 仓库：`zxc9802/2zhuan3`
   - 点击 "Import"

3. **配置项目**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **配置环境变量**
   在 Vercel 项目设置中添加：
   ```
   NEXT_PUBLIC_API_URL=你的后端API地址
   ```

   例如：`https://your-backend.railway.app`

5. **部署**
   - 点击 "Deploy"
   - 等待部署完成
   - 获取部署URL：`https://your-project.vercel.app`

### 方式 2：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 进入前端目录
cd frontend

# 部署
vercel

# 生产环境部署
vercel --prod
```

## 后端部署

### 部署到 Railway

1. **注册 Railway**
   - 访问 [https://railway.app](https://railway.app)
   - 使用 GitHub 账号注册

2. **创建新项目**
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 选择仓库：`zxc9802/2zhuan3`

3. **配置项目**
   ```
   Root Directory: backend
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

4. **配置环境变量**
   在 Railway 项目设置中添加：
   ```
   DOUBAO_API_KEY=95d2a060-7ab5-4fdc-92bf-d9da19aa652c
   API_TIMEOUT_MS=600000
   PORT=8000
   ```

5. **获取后端 URL**
   - Railway 会自动生成域名
   - 例如：`https://blueprint3d-backend-production.up.railway.app`

6. **更新前端环境变量**
   - 回到 Vercel 项目设置
   - 更新 `NEXT_PUBLIC_API_URL` 为 Railway 生成的后端 URL
   - 重新部署前端

### 部署到 Render

1. **注册 Render**
   - 访问 [https://render.com](https://render.com)

2. **创建 Web Service**
   - 选择 GitHub 仓库
   - 配置：
     ```
     Name: blueprint3d-backend
     Environment: Python
     Build Command: pip install -r requirements.txt
     Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
     ```

3. **添加环境变量**
   ```
   DOUBAO_API_KEY=95d2a060-7ab5-4fdc-92bf-d9da19aa652c
   API_TIMEOUT_MS=600000
   ```

## 部署后配置

### 1. CORS 配置

确保后端 `main.py` 中的 CORS 配置包含 Vercel 域名：

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-project.vercel.app",  # 添加你的 Vercel 域名
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 2. 图片存储配置

⚠️ **重要**：豆包 API 需要图片 URL，生产环境需要配置云存储：

#### 方案 1：火山引擎 TOS（推荐）

1. 开通火山引擎 TOS 服务
2. 创建 Bucket
3. 获取 Access Key 和 Secret Key
4. 在后端环境变量中添加：
   ```
   TOS_ACCESS_KEY=your_access_key
   TOS_SECRET_KEY=your_secret_key
   TOS_BUCKET=your_bucket_name
   TOS_REGION=cn-beijing
   ```

5. 修改 `backend/services/doubao_service.py`，实现 `upload_to_tos()` 方法

#### 方案 2：使用其他云存储

- AWS S3
- 阿里云 OSS
- 腾讯云 COS
- 七牛云

### 3. 环境变量清单

**前端（Vercel）**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

**后端（Railway/Render）**
```
DOUBAO_API_KEY=95d2a060-7ab5-4fdc-92bf-d9da19aa652c
API_TIMEOUT_MS=600000
PORT=8000
TOS_ACCESS_KEY=xxx  # 可选
TOS_SECRET_KEY=xxx  # 可选
TOS_BUCKET=xxx      # 可选
TOS_REGION=cn-beijing  # 可选
```

## 验证部署

### 1. 检查后端

访问：`https://your-backend-url.com/health`

应该返回：
```json
{"status": "healthy"}
```

### 2. 检查前端

访问：`https://your-project.vercel.app`

应该能看到完整的界面。

### 3. 测试功能

1. 上传一张图片
2. 填写描述
3. 选择视角和风格
4. 点击生成
5. 查看生成结果

## 常见问题

### Q1: Vercel 部署失败

**解决方案：**
- 检查 `frontend/package.json` 是否正确
- 确保 Root Directory 设置为 `frontend`
- 查看构建日志获取详细错误

### Q2: 后端 API 调用失败

**解决方案：**
- 检查 CORS 配置
- 确认环境变量是否正确设置
- 检查后端日志

### Q3: 图片上传失败

**解决方案：**
- 配置云存储（TOS/OSS/S3）
- 确保 API Key 有效
- 检查网络连接

### Q4: 豆包 API 调用失败

**解决方案：**
- 确认 API Key 是否正确
- 检查账户余额
- 确保请求格式正确

## 性能优化

### 1. 前端优化
- 启用图片压缩
- 使用 CDN 加速
- 启用缓存策略

### 2. 后端优化
- 增加超时时间
- 使用异步处理
- 添加请求队列

### 3. 成本控制
- 设置 API 调用限额
- 使用缓存减少重复生成
- 监控使用量

## 监控和日志

### Vercel 日志
- 访问 Vercel Dashboard → 项目 → Logs
- 查看构建日志和运行时日志

### Railway 日志
- 访问 Railway Dashboard → 项目 → Deployments
- 查看实时日志

## 回滚

### 前端回滚
在 Vercel Dashboard 中选择之前的部署版本，点击 "Promote to Production"

### 后端回滚
在 Railway/Render Dashboard 中重新部署之前的版本

## 更新部署

### 自动部署
- 推送代码到 GitHub main 分支
- Vercel 和 Railway 会自动触发部署

### 手动部署
```bash
# 前端
cd frontend
vercel --prod

# 后端
# 在 Railway/Render Dashboard 中点击 "Deploy"
```

## 技术支持

- GitHub Issues: https://github.com/zxc9802/2zhuan3/issues
- Vercel 文档: https://vercel.com/docs
- Railway 文档: https://docs.railway.app
- 火山引擎文档: https://www.volcengine.com/docs

---

**部署完成后，记得更新 README.md 中的演示链接！**
