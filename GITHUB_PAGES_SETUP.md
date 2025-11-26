# GitHub Pages 配置指南

## 第一个仓库：Tech 栏目 (www.einkframe.com)

### 当前状态
- 仓库：`raytronichen.github.io`
- 域名：`www.einkframe.com`
- CNAME 文件：已配置

### 配置步骤（如果还未配置）

1. **访问仓库设置**
   - 打开：https://github.com/raytronichen/raytronichen.github.io/settings/pages

2. **配置 Pages 源**
   - Source: 选择 `Deploy from a branch`
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
   - 点击 `Save`

3. **配置自定义域名**
   - 在 "Custom domain" 输入框中输入：`www.einkframe.com`
   - 勾选 "Enforce HTTPS"（如果可用）
   - 点击 `Save`

4. **验证**
   - 等待几分钟让 GitHub Pages 构建完成
   - 访问 `https://www.einkframe.com` 查看效果

---

## 第二个仓库：Product 栏目 (www.epapercanvas.com)

### 当前状态
- 仓库：`epapercanvas.github.io`
- 域名：`www.epapercanvas.com`
- CNAME 文件：已配置 ✅

### 配置步骤

#### 步骤 1：配置 GitHub Pages

1. **访问仓库设置**
   ```
   https://github.com/raytronichen/epapercanvas.github.io/settings/pages
   ```

2. **配置 Pages 源**
   - Source: 选择 `Deploy from a branch`
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
   - 点击 `Save`

3. **配置自定义域名**
   - 在 "Custom domain" 输入框中输入：`www.epapercanvas.com`
   - 勾选 "Enforce HTTPS"（如果可用）
   - 点击 `Save`

4. **等待构建**
   - GitHub Pages 会自动开始构建
   - 通常需要 1-5 分钟
   - 可以在 Actions 标签页查看构建进度

#### 步骤 2：验证 GitHub Pages 配置

1. **检查 CNAME 文件**
   - 在仓库中确认 `CNAME` 文件内容为：`www.epapercanvas.com`
   - ✅ 已完成

2. **检查构建状态**
   - 访问：https://github.com/raytronichen/epapercanvas.github.io/actions
   - 查看最新的构建是否成功

3. **测试 GitHub Pages URL**
   - 访问：`https://raytronichen.github.io`
   - 应该能看到 Product 栏目的内容

---

## DNS 配置指南

### 域名：www.epapercanvas.com

#### 方法 1：CNAME 记录（推荐）

1. **登录域名注册商**
   - 访问你的域名注册商网站（如 GoDaddy、Namecheap、Cloudflare 等）
   - 登录账户

2. **找到 DNS 管理**
   - 进入域名管理面板
   - 找到 "DNS 设置" 或 "DNS Management"

3. **添加 CNAME 记录**
   ```
   类型: CNAME
   名称: www
   值: raytronichen.github.io  ← 注意：这是仓库所有者的 GitHub Pages URL
   TTL: 3600 (或默认值)
   ```
   
   **重要说明**：
   - DNS 应该指向**仓库所有者的 GitHub Pages URL**（`raytronichen.github.io`）
   - 不是指向仓库名（`epapercanvas.github.io`）
   - GitHub 会根据 CNAME 文件中的域名自动路由到正确的仓库

4. **保存设置**
   - 点击 "保存" 或 "添加记录"
   - 等待 DNS 传播（通常 5 分钟到 24 小时）

#### 方法 2：A 记录（如果 CNAME 不支持）

如果域名注册商不支持 CNAME，可以使用 A 记录：

```
类型: A
名称: www
值: 185.199.108.153
TTL: 3600

类型: A
名称: www
值: 185.199.109.153
TTL: 3600

类型: A
名称: www
值: 185.199.110.153
TTL: 3600

类型: A
名称: www
值: 185.199.111.153
TTL: 3600
```

**注意**：GitHub Pages 的 IP 地址可能会变化，建议使用 CNAME 记录。

#### 验证 DNS 配置

1. **使用在线工具检查**
   - 访问：https://dnschecker.org/
   - 输入：`www.epapercanvas.com`
   - 选择记录类型：`CNAME`
   - 查看是否指向 `raytronichen.github.io`

2. **使用命令行检查**
   ```bash
   # Windows PowerShell
   nslookup www.epapercanvas.com
   
   # 或使用 dig（如果安装了）
   dig www.epapercanvas.com CNAME
   ```

3. **等待 DNS 传播**
   - DNS 更改通常需要 5 分钟到 48 小时
   - 全球 DNS 服务器同步需要时间

---

## 常见问题排查

### 问题 1：GitHub Pages 显示 404

**解决方案**：
1. 检查仓库是否为 Public
2. 检查 Pages 源是否正确设置为 `main` 分支
3. 等待几分钟让 GitHub 重新构建
4. 检查 `_config.yml` 中的 `baseurl` 是否正确

### 问题 2：自定义域名无法访问

**解决方案**：
1. 确认 DNS 记录已正确配置
2. 等待 DNS 传播完成（最多 48 小时）
3. 在 GitHub Pages 设置中重新保存自定义域名
4. 检查 CNAME 文件是否正确

### 问题 3：HTTPS 证书未生效

**解决方案**：
1. 在 GitHub Pages 设置中勾选 "Enforce HTTPS"
2. 等待证书自动生成（通常几分钟到几小时）
3. 如果 24 小时后仍未生效，联系 GitHub 支持

### 问题 4：网站显示旧内容

**解决方案**：
1. 清除浏览器缓存
2. 使用无痕模式访问
3. 检查 GitHub Actions 中的构建是否成功
4. 确认代码已推送到 `main` 分支

---

## 配置检查清单

### GitHub Pages 配置
- [ ] 仓库设置为 Public
- [ ] Pages 源设置为 `main` 分支
- [ ] 自定义域名已输入并保存
- [ ] CNAME 文件内容正确
- [ ] 构建成功（在 Actions 中查看）

### DNS 配置
- [ ] CNAME 记录已添加
- [ ] 记录值指向 `raytronichen.github.io`
- [ ] DNS 传播已完成（使用 dnschecker.org 验证）

### 网站访问
- [ ] `https://raytronichen.github.io` 可以访问
- [ ] `https://www.epapercanvas.com` 可以访问
- [ ] HTTPS 证书已生效
- [ ] 网站内容正确显示

---

## 完成后的验证

配置完成后，访问以下 URL 应该都能正常显示：

1. **GitHub Pages URL**
   - `https://raytronichen.github.io` ✅

2. **自定义域名**
   - `https://www.epapercanvas.com` ✅
   - `http://www.epapercanvas.com`（会自动重定向到 HTTPS）

3. **两个网站相互链接**
   - Product 网站导航栏中的 "Tech" 链接应指向 `https://www.einkframe.com`
   - Tech 网站导航栏中的 "Product" 链接应指向 `https://www.epapercanvas.com`

---

## 需要帮助？

如果遇到问题，可以：
1. 查看 GitHub Pages 文档：https://docs.github.com/en/pages
2. 查看 GitHub 社区论坛
3. 联系 GitHub 支持

