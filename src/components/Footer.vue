<template>
  <!-- Footer -->
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <router-link to="/design" style="color: #06b6d4;">设计规范</router-link>
        <router-link to="/components" style="color: #8b5cf6;">业务组件</router-link>
        <a href="https://github.com/reg-liu/OpenclawVue" target="_blank">GitHub</a>
        <a href="https://openclaw.ai" target="_blank">OpenClaw</a>
      </div>
      <p class="footer-copy">© 2026 AI工具导航. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
/* Footer */
.footer { 
  background: #0a0a0a; 
  border-top: 1px solid #262626; 
  padding: 40px 24px; 
  margin-top: 60px; 
}
.footer-content { 
  max-width: 1100px; 
  margin: 0 auto; 
  text-align: center; 
}
.footer-links { 
  display: flex; 
  justify-content: center; 
  gap: 24px; 
  margin-bottom: 16px; 
  flex-wrap: wrap; 
}
.footer-links a, .footer-links router-link { 
  color: #71717a; 
  text-decoration: none; 
  font-size: 14px; 
  cursor: pointer; 
  transition: color 0.2s; 
}
.footer-links a:hover, .footer-links router-link:hover { color: #fff; }
.footer-copy { 
  color: #52525b; 
  font-size: 13px; 
}
</style>
