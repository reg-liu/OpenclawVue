<template>
  <!-- 右侧导航 -->
  <div class="toc-sidebar">
    <div class="toc-list">
      <a 
        v-for="item in sidebarItems" 
        :key="item.href" 
        :href="item.href" 
        class="toc-item"
      >
        {{ item.label }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  pageType: {
    type: String,
    default: 'product', // 'product' 或 'subproduct'
  }
})

const sidebarItems = computed(() => {
  if (props.pageType === 'product') {
    return [
      { href: '#section-overview', label: '概览' },
      { href: '#section-tools', label: '工具列表' }
    ]
  } else {
    // 副产品页（工具详情页）
    return [
      { href: '#tool-intro', label: '工具简介' },
      { href: '#tool-detail', label: '详细说明' },
      { href: '#alternative-tools', label: '替代工具' }
    ]
  }
})
</script>

<style scoped>
/* 右侧导航 */
.toc-sidebar { 
  position: fixed; 
  right: 40px; 
  top: 50%; 
  transform: translateY(-50%); 
  z-index: 100; 
}
.toc-list { 
  background: #1f1f3d; 
  border-radius: 12px; 
  padding: 16px; 
  border: 1px solid #2d2d4a; 
}
.toc-item { 
  display: block; 
  color: #94a3b8; 
  font-size: 13px; 
  padding: 8px 0; 
  border-bottom: 1px solid #2d2d4a; 
  cursor: pointer; 
  text-decoration: none;
}
.toc-item:last-child { border-bottom: none; }
.toc-item:hover { color: #10b981; }

@media (max-width: 1200px) {
  .toc-sidebar { display: none; }
}
</style>
