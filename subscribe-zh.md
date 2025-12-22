---
layout: default
title: 订阅
lang: zh
permalink: /subscribe-zh/
---

<div class="subscribe-page">
  <div class="subscribe-container">
    <h1 class="subscribe-title">订阅更新</h1>
    <p class="subscribe-description">
      留下您的邮箱，获取最新产品动态和技术文章。
    </p>
    
    <form class="subscribe-form" id="subscribeForm">
      <div class="form-group">
        <input 
          type="email" 
          class="subscribe-input" 
          id="emailInput" 
          placeholder="请输入您的邮箱地址"
          required
          autocomplete="email"
        >
      </div>
      <button type="submit" class="subscribe-submit" id="submitBtn">
        订阅
      </button>
      <div class="subscribe-message" id="subscribeMessage"></div>
    </form>
  </div>
</div>

<script>
  (function() {
    const form = document.getElementById('subscribeForm');
    const emailInput = document.getElementById('emailInput');
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('subscribeMessage');
    const currentLang = 'zh';

    // 验证邮箱格式
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    // 显示消息
    function showMessage(text, isError) {
      messageDiv.textContent = text;
      messageDiv.className = 'subscribe-message ' + (isError ? 'error' : 'success');
      messageDiv.style.display = 'block';
    }

    // 隐藏消息
    function hideMessage() {
      messageDiv.style.display = 'none';
    }

    // 提交表单
    function handleSubmit(e) {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      
      if (!email) {
        showMessage('请输入邮箱地址', true);
        emailInput.classList.add('error');
        return;
      }

      if (!validateEmail(email)) {
        showMessage('请输入有效的邮箱地址', true);
        emailInput.classList.add('error');
        return;
      }

      emailInput.classList.remove('error');
      submitBtn.disabled = true;
      submitBtn.textContent = '提交中...';

      // 使用 GitHub Gists API 存储邮箱到 Secret Gist（只有您可见）
      // 需要先创建 Secret Gist 和 GitHub Personal Access Token
      
      const gistId = ''; // 替换为你的 Secret Gist ID（见配置说明）
      const githubToken = ''; // 替换为你的 GitHub Personal Access Token（需要 gist 权限）
      
      if (gistId && githubToken) {
        // 获取现有 Gist 内容
        fetch(`https://api.github.com/gists/${gistId}`, {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch Gist');
            }
            return response.json();
          })
          .then(gistData => {
            const existingContent = gistData.files['emails.txt']?.content || '';
            const newEntry = `${email} | ${new Date().toISOString()} | ${currentLang}\n`;
            const newContent = existingContent + newEntry;
            
            // 更新 Gist
            return fetch(`https://api.github.com/gists/${gistId}`, {
              method: 'PATCH',
              headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                files: {
                  'emails.txt': {
                    content: newContent
                  }
                }
              })
            });
          })
          .then(response => {
            if (response.ok) {
              showMessage('感谢您的订阅！我们会尽快与您联系。', false);
              form.reset();
            } else {
              return response.json().then(data => {
                console.error('API 错误:', data);
                let errorMsg = '保存邮箱失败';
                if (data.message) {
                  errorMsg += ': ' + data.message;
                }
                if (response.status === 401) {
                  errorMsg = '认证失败，请检查您的 Token。';
                } else if (response.status === 404) {
                  errorMsg = 'Gist 未找到，请检查您的 Gist ID。';
                } else if (response.status === 403) {
                  errorMsg = '权限不足，请检查您的 Token 是否有 gist 权限。';
                }
                throw new Error(errorMsg);
              });
            }
          })
          .catch(error => {
            console.error('错误详情:', error);
            showMessage(error.message || '提交失败，请稍后重试。', true);
          })
          .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = '订阅';
          });
      } else {
        // 如果未配置，显示提示信息
        console.warn('Gist ID 或 Token 未配置');
        showMessage('订阅服务未配置，请直接联系我们。', true);
        submitBtn.disabled = false;
        submitBtn.textContent = '订阅';
      }
    }

    // 事件监听
    form.addEventListener('submit', handleSubmit);

    emailInput.addEventListener('input', function() {
      this.classList.remove('error');
      hideMessage();
    });
  })();
</script>
