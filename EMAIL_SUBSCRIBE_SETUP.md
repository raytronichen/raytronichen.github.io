# 邮箱订阅功能配置指南

## 概述

本功能使用 **GitHub Secret Gist** 存储用户提交的邮箱，**只有您可见**，可以通过 API 导出。

### 特点
- ✅ **私密性**：使用 Secret Gist，只有创建者（您）可见
- ✅ **可导出**：通过 GitHub API 轻松导出所有邮箱
- ✅ **无需服务器**：直接在 GitHub Pages 上运行
- ✅ **数据安全**：数据存储在 GitHub，不会丢失

## 配置步骤

### 1. 创建 Secret Gist

1. 访问：https://gist.github.com
2. 创建一个新的 Gist：
   - **Filename**: `emails.txt`
   - **Content**: 可以留空或添加说明文字（例如：`Email Subscriptions\n---\n`）
   - **重要**：选择 **"Create secret gist"**（不是公开的）
3. 点击 "Create secret gist"
4. **复制 Gist ID**：
   - 创建后，URL 会变成类似：`https://gist.github.com/YOUR_USERNAME/a1b2c3d4e5f6g7h8i9j0`
   - 复制 URL 中的长字符串（例如：`a1b2c3d4e5f6g7h8i9j0`）

### 2. 创建 GitHub Personal Access Token

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 设置：
   - **Note**: `Email Subscribe Gist API`
   - **Expiration**: 选择过期时间（建议选择较长时间，如 1 年）
   - **Scopes**: **只勾选 `gist`**（最小权限原则）
4. 点击 "Generate token"
5. **重要**：立即复制生成的 token（只显示一次！）

### 3. 更新代码配置

在 `subscribe.md` 和 `subscribe-zh.md` 文件中，找到以下代码并填入你的信息：

```javascript
const gistId = 'your_gist_id_here'; // 替换为步骤 1 中复制的 Gist ID
const githubToken = 'your_token_here'; // 替换为步骤 2 中创建的 token
```

例如：
```javascript
const gistId = 'a1b2c3d4e5f6g7h8i9j0';
const githubToken = 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
```

### 4. 测试

1. 提交代码到 GitHub
2. 等待 GitHub Pages 构建完成
3. 访问 `/subscribe/` 或 `/subscribe-zh/` 页面
4. 输入测试邮箱并提交
5. 检查是否成功（应该显示成功消息）

---

## 查看和导出邮箱

### 方法 1：通过 GitHub 网站查看

1. 访问：https://gist.github.com
2. 在左侧菜单中找到你的 Secret Gist（标题可能是 "emails.txt"）
3. 点击查看内容

### 方法 2：通过 API 导出（推荐）

使用以下 API 调用获取所有邮箱：

```bash
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/gists/YOUR_GIST_ID
```

或者使用 JavaScript：

```javascript
fetch('https://api.github.com/gists/YOUR_GIST_ID', {
  headers: {
    'Authorization': 'token YOUR_TOKEN',
    'Accept': 'application/vnd.github.v3+json'
  }
})
.then(response => response.json())
.then(data => {
  const emails = data.files['emails.txt'].content;
  console.log(emails);
  // 可以进一步处理，导出为 CSV 等格式
});
```

### 方法 3：导出为 CSV

你可以编写一个简单的脚本，将 Gist 内容解析为 CSV 格式：

```javascript
// 解析邮箱列表
const content = gistData.files['emails.txt'].content;
const lines = content.split('\n').filter(line => line.trim());
const csv = ['Email,Date,Language\n'];
lines.forEach(line => {
  const [email, date, lang] = line.split(' | ');
  csv.push(`${email},${date},${lang || 'en'}\n`);
});
// 下载 CSV
const blob = new Blob(csv, { type: 'text/csv' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'email-subscriptions.csv';
a.click();
```

## 安全建议

1. **Token 安全**：
   - ⚠️ **重要**：Token 会出现在客户端代码中，但这是必要的权衡
   - 使用最小权限：只授予 `gist` 权限
   - 定期轮换 token（建议每 3-6 个月）
   - 如果 token 泄露，立即撤销并创建新的

2. **Gist 安全**：
   - Secret Gist 只有您和知道 URL 的人可见
   - 不要将 Gist URL 分享给他人
   - 定期备份邮箱列表

3. **替代方案**（如果担心 token 暴露）：
   - 使用后端服务（如 Vercel、Netlify Functions）
   - 使用第三方服务（如 Formspree、EmailJS）

## 故障排除

### 问题：提交后显示错误

1. **检查配置**：
   - 确认 `gistId` 和 `githubToken` 都已正确填写
   - 确认 token 有 `gist` 权限
   - 确认 Gist 是 Secret 类型

2. **检查浏览器控制台**：
   - 打开浏览器开发者工具（F12）
   - 查看 Console 标签页的错误信息
   - 查看 Network 标签页的 API 请求状态

3. **常见错误**：
   - `401 Unauthorized`: Token 无效或已过期
   - `404 Not Found`: Gist ID 不正确
   - `403 Forbidden`: Token 没有 gist 权限

### 问题：无法更新 Gist

1. 确认 token 有 `gist` 权限
2. 确认 Gist ID 正确
3. 检查 Gist 是否被删除

### 问题：如何撤销 token

1. 访问：https://github.com/settings/tokens
2. 找到对应的 token
3. 点击 "Revoke"
4. 创建新 token 并更新代码
