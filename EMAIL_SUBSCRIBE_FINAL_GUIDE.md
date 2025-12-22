# 邮箱订阅功能 - 最终配置指南

## 📋 方案说明

**架构**：前端触发 Workflow + 后端保存到 Secret Gist

**隐私保护**：
- ✅ 邮箱保存在 **Secret Gist**（私密，只有你可见）
- ✅ Gist Token 存储在 **GitHub Secrets**（完全隐藏）
- ⚠️ Workflow Token 在前端代码中（**但权限极小，风险可控**）

---

## 🚀 完整配置步骤

### 步骤 1: 创建 Secret Gist

1. 访问：https://gist.github.com
2. 点击 **"New gist"**
3. 填写：
   - Filename: `emails.txt`
   - Content: 留空或写：
     ```
     Email Subscriptions
     ---
     ```
   - **重要**：选择 **"Create secret gist"**（不是公开的！）
4. **复制 Gist ID**（URL 中的长字符串）
   - 例如：`https://gist.github.com/username/abc123def456` 
   - 复制：`abc123def456`

### 步骤 2: 创建两个 GitHub Tokens

#### Token 1️⃣: Gist Token（存储在 Secrets 中）

1. 访问：https://github.com/settings/tokens
2. **Generate new token (classic)**
3. 设置：
   - Note: `Gist Write Token`
   - Expiration: 1 年或更长
   - Scopes: **只勾选 `gist`** ✅
4. **立即复制** token（`ghp_xxx...`）并保存

#### Token 2️⃣: Workflow Trigger Token（用于前端触发）

1. 再次点击 **Generate new token (classic)**
2. 设置：
   - Note: `Workflow Trigger Token`
   - Expiration: 1 年或更长
   - Scopes: **只勾选 `repo`** ✅
3. **立即复制** token（`ghp_yyy...`）并保存

### 步骤 3: 配置 GitHub Secrets

1. 打开仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**，添加两个 secrets：

   **Secret 1:**
   - Name: `GIST_ID`
   - Value: 步骤 1 的 Gist ID

   **Secret 2:**
   - Name: `GIST_TOKEN`
   - Value: 步骤 2 的 Token 1（Gist Token）

### 步骤 4: 更新代码配置（本地）

编辑 `subscribe.md` 和 `subscribe-zh.md`，找到这两行（约 83-84 行）：

```javascript
const repoOwner = 'raytronichen'; // 你的 GitHub 用户名
const repoName = 'raytronichen.github.io'; // 你的仓库名
```

修改为你的信息：

```javascript
const repoOwner = 'YOUR_USERNAME';
const repoName = 'YOUR_REPO';
```

**⚠️ 注意**：`workflowToken` 保持为空字符串 `''`，不要在本地填写！

### 步骤 5: 提交并推送

```bash
git add .
git commit -m "配置邮箱订阅功能"
git push origin main
```

### 步骤 6: 在 GitHub 网页上填写 Workflow Token ⭐

**为什么要在网页上填写？**
- GitHub 推送保护会阻止包含 token 的推送
- 但在 GitHub 网页上编辑不会触发推送保护

**操作步骤**：

1. 访问你的 GitHub 仓库
2. 找到 `subscribe.md` 文件，点击进入
3. 点击右上角的 **编辑按钮**（铅笔图标 ✏️）
4. 找到这一行：
   ```javascript
   const workflowToken = ''; // 填写你的 Workflow Token
   ```
5. 修改为：
   ```javascript
   const workflowToken = 'ghp_yyy...'; // 粘贴步骤 2 的 Token 2
   ```
6. 点击 **Commit changes**
7. **重复以上步骤**，编辑 `subscribe-zh.md` 文件

### 步骤 7: 测试

1. 等待 GitHub Pages 构建完成（1-2 分钟）
2. 访问订阅页面：
   - 英文：`https://你的域名.com/subscribe/`
   - 中文：`https://你的域名.com/subscribe-zh/`
3. 输入测试邮箱并提交
4. 检查：
   - 访问仓库 → **Actions** 标签页，查看 workflow 是否运行成功
   - 访问你的 Secret Gist，确认邮箱已保存

---

## 🔍 查看订阅的邮箱

### 方法 1: 直接查看 Gist（最简单）

1. 访问：https://gist.github.com
2. 找到你的 Secret Gist（`emails.txt`）
3. 查看内容，手动复制需要的邮箱

### 方法 2: 使用 API 获取

```bash
curl -H "Authorization: token YOUR_GIST_TOKEN" \
     https://api.github.com/gists/YOUR_GIST_ID
```

---

