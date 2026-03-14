<template>
  <div class="alternative-tools" id="alternatives">
    <h2 class="section-title">{{ toolName }} 的替代方案</h2>
    <div class="alternatives-grid">
      <div v-for="tool in tools" :key="tool.id" class="alternative-card" @click="goToTool(tool.id)">
        <div class="alt-row1">
          <span class="alt-icon">{{ tool.icon || '🔧' }}</span>
          <div class="alt-title-rating">
            <h3 class="alt-name">{{ tool.name }}</h3>
            <div class="alt-rating">
              <span class="stars"><span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(tool.rating || 0) }">★</span></span>
              <span class="rating-value">{{ (tool.rating || 0).toFixed(1) }}</span>
            </div>
          </div>
        </div>
        <p class="alt-desc">{{ tool.description }}</p>
        <div class="alt-row3">
          <div class="alt-tags">
            <span v-if="tool.price" class="tag" :class="tool.price.includes('免费') ? 'tag-free' : 'tag-paid'">{{ tool.price === 'Free' ? '免费' : tool.price === 'Paid' ? '付费' : tool.price }}</span>
            <span v-if="tool.difficulty" class="tag">{{ tool.difficulty }}</span>
          </div>
        </div>
        <div class="alt-row4">
          <a v-if="tool.url" :href="tool.url" target="_blank" class="alt-link" @click.stop>访问工具</a>
        </div>
      </div>
      <div v-if="!tools || tools.length === 0" class="no-tools">暂无替代工具</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({ tools: { type: Array, default: () => [] }, currentToolId: { type: [Number, String], default: null } })
const router = useRouter()
const toolName = computed(() => props.tools && props.tools.length > 0 ? props.tools[0]?.name || '该工具' : '该工具')
const goToTool = (id) => { router.push(`/tool/${id}`) }
</script>

<style scoped>
.alternative-tools { margin-top: 32px; }
.section-title { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 24px; text-align: left; }
.alternatives-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.alternative-card { background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%); border: 1px solid #3d3d5c; border-radius: 14px; padding: 16px; cursor: pointer; transition: all 0.3s; display: flex; flex-direction: column; gap: 10px; }
.alternative-card:hover { border-color: #8b5cf6; transform: translateY(-2px); }
.alt-row1 { display: flex; align-items: flex-start; gap: 10px; }
.alt-icon { font-size: 32px; flex-shrink: 0; }
.alt-title-rating { flex: 1; text-align: left; }
.alt-name { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 4px; }
.alt-rating { display: flex; align-items: center; gap: 4px; }
.stars { display: flex; }
.star { color: #3f3f46; font-size: 12px; }
.star.filled { color: #f59e0b; }
.rating-value { color: #a1a1aa; font-size: 11px; }
.alt-desc { color: #94a3b8; font-size: 12px; line-height: 1.4; text-align: left; flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.alt-row3 { text-align: left; }
.alt-tags { display: flex; gap: 4px; flex-wrap: wrap; }
.tag { padding: 3px 6px; background: rgba(139, 92, 246, 0.15); color: #a78bfa; border-radius: 4px; font-size: 10px; }
.tag-free { background: rgba(16, 185, 129, 0.15); color: #10b981; }
.tag-paid { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
.alt-row4 { text-align: left; }
.alt-link { color: #22d3ee; font-size: 11px; text-decoration: none; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.alt-link:hover { text-decoration: underline; }
.no-tools { grid-column: 1 / -1; text-align: center; padding: 40px; color: #71717a; font-size: 14px; }
@media (max-width: 900px) { .alternatives-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .alternatives-grid { grid-template-columns: 1fr; } }
</style>
