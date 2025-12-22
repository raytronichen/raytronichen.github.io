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

      // 使用 GitHub Issues API（无需 token，完全公开接口）
      // GitHub Actions 会自动监听 issue 创建，并将邮箱保存到 Gist
      const repoOwner = 'raytronichen'; // 替换为你的 GitHub 用户名
      const repoName = 'raytronichen.github.io'; // 替换为你的仓库名
      
      // 创建一个带有特殊标签的 issue（无需认证）
      const issueTitle = `Email Subscription: ${email}`;
      const issueBody = `**New Email Subscription**\n\n- Email: ${email}\n- Language: ${currentLang}\n- Timestamp: ${new Date().toISOString()}\n- Source: Subscribe Page\n\n---\n*This issue will be automatically processed and closed by GitHub Actions.*`;
      
      fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: issueTitle,
          body: issueBody,
          labels: ['email-subscription']
        })
      })
        .then(response => {
          if (response.status === 201) {
            showMessage('Thank you for subscribing! We\'ll be in touch soon.', false);
            form.reset();
          } else {
            return response.json().then(data => {
              console.error('API Error:', data);
              let errorMsg = 'Failed to save email';
              if (data.message) {
                errorMsg += ': ' + data.message;
              }
              if (response.status === 403) {
                errorMsg = 'Unable to submit. The repository may have restricted issue creation.';
              } else if (response.status === 404) {
                errorMsg = 'Repository not found. Please check configuration.';
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
    }

    // 事件监听
    form.addEventListener('submit', handleSubmit);

    emailInput.addEventListener('input', function() {
      this.classList.remove('error');
      hideMessage();
    });
  })();
</script>
