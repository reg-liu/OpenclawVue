<template>
  <div class="detail-card" id="tool-intro">
    <div class="detail-left">
      <div class="detail-icon">{{ tool.icon || '🔧' }}</div>
      <div class="detail-info">
        <h1 class="detail-title">{{ tool.name || '-' }}</h1>
        <div class="detail-rating">
          <span class="stars">
            <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(tool.rating || 0) }">★</span>
          </span>
          <span class="rating-value">{{ tool.rating || '0.0' }}</span>
        </div>
        <p class="detail-desc">{{ tool.description || '-' }}</p>
        <div class="detail-tags">
          <span v-if="tool.price" class="tag" :class="tool.price.includes('免费') ? 'tag-free' : 'tag-paid'">
            {{ tool.price === 'Free' ? '免费' : tool.price === 'Paid' ? '付费' : tool.price }}
          </span>
          <span v-if="tool.difficulty" class="tag">{{ tool.difficulty }}</span>
        </div>
        <div v-if="tool.pricing_amount" class="detail-pricing">
          <span class="pricing-label">定价：</span>
          <span class="pricing-value">{{ tool.pricing_amount }}</span>
        </div>
      </div>
    </div>
    <div class="detail-right">
      <div class="detail-image">
        <img v-if="tool.image" :src="tool.image" :alt="tool.name" />
        <div v-else class="image-placeholder">
          <span class="placeholder-icon">🎯</span>
        </div>
      </div>
      <a v-if="tool.url" :href="tool.url" target="_blank" class="visit-btn">访问工具</a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tool: { type: Object, required: true }
})
</script>

<style scoped>
.detail-card { 
  background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%); 
  border: 1px solid #3d3d5c; 
  border-radius: 20px; 
  padding: 32px; 
  display: flex; 
  gap: 32px; 
  width: 100%;
  width: 1152px;
  box-sizing: border-box;
}
.detail-left { flex: 1; display: flex; gap: 24px; }
.detail-icon { width: 100px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 48px; flex-shrink: 0; }
.detail-info { flex: 1; min-width: 0; text-align: left; }
.detail-title { font-size: 32px; font-weight: 700; color: #fff; margin-bottom: 8px; text-align: left; }
.detail-rating { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; text-align: left; }
.stars { display: flex; }
.star { color: #3f3f46; font-size: 16px; }
.star.filled { color: #f59e0b; }
.rating-value { color: #a1a1aa; font-size: 14px; }
.detail-desc { color: #94a3b8; font-size: 15px; line-height: 1.6; margin-bottom: 16px; text-align: left; }
.detail-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; text-align: left; }
.tag { padding: 6px 12px; background: rgba(139, 92, 246, 0.15); color: #a78bfa; border-radius: 6px; font-size: 13px; }
.tag-free { background: rgba(16, 185, 129, 0.15); color: #10b981; }
.tag-paid { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
.detail-pricing { display: flex; align-items: center; gap: 8px; text-align: left; }
.pricing-label { color: #94a3b8; font-size: 14px; }
.pricing-value { color: #10b981; font-size: 16px; font-weight: 600; }
.detail-right { width: 280px; flex-shrink: 0; display: flex; flex-direction: column; gap: 16px; }
.detail-image { width: 100%; height: 180px; border-radius: 12px; overflow: hidden; background: #0f0f1a; }
.detail-image img { width: 100%; height: 100%; object-fit: cover; }
.image-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; }
.placeholder-icon { font-size: 48px; }
.visit-btn { padding: 14px 24px; background: linear-gradient(135deg, #8b5cf6, #a855f7); color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; text-align: center; transition: all 0.3s; }
.visit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4); }
@media (max-width: 900px) { 
  .detail-card { 
    flex-direction: column; 
    max-width: calc(100% - 48px);
  } 
  .detail-left { flex-direction: column; } 
  .detail-right { width: 100%; } 
}
</style>
