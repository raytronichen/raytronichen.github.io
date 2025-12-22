# 邮箱订阅功能 - 快速配置指南 V2

## 📋 概述

使用 **GitHub Actions + Secrets** 实现安全的邮箱订阅功能。

**优势**：
- 🔐 敏感 token 存储在 GitHub Secrets 中
- ✅ 不会被 GitHub 推送保护阻止
- 🚀 更安全、更易管理

---

## 🚀 5分钟快速配置

### 步骤 1: 创建 Secret Gist

1. 访问：https://gist.github.com
2. 点击 **"New gist"**
3. 填写：
   - Filename: `emails.txt`
   - Content: 留空或写 `Email Subscriptions\n---\n`
   - **选择 "Create secret gist"**（不是公开的！）
4. **复制 Gist ID**（URL 中的长字符串）
   - 例如：`https://gist.github.com/username/abc123def456` → 复制 `abc123def456`

### 步骤 2: 创建两个 Tokens

#### Token 1️⃣: Gist Token

1. 访问：https://github.com/settings/tokens
2. **Generate new token (classic)**
3. 设置：
   - Note: `Gist Write Token`
   - Expiration: 1 年或更长
   - Scopes: **只勾选 `gist`** ✅
4. **立即复制** token（`ghp_xxx...`）

#### Token 2️⃣: Workflow Trigger Token

1. 再次点击 **Generate new token (classic)**
2. 设置：
   - Note: `Workflow Trigger Token`
   - Expiration: 1 年或更长
   - Scopes: **只勾选 `repo`** ✅
3. **立即复制** token（`ghp_yyy...`）

### 步骤 3: 配置 GitHub Secrets

1. 打开仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**，添加两个 secrets：

   **Secret 1:**
   - Name: `GIST_ID`
   - Value: 步骤 1 的 Gist ID

   **Secret 2:**
   - Name: `GIST_TOKEN`
   - Value: 步骤 2 的 Token 1（Gist Token）

### 步骤 4: 更新代码配置

编辑 `subscribe.md` 和 `subscribe-zh.md`，找到这几行（约 82-84 行）：

```javascript
const repoOwner = 'raytronichen'; // 你的 GitHub 用户名
const repoName = 'raytronichen.github.io'; // 你的仓库名
const workflowToken = ''; // 步骤 2 的 Token 2（Workflow Token）
```

修改为你的信息：

```javascript
const repoOwner = 'YOUR_USERNAME';
const repoName = 'YOUR_REPO';
const workflowToken = 'ghp_yyy...'; // 粘贴 Token 2
```

### 步骤 5: 提交并测试

```bash
git add .
git commit -m "使用 GitHub Actions + Secrets 实现邮箱订阅"
git push origin main
```

等待 1-2 分钟后，访问订阅页面测试。

---

## 🔍 查看订阅的邮箱

### 方法 1: GitHub 网站
访问：https://gist.github.com → 找到你的 Secret Gist

### 方法 2: 使用导出工具
访问：`https://你的域名.com/export-emails.html`
- 输入 Gist ID 和 Gist Token（Token 1）
- 导出为 CSV

---

## 🐛 故障排除

### ❌ 提交后没反应

**检查**：
1. GitHub Actions 是否启用（Settings → Actions）
2. 查看 Actions 标签页的 workflow 日志

### ❌ 认证失败

**检查**：
1. `workflowToken` 是否正确配置
2. Token 是否有 `repo` 权限
3. `repoOwner` 和 `repoName` 是否正确

### ❌ Workflow 运行失败

**检查**：
1. Settings → Secrets → 是否有 `GIST_ID` 和 `GIST_TOKEN`
2. Gist Token 是否有 `gist` 权限
3. 查看 Actions 标签页的错误日志

---

## 🔐 为什么这个方案更安全？

| 方案 | Gist Token | Workflow Token |
|------|-----------|----------------|
| **旧方案** | ❌ 在代码中 | - |
| **新方案** | ✅ 在 Secrets 中 | ⚠️ 在代码中（权限受限） |

**关键优势**：
- Gist Token（高权限）完全隐藏
- Workflow Token（低权险）即使泄露也只能触发 workflow
- GitHub 推送保护不会阻止部署

---

## 📊 工作流程

```
用户提交邮箱
    ↓
前端触发 Workflow (使用 Workflow Token)
    ↓
GitHub Actions 启动
    ↓
从 Secrets 读取 Gist Token
    ↓
写入 Secret Gist
    ↓
完成 ✅
```

---

## ✅ 配置检查清单

- [ ] 创建 Secret Gist，复制 ID
- [ ] 创建 Gist Token（gist 权限）
- [ ] 创建 Workflow Token（repo 权限）
- [ ] 添加 GitHub Secret: GIST_ID
- [ ] 添加 GitHub Secret: GIST_TOKEN
- [ ] 更新代码：repoOwner, repoName
- [ ] 更新代码：workflowToken
- [ ] 确认 `.github/workflows/email-subscribe.yml` 存在
- [ ] 提交并推送
- [ ] 测试订阅功能
- [ ] 查看 Actions 运行成功

---

**详细说明请参考**：`EMAIL_SUBSCRIBE_SETUP_V2.md`

**完成！** 🎉

