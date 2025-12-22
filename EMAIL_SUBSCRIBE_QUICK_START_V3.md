# 邮箱订阅功能 - 快速配置指南 V3（零前端 Token）

## 📋 概述

使用 **GitHub Issues + GitHub Actions** 实现完全无需在前端硬编码 token 的邮箱订阅功能。

**✨ 重大改进**：
- 🎯 **零前端 Token**：前端完全不需要任何 token
- 🔓 **使用公开 API**：GitHub Issues API 无需认证即可创建
- 🔐 **敏感 token 完全隐藏**：Gist Token 只在 GitHub Actions 中使用
- ✅ **不会被推送保护阻止**：代码中完全没有敏感信息

---

## 🚀 3分钟快速配置

### 步骤 1: 创建 Secret Gist

1. 访问：https://gist.github.com
2. 点击 **"New gist"**
3. 填写：
   - Filename: `emails.txt`
   - Content: 留空或写 `Email Subscriptions\n---\n`
   - **选择 "Create secret gist"**（不是公开的！）
4. **复制 Gist ID**（URL 中的长字符串）
   - 例如：`https://gist.github.com/username/abc123def456` → 复制 `abc123def456`

### 步骤 2: 创建 Gist Token

1. 访问：https://github.com/settings/tokens
2. **Generate new token (classic)**
3. 设置：
   - Note: `Gist Write Token for Email Subscribe`
   - Expiration: 1 年或更长
   - Scopes: **只勾选 `gist`** ✅
4. **立即复制** token（`ghp_xxx...`）

### 步骤 3: 配置 GitHub Secrets

1. 打开仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**，添加两个 secrets：

   **Secret 1:**
   - Name: `GIST_ID`
   - Value: 步骤 1 的 Gist ID

   **Secret 2:**
   - Name: `GIST_TOKEN`
   - Value: 步骤 2 的 Gist Token

### 步骤 4: 启用 Issues 功能

1. 打开仓库 → **Settings** → **General**
2. 在 **Features** 部分，确保 **Issues** 已勾选 ✅

### 步骤 5: 创建 email-subscription 标签

1. 打开仓库 → **Issues** → **Labels**
2. 点击 **New label**
3. 设置：
   - Label name: `email-subscription`
   - Description: `Automated email subscription`
   - Color: 随意选择（建议蓝色或绿色）
4. 点击 **Create label**

### 步骤 6: 更新代码配置

编辑 `subscribe.md` 和 `subscribe-zh.md`，找到这两行（约 83-84 行）：

```javascript
const repoOwner = 'raytronichen'; // 你的 GitHub 用户名
const repoName = 'raytronichen.github.io'; // 你的仓库名
```

修改为你的信息：

```javascript
const repoOwner = 'YOUR_USERNAME'; // 你的 GitHub 用户名
const repoName = 'YOUR_REPO'; // 你的仓库名（例如：username.github.io）
```

**注意**：不需要配置任何 token！

### 步骤 7: 提交并测试

```bash
git add .
git commit -m "使用 GitHub Issues 实现零 token 邮箱订阅"
git push origin main
```

等待 1-2 分钟后，访问订阅页面测试。

---

## 🔍 查看订阅的邮箱

### 方法 1: GitHub 网站
访问：https://gist.github.com → 找到你的 Secret Gist

### 方法 2: 查看 Issues（已自动关闭）
访问仓库的 Issues 标签页，筛选标签 `email-subscription`

### 方法 3: 使用导出工具
访问：`https://你的域名.com/export-emails.html`
- 输入 Gist ID 和 Gist Token
- 导出为 CSV

---

## 📊 工作流程

```
用户提交邮箱
    ↓
前端调用 GitHub Issues API（无需 token）
创建带有 email-subscription 标签的 issue
    ↓
GitHub Actions 自动触发
（监听 issue 创建事件）
    ↓
从 GitHub Secrets 读取 GIST_TOKEN
    ↓
提取邮箱信息并保存到 Secret Gist
    ↓
添加评论并自动关闭 issue
    ↓
完成 ✅
```

