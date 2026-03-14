<template>
  <div class="home-page">
    <!-- Hero 区域 -->
    <section class="hero">
      <div class="hero-bg" :style="{ '--x': mousePos.x + '%', '--y': mousePos.y + '%' }"></div>
      <div class="hero-content">
        <p class="hero-label">{{ content.hero.label }}</p>
        <h1 class="hero-title">
          {{ content.hero.title }}<br/>
          <span class="gradient">{{ content.hero.subtitle }}</span>
        </h1>
        
        <!-- 入口区域：用户输入框 + 随便逛逛 -->
        <div class="entry-area">
          <div class="search-box">
            <input 
              type="text" 
              placeholder="你想用AI做什么？例如：写文案、生成图片、数据分析" 
              class="search-input"
            />
            <button class="search-btn">→</button>
          </div>
          <a class="browse-link" @click="scrollToElement('section-explore')">随便逛逛 →</a>
        </div>
      </div>
    </section>

    <!-- 场景导航 -->
    <div id="section-explore" class="section-container">
      <h2 class="section-title">场景导航</h2>
      
      <!-- 产品卡片 - 交替布局 -->
      <div class="product-cards-alternate">
        <div 
          v-for="(cat, index) in categoriesData" 
          :key="cat.id" 
          class="product-card-row"
          :class="{ reverse: index % 2 === 1 }"
          @click="navigate('product', cat.id)"
        >
          <div class="card-image">{{ cat.icon }}</div>
          <div class="card-content">
            <h3>{{ cat.name }}</h3>
            <p>{{ cat.description }}</p>
            <div class="card-tags">
              <span v-for="sub in (cat.children || []).slice(0, 3)" :key="sub.id" @click.stop="navigate('subproduct', sub.id)">{{ sub.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import data from '../data.json'
import { fetchTools, fetchCategories } from '../services/api.js'

const router = useRouter()
const content = ref(data)
const mousePos = ref({ x: 50, y: 50 })
const toolsData = ref([])
const categoriesData = ref([])
const isScrolled = ref(false)

onMounted(async () => {
  const result = await fetchTools()
  toolsData.value = result.tools
  
  const cats = await fetchCategories()
  categoriesData.value = cats
  
  window.addEventListener('mousemove', (e) => {
    mousePos.value = {
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100
    }
  })
  
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})

// 导航函数
const navigate = (page, category = '') => {
  if (page === 'home') {
    router.push('/')
  } else if (page === 'product') {
    router.push(`/ai-tools/${category}`)
  } else if (page === 'subproduct') {
    router.push(`/tool/${category}`)
  }
}

// 平滑滚动到元素
const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
/* Hero */
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  padding-top: 80px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, #1a1a2e 0%, #0d0d0d 70%);
}

.hero-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(34,211,238,0.2) 0%, transparent 40%), radial-gradient(circle at calc(100% - var(--x, 50%)) calc(100% - var(--y, 50%)), rgba(168,85,247,0.2) 0%, transparent 40%);
  transition: background 0.1s ease;
}

.hero-content {
  position: relative;
  width: 1200px;
  padding: 40px 24px;
}

.hero-label {
  color: #22d3ee;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.hero-title {
  font-size: 64px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
}

.gradient {
  background: linear-gradient(135deg, #22d3ee, #a855f7, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 入口区域 */
.entry-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
}

.search-box {
  display: flex;
  width: 100%;
  background: #1f1f3d;
  border: 1px solid #333;
  border-radius: 12px;
  overflow: hidden;
}

.search-input {
  flex: 1;
  padding: 16px 20px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  outline: none;
}

.search-input::placeholder {
  color: #666;
}

.search-btn {
  padding: 16px 24px;
  background: linear-gradient(135deg, #22d3ee, #06b6d4);
  border: none;
  color: #000;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
}

.search-btn:hover {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
}

.browse-link {
  color: #94a3b8;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.browse-link:hover {
  color: #22d3ee;
}

/* Sections */
.section-container {
  width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
}

/* 产品卡片 - 交替布局 */
.product-cards-alternate {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 800px;
  margin: 0 auto;
}

.product-card-row {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 32px;
  background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%);
  border: 1px solid #2d2d4a;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.product-card-row:hover {
  transform: translateY(-4px);
  border-color: #8b5cf6;
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.15);
}

.product-card-row.reverse {
  flex-direction: row-reverse;
}

.card-image {
  font-size: 64px;
  flex-shrink: 0;
  width: 120px;
  text-align: center;
  padding: 20px 0;
}

.card-content {
  flex: 1;
  min-width: 0;
  text-align: center;
}

.card-content h3 {
  font-size: 28px;
  margin-bottom: 12px;
  color: #fff;
}

.card-content p {
  color: #94a3b8;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.card-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.card-tags span {
  padding: 6px 14px;
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
  border-radius: 20px;
  font-size: 13px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 40px;
  }
  
  .product-cards-alternate .product-card-row {
    flex-direction: column !important;
    gap: 20px;
    padding: 24px;
  }
  
  .product-cards-alternate .card-image {
    width: auto;
    font-size: 48px;
  }
}
</style>
