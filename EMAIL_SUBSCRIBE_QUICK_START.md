# 邮箱订阅功能 - 快速开始指南

## 📋 概述

本功能允许用户在网站上提交邮箱，邮箱会安全地存储在 GitHub Secret Gist 中，只有您可见。

## 🚀 快速配置（5分钟）

### 步骤 1: 创建 Secret Gist

1. 访问：https://gist.github.com
2. 点击右上角的 "+" 或 "New gist"
3. 填写：
   - **Filename**: `emails.txt`
   - **Content**: 可以留空或写 `Email Subscriptions\n---\n`
   - **重要**：选择 **"Create secret gist"**（不是公开的！）
4. 点击 "Create secret gist"
5. **复制 Gist ID**：
   - 创建后，URL 类似：`https://gist.github.com/YOUR_USERNAME/a1b2c3d4e5f6g7h8i9j0`
   - 复制 URL 中的长字符串（`a1b2c3d4e5f6g7h8i9j0`）

### 步骤 2: 创建 GitHub Token

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 设置：
   - **Note**: `Email Subscribe API`
   - **Expiration**: 选择过期时间（建议 1 年）
   - **Scopes**: **只勾选 `gist`** ✅
4. 点击 "Generate token"
5. **立即复制 token**（只显示一次！格式类似：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`）

### 步骤 3: 配置代码

1. 在 GitHub 上打开仓库，编辑以下文件：
   - `subscribe.md`（英文版）
   - `subscribe-zh.md`（中文版）

2. 找到这两行代码（大约在第 85-86 行）：
   ```javascript
   const gistId = ''; // 替换为你的 Secret Gist ID
   const githubToken = ''; // 替换为你的 GitHub Personal Access Token
   ```

3. 填入你的信息：
   ```javascript
   const gistId = 'a1b2c3d4e5f6g7h8i9j0'; // 你的 Gist ID
   const githubToken = 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // 你的 Token
   ```

4. 保存并提交更改

### 步骤 4: 测试

1. 等待 GitHub Pages 构建完成（通常 1-2 分钟）
2. 访问测试页面：`https://你的域名.com/test-subscribe.html`
3. 输入 Gist ID 和 Token，点击"测试连接"
4. 如果成功，尝试提交一个测试邮箱

## 📍 访问页面

配置完成后，用户可以通过以下链接访问：

- **英文订阅页面**: `https://你的域名.com/subscribe/`
- **中文订阅页面**: `https://你的域名.com/subscribe-zh/`

## 🔍 查看和导出邮箱

### 方法 1: 通过 GitHub 网站

1. 访问：https://gist.github.com
2. 在左侧找到你的 Secret Gist
3. 点击查看内容

### 方法 2: 使用导出工具

1. 访问：`https://你的域名.com/export-emails.html`
2. 输入 Gist ID 和 Token
3. 点击"获取邮箱列表"
4. 点击"导出为 CSV"下载

### 方法 3: 使用 API

```bash
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/gists/YOUR_GIST_ID
```

## ⚠️ 重要提示

1. **Token 安全**：
   - Token 会出现在代码中（这是必要的）
   - 只授予 `gist` 权限（最小权限）
   - 定期轮换 token（建议每 3-6 个月）

2. **Gist 安全**：
   - Secret Gist 只有您可见
   - 不要分享 Gist URL
   - 定期备份邮箱列表

3. **如果 Token 泄露**：
   - 立即访问 https://github.com/settings/tokens
   - 找到对应的 token，点击 "Revoke"
   - 创建新 token 并更新代码

## 🐛 故障排除

### 问题：提交后显示"认证失败"

- ✅ 检查 Token 是否正确
- ✅ 确认 Token 有 `gist` 权限
- ✅ 确认 Token 未过期

### 问题：显示"Gist 未找到"

- ✅ 检查 Gist ID 是否正确
- ✅ 确认 Gist 是 Secret 类型（不是公开的）

### 问题：显示"权限不足"

- ✅ 确认 Token 有 `gist` 权限
- ✅ 重新创建 Token，只勾选 `gist`

### 问题：如何查看详细错误

1. 打开浏览器开发者工具（按 F12）
2. 查看 Console 标签页
3. 查看 Network 标签页的 API 请求

## 📚 更多信息

详细配置说明请查看：`EMAIL_SUBSCRIBE_SETUP.md`

## ✅ 检查清单

- [ ] 创建了 Secret Gist
- [ ] 复制了 Gist ID
- [ ] 创建了 GitHub Token（只有 gist 权限）
- [ ] 复制了 Token
- [ ] 更新了 `subscribe.md` 中的配置
- [ ] 更新了 `subscribe-zh.md` 中的配置
- [ ] 提交了代码到 GitHub
- [ ] 测试了连接
- [ ] 测试了提交邮箱
- [ ] 验证了邮箱已保存到 Gist

---

**完成！** 现在用户可以在订阅页面提交邮箱了。🎉
