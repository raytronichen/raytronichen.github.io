---
layout: default
title: Subscribe
lang: en
permalink: /subscribe/
---

<div class="subscribe-page">
  <div class="subscribe-container">
    <h1 class="subscribe-title">Stay Updated</h1>
    <p class="subscribe-description">
      Leave your email to receive the latest product updates and technical articles about ePaper displays.
    </p>
    
    <form class="subscribe-form" id="subscribeForm">
      <div class="form-group">
        <input 
          type="email" 
          class="subscribe-input" 
          id="emailInput" 
          placeholder="Enter your email address"
          required
          autocomplete="email"
        >
      </div>
      <button type="submit" class="subscribe-submit" id="submitBtn">
        Subscribe
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
    const currentLang = 'en';

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
        showMessage('Please enter your email address', true);
        emailInput.classList.add('error');
        return;
      }

      if (!validateEmail(email)) {
        showMessage('Please enter a valid email address', true);
        emailInput.classList.add('error');
        return;
      }

      emailInput.classList.remove('error');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      // 使用 GitHub Actions Workflow 处理订阅（更安全，token 存储在 GitHub Secrets 中）
      const repoOwner = 'raytronichen'; // 替换为你的 GitHub 用户名
      const repoName = 'raytronichen.github.io'; // 替换为你的仓库名
      const workflowToken = ''; // 替换为你的 GitHub Personal Access Token（需要 repo 权限用于触发 workflow）
      
      if (workflowToken) {
        // 通过 repository_dispatch 触发 GitHub Actions workflow
        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`, {
          method: 'POST',
          headers: {
            'Authorization': `token ${workflowToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_type: 'email-subscribe',
            client_payload: {
              email: email,
              lang: currentLang,
              timestamp: new Date().toISOString()
            }
          })
        })
          .then(response => {
            if (response.status === 204) {
              showMessage('Thank you for subscribing! We\'ll be in touch soon.', false);
              form.reset();
            } else {
              return response.json().then(data => {
                console.error('API Error:', data);
                let errorMsg = 'Failed to save email';
                if (data.message) {
                  errorMsg += ': ' + data.message;
                }
                if (response.status === 401) {
                  errorMsg = 'Authentication failed. Please check your token.';
                } else if (response.status === 404) {
                  errorMsg = 'Repository not found. Please check your configuration.';
                } else if (response.status === 403) {
                  errorMsg = 'Permission denied. Please check your token has repo permission.';
                }
                throw new Error(errorMsg);
              });
            }
          })
          .catch(error => {
            console.error('Error details:', error);
            showMessage(error.message || 'Something went wrong. Please try again later.', true);
          })
          .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Subscribe';
          });
      } else {
        // 如果未配置，显示提示信息
        console.warn('Workflow token not configured');
        showMessage('Subscription service is not configured. Please contact us directly.', true);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Subscribe';
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
