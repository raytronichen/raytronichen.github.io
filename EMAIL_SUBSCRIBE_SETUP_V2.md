# 邮箱订阅功能配置指南 V2（使用 GitHub Actions + Secrets）

## 🔐 方案优势

- ✅ **更安全**：敏感 token 存储在 GitHub Secrets 中，不会出现在代码里
- ✅ **无法被扫描**：GitHub 推送保护不会阻止部署
- ✅ **易于管理**：统一在 GitHub 设置中管理所有密钥
- ✅ **可撤销**：随时可以更新或撤销 token

## 🚀 完整配置步骤

### 步骤 1: 创建 Secret Gist

1. 访问：https://gist.github.com
2. 点击 "New gist"
3. 填写：
   - **Filename**: `emails.txt`
   - **Content**: 可以留空或写：
     ```
     Email Subscriptions
     ---
     ```
   - **重要**：选择 **"Create secret gist"**（不是公开的！）
4. 点击 "Create secret gist"
5. **复制 Gist ID**：
   - 创建后，URL 类似：`https://gist.github.com/YOUR_USERNAME/a1b2c3d4e5f6g7h8i9j0`
   - 复制这段 ID：`a1b2c3d4e5f6g7h8i9j0`

### 步骤 2: 创建两个 GitHub Personal Access Tokens

#### Token 1: Gist Token（用于 GitHub Actions 写入 Gist）

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 设置：
   - **Note**: `Gist Write Token`
   - **Expiration**: 建议 1 年或更长
   - **Scopes**: **只勾选 `gist`** ✅
4. 点击 "Generate token"
5. **立即复制**这个 token（格式：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`）
6. 保存到安全的地方（稍后会用）

#### Token 2: Workflow Trigger Token（用于前端触发 workflow）

1. 再次访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 设置：
   - **Note**: `Workflow Trigger Token`
   - **Expiration**: 建议 1 年或更长
   - **Scopes**: **只勾选 `repo`** ✅（需要触发 workflow）
4. 点击 "Generate token"
5. **立即复制**这个 token
6. 保存到安全的地方

### 步骤 3: 配置 GitHub Secrets

1. 打开你的 GitHub 仓库
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加以下两个 secrets：

   **Secret 1: GIST_ID**
   - Name: `GIST_ID`
   - Value: 你在步骤 1 中复制的 Gist ID
   - 点击 "Add secret"

   **Secret 2: GIST_TOKEN**
   - Name: `GIST_TOKEN`
   - Value: 你在步骤 2 中创建的第一个 token（Gist Token）
   - 点击 "Add secret"

### 步骤 4: 更新前端代码配置

在 `subscribe.md` 和 `subscribe-zh.md` 文件中，找到这几行（大约在第 82-84 行）：

```javascript
const repoOwner = 'raytronichen'; // 替换为你的 GitHub 用户名
const repoName = 'raytronichen.github.io'; // 替换为你的仓库名
const workflowToken = ''; // 替换为你的 Workflow Trigger Token
```

修改为：

```javascript
const repoOwner = 'YOUR_GITHUB_USERNAME'; // 你的 GitHub 用户名
const repoName = 'YOUR_REPO_NAME'; // 你的仓库名（例如：username.github.io）
const workflowToken = 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // 步骤 2 中的第二个 token
```

### 步骤 5: 提交并推送

1. 保存所有修改
2. 提交到 GitHub：
   ```bash
   git add .
   git commit -m "使用 GitHub Actions + Secrets 实现邮箱订阅"
   git push origin main
   ```

### 步骤 6: 测试

1. 等待 GitHub Pages 构建完成（1-2 分钟）
2. 访问订阅页面：
   - 英文：`https://你的域名.com/subscribe/`
   - 中文：`https://你的域名.com/subscribe-zh/`
3. 输入测试邮箱并提交
4. 检查：
   - 查看 GitHub Actions 是否运行成功（仓库 → Actions 标签页）
   - 访问你的 Secret Gist，确认邮箱已保存

## 🔍 查看和导出邮箱

### 方法 1: 通过 GitHub 网站

1. 访问：https://gist.github.com
2. 找到你的 Secret Gist（`emails.txt`）
3. 查看内容

### 方法 2: 使用 API 导出

