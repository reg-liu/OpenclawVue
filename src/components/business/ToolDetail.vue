<template>
  <div class="tool-detail" id="tool-details">
    <div v-if="tool.detailed_description" class="detail-section">
      <h2 class="section-title">工具详情</h2>
      <p class="detail-text">{{ tool.detailed_description }}</p>
    </div>
    <div v-if="tool.features" class="detail-section">
      <h2 class="section-title">主要特点</h2>
      <div class="features-text">
        <p v-for="(feature, index) in parseList(tool.features)" :key="index" class="feature-paragraph">
          {{ feature }}
        </p>
      </div>
    </div>
    <div v-if="tool.pros" class="detail-section">
      <h2 class="section-title">优点</h2>
      <div class="pros-list">
        <div v-for="(pro, index) in parseList(tool.pros)" :key="index" class="pros-item">
          <span class="pros-icon">✅</span>
          <span class="pros-text">{{ pro }}</span>
        </div>
      </div>
    </div>
    <div v-if="tool.cons" class="detail-section">
      <h2 class="section-title">缺点</h2>
      <div class="cons-list">
        <div v-for="(con, index) in parseList(tool.cons)" :key="index" class="cons-item">
          <span class="cons-icon">⚠️</span>
          <span class="cons-text">{{ con }}</span>
        </div>
      </div>
    </div>
    <div v-if="tool.target_users" class="detail-section">
      <h2 class="section-title">适合人群</h2>
      <div class="target-users-text">
        <p v-for="(user, index) in parseList(tool.target_users)" :key="index" class="user-paragraph">
          {{ user }}
        </p>
      </div>
    </div>
    <div v-if="tool.pricing_detail" class="detail-section">
      <h2 class="section-title">定价模式</h2>
      <p class="pricing-text">{{ tool.pricing_detail }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tool: { type: Object, required: true }
})
const parseList = (str) => { if (!str) return []; return str.split(',').map(s => s.trim()).filter(s => s) }
</script>

<style scoped>
.tool-detail { display: flex; flex-direction: column; gap: 20px; }
.detail-section { background: #1a1a2e; border-radius: 16px; padding: 24px; }
.section-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #2d2d4a; text-align: left; }
.detail-text { color: #94a3b8; font-size: 15px; line-height: 1.8; text-align: left; }
.features-text { text-align: left; }
.feature-paragraph { color: #e5e5e5; font-size: 15px; line-height: 1.8; margin-bottom: 8px; }
.feature-paragraph:last-child { margin-bottom: 0; }
.pros-list, .cons-list { display: flex; flex-direction: column; gap: 10px; text-align: left; }
.pros-item, .cons-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px; border-radius: 10px; }
.pros-item { background: rgba(16, 185, 129, 0.1); }
.pros-icon { font-size: 16px; flex-shrink: 0; }
.pros-text { color: #10b981; font-size: 14px; line-height: 1.6; }
.cons-item { background: rgba(245, 158, 11, 0.1); }
.cons-icon { font-size: 16px; flex-shrink: 0; }
.cons-text { color: #f59e0b; font-size: 14px; line-height: 1.6; }
.target-users-text { text-align: left; }
.user-paragraph { color: #60a5fa; font-size: 15px; line-height: 1.8; margin-bottom: 8px; }
.user-paragraph:last-child { margin-bottom: 0; }
.pricing-text { color: #94a3b8; font-size: 15px; line-height: 1.7; text-align: left; }
</style>
