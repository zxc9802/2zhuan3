# Vercel 快速部署指南

## 📦 一键部署到 Vercel

### 方法 1：使用 Vercel 网站（最简单）

#### 步骤 1：准备后端 API

由于 Vercel 主要部署前端，后端需要单独部署。推荐使用 Railway：

1. 访问 [https://railway.app](https://railway.app)
2. 使用 GitHub 登录
3. 点击 "New Project" → "Deploy from GitHub repo"
4. 选择仓库 `zxc9802/2zhuan3`
5. 配置：
   ```
   Root Directory: backend
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
6. 添加环境变量：
   ```
   DOUBAO_API_KEY=95d2a060-7ab5-4fdc-92bf-d9da19aa652c
   API_TIMEOUT_MS=600000
   ```
7. 部署后复制生成的 URL（例如：`https://blueprint3d-backend.up.railway.app`）

#### 步骤 2：部署前端到 Vercel

1. 访问 [https://vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New" → "Project"
4. 选择仓库：`zxc9802/2zhuan3`
5. 配置项目：

   **Framework Preset**: Next.js

   **Root Directory**: `frontend`

   **Build Command**: `npm run build`

   **Output Directory**: `.next`

   **Install Command**: `npm install`

6. **添加环境变量**（重要！）：

   点击 "Environment Variables"，添加：

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_API_URL` | 你的后端 Railway URL（步骤1获取的URL） |

   例如：`https://blueprint3d-backend.up.railway.app`

7. 点击 **"Deploy"**

8. 等待部署完成（约2-3分钟）

9. 获取前端 URL：`https://你的项目名.vercel.app`

#### 步骤 3：更新后端 CORS

1. 编辑 `backend/main.py`
2. 在 CORS 配置中添加你的 Vercel 域名：

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://你的项目名.vercel.app",  # 添加这一行
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

3. 提交并推送到 GitHub
4. Railway 会自动重新部署

#### 步骤 4：验证部署

访问你的 Vercel URL，测试功能：
1. 上传图片
2. 填写描述
3. 选择视角和风格
4. 点击生成
5. 查看结果

---

### 方法 2：使用 Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 进入前端目录
cd frontend

# 4. 部署（第一次会问一些配置问题）
vercel

# 5. 设置环境变量
vercel env add NEXT_PUBLIC_API_URL production

# 输入你的后端 API URL，例如：
# https://blueprint3d-backend.up.railway.app

# 6. 生产环境部署
vercel --prod
```

---

### 方法 3：使用 GitHub 集成（推荐）

设置自动部署，每次推送代码自动触发部署：

1. 在 Vercel 项目设置中连接 GitHub
2. 选择分支：`main`
3. 配置环境变量（同方法1）
4. 保存设置

之后每次推送到 `main` 分支，Vercel 会自动部署！

---

## 🎯 部署检查清单

- [ ] 后端已部署到 Railway/Render
- [ ] 获取后端 API URL
- [ ] 在 Vercel 配置环境变量 `NEXT_PUBLIC_API_URL`
- [ ] 前端已成功部署到 Vercel
- [ ] 更新后端 CORS 配置
- [ ] 测试上传和生成功能
- [ ] 更新 README.md 中的演示链接

---

## 🔧 常见问题

### Q: 部署后无法调用 API

**A:** 检查以下几点：
1. 环境变量 `NEXT_PUBLIC_API_URL` 是否正确设置
2. 后端 CORS 配置是否包含 Vercel 域名
3. 后端服务是否正常运行
4. 打开浏览器控制台查看具体错误

### Q: 图片上传失败

**A:** 生产环境需要配置云存储：
1. 开通火山引擎 TOS 或其他云存储
2. 在后端环境变量中配置存储凭证
3. 实现 `upload_to_tos()` 方法

### Q: 部署成功但页面空白

**A:** 可能的原因：
1. 检查 Root Directory 是否设置为 `frontend`
2. 查看 Vercel 构建日志
3. 确认 `package.json` 无错误

### Q: 如何查看日志

**A:**
- Vercel: Dashboard → 项目 → Logs
- Railway: Dashboard → 项目 → Deployments → View Logs

---

## 📱 部署后优化

### 1. 自定义域名

在 Vercel 项目设置中添加自定义域名：
1. 点击 "Domains"
2. 添加你的域名
3. 按提示配置 DNS

### 2. 性能优化

- 启用 Edge Network
- 配置缓存策略
- 启用图片优化

### 3. 监控

- 设置 Vercel Analytics
- 配置错误追踪（Sentry）
- 设置性能监控

---

## 🎉 部署完成！

恭喜！你的 Blueprint3D 应用已成功部署！

**下一步：**
1. 在 README.md 中更新演示链接
2. 测试所有功能
3. 分享给朋友使用

**需要帮助？**
- 查看详细部署指南：[DEPLOYMENT.md](DEPLOYMENT.md)
- 提交问题：[GitHub Issues](https://github.com/zxc9802/2zhuan3/issues)

---

**一键部署按钮（可选）**

你可以在 README.md 中添加一键部署按钮：

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zxc9802/2zhuan3&project-name=blueprint3d&repository-name=blueprint3d&root-directory=frontend)
```
