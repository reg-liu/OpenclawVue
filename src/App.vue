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

// 右侧导航
const activeSection = ref('')
const pageSections = ref([])

onMounted(async () => {
  // 从URL读取page参数
  const urlParams = new URLSearchParams(window.location.search)
  const page = urlParams.get('page')
  if (page && ['home', 'ai_entry', 'ai_office', 'ai_create', 'ai_code', 'ai_study', 'design', 'components'].includes(page)) {
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

// 平滑滚动到锚点
const scrollToAnchor = (anchorId) => {
  const element = document.getElementById(anchorId)
  if (element) {
    const navHeight = 80
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: elementPosition - navHeight,
      behavior: 'smooth'
    })
  }
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

// 场景ID映射 - API返回的场景已经是连字符格式，不需要转换
const sceneMap = {
  'ai-entry': 'ai-entry',
  'ai-office': 'ai-office',
  'ai-create': 'ai-create',
  'ai-code': 'ai-code',
  'ai-study': 'ai-study'
}

const getSceneTools = (sceneId) => {
  if (!sceneId || !toolsData.value) return []
  const apiScene = sceneMap[sceneId] || sceneId
  return toolsData.value.filter(t => t.scenes.includes(apiScene))
}

const getSceneCategories = (sceneId) => {
  if (!sceneId || !toolsData.value) return []
  const apiScene = sceneMap[sceneId] || sceneId
  const sceneTools = toolsData.value.filter(t => t.scenes.includes(apiScene))
  return [...new Set(sceneTools.map(t => t.category))]
}

const getToolsByCategoryScene = (sceneId, category) => {
  if (!sceneId || !category || !toolsData.value) return []
  const apiScene = sceneMap[sceneId] || sceneId
  return toolsData.value.filter(t => t.scenes.includes(apiScene) && t.category === category)
}

// 兼容旧函数名
const getToolsByScene = (sceneId) => getSceneTools(sceneId)

// 筛选和排序状态
const filterPrice = ref('all') // all, free, paid
const sortBy = ref('name') // name, newest

// 筛选和排序函数
const filterAndSortTools = (tools) => {
  if (!tools) return []
  let result = [...tools]
  
  // 价格筛选
  if (filterPrice.value === 'free') {
    result = result.filter(t => t.price?.includes('免费'))
  } else if (filterPrice.value === 'paid') {
    result = result.filter(t => t.price && !t.price.includes('免费'))
  }
  
  // 排序
  if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
  }
  
  return result
}

// 获取特定类别的工具（用于对比）
const getToolsByCategory = (category) => {
  if (!category || !toolsData.value) return []
  return toolsData.value.filter(t => t.category === category)
}

// 获取工具的步骤数组
const getToolSteps = (tool) => {
  if (tool.workflowSteps && tool.workflowSteps.length > 0) {
    return tool.workflowSteps
  }
  // 如果没有步骤数据，生成默认步骤
  if (tool.workflow) {
    return [
      { step: 1, title: '开始使用', desc: tool.workflow.split('→')[0] || '了解工具功能' },
      { step: 2, title: '基本操作', desc: tool.workflow.split('→')[1] || '输入需求' },
      { step: 3, title: '完成', desc: tool.workflow.split('→')[2] || '获取结果' }
    ]
  }
  return []
}

// AI视频创作工具链
const videoWorkflow = [
  { tool: 'ChatGPT', icon: '💬', desc: '生成脚本/文案' },
  { tool: 'Midjourney', icon: '🎨', desc: '生成关键帧图片' },
  { tool: 'Runway', icon: '🎬', desc: '图生视频' },
  { tool: 'ElevenLabs', icon: '🎤', desc: 'AI配音' },
  { tool: '剪映', icon: '✂️', desc: '后期剪辑' }
]

// AI图像生成工具对比
const imageTools = ['Midjourney', 'DALL-E 3', 'Stable Diffusion']

// AI编程工具对比
const codeTools = ['GitHub Copilot', 'Cursor', 'Claude Code', 'Windsurf', 'Replit AI']
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

      <!-- 产品页概览 -->
      <div class="section-container">
        <h2 class="section-title">探索 AI 工具生态</h2>
        <p class="section-subtitle">从入门到进阶，覆盖各类使用场景</p>
        
        <!-- 产品卡片 - 交替布局 -->
        <div class="product-cards-alternate">
          <!-- AI入门 -->
          <div class="product-card-row" @click="navigate('ai_entry')">
            <div class="card-image">🚀</div>
            <div class="card-content">
              <h3>AI入门</h3>
              <p>零基础入门指南，帮助选择适合的第一款AI工具，快速开启AI之旅</p>
              <div class="card-tags">
                <span>问答式AI</span>
                <span>快速入门</span>
                <span>场景选择</span>
              </div>
            </div>
          </div>

          <!-- AI办公 -->
          <div class="product-card-row reverse" @click="navigate('ai_office')">
            <div class="card-image">💼</div>
            <div class="card-content">
              <h3>AI办公</h3>
              <p>智能PPT生成、文档处理、会议纪要，全面提升办公效率</p>
              <div class="card-tags">
                <span>PPT生成</span>
                <span>文档处理</span>
                <span>语音转写</span>
              </div>
            </div>
          </div>

          <!-- AI创作 -->
          <div class="product-card-row" @click="navigate('ai_create')">
            <div class="card-image">🎨</div>
            <div class="card-content">
              <h3>AI创作</h3>
              <p>图像生成、视频制作、音频合成，释放创意无限可能</p>
              <div class="card-tags">
                <span>Midjourney</span>
                <span>Runway</span>
                <span>ElevenLabs</span>
              </div>
            </div>
          </div>

          <!-- AI编程 -->
          <div class="product-card-row reverse" @click="navigate('ai_code')">
            <div class="card-image">💻</div>
            <div class="card-content">
              <h3>AI编程</h3>
              <p>代码辅助、调试优化、Bug修复，让开发更高效</p>
              <div class="card-tags">
                <span>Cursor</span>
                <span>Copilot</span>
                <span>Claude Code</span>
              </div>
            </div>
          </div>

          <!-- AI学习 -->
          <div class="product-card-row" @click="navigate('ai_study')">
            <div class="card-image">📚</div>
            <div class="card-content">
              <h3>AI学习</h3>
              <p>论文阅读、资料搜索、学术研究，AI辅助终身学习</p>
              <div class="card-tags">
                <span>Kimi</span>
                <span>Perplexity</span>
                <span>Zotero</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 精选工具 -->
      <div class="section-container">
        <h2 class="section-title">精选工具</h2>
        <p class="section-subtitle">热门AI工具推荐</p>
        
        <!-- 简洁工具卡片网格 -->
        <div class="featured-tools-grid">
          <div 
            v-for="tool in (toolsData.value || []).slice(0, 8)" 
            :key="tool.id" 
            class="tool-simple-card"
          >
            <div class="simple-icon">{{ tool.icon }}</div>
            <div class="simple-info">
              <h4>{{ tool.name }}</h4>
              <p>{{ tool.description?.substring(0, 40) }}...</p>
            </div>
            <div class="simple-meta">
              <span class="price-tag" :class="tool.price?.includes('免费') ? 'free' : 'paid'">{{ tool.price?.split('/')[0] }}</span>
            </div>
          </div>
        </div>
      </div>
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
      <div class="page-content">
      <div class="page-header">
        <span class="scene-icon-large">🚀</span>
        <h1>AI入门</h1>
        <p>零基础用户不知道怎么开始学习AI？从问答式AI开始，逐步掌握提示词工程</p>
      </div>

      <!-- 组件1: 问答式AI工具对比 -->
      <div id="ai-entry-comparison" class="component-section">
        <h2 id="comparison" class="component-title">🆚 问答式AI工具对比</h2>
        <p class="component-desc">支主流问答式AI横向对比，帮助选择最适合你的第一款AI工具</p>
        <div class="comparison-grid">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>工具</th>
                <th>价格</th>
                <th>难度</th>
                <th>网络</th>
                <th>移动端</th>
                <th>特点</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tool in getToolsByCategory('问答式AI')" :key="tool.id">
                <td>
                  <span class="tool-icon-small">{{ tool.icon }}</span>
                  {{ tool.name }}
                </td>
                <td>{{ tool.price }}</td>
                <td><span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span></td>
                <td>{{ tool.network }}</td>
                <td>{{ tool.mobile }}</td>
                <td>{{ tool.pros?.split(',')[0] || '功能全面' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 组件2: 场景应对 - 不同需求选什么AI -->
      <div class="component-section">
        <h2 id="scenarios" class="component-title">💡 场景应对 - 选什么AI？</h2>
        <p class="component-desc">根据你的需求，选择最合适的AI工具</p>
        <div class="scenes-grid">
          <div class="scene-card">
            <div class="scene-icon">📝</div>
            <h4>日常问答</h4>
            <p>回答问题、解释概念、聊天陪伴</p>
            <div class="scene-tools">
              <span class="tool-tag">ChatGPT</span>
              <span class="tool-tag">Claude</span>
              <span class="tool-tag">通义千问</span>
            </div>
          </div>
          <div class="scene-card">
            <div class="scene-icon">✍️</div>
            <h4>文案写作</h4>
            <p>写文章、写邮件、写文案</p>
            <div class="scene-tools">
              <span class="tool-tag">Claude</span>
              <span class="tool-tag">Kimi</span>
              <span class="tool-tag">ChatGPT</span>
            </div>
          </div>
          <div class="scene-card">
            <div class="scene-icon">🔍</div>
            <h4>搜索研究</h4>
            <p>查找资料、总结信息、实时联网</p>
            <div class="scene-tools">
              <span class="tool-tag">Perplexity</span>
              <span class="tool-tag">Kimi</span>
            </div>
          </div>
          <div class="scene-card">
            <div class="scene-icon">🇨🇳</div>
            <h4>国内用户</h4>
            <p>无需网络工具，直接访问</p>
            <div class="scene-tools">
              <span class="tool-tag">通义千问</span>
              <span class="tool-tag">Kimi</span>
              <span class="tool-tag">文心一言</span>
              <span class="tool-tag">讯飞星火</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 组件3: 快速入门指南 -->
      <div class="component-section">
        <h2 id="guide" class="component-title">🚀 快速入门指南</h2>
        <p class="component-desc">第一次使用AI？按照这个流程开始</p>
        <div class="quick-start-steps">
          <div class="qs-step">
            <div class="qs-number">1</div>
            <div class="qs-content">
              <h4>选择一款AI工具</h4>
              <p>推荐国内用户选择 Kimi 或通义千问（无需网络工具）；海外用户选择 ChatGPT 或 Claude</p>
            </div>
          </div>
          <div class="qs-step">
            <div class="qs-number">2</div>
            <div class="qs-content">
              <h4>注册账号</h4>
              <p>访问官网，使用邮箱或手机号注册，部分工具需要海外手机号验证</p>
            </div>
          </div>
          <div class="qs-step">
            <div class="qs-number">3</div>
            <div class="qs-content">
              <h4>开始第一次对话</h4>
              <p>尝试发送第一条消息，例如："你好，请介绍一下你自己"</p>
            </div>
          </div>
          <div class="qs-step">
            <div class="qs-number">4</div>
            <div class="qs-content">
              <h4>学习提示词技巧</h4>
              <p>掌握提示词技巧可以大幅提升AI回答质量，建议搜索"提示词工程"学习</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 筛选排序 -->
      <div class="filter-bar">
        <div class="filter-group">
          <label>价格：</label>
          <select v-model="filterPrice">
            <option value="all">全部</option>
            <option value="free">免费</option>
            <option value="paid">付费</option>
          </select>
        </div>
        <div class="filter-group">
          <label>排序：</label>
          <select v-model="sortBy">
            <option value="name">名称</option>
            <option value="newest">最新</option>
          </select>
        </div>
      </div>

      <!-- 组件4: 各工具详细说明 -->
      <div id="tools" v-for="category in getSceneCategories('ai-entry')" :key="category" class="category-section">
        <h2 class="category-title">{{ category }}</h2>
        
        <div v-for="tool in filterAndSortTools(getToolsByCategoryScene('ai-entry', category))" :key="tool.id" class="tool-detailed-card">
          <div class="detailed-header">
            <div class="detailed-icon">{{ tool.icon }}</div>
            <div class="detailed-info">
              <h3>{{ tool.name }}</h3>
              <p>{{ tool.description }}</p>
            </div>
          </div>
          
          <div class="detailed-tags">
            <span :class="tool.price?.includes('免费') ? 'tag tag-free' : 'tag tag-paid'">{{ tool.price }}</span>
            <span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span>
            <span v-if="tool.network" class="tag" :class="tool.network.includes('全球') ? 'tag-network-global' : (tool.network.includes('国内') ? 'tag-network-cn' : 'tag-network-local')">{{ tool.network }}</span>
            <span v-if="tool.mobile" class="tag tag-mobile">📱 {{ tool.mobile }}</span>
          </div>

          <!-- 优劣势 -->
          <div v-if="tool.pros || tool.cons" class="tool-proscons">
            <div v-if="tool.pros" class="pros">
              <span class="label">✅ 优势：</span>{{ tool.pros }}
            </div>
            <div v-if="tool.cons" class="cons">
              <span class="label">⚠️ 劣势：</span>{{ tool.cons }}
            </div>
          </div>

          <!-- OpenClaw实践 -->
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
      <div class="page-content">
      <div class="page-header">
        <span class="scene-icon-large">💼</span>
        <h1>AI办公</h1>
        <p>日常办公场景（写文档，做PPT、整理数据）AI工具推荐</p>
      </div>

      <!-- 组件1: PPT生成工作流 -->
      <div id="office-workflow" class="component-section">
        <h2 class="component-title">📊 PPT智能生成工作流</h2>
        <p class="component-desc">AI辅助制作PPT的完整流程</p>
        <div class="workflow-chain">
          <div class="chain-step">
            <div class="chain-icon">📝</div>
            <div class="chain-name">内容规划</div>
            <div class="chain-desc">确定主题和大纲</div>
            <div class="chain-arrow">→</div>
          </div>
          <div class="chain-step">
            <div class="chain-icon">🤖</div>
            <div class="chain-name">AI生成</div>
            <div class="chain-desc">Gamma/AiPPT生成</div>
            <div class="chain-arrow">→</div>
          </div>
          <div class="chain-step">
            <div class="chain-icon">✏️</div>
            <div class="chain-name">人工润色</div>
            <div class="chain-desc">调整内容和布局</div>
            <div class="chain-arrow">→</div>
          </div>
          <div class="chain-step">
            <div class="chain-icon">✨</div>
            <div class="chain-name">美化导出</div>
            <div class="chain-desc">添加动画和效果</div>
          </div>
        </div>
      </div>

      <!-- 组件2: PPT工具对比 -->
      <div id="office-comparison" class="component-section">
        <h2 class="component-title">🆚 PPT生成工具对比</h2>
        <p class="component-desc">主流AI PPT工具横向对比</p>
        <div class="comparison-grid">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>工具</th>
                <th>价格</th>
                <th>难度</th>
                <th>网络</th>
                <th>特点</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tool in getToolsByCategory('PPT生成')" :key="tool.id">
                <td>
                  <span class="tool-icon-small">{{ tool.icon }}</span>
                  {{ tool.name }}
                </td>
                <td>{{ tool.price }}</td>
                <td><span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span></td>
                <td>{{ tool.network }}</td>
                <td>{{ tool.pros?.split(',')[0] || '功能强大' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 组件3: 文档处理工具分类 -->
      <div id="office-tools" v-for="category in getSceneCategories('ai-office')" :key="category" class="category-section">
        <h2 class="category-title">📁 {{ category }}</h2>
        
        <div v-for="tool in getToolsByCategoryScene('ai-office', category)" :key="tool.id" class="tool-detailed-card">
          <div class="detailed-header">
            <div class="detailed-icon">{{ tool.icon }}</div>
            <div class="detailed-info">
              <h3>{{ tool.name }}</h3>
              <p>{{ tool.description }}</p>
            </div>
          </div>
          
          <div class="detailed-tags">
            <span :class="tool.price?.includes('免费') ? 'tag tag-free' : 'tag tag-paid'">{{ tool.price }}</span>
            <span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span>
            <span v-if="tool.network" class="tag" :class="tool.network.includes('全球') ? 'tag-network-global' : (tool.network.includes('国内') ? 'tag-network-cn' : 'tag-network-local')">{{ tool.network }}</span>
            <span v-if="tool.mobile" class="tag tag-mobile">📱 {{ tool.mobile }}</span>
          </div>

          <!-- 操作流程 -->
          <div v-if="getToolSteps(tool).length > 0" class="tool-steps">
            <h4>📋 使用步骤</h4>
            <div class="steps-container">
              <div v-for="step in getToolSteps(tool)" :key="step.step" class="step-item">
                <div class="step-number">{{ step.step }}</div>
                <div class="step-content">
                  <div class="step-title">{{ step.title }}</div>
                  <div class="step-desc">{{ step.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 优劣势 -->
          <div v-if="tool.pros || tool.cons" class="tool-proscons">
            <div v-if="tool.pros" class="pros">
              <span class="label">✅ 优势：</span>{{ tool.pros }}
            </div>
            <div v-if="tool.cons" class="cons">
              <span class="label">⚠️ 劣势：</span>{{ tool.cons }}
            </div>
          </div>

          <!-- OpenClaw实践 -->
          <div class="tool-openclaw">
            <div class="openclaw-title">🔧 OpenClaw 实践</div>
            <p class="openclaw-desc">{{ tool.openclaw_practice }}</p>
          </div>

          <a :href="tool.website" target="_blank" class="tool-link">访问官网 →</a>
        </div>
      </div>
      </div>
    </section>

    <!-- AI Create Page -->
    <section v-if="currentPage === 'ai_create'" class="scene-page">
      <div class="page-content">
      <div class="page-header">
        <span class="scene-icon-large">🎨</span>
        <h1>AI创作</h1>
        <p>写文章，做视频、生成图片 - AI创作工具推荐</p>
      </div>

      <!-- 组件1: AI视频创作工作流（工具链） -->
      <div id="create-workflow" class="component-section">
        <h2 class="component-title">🎬 AI视频创作工作流</h2>
        <p class="component-desc">从0到1的AI视频创作完整流程</p>
        <div class="workflow-chain">
          <div v-for="(step, index) in videoWorkflow" :key="step.tool" class="chain-step">
            <div class="chain-icon">{{ step.icon }}</div>
            <div class="chain-name">{{ step.tool }}</div>
            <div class="chain-desc">{{ step.desc }}</div>
            <div v-if="index < videoWorkflow.length - 1" class="chain-arrow">→</div>
          </div>
        </div>
        <div class="workflow-note">
          <p>💡 提示：以上流程可以根据实际需求灵活调整，例如可以直接用 Runway 生成视频，或使用 HeyGen 制作数字人视频</p>
        </div>
      </div>

      <!-- 组件2: AI图像生成工具对比 -->
      <div id="create-comparison" class="component-section">
        <h2 class="component-title">🖼️ AI图像生成工具对比</h2>
        <p class="component-desc">主流AI图像生成工具横向对比</p>
        <div class="comparison-grid">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>工具</th>
                <th>价格</th>
                <th>难度</th>
                <th>网络</th>
                <th>特点</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tool in getToolsByCategory('AI图像')" :key="tool.id">
                <td>
                  <span class="tool-icon-small">{{ tool.icon }}</span>
                  {{ tool.name }}
                </td>
                <td>{{ tool.price }}</td>
                <td><span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span></td>
                <td>{{ tool.network }}</td>
                <td>{{ tool.pros?.split(',')[0] || '功能强大' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 组件3: 各工具详细步骤流程 -->
      <div id="create-tools" v-for="category in getSceneCategories('ai-create')" :key="category" class="category-section">
        <h2 class="category-title">📁 {{ category }}</h2>
        
        <!-- 工具列表：详细卡片 + 步骤展示 -->
        <div v-for="tool in getToolsByCategoryScene('ai-create', category)" :key="tool.id" class="tool-detailed-card">
          <div class="detailed-header">
            <div class="detailed-icon">{{ tool.icon }}</div>
            <div class="detailed-info">
              <h3>{{ tool.name }}</h3>
              <p>{{ tool.description }}</p>
            </div>
          </div>
          
          <div class="detailed-tags">
            <span :class="tool.price?.includes('免费') ? 'tag tag-free' : 'tag tag-paid'">{{ tool.price }}</span>
            <span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span>
            <span v-if="tool.network" class="tag" :class="tool.network.includes('全球') ? 'tag-network-global' : (tool.network.includes('国内') ? 'tag-network-cn' : 'tag-network-local')">{{ tool.network }}</span>
            <span v-if="tool.mobile" class="tag tag-mobile">📱 {{ tool.mobile }}</span>
          </div>

          <!-- 操作流程组件 -->
          <div v-if="getToolSteps(tool).length > 0" class="tool-steps">
            <h4>📋 使用步骤</h4>
            <div class="steps-container">
              <div v-for="step in getToolSteps(tool)" :key="step.step" class="step-item">
                <div class="step-number">{{ step.step }}</div>
                <div class="step-content">
                  <div class="step-title">{{ step.title }}</div>
                  <div class="step-desc">{{ step.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 优劣势组件 -->
          <div v-if="tool.pros || tool.cons" class="tool-proscons">
            <div v-if="tool.pros" class="pros">
              <span class="label">✅ 优势：</span>{{ tool.pros }}
            </div>
            <div v-if="tool.cons" class="cons">
              <span class="label">⚠️ 劣势：</span>{{ tool.cons }}
            </div>
          </div>

          <!-- OpenClaw实践 -->
          <div class="tool-openclaw">
            <div class="openclaw-title">🔧 OpenClaw 实践</div>
            <p class="openclaw-desc">{{ tool.openclaw_practice }}</p>
          </div>

          <a :href="tool.website" target="_blank" class="tool-link">访问官网 →</a>
        </div>
      </div>
      </div>
    </section>

    <!-- AI Code Page -->
    <section v-if="currentPage === 'ai_code'" class="scene-page">
      <div class="page-content">
      <div class="page-header">
        <span class="scene-icon-large">💻</span>
        <h1>AI编程</h1>
        <p>代码辅助、调试、Bug修复 - AI编程工具推荐</p>
      </div>

      <!-- 组件1: AI编程工具对比 -->
      <div id="code-comparison" class="component-section">
        <h2 class="component-title">🆚 AI编程工具对比</h2>
        <p class="component-desc">主流AI编程工具横向对比，选择最适合你的</p>
        <div class="comparison-grid">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>工具</th>
                <th>价格</th>
                <th>难度</th>
                <th>平台</th>
                <th>特点</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tool in getToolsByCategory('编程工具').concat(getToolsByCategory('IDE插件'))" :key="tool.id">
                <td>
                  <span class="tool-icon-small">{{ tool.icon }}</span>
                  {{ tool.name }}
                </td>
                <td>{{ tool.price }}</td>
                <td><span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span></td>
                <td>{{ tool.mobile || '桌面端' }}</td>
                <td>{{ tool.pros?.split(',')[0] || '功能强大' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 组件2: 编程场景应对 -->
      <div id="code-scenarios" class="component-section">
        <h2 class="component-title">💡 编程场景应对</h2>
        <p class="component-desc">不同场景下如何选择合适的AI编程工具</p>
        <div class="scenes-grid">
          <div class="scene-card">
            <div class="scene-icon">🔰</div>
            <h4>新手入门</h4>
            <p>推荐 Replit AI，无需配置，直接在浏览器中学习和实践编程</p>
            <div class="scene-tools">
              <span class="tool-tag">Replit AI</span>
            </div>
          </div>
          <div class="scene-card">
            <div class="scene-icon">💼</div>
            <h4>日常开发</h4>
            <p>推荐 Cursor 或 GitHub Copilot，深度集成IDE，提升开发效率</p>
            <div class="scene-tools">
              <span class="tool-tag">Cursor</span>
              <span class="tool-tag">Copilot</span>
            </div>
          </div>
          <div class="scene-card">
            <div class="scene-icon">🔧</div>
            <h4>复杂项目</h4>
            <p>推荐 Claude Code 或 Windsurf，对代码库有深度理解能力</p>
            <div class="scene-tools">
              <span class="tool-tag">Claude Code</span>
              <span class="tool-tag">Windsurf</span>
            </div>
          </div>
          <div class="scene-card">
            <div class="scene-icon">⚡</div>
            <h4>CLI爱好者</h4>
            <p>推荐 Claude Code，终端直接使用，效率更高</p>
            <div class="scene-tools">
              <span class="tool-tag">Claude Code</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 组件3: 各工具详细说明 -->
      <div id="code-tools" v-for="category in getSceneCategories('ai-code')" :key="category" class="category-section">
        <h2 class="category-title">📁 {{ category }}</h2>
        
        <div v-for="tool in getToolsByCategoryScene('ai-code', category)" :key="tool.id" class="tool-detailed-card">
          <div class="detailed-header">
            <div class="detailed-icon">{{ tool.icon }}</div>
            <div class="detailed-info">
              <h3>{{ tool.name }}</h3>
              <p>{{ tool.description }}</p>
            </div>
          </div>
          
          <div class="detailed-tags">
            <span :class="tool.price?.includes('免费') ? 'tag tag-free' : 'tag tag-paid'">{{ tool.price }}</span>
            <span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span>
            <span class="tag tag-platform">{{ tool.mobile || '桌面端' }}</span>
          </div>

          <!-- API接入组件 -->
          <div class="tool-api">
            <h4>🔌 API接入</h4>
            <div class="api-info">
              <code>{{ tool.openclaw_practice || '通过官方API接入' }}</code>
            </div>
          </div>

          <!-- 操作流程 -->
          <div v-if="getToolSteps(tool).length > 0" class="tool-steps">
            <h4>📋 使用步骤</h4>
            <div class="steps-container">
              <div v-for="step in getToolSteps(tool)" :key="step.step" class="step-item">
                <div class="step-number">{{ step.step }}</div>
                <div class="step-content">
                  <div class="step-title">{{ step.title }}</div>
                  <div class="step-desc">{{ step.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 优劣势 -->
          <div v-if="tool.pros || tool.cons" class="tool-proscons">
            <div v-if="tool.pros" class="pros">
              <span class="label">✅ 优势：</span>{{ tool.pros }}
            </div>
            <div v-if="tool.cons" class="cons">
              <span class="label">⚠️ 劣势：</span>{{ tool.cons }}
            </div>
          </div>

          <a :href="tool.website" target="_blank" class="tool-link">访问官网 →</a>
        </div>
      </div>
      </div>
    </section>

    <!-- AI Study Page -->
    <section v-if="currentPage === 'ai_study'" class="scene-page">
      <div class="page-content">
      <div class="page-header">
        <span class="scene-icon-large">📚</span>
        <h1>AI学习</h1>
        <p>看论文、学新技术 - AI学习工具推荐</p>
      </div>

      <!-- 组件1: 学习工具组合工作流 -->
      <div id="study-workflow" class="component-section">
        <h2 class="component-title">📖 AI学术研究工作流</h2>
        <p class="component-desc">从文献搜索到论文写作的完整流程</p>
        <div class="workflow-chain">
          <div class="chain-step">
            <div class="chain-icon">🔍</div>
            <div class="chain-name">Perplexity</div>
            <div class="chain-desc">搜索相关资料</div>
            <div class="chain-arrow">→</div>
          </div>
          <div class="chain-step">
            <div class="chain-icon">📄</div>
            <div class="chain-name">Kimi</div>
            <div class="chain-desc">文档理解分析</div>
            <div class="chain-arrow">→</div>
          </div>
          <div class="chain-step">
            <div class="chain-icon">📚</div>
            <div class="chain-name">Zotero</div>
            <div class="chain-desc">文献管理</div>
            <div class="chain-arrow">→</div>
          </div>
          <div class="chain-step">
            <div class="chain-icon">✍️</div>
            <div class="chain-name">AI写作</div>
            <div class="chain-desc">论文撰写</div>
          </div>
        </div>
      </div>

      <!-- 组件2: 学习工具对比 -->
      <div id="study-comparison" class="component-section">
        <h2 class="component-title">🆚 AI学习工具对比</h2>
        <p class="component-desc">不同学习场景下的工具选择</p>
        <div class="comparison-grid">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>工具</th>
                <th>价格</th>
                <th>难度</th>
                <th>网络</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tool in getToolsByCategory('文档处理').concat(getToolsByCategory('学术研究')).concat(getToolsByCategory('AI搜索'))" :key="tool.id">
                <td>
                  <span class="tool-icon-small">{{ tool.icon }}</span>
                  {{ tool.name }}
                </td>
                <td>{{ tool.price }}</td>
                <td><span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span></td>
                <td>{{ tool.network }}</td>
                <td>{{ tool.description?.substring(0, 20) }}...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 组件3: 快速入门 - 如何用AI学习 -->
      <div id="study-scenarios" class="component-section">
        <h2 class="component-title">🚀 如何用AI辅助学习</h2>
        <p class="component-desc">不同学习场景的AI使用方案</p>
        <div class="scenes-grid">
          <div class="scene-card">
            <div class="scene-icon">📄</div>
            <h4>论文阅读</h4>
            <p>上传PDF到Kimi或Zotero+GPT，快速理解论文内容</p>
            <div class="scene-tools">
              <span class="tool-tag">Kimi</span>
              <span class="tool-tag">Zotero</span>
            </div>
          </div>
          <div class="scene-card">
            <div class="scene-icon">🔍</div>
            <h4>资料搜索</h4>
            <p>使用Perplexity搜索最新信息，获取带来源的回答</p>
            <div class="scene-tools">
              <span class="tool-tag">Perplexity</span>
            </div>
          </div>
          <div class="scene-card">
            <div class="scene-icon">📝</div>
            <h4>笔记整理</h4>
            <p>让AI帮你总结笔记、整理知识点、生成思维导图</p>
            <div class="scene-tools">
              <span class="tool-tag">Kimi</span>
              <span class="tool-tag">Claude</span>
            </div>
          </div>
          <div class="scene-card">
            <div class="scene-icon">💬</div>
            <h4>问答学习</h4>
            <p>像提问老师一样向AI提问，获得详细解答</p>
            <div class="scene-tools">
              <span class="tool-tag">ChatGPT</span>
              <span class="tool-tag">Claude</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 组件4: 各工具详细说明 -->
      <div id="study-tools" v-for="category in getSceneCategories('ai-study')" :key="category" class="category-section">
        <h2 class="category-title">📁 {{ category }}</h2>
        
        <div v-for="tool in getToolsByCategoryScene('ai-study', category)" :key="tool.id" class="tool-detailed-card">
          <div class="detailed-header">
            <div class="detailed-icon">{{ tool.icon }}</div>
            <div class="detailed-info">
              <h3>{{ tool.name }}</h3>
              <p>{{ tool.description }}</p>
            </div>
          </div>
          
          <div class="detailed-tags">
            <span :class="tool.price?.includes('免费') ? 'tag tag-free' : 'tag tag-paid'">{{ tool.price }}</span>
            <span :class="['tag', 'tag-' + tool.difficulty]">{{ tool.difficulty }}</span>
            <span v-if="tool.network" class="tag" :class="tool.network.includes('全球') ? 'tag-network-global' : (tool.network.includes('国内') ? 'tag-network-cn' : 'tag-network-local')">{{ tool.network }}</span>
            <span v-if="tool.mobile" class="tag tag-mobile">📱 {{ tool.mobile }}</span>
          </div>

          <!-- 操作流程 -->
          <div v-if="getToolSteps(tool).length > 0" class="tool-steps">
            <h4>📋 使用步骤</h4>
            <div class="steps-container">
              <div v-for="step in getToolSteps(tool)" :key="step.step" class="step-item">
                <div class="step-number">{{ step.step }}</div>
                <div class="step-content">
                  <div class="step-title">{{ step.title }}</div>
                  <div class="step-desc">{{ step.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- OpenClaw实践 -->
          <div class="tool-openclaw">
            <div class="openclaw-title">🔧 OpenClaw 实践</div>
            <p class="openclaw-desc">{{ tool.openclaw_practice }}</p>
          </div>

          <a :href="tool.website" target="_blank" class="tool-link">访问官网 →</a>
        </div>
      </div>
      </div>
    </section>

    <!-- Visual Components Page -->
    <section v-if="currentPage === 'components'" class="components-page">
      <div class="page-header">
        <span class="scene-icon-large">🎯</span>
        <h1>视觉组件展示</h1>
        <p>AI工具导航网站使用的可视化组件库</p>
      </div>

      <div class="components-intro">
        <p>本页面展示项目中使用的12种视觉组件设计，每个组件都经过优化以提升用户体验。</p>
      </div>

      <!-- Component 1: 基础卡片 -->
      <div class="component-section">
        <h2 class="component-title">1. 基础卡片组件</h2>
        <p class="component-desc">最简单的工具展示形式，适合快速浏览</p>
        <div class="component-demo">
          <div class="tool-card" style="max-width: 300px;">
            <div class="tool-header">
              <span class="tool-icon">💬</span>
              <span class="tool-name">ChatGPT</span>
            </div>
            <p class="tool-desc">OpenAI开发的AI对话工具，适合日常问答和内容创作</p>
            <div class="tool-tags">
              <span class="tag tag-free">免费</span>
              <span class="tag tag-入门">入门</span>
            </div>
          </div>
        </div>
        <div class="component-usage">
          <h4>使用场景</h4>
          <p>工具列表、分类展示、快速预览</p>
        </div>
      </div>

      <!-- Component 2: 详细说明 -->
      <div class="component-section">
        <h2 class="component-title">2. 详细说明组件</h2>
        <p class="component-desc">左图右文详细说明，适合单一工具深度展示</p>
        <div class="component-demo detailed-demo">
          <div class="detailed-card">
            <div class="detailed-icon">💬</div>
            <div class="detailed-content">
              <h3>ChatGPT</h3>
              <p>OpenAI开发的AI对话工具，适合日常问答和内容创作</p>
              <div class="tool-tags">
                <span class="tag tag-free">免费</span>
                <span class="tag tag-入门">入门</span>
                <span class="tag tag-network-global">🌐 全球</span>
              </div>
              <div class="pros-cons">
                <div class="pros">✅ 优势：功能全面、社区活跃</div>
                <div class="cons">⚠️ 劣势：需要网络工具</div>
              </div>
            </div>
          </div>
        </div>
        <div class="component-usage">
          <h4>使用场景</h4>
          <p>工具详情页、深度介绍、完整信息展示</p>
        </div>
      </div>

      <!-- Component 3: 多工具对比 -->
      <div class="component-section">
        <h2 class="component-title">3. 多工具对比组件</h2>
        <p class="component-desc">多个工具横向对比，适合同类型工具选择</p>
        <div class="component-demo">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>工具</th>
                <th>价格</th>
                <th>网络</th>
                <th>移动端</th>
                <th>推荐</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ChatGPT</td>
                <td>免费/付费</td>
                <td>🌐 全球</td>
                <td>iOS/Android</td>
                <td>⭐⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td>Claude</td>
                <td>免费</td>
                <td>🌐 全球</td>
                <td>iOS/Android</td>
                <td>⭐⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td>Kimi</td>
                <td>免费</td>
                <td>🇨🇳 国内</td>
                <td>iOS/Android</td>
                <td>⭐⭐⭐⭐</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="component-usage">
          <h4>使用场景</h4>
          <p>问答式AI对比、PPT工具对比、选择困难时参考</p>
        </div>
      </div>

      <!-- Component 4: 操作流程 -->
      <div class="component-section">
        <h2 class="component-title">4. 操作流程组件</h2>
        <p class="component-desc">步骤式流程展示，适合工具使用教学</p>
        <div class="component-demo">
          <div class="workflow-steps">
            <div class="workflow-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>输入主题</h4>
                <p>用一句话描述PPT主题</p>
              </div>
            </div>
            <div class="step-arrow">→</div>
            <div class="workflow-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>AI生成大纲</h4>
                <p>AI自动生成PPT大纲结构</p>
              </div>
            </div>
            <div class="step-arrow">→</div>
            <div class="workflow-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>选择模板</h4>
                <p>从模板库选择风格</p>
              </div>
            </div>
            <div class="step-arrow">→</div>
            <div class="workflow-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>自动生成</h4>
                <p>AI自动填充内容</p>
              </div>
            </div>
          </div>
        </div>
        <div class="component-usage">
          <h4>使用场景</h4>
          <p>工作流展示、操作步骤、教学指南</p>
        </div>
      </div>

      <!-- Component 5: 工具组合流程 -->
      <div class="component-section">
        <h2 class="component-title">5. 工具组合流程组件</h2>
        <p class="component-desc">展示多个工具组合使用的工作流</p>
        <div class="component-demo">
          <div class="tool-chain">
            <div class="chain-step">
              <span class="chain-icon">💬</span>
              <span class="chain-name">ChatGPT</span>
              <span class="chain-desc">生成文案脚本</span>
            </div>
            <div class="chain-arrow">→</div>
            <div class="chain-step">
              <span class="chain-icon">🎨</span>
              <span class="chain-name">Midjourney</span>
              <span class="chain-desc">生成配图</span>
            </div>
            <div class="chain-arrow">→</div>
            <div class="chain-step">
              <span class="chain-icon">🎬</span>
              <span class="chain-name">Runway</span>
              <span class="chain-desc">生成视频</span>
            </div>
            <div class="chain-arrow">→</div>
            <div class="chain-step">
              <span class="chain-icon">🎤</span>
              <span class="chain-name">ElevenLabs</span>
              <span class="chain-desc">AI配音</span>
            </div>
          </div>
        </div>
        <div class="component-usage">
          <h4>使用场景</h4>
          <p>AI视频创作、短剧制作、多工具协同</p>
        </div>
      </div>

      <!-- Component 6: 场景应对 -->
      <div class="component-section">
        <h2 class="component-title">6. 场景应对组件</h2>
        <p class="component-desc">展示单一工具在不同场景的应用</p>
        <div class="component-demo">
          <div class="scene-cards">
            <div class="scene-card">
              <span class="scene-icon">📝</span>
              <h4>写作场景</h4>
              <p>文章写作、博客内容、营销文案</p>
            </div>
            <div class="scene-card">
              <span class="scene-icon">💻</span>
              <h4>编程场景</h4>
              <p>代码补全、Bug修复、技术文档</p>
            </div>
            <div class="scene-card">
              <span class="scene-icon">🎨</span>
              <h4>创意场景</h4>
              <p>头脑风暴、灵感激发、故事构思</p>
            </div>
          </div>
        </div>
        <div class="component-usage">
          <h4>使用场景</h4>
          <p>通用工具（如ChatGPT）多场景展示</p>
        </div>
      </div>

      <!-- Component 7-12: 简要展示 -->
      <div class="component-section">
        <h2 class="component-title">7-12. 其他组件</h2>
        <div class="other-components">
          <div class="other-component">
            <h4>7. 价格方案组件</h4>
            <p>展示工具的价格方案（免费版/付费版/企业版）</p>
          </div>
          <div class="other-component">
            <h4>8. 优劣势雷达图组件</h4>
            <p>可视化展示工具各项指标（功能丰富度、易用性、稳定性、性价比）</p>
          </div>
          <div class="other-component">
            <h4>9. 快速入门组件</h4>
            <p>新手指南，账号注册、网络设置、第一次使用步骤</p>
          </div>
          <div class="other-component">
            <h4>10. API接入组件</h4>
            <p>开发者向，展示API端点、调用示例、认证方式</p>
          </div>
          <div class="other-component">
            <h4>11. 移动端适配展示组件</h4>
            <p>展示工具的移动端使用方式、手机Mockup截图</p>
          </div>
          <div class="other-component">
            <h4>12. 生态集成组件</h4>
            <p>展示工具的生态集成能力（支持平台、API开放程度、插件生态）</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <a @click="navigate('design')" style="color: #06b6d4;">{{ content.nav.design }}</a>
          <a @click="navigate('components')" style="color: #8b5cf6;">视觉组件</a>
          <a href="https://github.com/reg-liu/OpenclawVue" target="_blank">GitHub</a>
          <a href="https://openclaw.ai" target="_blank">OpenClaw</a>
        </div>
        <p class="footer-copy">© 2026 AI工具导航. All rights reserved.</p>
      </div>
    </footer>
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
.hero-content { position: relative; width: 1200px; padding: 40px 24px; }
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
.section-container { width: 1200px; margin: 0 auto; }
.section-title { font-size: 32px; font-weight: 700; margin-bottom: 12px; text-align: center; }
.section-subtitle { text-align: center; color: #71717a; margin-bottom: 40px; }

/* 产品卡片 - 交替布局 */
.product-cards-alternate { display: flex; flex-direction: column; gap: 24px; width: 800px; margin: 0 auto 60px; }
.product-cards-alternate .product-card-row { display: flex; align-items: center; gap: 40px; padding: 32px; background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%); border: 1px solid #2d2d4a; border-radius: 20px; cursor: pointer; transition: all 0.3s; }
.product-cards-alternate .product-card-row:hover { transform: translateY(-4px); border-color: #8b5cf6; box-shadow: 0 20px 40px rgba(139, 92, 246, 0.15); }
.product-cards-alternate .product-card-row.reverse { flex-direction: row-reverse; }
.product-cards-alternate .card-image { font-size: 64px; flex-shrink: 0; width: 120px; text-align: center; padding: 20px 0; }
.product-cards-alternate .card-content { flex: 1; min-width: 0; text-align: center; }
.product-cards-alternate .card-content h3 { font-size: 28px; margin-bottom: 12px; }
.product-cards-alternate .card-content p { color: #94a3b8; font-size: 15px; line-height: 1.6; margin-bottom: 16px; }
.product-cards-alternate .card-tags { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.product-cards-alternate .card-tags span { padding: 6px 14px; background: rgba(139, 92, 246, 0.15); color: #a78bfa; border-radius: 20px; font-size: 13px; }

/* 简洁工具卡片 */
.featured-tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-top: 40px; }
.tool-simple-card { display: flex; align-items: center; gap: 16px; padding: 20px; background: #1a1a2e; border: 1px solid #2d2d4a; border-radius: 12px; cursor: pointer; transition: all 0.2s; }
.tool-simple-card:hover { border-color: #22d3ee; transform: translateY(-2px); }
.tool-simple-card .simple-icon { font-size: 36px; flex-shrink: 0; }
.tool-simple-card .simple-info { flex: 1; min-width: 0; }
.tool-simple-card .simple-info h4 { font-size: 16px; margin-bottom: 4px; }
.tool-simple-card .simple-info p { font-size: 13px; color: #71717a; line-height: 1.4; }
.tool-simple-card .simple-meta { flex-shrink: 0; }
.tool-simple-card .price-tag { padding: 4px 10px; border-radius: 4px; font-size: 12px; }
.tool-simple-card .price-tag.free { background: rgba(16, 185, 129, 0.15); color: #10b981; }
.tool-simple-card .price-tag.paid { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }

/* 筛选排序栏 */
.filter-bar { display: flex; gap: 24px; justify-content: flex-end; padding: 16px 24px; background: #1a1a2e; border-radius: 12px; margin-bottom: 24px; }
.filter-bar .filter-group { display: flex; align-items: center; gap: 8px; }
.filter-bar label { color: #94a3b8; font-size: 14px; }
.filter-bar select { padding: 8px 16px; background: #0f0f1a; border: 1px solid #2d2d4a; border-radius: 6px; color: #fff; font-size: 14px; cursor: pointer; }
.filter-bar select:hover { border-color: #8b5cf6; }

@media (max-width: 768px) {
  .product-cards-alternate .product-card-row { flex-direction: column !important; gap: 20px; padding: 24px; }
  .product-cards-alternate .card-image { width: auto; font-size: 48px; }
}

/* 首页产品卡片 */
.home-product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 1100px; margin: 0 auto; }
.home-product-card { background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%); border: 1px solid #2d2d4a; border-radius: 20px; padding: 32px; cursor: pointer; transition: all 0.3s; }
.home-product-card:hover { transform: translateY(-8px); border-color: #8b5cf6; box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2); }
.home-product-card .product-icon { font-size: 48px; margin-bottom: 16px; }
.home-product-card h3 { font-size: 24px; margin-bottom: 12px; }
.home-product-card p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
.home-product-card .product-stats { display: flex; gap: 16px; margin-bottom: 16px; }
.home-product-card .product-stats span { padding: 4px 12px; background: #0f0f1a; border-radius: 20px; font-size: 12px; color: #22d3ee; }
.home-product-card .product-components { display: flex; gap: 8px; flex-wrap: wrap; }
.home-product-card .comp-tag { padding: 4px 10px; background: rgba(139, 92, 246, 0.15); color: #a78bfa; border-radius: 4px; font-size: 12px; }

/* 视觉组件预览 */
.components-preview { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; max-width: 900px; margin: 0 auto; }
.preview-card { background: #1a1a2e; border: 1px solid #2d2d4a; border-radius: 12px; padding: 24px 32px; display: flex; flex-direction: column; align-items: center; gap: 12px; min-width: 120px; cursor: pointer; transition: all 0.2s; }
.preview-card:hover { border-color: #22d3ee; transform: translateY(-4px); }
.preview-icon { font-size: 32px; }
.preview-card span:last-child { font-size: 14px; color: #94a3b8; }
.preview-more { background: transparent; border: 1px dashed #2d2d4a; border-radius: 12px; padding: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
.preview-more:hover { border-color: #22d3ee; }
.preview-more span { color: #22d3ee; font-size: 14px; }

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
.section-subtitle { text-align: center; color: #71717a; margin-bottom: 48px; }
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
.scene-page { padding: 120px 24px 80px; min-height: 100vh; max-width: 800px; margin: 0 auto; }
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

.category-section { margin-bottom: 48px; max-width: 800px; margin-left: auto; margin-right: auto; }
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
.tool-card .tag-network-global { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.tool-card .tag-network-cn { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.tool-card .tag-network-local { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
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

/* Visual Components Page */
.components-page { max-width: 1200px; margin: 0 auto; padding: 120px 24px 60px; }
.components-page .page-header { text-align: center; margin-bottom: 48px; }
.components-page .scene-icon-large { font-size: 64px; display: block; margin-bottom: 16px; }
.components-page h1 { font-size: 42px; font-weight: 800; margin-bottom: 12px; }
.components-page .page-header p { color: #94a3b8; font-size: 18px; max-width: 600px; margin: 0 auto; }

.components-intro { background: #1a1a2e; padding: 24px; border-radius: 12px; margin-bottom: 48px; text-align: center; }
.components-intro p { color: #94a3b8; font-size: 16px; }

.component-section { margin-bottom: 64px; padding: 32px; background: #1a1a2e; border-radius: 16px; max-width: 800px; margin-left: auto; margin-right: auto; }
.component-title { font-size: 28px; font-weight: 700; margin-bottom: 8px; color: #fff; }
.component-desc { color: #94a3b8; margin-bottom: 24px; font-size: 15px; }
.component-demo { background: #0f0f1a; padding: 32px; border-radius: 12px; margin-bottom: 20px; }

.component-usage { background: rgba(139, 92, 246, 0.1); padding: 16px; border-radius: 8px; }
.component-usage h4 { color: #8b5cf6; font-size: 14px; margin-bottom: 8px; }
.component-usage p { color: #94a3b8; font-size: 14px; }

/* Detailed Card */
.detailed-demo { padding: 24px; }
.detailed-card { display: flex; gap: 24px; align-items: flex-start; }
.detailed-icon { width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 36px; flex-shrink: 0; }
.detailed-content { flex: 1; }
.detailed-content h3 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
.detailed-content p { color: #94a3b8; margin-bottom: 16px; }
.detailed-content .pros-cons { margin-top: 16px; }
.detailed-content .pros { color: #10b981; font-size: 14px; margin-bottom: 4px; }
.detailed-content .cons { color: #f59e0b; font-size: 14px; }

/* Comparison Table */
.comparison-table { width: 100%; border-collapse: collapse; }
.comparison-table th, .comparison-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #262626; }
.comparison-table th { background: #262626; font-weight: 600; color: #fff; }
.comparison-table td { color: #94a3b8; }
.comparison-table tr:hover td { background: #1a1a2e; }

/* Workflow Steps */
.workflow-steps { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
.workflow-step { display: flex; align-items: center; gap: 16px; background: #1a1a2e; padding: 20px; border-radius: 12px; min-width: 200px; }
.step-number { width: 40px; height: 40px; background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
.step-content h4 { font-size: 16px; margin-bottom: 4px; }
.step-content p { color: #94a3b8; font-size: 13px; }
.step-arrow { color: #8b5cf6; font-size: 24px; }

/* Tool Chain */
.tool-chain { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }
.chain-step { display: flex; flex-direction: column; align-items: center; gap: 8px; background: #1a1a2e; padding: 20px; border-radius: 12px; min-width: 120px; }
.chain-icon { font-size: 32px; }
.chain-name { font-weight: 600; font-size: 14px; }
.chain-desc { color: #94a3b8; font-size: 12px; text-align: center; }
.chain-arrow { color: #8b5cf6; font-size: 24px; }

/* Scene Cards */
.scene-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.scene-card { background: #1a1a2e; padding: 24px; border-radius: 12px; text-align: center; }
.scene-card .scene-icon { font-size: 40px; display: block; margin-bottom: 12px; }
.scene-card h4 { font-size: 18px; margin-bottom: 8px; }
.scene-card p { color: #94a3b8; font-size: 14px; }

/* Other Components */
.other-components { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.other-component { background: #0f0f1a; padding: 20px; border-radius: 8px; }
.other-component h4 { color: #8b5cf6; font-size: 16px; margin-bottom: 8px; }
.other-component p { color: #94a3b8; font-size: 14px; }

@media (max-width: 768px) {
  .components-page { padding: 100px 16px 40px; }
  .component-section { padding: 20px; }
  .detailed-card { flex-direction: column; }
  .scene-cards { grid-template-columns: 1fr; }
  .other-components { grid-template-columns: 1fr; }
  .workflow-steps { flex-direction: column; }
  .step-arrow { transform: rotate(90deg); }
  .tool-chain { flex-direction: column; }
  .chain-arrow { transform: rotate(90deg); }
}

/* Footer */
.footer { background: #0a0a0a; border-top: 1px solid #262626; padding: 40px 24px; margin-top: 60px; }
.footer-content { max-width: 1100px; margin: 0 auto; text-align: center; }
.footer-links { display: flex; justify-content: center; gap: 24px; margin-bottom: 16px; flex-wrap: wrap; }
.footer-links a { color: #71717a; text-decoration: none; font-size: 14px; cursor: pointer; transition: color 0.2s; }
.footer-links a:hover { color: #fff; }
.footer-copy { color: #52525b; font-size: 13px; }

/* 产品页新增组件样式 */
.component-section { background: #1a1a2e; border-radius: 16px; padding: 32px; margin-bottom: 40px; }
.component-section .component-title { font-size: 24px; font-weight: 700; margin-bottom: 8px; color: #fff; }
.component-section .component-desc { color: #94a3b8; margin-bottom: 24px; font-size: 15px; }

/* 工具链组件 */
.workflow-chain { display: flex; align-items: flex-start; justify-content: center; gap: 8px; flex-wrap: wrap; padding: 24px; background: #0f0f1a; border-radius: 12px; }
.workflow-chain .chain-step { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; background: #1a1a2e; border-radius: 12px; min-width: 120px; position: relative; }
.workflow-chain .chain-icon { font-size: 32px; }
.workflow-chain .chain-name { font-weight: 600; font-size: 14px; text-align: center; }
.workflow-chain .chain-desc { color: #94a3b8; font-size: 12px; text-align: center; }
.workflow-chain .chain-arrow { position: absolute; right: -20px; top: 50%; transform: translateY(-50%); color: #8b5cf6; font-size: 20px; font-weight: bold; }
.workflow-note { margin-top: 20px; padding: 16px; background: rgba(139, 92, 246, 0.1); border-radius: 8px; }
.workflow-note p { color: #94a3b8; font-size: 14px; margin: 0; }

/* 对比表格 */
.comparison-grid { overflow-x: auto; max-width: 800px; margin: 0 auto; }
.comparison-grid .comparison-table { width: 100%; border-collapse: collapse; }
.comparison-grid .comparison-table th, .comparison-grid .comparison-table td { padding: 14px 16px; text-align: left; border-bottom: 1px solid #262626; }
.comparison-grid .comparison-table th { background: #262626; font-weight: 600; color: #fff; }
.comparison-grid .comparison-table td { color: #94a3b8; }
.comparison-grid .comparison-table tr:hover td { background: #1a1a2e; }
.tool-icon-small { margin-right: 8px; }

/* 详细工具卡片 */
.tool-detailed-card { background: #1f1f3d; border: 1px solid #2d2d4a; border-radius: 16px; padding: 28px; margin-bottom: 24px; transition: all 0.3s; width: 100%; max-width: 800px; margin-left: auto; margin-right: auto; box-sizing: border-box; }
.tool-detailed-card:hover { border-color: #10b981; }
.tool-detailed-card .detailed-header { display: flex; gap: 20px; align-items: center; margin-bottom: 20px; justify-content: center; }
.tool-detailed-card .detailed-icon { width: 64px; height: 64px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 32px; flex-shrink: 0; }
.tool-detailed-card .detailed-info { text-align: center; }
.tool-detailed-card .detailed-info h3 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
.tool-detailed-card .detailed-info p { color: #94a3b8; font-size: 15px; line-height: 1.6; }
.tool-detailed-card .detailed-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; justify-content: center; }
.tool-detailed-card .tag { padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: 500; }
.tool-detailed-card .tag-free { background: rgba(16, 185, 129, 0.15); color: #10b981; }
.tool-detailed-card .tag-paid { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
.tool-detailed-card .tag-入门 { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
.tool-detailed-card .tag-进阶 { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
.tool-detailed-card .tag-高级 { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
.tool-detailed-card .tag-network-global { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
.tool-detailed-card .tag-network-cn { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
.tool-detailed-card .tag-mobile { background: rgba(139, 92, 246, 0.15); color: #8b5cf6; }

/* 步骤组件 */
.tool-steps { margin-bottom: 20px; }
.tool-steps h4 { font-size: 16px; margin-bottom: 16px; color: #fff; }
.tool-steps .steps-container { display: flex; gap: 16px; flex-wrap: wrap; }
.tool-steps .step-item { display: flex; gap: 12px; align-items: flex-start; flex: 1; min-width: 200px; padding: 16px; background: #1a1a2e; border-radius: 12px; }
.tool-steps .step-number { width: 32px; height: 32px; background: linear-gradient(135deg, #8b5cf6, #a855f7); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
.tool-steps .step-title { font-weight: 600; font-size: 14px; margin-bottom: 4px; }
.tool-steps .step-desc { color: #94a3b8; font-size: 13px; }

/* 优劣势 */
.tool-detailed-card .tool-proscons { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; padding: 16px; background: #1a1a2e; border-radius: 8px; }
.tool-detailed-card .pros { color: #10b981; font-size: 14px; }
.tool-detailed-card .cons { color: #f59e0b; font-size: 14px; }
.tool-detailed-card .label { font-weight: 600; }

/* OpenClaw实践 */
.tool-detailed-card .tool-openclaw { padding: 16px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 20px; }
.tool-detailed-card .openclaw-title { font-size: 14px; color: #10b981; font-weight: 600; margin-bottom: 6px; }
.tool-detailed-card .openclaw-desc { font-size: 13px; color: #94a3b8; }

.tool-detailed-card .tool-link { display: inline-block; color: #10b981; text-decoration: none; font-size: 14px; font-weight: 500; }
.tool-detailed-card .tool-link:hover { text-decoration: underline; }

/* 编程场景应对 */
.scenes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
.scenes-grid .scene-card { background: #0f0f1a; padding: 24px; border-radius: 12px; }
.scenes-grid .scene-icon { font-size: 32px; margin-bottom: 12px; }
.scenes-grid h4 { font-size: 18px; margin-bottom: 8px; }
.scenes-grid p { color: #94a3b8; font-size: 14px; margin-bottom: 16px; line-height: 1.5; }
.scenes-grid .scene-tools { display: flex; gap: 8px; flex-wrap: wrap; }
.scenes-grid .tool-tag { padding: 4px 12px; background: #8b5cf6; color: #fff; border-radius: 4px; font-size: 12px; }

/* API接入组件 */
.tool-api { margin-bottom: 20px; padding: 16px; background: #1a1a2e; border-radius: 8px; }
.tool-api h4 { font-size: 14px; color: #8b5cf6; margin-bottom: 8px; }
.tool-api code { font-family: monospace; font-size: 13px; color: #10b981; background: #0f0f1a; padding: 8px 12px; border-radius: 4px; display: block; }
.tag-platform { background: rgba(139, 92, 246, 0.15); color: #8b5cf6; }

/* 快速入门 */
.quick-start-steps { display: flex; flex-direction: column; gap: 20px; }
.quick-start-steps .qs-step { display: flex; gap: 20px; padding: 24px; background: #0f0f1a; border-radius: 12px; }
.quick-start-steps .qs-number { width: 48px; height: 48px; background: linear-gradient(135deg, #22d3ee, #06b6d4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700; flex-shrink: 0; }
.quick-start-steps .qs-content h4 { font-size: 18px; margin-bottom: 8px; }
.quick-start-steps .qs-content p { color: #94a3b8; font-size: 14px; line-height: 1.6; }

/* 页面右侧导航 */
.page-toc { position: fixed; right: 24px; top: 180px; background: #1a1a2e; border: 1px solid #2d2d4a; border-radius: 12px; padding: 16px; z-index: 50; width: 180px; }
.page-toc .toc-title { font-size: 12px; color: #71717a; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
.page-toc .toc-link { display: block; padding: 10px 14px; color: #94a3b8; text-decoration: none; font-size: 13px; border-radius: 6px; transition: all 0.2s; margin-bottom: 4px; }
.page-toc .toc-link:hover { background: #2d2d4a; color: #fff; }
.page-toc .toc-link.active { background: #8b5cf6; color: #fff; }

.scene-page.with-toc { padding-right: 240px; }

@media (max-width: 1200px) {
  .page-toc { display: none; }
  .scene-page.with-toc { padding-right: 24px; }
}

@media (max-width: 768px) {
  .component-section { padding: 20px; }
  .workflow-chain { flex-direction: column; align-items: center; }
  .workflow-chain .chain-arrow { display: none; }
  .tool-detailed-card .detailed-header { flex-direction: column; }
  .tool-detailed-card .detailed-icon { width: 100%; height: auto; padding: 16px; }
  .tool-steps .steps-container { flex-direction: column; }
  .tool-steps .step-item { min-width: auto; }
}
</style>