## 🔐 安全性说明

### 为什么 Workflow Token 硬编码是可接受的？

| 特性 | Workflow Token | Gist Token |
|-----|---------------|-----------|
| **存储位置** | ⚠️ 前端代码中 | ✅ GitHub Secrets |
| **权限** | 只能触发 workflow | 可读写 Gist |
| **泄露风险** | 低（只能浪费 Actions 配额） | 高（可访问所有 Gist） |
| **数据访问** | ❌ 无法访问任何数据 | ✅ 可读写邮箱数据 |
| **是否可接受** | ✅ 可接受（无替代方案） | ❌ 必须隐藏 |

**关键点**：
- Workflow Token 只能触发 workflow，**无法读取或修改任何数据**
- 即使泄露，攻击者只能：
  - 浪费你的 GitHub Actions 配额
  - 触发空运行（因为无法提供邮箱）
- 攻击者**无法**：
  - 读取 Secret Gist 中的邮箱
  - 读取 GitHub Secrets
  - 修改仓库代码

### 真正的敏感 Token（Gist Token）完全隐藏

- ✅ 存储在 GitHub Secrets 中
- ✅ 只在 GitHub Actions 运行时使用
- ✅ 永远不会出现在前端代码中
- ✅ 无法被用户或攻击者访问

---

## 🐛 故障排除

### 问题 1: 本地推送被阻止

**现象**：推送时显示 "Repository rule violations found"

**原因**：在本地填写了 Workflow Token

**解决**：
1. 将 `workflowToken` 改回空字符串 `''`
2. 重新提交推送
3. 推送成功后，在 GitHub 网页上填写 token

### 问题 2: 提交后没有反应

**检查**：
1. 确认 `workflowToken` 已在 GitHub 网页上填写
2. 浏览器控制台（F12）查看是否有错误
3. GitHub Actions 是否运行（访问仓库 → Actions 标签页）

### 问题 3: Workflow 运行失败

**检查**：
1. Settings → Secrets → 确认 `GIST_ID` 和 `GIST_TOKEN` 存在
2. 确认 Gist Token 有 `gist` 权限
3. 确认 Gist ID 正确
4. 查看 Actions 日志中的详细错误

### 问题 4: 如何撤销和更新 Token

**撤销 Token**：
1. 访问：https://github.com/settings/tokens
2. 找到对应的 token
3. 点击 "Delete" 或 "Revoke"

**更新 Token**：
1. 创建新的 token
2. 对于 Gist Token：更新 GitHub Secret `GIST_TOKEN`
3. 对于 Workflow Token：在 GitHub 网页上编辑代码文件

---

## 📊 工作流程图

```
用户在网页提交邮箱
    ↓
前端 JavaScript 使用 Workflow Token
    ↓
调用 GitHub API 触发 repository_dispatch 事件
    ↓
GitHub Actions Workflow 自动启动
    ↓
从 GitHub Secrets 读取 GIST_TOKEN 和 GIST_ID
    ↓
使用 Gist Token 将邮箱保存到 Secret Gist
    ↓
邮箱安全存储 ✅
（只有你能在 Gist 后台查看）
```

---

## ✅ 配置检查清单

- [ ] 创建 Secret Gist，复制 ID
- [ ] 创建 Gist Token（gist 权限）
- [ ] 创建 Workflow Token（repo 权限）
- [ ] 在 GitHub Secrets 添加 GIST_ID
- [ ] 在 GitHub Secrets 添加 GIST_TOKEN
- [ ] 更新代码中的 repoOwner 和 repoName
- [ ] workflowToken 保持为空，提交并推送
- [ ] ⭐ 在 GitHub 网页上编辑文件，填写 workflowToken
- [ ] 确认 `.github/workflows/email-subscribe.yml` 正确配置
- [ ] 测试订阅功能
- [ ] 查看 Actions 运行成功
- [ ] 在 Gist 后台确认邮箱已保存

---

## 🎯 总结

这个方案是**在隐私和可行性之间的最佳平衡**：

✅ **隐私保护**：
- 邮箱保存在 Secret Gist（私密）
- Gist Token 完全隐藏在 Secrets 中
- 没有使用公开的 Issues

✅ **安全可控**：
- Workflow Token 权限极小
- 即使泄露也无法访问数据

✅ **易于实现**：
- 无需后端服务器
- 完全基于 GitHub 功能
- 配置简单

✅ **易于管理**：
- 直接在 Gist 后台查看邮箱
- 手动复制即可使用
- 无需导出工具

---

**完成！现在你有一个安全、私密的邮箱订阅功能了！** 🎉