---

## 🐛 故障排除

### ❌ 提交后显示 403 错误

**原因**：仓库可能限制了 issue 创建权限

**解决**：
1. Settings → General → Features → 确保 **Issues** 已启用
2. Settings → Moderation options → 确保允许公开创建 issues

### ❌ Issue 创建了但没有自动处理

**检查**：
1. 确认 issue 有 `email-subscription` 标签
2. 查看 Actions 标签页，确认 workflow 是否运行
3. 查看 workflow 日志中的错误信息

### ❌ Workflow 运行失败

**检查**：
1. Settings → Secrets → 确认 `GIST_ID` 和 `GIST_TOKEN` 存在
2. 确认 Gist Token 有 `gist` 权限
3. 确认 Gist ID 正确（从 Gist URL 复制）

### ❌ 如何查看详细错误

**前端错误**：
- 打开浏览器开发者工具（F12）
- 查看 Console 和 Network 标签页

**后端错误**：
- 访问仓库 → Actions 标签页
- 点击失败的 workflow run
- 查看详细日志

---

## 🔐 为什么这个方案最安全？

| 方案 | Gist Token | 其他 Token | 推送保护 |
|------|-----------|-----------|---------|
| **方案 1** | ❌ 在代码中 | - | ❌ 会被阻止 |
| **方案 2** | ✅ 在 Secrets | ⚠️ Workflow Token 在代码中 | ❌ 会被阻止 |
| **方案 3** | ✅ 在 Secrets | ✅ 完全不需要 | ✅ 不会被阻止 |

**关键优势**：
- ✅ **零前端 Token**：代码中完全没有任何 token
- ✅ **使用公开 API**：GitHub Issues API 无需认证
- ✅ **Gist Token 完全隐藏**：只在 GitHub Actions 中使用
- ✅ **通过推送保护**：不会被 GitHub 安全扫描阻止
- ✅ **可追溯性**：所有订阅都有对应的 issue 记录

---

## 🎯 与方案 2 的对比

| 特性 | 方案 2 (repository_dispatch) | 方案 3 (Issues) |
|-----|---------------------------|----------------|
| 前端 Token | ⚠️ 需要 Workflow Token | ✅ 完全不需要 |
| 推送保护 | ❌ 会阻止 | ✅ 不会阻止 |
| 配置复杂度 | 中等（2个token） | 低（1个token） |
| 可追溯性 | 低（只在 Actions 日志） | 高（issue 记录） |
| 安全性 | 中等 | 高 |

---

## ⚙️ 高级配置（可选）

### 防止垃圾邮件

编辑 `.github/workflows/email-subscribe.yml`，添加邮箱验证：

```javascript
// 验证邮箱格式
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('Invalid email format');
  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issueNumber,
    body: '❌ Invalid email format.'
  });
  return;
}

// 防止重复订阅
if (existingContent.includes(email)) {
  console.log('Email already subscribed');
  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issueNumber,
    body: '⚠️ This email has already been subscribed.'
  });
  await github.rest.issues.update({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issueNumber,
    state: 'closed'
  });
  return;
}
```

---

## ✅ 配置检查清单

- [ ] 创建 Secret Gist，复制 ID
- [ ] 创建 Gist Token（gist 权限）
- [ ] 添加 GitHub Secret: GIST_ID
- [ ] 添加 GitHub Secret: GIST_TOKEN
- [ ] 启用仓库的 Issues 功能
- [ ] 创建 email-subscription 标签
- [ ] 更新代码：repoOwner, repoName（不需要 token！）
- [ ] 确认 `.github/workflows/email-subscribe.yml` 正确配置
- [ ] 提交并推送
- [ ] 测试订阅功能
- [ ] 查看 issue 自动创建和关闭
- [ ] 查看 Gist 中保存的邮箱

---

**详细说明请参考**：`EMAIL_SUBSCRIBE_SETUP_V3.md`

**完成！这是最安全、最简单的方案！** 🎉