```bash
curl -H "Authorization: token YOUR_GIST_TOKEN" \
     https://api.github.com/gists/YOUR_GIST_ID
```

### 方法 3: 使用导出工具

访问：`https://你的域名.com/export-emails.html`
- 输入 Gist ID 和 Gist Token
- 点击"获取邮箱列表"
- 导出为 CSV

## 🔐 安全性说明

### 为什么这个方案更安全？

1. **Gist Token 完全隐藏**：
   - 存储在 GitHub Secrets 中
   - 永远不会出现在代码或浏览器中
   - GitHub Actions 在安全环境中使用

2. **Workflow Token 的风险可控**：
   - 只用于触发 workflow
   - 不直接访问数据
   - 只需要 `repo` 权限（用于 dispatch）
   - 即使泄露，也只能触发 workflow，无法读取 Gist

3. **分离关注点**：
   - 前端：只负责触发 workflow
   - 后端（Actions）：负责实际的数据写入

### Token 权限说明

| Token | 权限 | 用途 | 风险级别 |
|-------|------|------|---------|
| Gist Token | `gist` | 写入 Gist | 低（存储在 Secrets） |
| Workflow Token | `repo` | 触发 workflow | 中（在代码中，但功能受限） |

## 🐛 故障排除

### 问题 1: 提交后没有反应

**检查**：
- GitHub Actions 是否启用（Settings → Actions → General）
- Workflow 是否运行（Actions 标签页）
- 查看 workflow 日志中的错误

### 问题 2: Workflow 运行失败

**可能原因**：
- `GIST_ID` 或 `GIST_TOKEN` 未正确配置
- Gist Token 没有 `gist` 权限
- Gist ID 不正确

**解决方法**：
1. 检查 Settings → Secrets → GIST_ID 和 GIST_TOKEN
2. 确认 token 权限正确
3. 重新创建 token 并更新 Secret

### 问题 3: 前端显示认证失败

**可能原因**：
- Workflow Token 不正确
- Token 没有 `repo` 权限
- 仓库名或用户名配置错误

**解决方法**：
1. 检查代码中的 `repoOwner` 和 `repoName`
2. 确认 Workflow Token 有 `repo` 权限
3. 重新创建 token

### 问题 4: 如何查看详细错误

1. **前端错误**：
   - 打开浏览器开发者工具（F12）
   - 查看 Console 标签页
   - 查看 Network 标签页

2. **后端错误**：
   - 访问 GitHub 仓库
   - 点击 Actions 标签页
   - 点击失败的 workflow run
   - 查看日志

## 📊 工作流程图

```
用户提交邮箱
    ↓
前端调用 GitHub API
    ↓
触发 repository_dispatch 事件
（使用 Workflow Token）
    ↓
GitHub Actions Workflow 启动
    ↓
从 GitHub Secrets 读取
GIST_ID 和 GIST_TOKEN
    ↓
使用 Gist Token 更新 Gist
    ↓
邮箱保存成功 ✅
```

## 🔄 Token 轮换

建议每 3-6 个月轮换一次 token：

1. **轮换 Gist Token**：
   - 创建新的 Gist Token
   - 更新 GitHub Secret `GIST_TOKEN`
   - 撤销旧 token

2. **轮换 Workflow Token**：
   - 创建新的 Workflow Token
   - 更新代码中的 `workflowToken`
   - 提交并推送
   - 撤销旧 token

## ✅ 配置检查清单

- [ ] 创建了 Secret Gist
- [ ] 创建了 Gist Token（gist 权限）
- [ ] 创建了 Workflow Token（repo 权限）
- [ ] 在 GitHub Secrets 中添加了 GIST_ID
- [ ] 在 GitHub Secrets 中添加了 GIST_TOKEN
- [ ] 更新了代码中的 repoOwner 和 repoName
- [ ] 更新了代码中的 workflowToken
- [ ] 创建了 `.github/workflows/email-subscribe.yml` 文件
- [ ] 提交并推送到 GitHub
- [ ] 测试了订阅功能
- [ ] 验证了邮箱保存到 Gist
- [ ] 检查了 GitHub Actions 运行成功

---

**完成！** 现在你的邮箱订阅功能更安全了！🎉

