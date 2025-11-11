# DNS 配置指南 | DNS Setup Guide

## 配置自定义域名 einkframe.com

### 步骤 1: 在 GitHub Pages 设置中添加自定义域名

1. 访问仓库设置页面：
   - https://github.com/raytronichen/raytronichen.github.io/settings/pages
   - 或：仓库 → Settings → Pages

2. 在 "Custom domain" 部分：
   - 输入域名：`www.einkframe.com`
   - 勾选 "Enforce HTTPS"（推荐）
   - 点击 "Save"

3. 等待验证（可能需要几分钟）

### 步骤 2: 在域名 DNS 中添加记录

在你的域名注册商（如阿里云、腾讯云、GoDaddy、Namecheap 等）的 DNS 管理中添加以下记录：

#### 对于 www.einkframe.com（带 www）

**CNAME 记录：**
```
类型: CNAME
主机记录/名称: www
记录值/指向: raytronichen.github.io
TTL: 3600 (或默认值)
```

#### 对于 einkframe.com（不带 www，可选）

如果你想同时支持 `einkframe.com`（不带 www），需要添加 **A 记录**：

**A 记录（需要添加 4 条）：**
```
类型: A
主机记录/名称: @ (或留空，表示根域名)
记录值: 185.199.108.153
TTL: 3600

类型: A
主机记录/名称: @
记录值: 185.199.109.153
TTL: 3600

类型: A
主机记录/名称: @
记录值: 185.199.110.153
TTL: 3600

类型: A
主机记录/名称: @
记录值: 185.199.111.153
TTL: 3600
```

**注意：** GitHub Pages 的 IP 地址可能会变化，建议定期检查。

### 步骤 3: 在 GitHub Pages 中添加两个域名（如果支持不带 www）

如果添加了 A 记录支持 `einkframe.com`，需要在 GitHub Pages 设置中添加两个自定义域名：
1. `www.einkframe.com`
2. `einkframe.com`

### 步骤 4: 等待 DNS 生效

- DNS 传播通常需要几分钟到 48 小时
- 可以使用工具检查：https://www.whatsmydns.net
- 输入 `www.einkframe.com` 检查 CNAME 记录是否生效

### 步骤 5: 验证 HTTPS

- 在 GitHub Pages 设置中启用 "Enforce HTTPS"
- GitHub 会自动为自定义域名配置 SSL 证书
- 可能需要几小时到一天时间

### 常见域名注册商的 DNS 设置位置

- **阿里云**: 控制台 → 域名 → 解析设置
- **腾讯云**: 控制台 → 域名注册 → 我的域名 → 解析
- **GoDaddy**: My Products → Domains → DNS
- **Namecheap**: Domain List → Manage → Advanced DNS
- **Cloudflare**: DNS → Records

### 验证 DNS 配置

使用以下命令检查 DNS 记录：

```bash
# 检查 CNAME 记录
nslookup www.einkframe.com

# 检查 A 记录
nslookup einkframe.com
```

### 完成后的访问方式

配置完成后，网站可以通过以下地址访问：
- **https://www.einkframe.com**（主要地址）
- **https://einkframe.com**（如果配置了 A 记录）
- **https://raytronichen.github.io**（GitHub 默认地址，仍可用，但会重定向到自定义域名）

### 注意事项

1. **只配置 www 版本**：如果只配置 `www.einkframe.com`，访问 `einkframe.com` 可能无法正常工作
2. **同时支持两个版本**：需要同时配置 CNAME（www）和 A 记录（根域名）
3. **DNS 传播时间**：更改后可能需要等待一段时间才能生效
4. **HTTPS 证书**：GitHub 会自动配置，但需要等待验证完成

### 故障排除

如果域名无法访问：
1. 检查 DNS 记录是否正确
2. 等待 DNS 传播（最多 48 小时）
3. 检查 GitHub Pages 设置中的自定义域名是否正确
4. 清除浏览器缓存
5. 使用 https://www.whatsmydns.net 检查全球 DNS 传播情况

