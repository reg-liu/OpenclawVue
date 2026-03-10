<script setup>
import { ref, onMounted } from 'vue'
import data from './data.json'
import { scenes, getCategories, filterToolsByCategory, fetchTools } from './services/api.js'

const currentPage = ref('home')
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const content = ref(data)
const mousePos = ref({ x: 50, y: 50 })
const toolsData = ref([])
const isLoading = ref(true)

onMounted(async () => {
  // 从URL读取page参数
  const urlParams = new URLSearchParams(window.location.search)
  const page = urlParams.get('page')
  if (page && ['home', 'ai_entry', 'ai_office', 'ai_create', 'ai_code', 'ai_study', 'design'].includes(page)) {
    currentPage.value = page
  }
  
  // 从API获取工具数据
  const result = await fetchTools()
  toolsData.value = result.tools
  
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
  window.addEventListener('mousemove', (e) => {
    mousePos.value = {
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100
    }
  })
})

const navigate = (page) => {
  currentPage.value = page
  mobileMenuOpen.value = false
  // 更新URL参数
  const url = new URL(window.location.href)
  url.searchParams.set('page', page)
  window.history.pushState({}, '', url)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const selectedCategory = ref(content.value?.questions?.categories?.[0]?.id || 'frontend')
const selectedScene = ref(null)

const selectScene = (sceneId) => {
  selectedScene.value = sceneId
}

const getSceneName = (sceneId) => {
  const scene = scenes.find(s => s.id === sceneId)
  return scene ? scene.name : ''
}

const getSceneIcon = (sceneId) => {
  const scene = scenes.find(s => s.id === sceneId)
  return scene ? scene.icon : ''
}

const getSceneTools = (sceneId) => {
  if (!sceneId || !toolsData.value) return []
  return toolsData.value.filter(t => t.scenes.includes(sceneId))
}

const getSceneCategories = (sceneId) => {
  if (!sceneId || !toolsData.value) return []
  const sceneTools = toolsData.value.filter(t => t.scenes.includes(sceneId))
  return [...new Set(sceneTools.map(t => t.category))]
}

const getToolsByCategoryScene = (sceneId, category) => {
  if (!sceneId || !category || !toolsData.value) return []
  return toolsData.value.filter(t => t.scenes.includes(sceneId) && t.category === category)
}
</script>

<template>
  <div class="app">
    <!-- Nav -->
    <nav class="nav" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <a class="logo" @click="navigate('home')">
          <span class="logo-icon">&#9670;</span>
          <span>OpenClaw</span>
        </a>
        <div class="nav-links">
          <a :class="{ active: currentPage === 'home' }" @click="navigate('home')">{{ content.nav.home }}</a>
          <a :class="{ active: currentPage === 'ai_entry' }" @click="navigate('ai_entry')">{{ content.nav.ai_entry }}</a>
          <a :class="{ active: currentPage === 'ai_office' }" @click="navigate('ai_office')">{{ content.nav.ai_office }}</a>
          <a :class="{ active: currentPage === 'ai_create' }" @click="navigate('ai_create')">{{ content.nav.ai_create }}</a>
          <a :class="{ active: currentPage === 'ai_code' }" @click="navigate('ai_code')">{{ content.nav.ai_code }}</a>
          <a :class="{ active: currentPage === 'ai_study' }" @click="navigate('ai_study')">{{ content.nav.ai_study }}</a>
        </div>
        <div class="nav-right">
          <span class="badge">{{ content.badge }}</span>
          <button class="menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">&#9776;</button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="mobile-menu">
      <a @click="navigate('home')">{{ content.nav.home }}</a>
      <a @click="navigate('ai_entry')">{{ content.nav.ai_entry }}</a>
      <a @click="navigate('ai_office')">{{ content.nav.ai_office }}</a>
      <a @click="navigate('ai_create')">{{ content.nav.ai_create }}</a>
      <a @click="navigate('ai_code')">{{ content.nav.ai_code }}</a>
      <a @click="navigate('ai_study')">{{ content.nav.ai_study }}</a>
    </div>

    <!-- Home -->
    <section v-if="currentPage === 'home'" class="home">
      <div class="hero">
        <div class="hero-bg" :style="{ '--x': mousePos.x + '%', '--y': mousePos.y + '%' }"></div>
        <div class="hero-content">
          <p class="hero-label">{{ content.hero.label }}</p>
          <h1 class="hero-title">
            {{ content.hero.title }}<br/>
            <span class="gradient">{{ content.hero.subtitle }}</span>
          </h1>
          <p class="hero-desc">{{ content.hero.desc }}</p>
          <div class="hero-btns">
            <button class="btn-primary" @click="navigate('ai_entry')">{{ content.home.cta }}</button>
          </div>
        </div>
      </div>

      <!-- About Section -->
        <div class="section-container">
          <h2 class="section-title">{{ content.home.about.title }}</h2>
          <div class="features">
            <div v-for="feature in content.home.about.features" :key="feature.title" class="feature-card">
              <div class="feature-icon">{{ feature.icon || '✦' }}</div>
              <div class="feature-content">
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech section removed -->
    </section>

    <!-- Practice -->
    <section v-if="currentPage === 'practice'" class="practice">
      <div class="page-header">
        <h1>{{ content.practice.title }}</h1>
        <p>{{ content.practice.subtitle }}</p>
      </div>
      <div class="projects-grid">
        <div v-for="project in content.practice.list" :key="project.title" class="project-card" :class="{ highlight: project.highlight }">
          <div class="project-header">
            <span class="project-date">{{ project.date }}</span>
            <span v-if="project.highlight" class="project-badge">Featured</span>
          </div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.desc }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
          <ul class="project-details">
            <li v-for="detail in project.details" :key="detail">{{ detail }}</li>
          </ul>
          <div v-if="project.prompt" class="project-prompt">
            <span class="prompt-label">AI Prompt:</span>
            <span class="prompt-text">"{{ project.prompt }}"</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section v-if="currentPage === 'skills'" class="skills-page">
      <div class="page-header">
        <h1>{{ content.skills.title }}</h1>
        <p>{{ content.skills.subtitle }}</p>
      </div>
      <div class="skills-intro">
        <p>{{ content.skills.intro }}</p>
      </div>
      <div class="skills-categories">
        <div v-for="cat in content.skills.categories" :key="cat.id" class="skill-category">
          <div class="category-header">
            <span class="category-icon">{{ cat.icon }}</span>
            <div class="category-info">
              <h2>{{ cat.name }}</h2>
              <p>{{ cat.desc }}</p>
            </div>
          </div>
          <div class="skill-items">
            <div v-for="skill in cat.skills" :key="skill.name" class="skill-card">
              <div class="skill-header">
                <h3>{{ skill.name }}</h3>
                <span class="skill-level">{{ skill.level }}</span>
              </div>
              <p class="skill-desc">{{ skill.desc }}</p>
              <div class="skill-features">
                <span v-for="f in skill.features" :key="f" class="feature-tag">{{ f }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="develop-section" v-if="content.skills.develop">
        <h2 class="develop-title">{{ content.skills.develop.title }}</h2>
        <div class="develop-steps">
          <div v-for="(step, index) in content.skills.develop.steps" :key="step.title" class="develop-step">
            <div class="develop-num">{{ index + 1 }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
        <a :href="content.skills.develop.link" target="_blank" class="docs-link">查看完整文档 →</a>
      </div>
    </section>

    <!-- Models -->
    <section v-if="currentPage === 'models'" class="models-page">
      <div class="page-header">
        <h1>{{ content.models.title }}</h1>
        <p>{{ content.models.subtitle }}</p>
      </div>
      <div class="models-intro">
        <p>{{ content.models.intro }}</p>
      </div>
      <div class="models-categories">
        <div v-for="cat in content.models.categories" :key="cat.id" class="model-category">
          <div class="category-header">
            <span class="category-icon">{{ cat.icon }}</span>
            <div class="category-info">
              <h2>{{ cat.name }}</h2>
              <p>{{ cat.models.length }} 款模型</p>
            </div>
          </div>
          <div class="model-items">
            <div v-for="model in cat.models" :key="model.name" class="model-card">
              <div class="model-header">
                <h3>{{ model.name }}</h3>
                <span class="model-status" :class="model.status">{{ model.status }}</span>
              </div>
              <p class="model-desc">{{ model.desc }}</p>
              <div class="model-meta">
                <span class="meta-item"><strong>价格：</strong>{{ model.pricing }}</span>
                <span class="meta-item"><strong>上下文：</strong>{{ model.context }}</span>
              </div>
              <div class="model-strengths">
                <span class="strength-label">优势：</span>
                <span v-for="s in model.strengths" :key="s" class="strength-tag">{{ s }}</span>
              </div>
              <div class="model-weaknesses" v-if="model.weaknesses">
                <span class="weakness-label">劣势：</span>
                <span v-for="w in model.weaknesses" :key="w" class="weakness-tag">{{ w }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comparison-section" v-if="content.models.comparison">
        <h2 class="comparison-title">{{ content.models.comparison.title }}</h2>
        <div class="comparison-table">
          <div class="comparison-row header">
            <span class="comparison-feature">{{ content.models.comparison.items[0].feature }}</span>
            <span>GPT-4o</span>
            <span>Claude</span>
            <span>Gemini</span>
            <span>Kimi</span>
            <span>Qwen</span>
            <span>DeepSeek</span>
          </div>
          <div v-for="item in content.models.comparison.items" :key="item.feature" class="comparison-row">
            <span class="comparison-feature">{{ item.feature }}</span>
            <span>{{ item.gpt4o }}</span>
            <span>{{ item.claude }}</span>
            <span>{{ item.gemini }}</span>
            <span>{{ item.kimi }}</span>
            <span>{{ item.qwen }}</span>
            <span>{{ item.deepseek }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section v-if="currentPage === 'questions'" class="questions">
      <div class="page-header">
        <h1>{{ content.questions.title }}</h1>
        <p>{{ content.questions.subtitle }}</p>
      </div>
      <div class="knowledge-tabs">
        <button v-for="cat in (content.questions?.categories || [])" :key="cat.id" :class="{ active: selectedCategory === cat.id }" @click="selectedCategory = cat.id">
          {{ cat.name }}
        </button>
      </div>
      <div class="knowledge-list">
        <div v-for="item in (content.questions?.categories?.find(c => c.id === selectedCategory)?.items || [])" :key="item.q" class="knowledge-item">
          <div class="knowledge-q">{{ item.q }}</div>
          <div class="knowledge-a" v-html="item.a"></div>
        </div>
      </div>
    </section>

    <!-- Hot -->
    <section v-if="currentPage === 'hot'" class="hot-page">
      <div class="page-header">
        <h1>{{ content.hot.title }}</h1>
        <p>{{ content.hot.subtitle }}</p>
      </div>
      <div class="hot-intro">
        <p>{{ content.hot.intro }}</p>
      </div>
      <div class="news-section" v-if="content.hot.news">
        <div class="category-header">
          <span class="category-icon">📰</span>
          <div class="category-info">
            <h2>{{ content.hot.news.title }}</h2>
            <p>最新的 AI 行业动态和热点资讯</p>
          </div>
        </div>
        <div class="news-grid">
          <div v-for="news in content.hot.news.items" :key="news.title" class="news-item">
            <h3>{{ news.title }}</h3>
            <p>{{ news.desc }}</p>
            <span class="news-source">{{ news.source }} · {{ news.date }}</span>
          </div>
        </div>
      </div>
      <div class="hot-categories">
        <div v-for="cat in content.hot.categories" :key="cat.id" class="hot-category">
          <div class="category-header">
            <span class="category-icon">{{ cat.icon }}</span>
            <div class="category-info">
              <h2>{{ cat.name }}</h2>
              <p>{{ cat.desc }}</p>
            </div>
          </div>
          <div class="category-items">
            <div v-for="item in cat.items" :key="item.title" class="hot-item" :class="{ 'has-link': item.url }">
              <a v-if="item.url" :href="item.url" target="_blank" class="item-link"></a>
              <div class="item-header">
                <h3>{{ item.title }}</h3>
                <span class="item-status" :class="item.status">{{ item.status }}</span>
              </div>
              <p class="item-desc">{{ item.desc }}</p>
              <div class="item-apps">
                <span v-for="app in item.application" :key="app" class="app-tag">{{ app }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="trends-section" v-if="content.hot.trends">
        <h2 class="trends-title">{{ content.hot.trends.title }}</h2>
        <div class="trends-timeline">
          <div v-for="trend in content.hot.trends.items" :key="trend.year + trend.trend" class="trend-item">
            <span class="trend-year">{{ trend.year }}</span>
            <span class="trend-name">{{ trend.trend }}</span>
            <span class="trend-desc">{{ trend.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools -->
    <section v-if="currentPage === 'tools'" class="tools">
      <div class="page-header">
        <h1>{{ content.tools.title }}</h1>
        <p>{{ content.tools.subtitle }}</p>
      </div>
      <div class="tools-intro">
        <p>{{ content.tools.intro }}</p>
      </div>
      <div class="tools-grid">
        <div v-for="tool in content.tools.list" :key="tool.name" class="tool-card">
          <div class="tool-header">
            <span class="tool-icon">{{ tool.icon }}</span>
            <div class="tool-info">
              <h3><a :href="tool.url" target="_blank" class="tool-name-link">{{ tool.name }}</a></h3>
              <span class="tool-type">{{ tool.type }}</span>
            </div>
          </div>
          <p class="tool-desc">{{ tool.desc }}</p>
          <div class="tool-highlights">
            <span v-for="h in tool.highlights" :key="h" class="highlight-tag">{{ h }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-logo">&#9670; OpenClaw</div>
        <p>2026 {{ content.copyright?.text || 'AI工具导航' }}</p>
        <div class="footer-links">
          <a @click="navigate('design')" style="color: #06b6d4;">{{ content.nav.design }}</a>
          <a href="https://github.com/reg-liu/OpenclawVue" target="_blank">GitHub</a>
          <a href="https://openclaw.ai" target="_blank">OpenClaw</a>
        </div>
      </div>
    </footer>

    <!-- Design Spec Page -->
    <section v-if="currentPage === 'design'" class="design-page">
      <div class="page-header">
        <h1>🎨 AI工具导航 - 设计规范</h1>
        <p>基于竞品分析的设计规范，包含颜色、组件、交互等完整定义</p>
      </div>

      <!-- Colors -->
      <div class="design-section">
        <h2>1. 颜色系统</h2>
        <div class="color-grid">
          <div class="color-card">
            <div class="color-swatch primary"></div>
            <div class="color-info">
              <strong>主色 Primary</strong>
              <code>#7c3aed</code>
              <span>主按钮、选中态、链接</span>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch secondary"></div>
            <div class="color-info">
              <strong>次色 Secondary</strong>
              <code>#06b6d4</code>
              <span>次要按钮、辅助图标</span>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch success"></div>
            <div class="color-info">
              <strong>成功 Success</strong>
              <code>#10b981</code>
              <span>成功状态、免费标签</span>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch warning"></div>
            <div class="color-info">
              <strong>警告 Warning</strong>
              <code>#f59e0b</code>
              <span>警告、付费标签</span>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch error"></div>
            <div class="color-info">
              <strong>错误 Error</strong>
              <code>#ef4444</code>
              <span>错误状态、危险操作</span>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch bg-dark"></div>
            <div class="color-info">
              <strong>背景 BG Dark</strong>
              <code>#1a1a2e</code>
              <span>页面主背景</span>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch card-bg"></div>
            <div class="color-info">
              <strong>卡片 Card BG</strong>
              <code>#1f1f3d</code>
              <span>卡片、浮层背景</span>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch border"></div>
            <div class="color-info">
              <strong>边框 Border</strong>
              <code>#2d2d4a</code>
              <span>分割线、边框</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="design-section">
        <h2>2. 按钮组件</h2>
        <div class="button-showcase">
          <button class="btn-demo primary">主按钮</button>
          <button class="btn-demo secondary">次按钮</button>
          <button class="btn-demo text">文字按钮</button>
          <button class="btn-demo danger">危险按钮</button>
          <button class="btn-demo primary" disabled>禁用</button>
        </div>
      </div>

      <!-- Tags -->
      <div class="design-section">
        <h2>3. 标签</h2>
        <div class="tag-showcase">
          <span class="tag-demo free">免费</span>
          <span class="tag-demo paid">付费</span>
          <span class="tag-demo beginner">入门</span>
          <span class="tag-demo intermediate">进阶</span>
          <span class="tag-demo advanced">高级</span>
        </div>
      </div>

      <!-- Cards -->
      <div class="design-section">
        <h2>4. 卡片</h2>
        <div class="card-showcase">
          <div class="card-demo">
            <h3>基础卡片</h3>
            <p>悬浮查看效果 - 边框发光+上浮</p>
          </div>
          <div class="card-demo hover">
            <h3>悬浮状态</h3>
            <p>这是hover后的效果</p>
          </div>
        </div>
      </div>

      <!-- Scene Cards -->
      <div class="design-section">
        <h2>5. 场景入口卡片</h2>
        <div class="scene-showcase">
          <div class="scene-card">
            <div class="scene-icon">🚀</div>
            <div class="scene-name">AI入门</div>
          </div>
          <div class="scene-card">
            <div class="scene-icon">💼</div>
            <div class="scene-name">AI办公</div>
          </div>
          <div class="scene-card">
            <div class="scene-icon">🎨</div>
            <div class="scene-name">AI创作</div>
          </div>
          <div class="scene-card">
            <div class="scene-icon">💻</div>
            <div class="scene-name">AI编程</div>
          </div>
          <div class="scene-card">
            <div class="scene-icon">📚</div>
            <div class="scene-name">AI学习</div>
          </div>
        </div>
      </div>

      <!-- Tool Card -->
      <div class="design-section">
        <h2>6. 工具卡片 (含OpenClaw实践)</h2>
        <div class="tool-demo">
          <div class="tool-header">
            <span class="tool-icon">💬</span>
            <span class="tool-name">ChatGPT</span>
          </div>
          <p class="tool-desc">OpenAI开发的AI对话工具，适合日常问答和内容创作</p>
          <div class="tool-tags">
            <span class="tag-demo free">免费</span>
            <span class="tag-demo beginner">入门</span>
          </div>
          <div class="tool-openclaw">
            <div class="openclaw-title">🔧 OpenClaw 实践</div>
            <p class="openclaw-desc">通过 OpenAI API skill 调用接口，实现自定义AI助手</p>
          </div>
        </div>
      </div>

      <!-- Spacing -->
      <div class="design-section">
        <h2>7. 间距系统</h2>
        <div class="spacing-showcase">
          <div class="spacing-item"><span class="spacing-label">xs</span><div class="spacing-box" style="width:4px;height:4px;"></div><code>4px</code></div>
          <div class="spacing-item"><span class="spacing-label">sm</span><div class="spacing-box" style="width:8px;height:8px;"></div><code>8px</code></div>
          <div class="spacing-item"><span class="spacing-label">md</span><div class="spacing-box" style="width:16px;height:16px;"></div><code>16px</code></div>
          <div class="spacing-item"><span class="spacing-label">lg</span><div class="spacing-box" style="width:24px;height:24px;"></div><code>24px</code></div>
          <div class="spacing-item"><span class="spacing-label">xl</span><div class="spacing-box" style="width:32px;height:32px;"></div><code>32px</code></div>
        </div>
      </div>

      <!-- Typography -->
      <div class="design-section">
        <h2>8. 字体系统</h2>
        <div class="type-showcase">
          <div class="type-item"><span class="type-label">H1</span><span class="type-sample h1">章节标题 32px</span></div>
          <div class="type-item"><span class="type-label">H2</span><span class="type-sample h2">小节标题 24px</span></div>
          <div class="type-item"><span class="type-label">H3</span><span class="type-sample h3">子标题 18px</span></div>
          <div class="type-item"><span class="type-label">Body</span><span class="type-sample body">正文内容 14px</span></div>
          <div class="type-item"><span class="type-label">Small</span><span class="type-sample small">辅助说明 12px</span></div>
        </div>
      </div>
    </section>

    <!-- AI Entry Page -->
    <section v-if="currentPage === 'ai_entry'" class="scene-page">
      <div class="page-header">
        <span class="scene-icon-large">🚀</span>
        <h1>AI入门</h1>
        <p>零基础用户不知道怎么开始学习AI？从问答式AI开始，逐步掌握提示词工程</p>
      </div>
      
      <div v-for="category in getSceneCategories('ai-entry')" :key="category" class="category-section">
        <h2 class="category-title">{{ category }}</h2>
        <div class="tools-grid">
          <div v-for="tool in getToolsByCategoryScene('ai-entry', category)" :key="tool.id" class="tool-card">
            <div class="tool-header">
              <span class="tool-icon">{{ tool.icon }}</span>
              <span class="tool-name">{{ tool.name }}</span>
            </div>
            <p class="tool-desc">{{ tool.description }}</p>
            <div class="tool-tags">
              <span :class="tool.price === '免费' ? 'tag tag-free' : 'tag tag-paid'">{{ tool.price }}</span>
              <span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span>
              <span v-if="tool.vpn" class="tag" :class="tool.vpn === '需要' ? 'tag-vpn-need' : 'tag-vpn-no'">{{ tool.vpn === '需要' ? '🔒 翻墙' : '🌐 直连' }}</span>
            </div>
            <div v-if="tool.mobile" class="tool-meta">
              <span class="meta-item">📱 {{ tool.mobile }}</span>
            </div>
            <div v-if="tool.pros || tool.cons" class="tool-proscons">
              <div v-if="tool.pros" class="pros"><span class="label">✅ 优势：</span>{{ tool.pros }}</div>
              <div v-if="tool.cons" class="cons"><span class="label">⚠️ 劣势：</span>{{ tool.cons }}</div>
            </div>
            <div v-if="tool.workflow" class="tool-workflow">
              <div class="workflow-title">📋 工作流</div>
              <p class="workflow-desc">{{ tool.workflow }}</p>
            </div>
            <div class="tool-openclaw">
              <div class="openclaw-title">🔧 OpenClaw 实践</div>
              <p class="openclaw-desc">{{ tool.openclaw_practice }}</p>
            </div>
            <a :href="tool.website" target="_blank" class="tool-link">访问官网 →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Office Page -->
    <section v-if="currentPage === 'ai_office'" class="scene-page">
      <div class="page-header">
        <span class="scene-icon-large">💼</span>
        <h1>AI办公</h1>
        <p>日常办公场景（写文档，做PPT、整理数据）AI工具推荐</p>
      </div>
      <div class="tools-grid">
        <div v-for="tool in getToolsByScene('ai-office')" :key="tool.id" class="tool-card">
          <div class="tool-header">
            <span class="tool-icon">{{ tool.icon }}</span>
            <span class="tool-name">{{ tool.name }}</span>
          </div>
          <p class="tool-desc">{{ tool.description }}</p>
          <div class="tool-tags">
            <span :class="tool.price === '免费' ? 'tag tag-free' : 'tag tag-paid'">{{ tool.price }}</span>
            <span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span>
          </div>
          <div v-if="tool.workflow" class="tool-workflow">
            <div class="workflow-title">📋 工作流</div>
            <p class="workflow-desc">{{ tool.workflow }}</p>
          </div>
          <div class="tool-openclaw">
            <div class="openclaw-title">🔧 OpenClaw 实践</div>
            <p class="openclaw-desc">{{ tool.openclaw_practice }}</p>
          </div>
          <a :href="tool.website" target="_blank" class="tool-link">访问官网 →</a>
        </div>
      </div>
    </section>

    <!-- AI Create Page -->
    <section v-if="currentPage === 'ai_create'" class="scene-page">
      <div class="page-header">
        <span class="scene-icon-large">🎨</span>
        <h1>AI创作</h1>
        <p>写文章，做视频、生成图片 - AI创作工具推荐</p>
      </div>
      <div class="tools-grid">
        <div v-for="tool in getToolsByScene('ai-create')" :key="tool.id" class="tool-card">
          <div class="tool-header">
            <span class="tool-icon">{{ tool.icon }}</span>
            <span class="tool-name">{{ tool.name }}</span>
          </div>
          <p class="tool-desc">{{ tool.description }}</p>
          <div class="tool-tags">
            <span :class="tool.price === '免费' ? 'tag tag-free' : 'tag tag-paid'">{{ tool.price }}</span>
            <span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span>
          </div>
          <div v-if="tool.workflow" class="tool-workflow">
            <div class="workflow-title">📋 工作流</div>
            <p class="workflow-desc">{{ tool.workflow }}</p>
          </div>
          <div class="tool-openclaw">
            <div class="openclaw-title">🔧 OpenClaw 实践</div>
            <p class="openclaw-desc">{{ tool.openclaw_practice }}</p>
          </div>
          <a :href="tool.website" target="_blank" class="tool-link">访问官网 →</a>
        </div>
      </div>
    </section>

    <!-- AI Code Page -->
    <section v-if="currentPage === 'ai_code'" class="scene-page">
      <div class="page-header">
        <span class="scene-icon-large">💻</span>
        <h1>AI编程</h1>
        <p>代码辅助、调试、Bug修复 - AI编程工具推荐</p>
      </div>
      <div class="tools-grid">
        <div v-for="tool in getToolsByScene('ai-code')" :key="tool.id" class="tool-card">
          <div class="tool-header">
            <span class="tool-icon">{{ tool.icon }}</span>
            <span class="tool-name">{{ tool.name }}</span>
          </div>
          <p class="tool-desc">{{ tool.description }}</p>
          <div class="tool-tags">
            <span :class="tool.price === '免费' ? 'tag tag-free' : 'tag tag-paid'">{{ tool.price }}</span>
            <span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span>
          </div>
          <div v-if="tool.workflow" class="tool-workflow">
            <div class="workflow-title">📋 工作流</div>
            <p class="workflow-desc">{{ tool.workflow }}</p>
          </div>
          <div class="tool-openclaw">
            <div class="openclaw-title">🔧 OpenClaw 实践</div>
            <p class="openclaw-desc">{{ tool.openclaw_practice }}</p>
          </div>
          <a :href="tool.website" target="_blank" class="tool-link">访问官网 →</a>
        </div>
      </div>
    </section>

    <!-- AI Study Page -->
    <section v-if="currentPage === 'ai_study'" class="scene-page">
      <div class="page-header">
        <span class="scene-icon-large">📚</span>
        <h1>AI学习</h1>
        <p>看论文、学新技术 - AI学习工具推荐</p>
      </div>
      <div class="tools-grid">
        <div v-for="tool in getToolsByScene('ai-study')" :key="tool.id" class="tool-card">
          <div class="tool-header">
            <span class="tool-icon">{{ tool.icon }}</span>
            <span class="tool-name">{{ tool.name }}</span>
          </div>
          <p class="tool-desc">{{ tool.description }}</p>
          <div class="tool-tags">
            <span :class="tool.price === '免费' ? 'tag tag-free' : 'tag tag-paid'">{{ tool.price }}</span>
            <span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span>
          </div>
          <div v-if="tool.workflow" class="tool-workflow">
            <div class="workflow-title">📋 工作流</div>
            <p class="workflow-desc">{{ tool.workflow }}</p>
          </div>
          <div class="tool-openclaw">
            <div class="openclaw-title">🔧 OpenClaw 实践</div>
            <p class="openclaw-desc">{{ tool.openclaw_practice }}</p>
          </div>
          <a :href="tool.website" target="_blank" class="tool-link">访问官网 →</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: 'Inter', sans-serif; background: #0d0d0d; color: #e5e5e5; line-height: 1.6; }

/* Nav */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 20px 0; transition: all 0.3s; }
.nav.scrolled { background: rgba(13,13,13,0.95); backdrop-filter: blur(20px); padding: 12px 0; }
.nav-container { max-width: 1100px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 20px; cursor: pointer; color: #fff; text-decoration: none; }
.logo-icon { font-size: 24px; color: #22d3ee; }
.nav-links { display: flex; gap: 8px; }
.nav-links a { padding: 10px 20px; color: #a1a1aa; text-decoration: none; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
.nav-links a:hover { color: #fff; }
.nav-links a.active { color: #fff; background: #22d3ee; }
.nav-right { display: flex; align-items: center; gap: 16px; }
.badge { background: #22d3ee; color: #000; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.menu-btn { display: none; background: none; border: none; color: #fff; font-size: 24px; cursor: pointer; }
.mobile-menu { display: none; position: fixed; top: 70px; left: 0; right: 0; background: #0d0d0d; padding: 20px; border-bottom: 1px solid #222; z-index: 50; }
.mobile-menu a { display: block; padding: 14px; color: #a1a1aa; text-decoration: none; border-bottom: 1px solid #1a1a1a; }

/* Hero */
.home { padding-top: 80px; }
.hero { position: relative; min-height: 90vh; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, #1a1a2e 0%, #0d0d0d 70%); }
.hero-bg::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(34,211,238,0.2) 0%, transparent 40%), radial-gradient(circle at calc(100% - var(--x, 50%)) calc(100% - var(--y, 50%)), rgba(168,85,247,0.2) 0%, transparent 40%); transition: background 0.1s ease; }
@keyframes glow { 0% { opacity: 0.6; transform: scale(1); } 100% { opacity: 1; transform: scale(1.1); } }
.hero-content { position: relative; max-width: 700px; padding: 40px 24px; }
.hero-label { color: #22d3ee; font-size: 14px; font-weight: 600; margin-bottom: 20px; letter-spacing: 2px; }
.hero-title { font-size: 64px; font-weight: 800; line-height: 1.1; margin-bottom: 24px; }
.gradient { background: linear-gradient(135deg, #22d3ee, #a855f7, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-desc { color: #a1a1aa; font-size: 18px; margin-bottom: 40px; }
.hero-btns { display: flex; gap: 16px; justify-content: center; margin-bottom: 60px; }
.btn-primary { padding: 14px 32px; background: linear-gradient(135deg, #22d3ee, #06b6d4); border: none; border-radius: 10px; color: #000; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(34,211,238,0.3); }
.btn-outline { padding: 14px 32px; background: transparent; border: 1px solid #333; border-radius: 10px; color: #fff; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
.btn-outline:hover { border-color: #22d3ee; }
.hero-stats { display: flex; justify-content: center; gap: 48px; }
.stat { display: flex; flex-direction: column; align-items: center; }
.stat-num { font-size: 40px; font-weight: 700; background: linear-gradient(135deg, #22d3ee, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.stat-label { color: #737373; font-size: 14px; }

/* Sections */
.section { padding: 100px 24px; }
.section-container { max-width: 1100px; margin: 0 auto; }
.section-title { font-size: 32px; font-weight: 700; margin-bottom: 48px; text-align: center; }

/* About */
.about-section { background: linear-gradient(180deg, #0d0d0d 0%, #171717 100%); }
.features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.feature-card { padding: 28px; background: #1a1a1a; border-radius: 16px; border: 1px solid #262626; transition: all 0.3s; display: flex; align-items: center; gap: 20px; }
.feature-card:hover { transform: translateY(-4px); border-color: #22d3ee; }
.feature-icon { width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(34,211,238,0.2), rgba(168,85,247,0.2)); border-radius: 14px; color: #22d3ee; font-size: 28px; flex-shrink: 0; }
.feature-content { flex: 1; }
.feature-content h3 { font-size: 20px; margin-bottom: 8px; text-align: left; }
.feature-content p { color: #a1a1aa; font-size: 14px; text-align: left; line-height: 1.6; margin: 0; }

/* Tech */
.tech-section { background: #171717; }
.flow-section { background: linear-gradient(180deg, #171717 0%, #1a1a1a 100%); padding: 80px 24px; }
.flow-grid { max-width: 1200px; margin: 0 auto; display: flex; justify-content: center; align-items: flex-start; gap: 0; }
.flow-step-card { text-align: center; padding: 28px 20px; position: relative; flex: 1; max-width: 220px; background: #1a1a1a; border: 1px solid #262626; border-radius: 16px; transition: all 0.3s; }
.flow-step-card:hover { transform: translateY(-6px); border-color: #22d3ee; box-shadow: 0 10px 40px rgba(34,211,238,0.15); }
.step-arrow { position: absolute; left: -20px; top: 50%; transform: translateY(-50%); font-size: 24px; color: #22d3ee; font-weight: bold; z-index: 1; }
.step-num { font-size: 48px; font-weight: 700; color: #22d3ee; opacity: 0.3; margin-bottom: 12px; }
.flow-step-card h3 { font-size: 18px; margin-bottom: 10px; }
.flow-step-card p { color: #a1a1aa; font-size: 13px; line-height: 1.6; }
.hot-section { background: #1a1a1a; padding: 80px 24px; }
.section-subtitle { text-align: center; color: #71717a; margin-bottom: 48px; margin-top: -30px; }
.hot-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.hot-card { background: #0f0f0f; border: 1px solid #262626; border-radius: 14px; padding: 22px; transition: all 0.3s; }
.hot-card:hover { border-color: #f472b6; transform: translateY(-3px); }
.hot-tag { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 14px; }
.hot-tag.热门 { background: rgba(244,114,182,0.15); color: #f472b6; }
.hot-tag.上升 { background: rgba(34,211,238,0.15); color: #22d3ee; }
.hot-tag.稳定 { background: rgba(163,163,180,0.15); color: #a1a1aa; }
.hot-card h3 { font-size: 17px; margin-bottom: 8px; }
.hot-card p { color: #71717a; font-size: 13px; line-height: 1.5; }

@media (max-width: 900px) {
  .flow-grid { flex-wrap: wrap; }
  .hot-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .hot-grid { grid-template-columns: 1fr; }
}
.tech-grid { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }
.tech-item { display: flex; align-items: center; gap: 12px; padding: 20px 28px; background: #1a1a1a; border: 1px solid #262626; border-radius: 12px; transition: all 0.3s; }
.tech-item:hover { background: #222; transform: scale(1.05); }
.tech-item img { width: 28px; height: 28px; }
.tech-item span { font-weight: 500; color: #d4d4d8; }

/* Practice */
.projects, .practice, .questions, .tools { padding: 120px 24px 80px; min-height: 100vh; }
.page-header { text-align: center; margin-bottom: 60px; }
.page-header h1 { font-size: 40px; margin-bottom: 12px; }
.page-header p { color: #a1a1aa; }
.projects-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.project-card { padding: 28px; background: #1a1a1a; border: 1px solid #262626; border-radius: 16px; transition: all 0.3s; }
.project-card:hover { transform: translateX(8px); border-color: #333; }
.project-card.highlight { border-color: #22d3ee; background: linear-gradient(135deg, #1a1a1a 0%, #162a2e 100%); }
.project-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.project-date { color: #737373; font-size: 13px; }
.project-badge { background: #22d3ee; color: #000; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; }
.project-card h3 { font-size: 20px; margin-bottom: 8px; }
.project-card p { color: #a1a1aa; font-size: 14px; margin-bottom: 16px; }
.project-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
.project-tags span { background: #262626; color: #a1a1aa; padding: 4px 10px; border-radius: 6px; font-size: 12px; }
.project-details { list-style: none; padding: 0; margin: 0 0 12px 0; display: flex; flex-wrap: wrap; gap: 8px; }
.project-details li { background: #1f1f1f; color: #737373; padding: 4px 10px; border-radius: 4px; font-size: 12px; }
.project-prompt { background: linear-gradient(135deg, #1a1a2e, #16213e); border: 1px solid #a78bfa; border-radius: 8px; padding: 12px; }
.project-prompt .prompt-label { display: block; color: #a78bfa; font-size: 11px; font-weight: 600; margin-bottom: 4px; }
.project-prompt .prompt-text { color: #d4d4d8; font-size: 13px; font-style: italic; }

/* Knowledge */
.knowledge { padding: 120px 24px 80px; min-height: 100vh; }
.knowledge-tabs { display: flex; gap: 12px; justify-content: center; margin-bottom: 40px; flex-wrap: wrap; }
.knowledge-tabs button { padding: 12px 24px; background: #1a1a1a; border: 1px solid #262626; border-radius: 10px; color: #a1a1aa; cursor: pointer; transition: all 0.2s; }
.knowledge-tabs button:hover { border-color: #22d3ee; }
.knowledge-tabs button.active { background: #22d3ee; border-color: #22d3ee; color: #000; }
.knowledge-list { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
.knowledge-item { padding: 24px; background: #1a1a1a; border: 1px solid #262626; border-radius: 12px; }
.knowledge-q { font-weight: 600; font-size: 16px; margin-bottom: 8px; text-align: left; }
.knowledge-a { color: #a1a1aa; font-size: 14px; line-height: 1.8; text-align: left; }
.knowledge-a pre { margin: 0; font-family: inherit; white-space: pre-wrap; }

/* Footer */
.footer { padding: 48px 24px; border-top: 1px solid #1a1a1a; text-align: center; }
.footer-container { max-width: 1100px; margin: 0 auto; }
.footer-logo { font-size: 18px; font-weight: 700; margin-bottom: 12px; color: #22d3ee; }
.footer p { color: #525252; font-size: 14px; margin-bottom: 16px; }
.footer-links { display: flex; gap: 24px; justify-content: center; }
.footer-links a { color: #a1a1aa; text-decoration: none; font-size: 14px; transition: color 0.2s; }
.footer-links a:hover { color: #22d3ee; }

/* Responsive */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .menu-btn { display: block; }
  .mobile-menu { display: block; }
  .hero-title { font-size: 40px; }
  .hero-btns { flex-direction: column; }
  .hero-stats { flex-wrap: wrap; gap: 32px; }
  .features { grid-template-columns: 1fr; }
  .projects-grid { grid-template-columns: 1fr; }
}
/* Tools */
.tools-intro { text-align: center; max-width: 700px; margin: 0 auto 48px; }
.tools-intro p { color: #a1a1aa; font-size: 16px; }
.tools-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.tool-card { padding: 28px; background: #1a1a1a; border: 1px solid #262626; border-radius: 16px; transition: all 0.3s; position: relative; }
.tool-card:hover { transform: translateY(-4px); border-color: #22d3ee; }
.tool-card.has-link { cursor: pointer; }
.tool-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
.tool-icon { font-size: 40px; }
.tool-info h3 { font-size: 20px; margin: 0; text-align: left; }
.tool-name-link { color: inherit; text-decoration: none; }
.tool-name-link:hover { color: #22d3ee; }
.tool-type { color: #22d3ee; font-size: 13px; text-align: left; display: block; }
.tool-desc { color: #a1a1aa; font-size: 14px; margin-bottom: 16px; text-align: left; }
.tool-highlights { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
.tool-practice { margin-top: 12px; }
.practice-link { font-size: 13px; }
.practice-link a { color: #22d3ee; text-decoration: none; }
.practice-link a:hover { text-decoration: underline; }
.highlight-tag { background: #262626; color: #d4d4d8; padding: 4px 10px; border-radius: 6px; font-size: 12px; }
@media (max-width: 768px) {
  .tools-grid { grid-template-columns: 1fr; }
}

/* Hot Page */
.hot-page { padding: 120px 24px 80px; min-height: 100vh; }
.hot-intro { text-align: center; max-width: 800px; margin: 0 auto 48px; }
.hot-intro p { color: #a1a1aa; font-size: 16px; line-height: 1.7; }
.hot-categories { max-width: 1100px; margin: 0 auto; }
.hot-category { margin-bottom: 48px; }
.category-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #262626; }
.category-icon { font-size: 42px; }
.category-info h2 { font-size: 24px; margin-bottom: 6px; text-align: left; }
.category-info p { color: #71717a; font-size: 14px; text-align: left; }
.category-items { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.hot-item { background: #1a1a1a; border: 1px solid #262626; border-radius: 12px; padding: 20px; transition: all 0.3s; position: relative; }
.hot-item:hover { border-color: #22d3ee; transform: translateY(-2px); }
.hot-item.has-link { cursor: pointer; }
.item-link { position: absolute; inset: 0; z-index: 1; }
.hot-item:hover { border-color: #22d3ee; transform: translateY(-2px); }
.item-header { display: flex; justify-content: flex-start; align-items: center; margin-bottom: 10px; }
.item-header h3 { font-size: 16px; margin: 0; text-align: left; }
.item-status { font-size: 11px; padding: 3px 10px; border-radius: 12px; font-weight: 600; }
.item-status.领先 { background: rgba(34,211,238,0.15); color: #22d3ee; }
.item-status.主流 { background: rgba(168,85,247,0.15); color: #a855f7; }
.item-status.新兴 { background: rgba(244,114,182,0.15); color: #f472b6; }
.item-status.开创 { background: rgba(251,191,36,0.15); color: #fbbf24; }
.item-status.底层 { background: rgba(107,114,128,0.15); color: #9ca3af; }
.item-status.基础设施 { background: rgba(59,130,246,0.15); color: #3b82f6; }
.item-desc { color: #a1a1aa; font-size: 13px; margin-bottom: 12px; line-height: 1.5; text-align: left; }
.item-apps { display: flex; gap: 6px; flex-wrap: wrap; }
.app-tag { background: #262626; color: #d4d4d8; padding: 3px 8px; border-radius: 4px; font-size: 11px; }
.news-section { max-width: 1100px; margin: 0 auto 48px; }
.news-section .category-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #262626; }
.news-section .category-icon { font-size: 42px; }
.news-section .category-info h2 { font-size: 24px; margin-bottom: 6px; }
.news-section .category-info p { color: #71717a; font-size: 14px; }
.news-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.news-item { background: #1a1a1a; border: 1px solid #262626; border-radius: 12px; padding: 20px; }
.news-item h3 { font-size: 16px; margin: 0 0 10px 0; }
.news-item p { color: #a1a1aa; font-size: 13px; margin: 0 0 10px 0; line-height: 1.5; }
.news-source { color: #71717a; font-size: 12px; }
.trends-section { max-width: 900px; margin: 60px auto 0; padding-top: 40px; border-top: 1px solid #262626; }
.trends-title { font-size: 24px; text-align: center; margin-bottom: 32px; }
.trends-timeline { display: flex; flex-direction: column; gap: 16px; }
.trend-item { display: grid; grid-template-columns: 60px 140px 1fr; gap: 16px; align-items: center; padding: 16px; background: #1a1a1a; border-radius: 10px; }
.trend-year { color: #22d3ee; font-weight: 700; font-size: 14px; }
.trend-name { color: #f472b6; font-weight: 600; font-size: 15px; }
.trend-desc { color: #a1a1aa; font-size: 13px; }

@media (max-width: 768px) {
  .category-items { grid-template-columns: 1fr; }
  .trend-item { grid-template-columns: 50px 1fr; }
  .trend-name { grid-column: 2; }
  .trend-desc { grid-column: 2; }
}

/* Skills Page */
.skills-page { padding: 120px 24px 80px; min-height: 100vh; }
.skills-intro { text-align: center; max-width: 800px; margin: 0 auto 48px; }
.skills-intro p { color: #a1a1aa; font-size: 16px; line-height: 1.7; }
.skills-categories { max-width: 1100px; margin: 0 auto; }
.skill-category { margin-bottom: 48px; }
.skill-category .category-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #262626; }
.skill-category .category-icon { font-size: 42px; }
.skill-category .category-info h2 { font-size: 24px; margin-bottom: 6px; text-align: left; }
.skill-category .category-info p { color: #71717a; font-size: 14px; text-align: left; }
.skill-items { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.skill-card { background: #1a1a1a; border: 1px solid #262626; border-radius: 12px; padding: 20px; transition: all 0.3s; }
.skill-card:hover { border-color: #f472b6; transform: translateY(-2px); }
.skill-header { display: flex; justify-content: flex-start; align-items: center; margin-bottom: 10px; }
.skill-header h3 { font-size: 16px; margin: 0; text-align: left; }
.skill-level { color: #fbbf24; font-size: 12px; }
.skill-desc { color: #a1a1aa; font-size: 13px; margin-bottom: 12px; line-height: 1.5; text-align: left; }
.skill-features { display: flex; gap: 6px; flex-wrap: wrap; }
.feature-tag { background: #262626; color: #d4d4d8; padding: 3px 8px; border-radius: 4px; font-size: 11px; }
.develop-section { max-width: 900px; margin: 60px auto 0; padding-top: 40px; border-top: 1px solid #262626; }
.develop-title { font-size: 24px; text-align: center; margin-bottom: 32px; }
.develop-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
.develop-step { text-align: center; padding: 20px; background: #1a1a1a; border-radius: 12px; }
.develop-num { width: 36px; height: 36px; background: #22d3ee; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; margin: 0 auto 12px; }
.develop-step h3 { font-size: 15px; margin-bottom: 8px; }
.develop-step p { color: #71717a; font-size: 12px; line-height: 1.5; }
.docs-link { display: inline-block; text-align: center; width: 100%; color: #22d3ee; font-size: 15px; text-decoration: none; padding: 12px; border: 1px solid #22d3ee; border-radius: 8px; transition: all 0.3s; }
.docs-link:hover { background: #22d3ee; color: #000; }

@media (max-width: 900px) {
  .develop-steps { grid-template-columns: repeat(2, 1fr); }
  .skill-items { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .develop-steps { grid-template-columns: 1fr; }
}

/* Models Page */
.models-page { padding: 120px 24px 80px; min-height: 100vh; }
.models-intro { text-align: center; max-width: 800px; margin: 0 auto 48px; }
.models-intro p { color: #a1a1aa; font-size: 16px; line-height: 1.7; }
.models-categories { max-width: 1100px; margin: 0 auto; }
.model-category { margin-bottom: 48px; }
.model-category .category-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #262626; }
.model-category .category-icon { font-size: 42px; }
.model-category .category-info h2 { font-size: 24px; margin-bottom: 6px; text-align: left; }
.model-category .category-info p { color: #71717a; font-size: 14px; text-align: left; }
.model-items { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.model-card { background: #1a1a1a; border: 1px solid #262626; border-radius: 12px; padding: 20px; }
.model-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.model-header h3 { font-size: 16px; margin: 0; }
.model-status { font-size: 11px; padding: 3px 10px; border-radius: 12px; font-weight: 600; }
.model-status.主流 { background: rgba(168,85,247,0.15); color: #a855f7; }
.model-status.入门 { background: rgba(107,114,128,0.15); color: #9ca3af; }
.model-status.高端 { background: rgba(251,191,36,0.15); color: #fbbf24; }
.model-status.热门 { background: rgba(34,211,238,0.15); color: #22d3ee; }
.model-status.新兴 { background: rgba(244,114,182,0.15); color: #f472b6; }
.model-status.专业 { background: rgba(59,130,246,0.15); color: #3b82f6; }
.model-desc { color: #a1a1aa; font-size: 13px; margin-bottom: 12px; line-height: 1.5; }
.model-meta { display: flex; gap: 16px; margin-bottom: 12px; }
.meta-item { color: #71717a; font-size: 12px; }
.meta-item strong { color: #d4d4d8; }
.model-strengths, .model-weaknesses { margin-bottom: 8px; }
.strength-label, .weakness-label { color: #71717a; font-size: 12px; margin-right: 8px; }
.strength-tag { background: rgba(34,211,238,0.15); color: #22d3ee; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-right: 4px; }
.weakness-tag { background: rgba(239,68,68,0.15); color: #ef4444; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-right: 4px; }
.comparison-section { margin-top: 60px; }
.comparison-title { font-size: 28px; text-align: center; margin-bottom: 32px; }
.comparison-table { max-width: 1100px; margin: 0 auto; overflow-x: auto; }
.comparison-row { display: grid; grid-template-columns: 100px repeat(6, 1fr); gap: 12px; padding: 14px 16px; border-bottom: 1px solid #262626; align-items: center; }
.comparison-row.header { background: #1a1a1a; font-weight: 600; border-radius: 10px 10px 0 0; }
.comparison-row.header span:not(:first-child) { text-align: center; }
.comparison-feature { color: #a1a1aa; }
.comparison-row span:not(:first-child) { text-align: center; color: #d4d4d8; font-size: 14px; }

@media (max-width: 900px) {
  .model-items { grid-template-columns: 1fr; }
  .comparison-row { grid-template-columns: 80px repeat(5, 1fr); font-size: 12px; }
}
@media (max-width: 600px) {
  .model-meta { flex-direction: column; gap: 8px; }
  .comparison-row { grid-template-columns: 70px repeat(4, 1fr); font-size: 10px; }
}

/* Design Spec Page */
.design-page { padding: 120px 24px 80px; min-height: 100vh; max-width: 1100px; margin: 0 auto; }
.design-section { margin-bottom: 60px; }
.design-section h2 { font-size: 24px; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px solid #262626; }

.color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.color-card { background: #1a1a1a; border: 1px solid #262626; border-radius: 12px; padding: 16px; display: flex; gap: 16px; }
.color-swatch { width: 60px; height: 60px; border-radius: 8px; flex-shrink: 0; }
.color-swatch.primary { background: #7c3aed; }
.color-swatch.secondary { background: #06b6d4; }
.color-swatch.success { background: #10b981; }
.color-swatch.warning { background: #f59e0b; }
.color-swatch.error { background: #ef4444; }
.color-swatch.bg-dark { background: #1a1a2e; border: 1px solid #333; }
.color-swatch.card-bg { background: #1f1f3d; border: 1px solid #333; }
.color-swatch.border { background: #2d2d4a; border: 1px solid #444; }
.color-info { display: flex; flex-direction: column; gap: 4px; }
.color-info strong { font-size: 14px; }
.color-info code { font-size: 12px; color: #22d3ee; font-family: monospace; }
.color-info span { font-size: 12px; color: #71717a; }

.button-showcase { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; }
.btn-demo { padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; border: none; }
.btn-demo.primary { background: #7c3aed; color: white; }
.btn-demo.primary:hover { background: #8b5cf6; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3); }
.btn-demo.secondary { background: transparent; color: #7c3aed; border: 1px solid #7c3aed; }
.btn-demo.secondary:hover { background: rgba(124, 58, 237, 0.1); }
.btn-demo.text { background: transparent; color: #7c3aed; }
.btn-demo.text:hover { text-decoration: underline; }
.btn-demo.danger { background: #ef4444; color: white; }
.btn-demo.danger:hover { background: #f87171; }
.btn-demo:disabled { background: #374151; color: #6b7280; cursor: not-allowed; }

.tag-showcase { display: flex; flex-wrap: wrap; gap: 12px; }
.tag-demo { padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 500; }
.tag-demo.free { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid #10b981; }
.tag-demo.paid { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid #f59e0b; }
.tag-demo.beginner { background: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid #3b82f6; }
.tag-demo.intermediate { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid #f59e0b; }
.tag-demo.advanced { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444; }

.card-showcase { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; }
.card-demo { background: #1f1f3d; border: 1px solid #2d2d4a; border-radius: 12px; padding: 24px; transition: all 0.3s; }
.card-demo:hover { border-color: #7c3aed; box-shadow: 0 8px 24px rgba(124, 58, 237, 0.2); transform: translateY(-4px); }
.card-demo h3 { font-size: 16px; margin-bottom: 8px; }
.card-demo p { font-size: 13px; color: #94a3b8; }

.scene-showcase { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; }
.scene-card { background: linear-gradient(135deg, #1f1f3d 0%, #2d2d4a 100%); border-radius: 16px; padding: 32px 20px; text-align: center; cursor: pointer; transition: all 0.3s; border: 1px solid #2d2d4a; }
.scene-card:hover { transform: translateY(-8px); box-shadow: 0 12px 40px rgba(124, 58, 237, 0.3); border-color: #7c3aed; }
.scene-icon { font-size: 36px; display: block; margin-bottom: 12px; }
.scene-name { font-size: 14px; font-weight: 600; }

.tool-demo { background: #1f1f3d; border: 1px solid #2d2d4a; border-radius: 12px; padding: 24px; max-width: 500px; }
.tool-demo .tool-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.tool-demo .tool-icon { width: 40px; height: 40px; background: rgba(124, 58, 237, 0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.tool-demo .tool-name { font-size: 16px; font-weight: 600; }
.tool-demo .tool-desc { font-size: 14px; color: #94a3b8; margin-bottom: 12px; }
.tool-demo .tool-tags { display: flex; gap: 8px; margin-bottom: 16px; }
.tool-openclaw { padding: 12px; background: rgba(124, 58, 237, 0.1); border-radius: 8px; border-left: 3px solid #7c3aed; }
.tool-openclaw .openclaw-title { font-size: 12px; color: #7c3aed; font-weight: 600; margin-bottom: 4px; }
.tool-openclaw .openclaw-desc { font-size: 12px; color: #94a3b8; }

.spacing-showcase { display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-end; }
.spacing-item { display: flex; align-items: center; gap: 8px; }
.spacing-label { font-size: 12px; color: #71717a; width: 24px; }
.spacing-box { background: #7c3aed; }
.spacing-item code { font-size: 12px; color: #22d3ee; font-family: monospace; }

.type-showcase { display: flex; flex-direction: column; gap: 16px; }
.type-item { display: flex; align-items: baseline; gap: 16px; }
.type-label { font-size: 12px; color: #71717a; width: 50px; }
.type-sample.h1 { font-size: 32px; font-weight: 700; }
.type-sample.h2 { font-size: 24px; font-weight: 600; }
.type-sample.h3 { font-size: 18px; font-weight: 600; }
.type-sample.body { font-size: 14px; }
.type-sample.small { font-size: 12px; color: #94a3b8; }

@media (max-width: 600px) {
  .design-page { padding: 100px 16px 40px; }
  .color-grid { grid-template-columns: 1fr; }
  .button-showcase { flex-direction: column; align-items: flex-start; }
  .scene-showcase { grid-template-columns: repeat(2, 1fr); }
}

/* AI Tools Page */
.scene-page { padding: 120px 24px 80px; min-height: 100vh; max-width: 1100px; margin: 0 auto; }
.scene-page .page-header { text-align: center; margin-bottom: 48px; }
.scene-page .page-header h1 { font-size: 36px; margin-bottom: 12px; }
.scene-page .page-header p { color: #94a3b8; font-size: 16px; }
.scene-page .scene-icon-large { font-size: 64px; display: block; margin-bottom: 16px; }

.scenes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
.scene-card { 
  background: linear-gradient(135deg, #1f1f3d 0%, #2d2d4a 100%); 
  border-radius: 16px; 
  padding: 32px 24px; 
  text-align: center; 
  cursor: pointer; 
  transition: all 0.3s;
  border: 1px solid #2d2d4a;
}
.scene-card:hover { 
  transform: translateY(-8px); 
  box-shadow: 0 12px 40px rgba(16, 185, 129, 0.2); 
  border-color: #10b981; 
}
.scene-card .scene-icon { font-size: 48px; margin-bottom: 16px; }
.scene-card .scene-name { font-size: 20px; font-weight: 600; margin-bottom: 8px; }
.scene-card .scene-desc { font-size: 13px; color: #94a3b8; }

.scene-detail .back-btn { 
  background: transparent; 
  border: 1px solid #2d2d4a; 
  color: #94a3b8; 
  padding: 8px 16px; 
  border-radius: 8px; 
  cursor: pointer; 
  margin-bottom: 24px;
  transition: all 0.2s;
}
.scene-detail .back-btn:hover { border-color: #10b981; color: #10b981; }

.scene-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
.scene-header .scene-icon-large { font-size: 48px; }
.scene-header h2 { font-size: 28px; }

.category-section { margin-bottom: 48px; }
.category-title { font-size: 22px; font-weight: 600; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 1px solid #2d2d4a; color: #8b5cf6; }

.tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
.tool-card { 
  background: #1f1f3d; 
  border: 1px solid #2d2d4a; 
  border-radius: 12px; 
  padding: 24px; 
  transition: all 0.3s;
}
.tool-card:hover { border-color: #10b981; }
.tool-card .tool-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.tool-card .tool-icon { width: 40px; height: 40px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.tool-card .tool-name { font-size: 18px; font-weight: 600; }
.tool-card .tool-desc { color: #94a3b8; font-size: 14px; margin-bottom: 12px; line-height: 1.5; }
.tool-card .tool-tags { display: flex; gap: 8px; margin-bottom: 16px; }
.tool-card .tag { padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 500; }
.tool-card .tag-free { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.tool-card .tag-paid { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.tool-card .tag-入门 { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.tool-card .tag-进阶 { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.tool-card .tag-高级 { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.tool-card .tag-vpn-need { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.tool-card .tag-vpn-no { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.tool-card .tool-meta { font-size: 12px; color: #94a3b8; margin-bottom: 12px; }
.tool-card .tool-proscons { font-size: 12px; margin-bottom: 12px; padding: 8px; background: #1a1a2e; border-radius: 6px; }
.tool-card .tool-proscons .pros { color: #10b981; margin-bottom: 4px; }
.tool-card .tool-proscons .cons { color: #f59e0b; }
.tool-card .tool-proscons .label { font-weight: 600; }
.tool-card .tool-workflow { padding: 12px; background: rgba(139, 92, 246, 0.1); border-radius: 8px; border-left: 3px solid #8b5cf6; margin-bottom: 16px; }
.tool-card .workflow-title { font-size: 12px; color: #8b5cf6; font-weight: 600; margin-bottom: 4px; }
.tool-card .workflow-desc { font-size: 12px; color: #94a3b8; line-height: 1.5; }
.tool-card .tool-openclaw { padding: 12px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border-left: 3px solid #10b981; margin-bottom: 16px; }
.tool-card .openclaw-title { font-size: 12px; color: #10b981; font-weight: 600; margin-bottom: 4px; }
.tool-card .openclaw-desc { font-size: 12px; color: #94a3b8; }
.tool-card .tool-link { color: #10b981; text-decoration: none; font-size: 14px; }
.tool-card .tool-link:hover { text-decoration: underline; }

@media (max-width: 600px) {
  .scene-page { padding: 100px 16px 40px; }
  .scenes-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .scene-card { padding: 20px 12px; }
  .scene-card .scene-icon { font-size: 32px; }
  .scene-card .scene-name { font-size: 16px; }
  .tools-grid { grid-template-columns: 1fr; }
}

</style>
