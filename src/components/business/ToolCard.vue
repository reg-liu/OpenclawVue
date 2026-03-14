<template>
  <div class="tool-card" @click="navigateToTool">
    <div class="tool-row1">
      <span class="tool-icon">{{ tool.icon || '🔧' }}</span>
      <div class="tool-title-rating">
        <h3 class="tool-title">{{ tool.name }}</h3>
        <div class="tool-rating">
          <span class="stars"><span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(tool.rating || 0) }">★</span></span>
          <span class="rating-value">{{ tool.rating || '0.0' }}</span>
        </div>
      </div>
    </div>
    <p class="tool-desc">{{ tool.description }}</p>
    <div class="tool-row3">
      <div class="tool-tags">
        <span v-if="tool.price" class="tag" :class="tool.price.includes('免费') ? 'tag-free' : 'tag-paid'">{{ tool.price === 'Free' ? '免费' : tool.price === 'Paid' ? '付费' : tool.price }}</span>
        <span v-if="tool.difficulty" class="tag" :class="'tag-' + tool.difficulty">{{ tool.difficulty }}</span>
        <span v-if="tool.network" class="tag" :class="tool.network.includes('全球') ? 'tag-global' : 'tag-cn'">{{ tool.network }}</span>
      </div>
    </div>
    <div class="tool-row4">
      <a v-if="tool.url" :href="tool.url" target="_blank" class="tool-link" @click.stop>访问工具</a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ tool: { type: Object, required: true } })
const emit = defineEmits(['navigate'])
const navigateToTool = () => { emit('navigate', { page: 'subproduct', category: props.tool.id }) }
</script>

<style scoped>
.tool-card { background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%); border: 1px solid #2d2d4a; border-radius: 16px; padding: 20px; cursor: pointer; transition: all 0.3s; display: flex; flex-direction: column; gap: 12px; }
.tool-card:hover { transform: translateY(-4px); border-color: #8b5cf6; box-shadow: 0 12px 32px rgba(139, 92, 246, 0.2); }
.tool-row1 { display: flex; align-items: flex-start; gap: 12px; }
.tool-icon { font-size: 36px; flex-shrink: 0; }
.tool-title-rating { flex: 1; text-align: left; }
.tool-title { font-size: 17px; font-weight: 600; color: #fff; margin-bottom: 4px; }
.tool-rating { display: flex; align-items: center; gap: 6px; }
.stars { display: flex; }
.star { color: #3f3f46; font-size: 13px; }
.star.filled { color: #f59e0b; }
.rating-value { color: #a1a1aa; font-size: 12px; }
.tool-desc { color: #94a3b8; font-size: 13px; line-height: 1.5; text-align: left; }
.tool-row3 { text-align: left; }
.tool-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.tag { padding: 4px 8px; border-radius: 4px; font-size: 11px; background: rgba(139, 92, 246, 0.15); color: #a78bfa; }
.tag-free { background: rgba(16, 185, 129, 0.15); color: #10b981; }
.tag-paid { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
.tag-入门 { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
.tag-进阶 { background: rgba(168, 85, 247, 0.15); color: #a855f7; }
.tag-高级 { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
.tag-global { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
.tag-cn { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
.tool-row4 { text-align: left; }
.tool-link { color: #22d3ee; font-size: 12px; text-decoration: none; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tool-link:hover { color: #06b6d4; text-decoration: underline; }
</style>
