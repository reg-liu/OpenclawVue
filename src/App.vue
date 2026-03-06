<script setup>
import { ref, onMounted } from 'vue'
import data from './data.json'

const currentPage = ref('home')
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const content = ref(data)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})

const navigate = (page) => {
  currentPage.value = page
  mobileMenuOpen.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const selectedCategory = ref(content.value?.questions?.categories?.[0]?.id || 'frontend')
</script>

<template>
  <div class="app">
    <!-- Nav -->
    <nav class="nav" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <a class="logo" @click="navigate('home')">
          <span class="logo-icon">&#9670;</span>
          <span>Portfolio</span>
        </a>
        <div class="nav-links">
          <a :class="{ active: currentPage === 'home' }" @click="navigate('home')">{{ content.nav.home }}</a>
          <a :class="{ active: currentPage === 'practice' }" @click="navigate('practice')">{{ content.nav.practice }}</a>
          <a :class="{ active: currentPage === 'questions' }" @click="navigate('questions')">{{ content.nav.questions }}</a>
          <a :class="{ active: currentPage === 'hot' }" @click="navigate('hot')">{{ content.nav.hot }}</a>
          <a :class="{ active: currentPage === 'tools' }" @click="navigate('tools')">{{ content.nav.tools }}</a>
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
      <a @click="navigate('practice')">{{ content.nav.practice }}</a>
      <a @click="navigate('questions')">{{ content.nav.questions }}</a>
      <a @click="navigate('hot')">{{ content.nav.hot }}</a>
      <a @click="navigate('tools')">{{ content.nav.tools }}</a>
    </div>

    <!-- Home -->
    <section v-if="currentPage === 'home'" class="home">
      <div class="hero">
        <div class="hero-bg"></div>
        <div class="hero-content">
          <p class="hero-label">{{ content.hero.label }}</p>
          <h1 class="hero-title">
            {{ content.hero.title }}<br/>
            <span class="gradient">{{ content.hero.subtitle }}</span>
          </h1>
          <p class="hero-desc">{{ content.hero.desc }}</p>
          <div class="hero-btns">
            <button class="btn-primary" @click="navigate('practice')">{{ content.home.viewProjects }}</button>
            <button class="btn-outline" @click="navigate('questions')">{{ content.home.knowledgeBase }}</button>
          </div>
        </div>
      </div>

      <!-- Flow Section -->
      <div class="section flow-section">
        <div class="section-container">
          <h2 class="section-title">{{ content.home.flow.title }}</h2>
          <div class="flow-grid">
            <div v-for="(step, index) in content.home.flow.steps" :key="step.num" class="flow-step">
              <div class="step-arrow" v-if="index > 0">→</div>
              <div class="step-num">{{ step.num }}</div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="section about-section">
        <div class="section-container">
          <h2 class="section-title">{{ content.home.about.title }}</h2>
          <div class="features">
            <div v-for="feature in content.home.about.features" :key="feature.title" class="feature-card">
              <div class="feature-icon">&#10022;</div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="section tech-section">
        <div class="section-container">
          <h2 class="section-title">{{ content.home.tech.title }}</h2>
          <div class="tech-grid">
            <div class="tech-item"><span style="font-size:28px">🦞</span><span>OpenClaw</span></div>
            <div class="tech-item"><img src="https://vuejs.org/logo.svg" alt="Vue"/><span>Vue 3</span></div>
            <div class="tech-item"><img src="https://vitejs.dev/logo.svg" alt="Vite"/><span>Vite</span></div>
            <div class="tech-item"><img src="https://element-plus.org/images/element-plus-logo.svg" alt="Element"/><span>Element Plus</span></div>
            <div class="tech-item"><img src="https://www.feishu.cn/favicon.ico" alt="Feishu"/><span>飞书</span></div>
            <div class="tech-item"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub"/><span>GitHub</span></div>
            <div class="tech-item"><span style="font-size:28px">☁️</span><span>Vercel</span></div>
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
          <div class="knowledge-a">{{ item.a }}</div>
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
        <div v-for="tool in content.tools.list" :key="tool.name" class="tool-card" :class="{ 'has-link': tool.url }">
          <a v-if="tool.url" :href="tool.url" target="_blank" class="item-link"></a>
          <div class="tool-header">
            <span class="tool-icon">{{ tool.icon }}</span>
            <div class="tool-info">
              <h3>{{ tool.name }}</h3>
              <span class="tool-type">{{ tool.type }}</span>
            </div>
          </div>
          <p class="tool-desc">{{ tool.desc }}</p>
          <div class="tool-highlights">
            <span v-for="h in tool.highlights" :key="h" class="highlight-tag">{{ h }}</span>
          </div>
          <div class="tool-relation">
            <span class="relation-label">与 OpenClaw 关系：</span>
            <span class="relation-text">{{ tool.relation }}</span>
          </div>
        </div>
      </div>
      <div class="comparison-section" v-if="content.tools.comparison">
        <h2 class="comparison-title">{{ content.tools.comparison.title }}</h2>
        <div class="comparison-table">
          <div class="comparison-row header">
            <span class="comparison-feature">{{ content.tools.comparison.items[0].feature }}</span>
            <span>OpenClaw</span>
            <span>Codex</span>
            <span>Claude</span>
            <span>Cursor</span>
          </div>
          <div v-for="item in content.tools.comparison.items" :key="item.feature" class="comparison-row">
            <span class="comparison-feature">{{ item.feature }}</span>
            <span>{{ item.openclaw }}</span>
            <span>{{ item.codex }}</span>
            <span>{{ item.claude }}</span>
            <span>{{ item.cursor }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-logo">&#9670; Portfolio</div>
        <p>2026 {{ content.footer.copyright }}</p>
        <div class="footer-links">
          <a href="https://github.com/reg-liu/OpenclawVue" target="_blank">{{ content.footer.github }}</a>
          <a href="https://openclaw.ai" target="_blank">{{ content.footer.openclaw }}</a>
        </div>
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
.mobile-menu { display: none; position: fixed; top: 70px; left: 0; right: 0; background: #0d0d0d; padding: 20px; border-bottom: 1px solid #222; }
.mobile-menu a { display: block; padding: 14px; color: #a1a1aa; text-decoration: none; border-bottom: 1px solid #1a1a1a; }

/* Hero */
.home { padding-top: 80px; }
.hero { position: relative; min-height: 90vh; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, #1a1a2e 0%, #0d0d0d 70%); }
.hero-bg::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 30% 50%, rgba(34,211,238,0.15) 0%, transparent 40%), radial-gradient(circle at 70% 50%, rgba(168,85,247,0.15) 0%, transparent 40%); }
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
.feature-card { padding: 32px; background: #1a1a1a; border-radius: 16px; border: 1px solid #262626; transition: all 0.3s; }
.feature-card:hover { transform: translateY(-4px); border-color: #22d3ee; }
.feature-icon { width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(34,211,238,0.2), rgba(168,85,247,0.2)); border-radius: 14px; color: #22d3ee; font-size: 24px; margin-bottom: 20px; }
.feature-card h3 { font-size: 20px; margin-bottom: 12px; }
.feature-card p { color: #a1a1aa; font-size: 14px; }

/* Tech */
.tech-section { background: #171717; }
.flow-section { background: linear-gradient(180deg, #171717 0%, #1a1a1a 100%); padding: 80px 24px; }
.flow-grid { max-width: 1200px; margin: 0 auto; display: flex; justify-content: center; align-items: flex-start; gap: 0; }
.flow-step { text-align: center; padding: 24px 20px; position: relative; flex: 1; max-width: 220px; }
.step-arrow { position: absolute; left: -20px; top: 50%; transform: translateY(-50%); font-size: 24px; color: #22d3ee; font-weight: bold; }
.flow-step { text-align: center; padding: 24px 16px; }
.step-num { font-size: 48px; font-weight: 700; color: #22d3ee; opacity: 0.3; margin-bottom: 12px; }
.flow-step h3 { font-size: 18px; margin-bottom: 10px; }
.flow-step p { color: #a1a1aa; font-size: 13px; line-height: 1.6; }
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
.knowledge-q { font-weight: 600; font-size: 16px; margin-bottom: 10px; }
.knowledge-a { color: #a1a1aa; font-size: 14px; line-height: 1.7; }

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
.tool-info h3 { font-size: 20px; margin: 0; }
.tool-type { color: #22d3ee; font-size: 13px; }
.tool-desc { color: #a1a1aa; font-size: 14px; margin-bottom: 16px; }
.tool-highlights { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.highlight-tag { background: #262626; color: #d4d4d8; padding: 4px 10px; border-radius: 6px; font-size: 12px; }
.tool-relation { background: #1a1a2e; border: 1px solid #a78bfa; border-radius: 10px; padding: 12px; }
.relation-label { color: #a78bfa; font-size: 12px; font-weight: 600; }
.relation-text { color: #d4d4d8; font-size: 13px; }
.comparison-section { margin-top: 60px; }
.comparison-title { font-size: 28px; text-align: center; margin-bottom: 32px; }
.comparison-table { max-width: 900px; margin: 0 auto; overflow-x: auto; }
.comparison-row { display: grid; grid-template-columns: 120px repeat(5, 1fr); gap: 12px; padding: 14px 16px; border-bottom: 1px solid #262626; align-items: center; }
.comparison-row.header { background: #1a1a1a; font-weight: 600; border-radius: 10px 10px 0 0; }
.comparison-row.header span:not(:first-child) { text-align: center; }
.comparison-feature { color: #a1a1aa; }
.comparison-row span:not(:first-child) { text-align: center; color: #d4d4d8; font-size: 14px; }

@media (max-width: 768px) {
  .tools-grid { grid-template-columns: 1fr; }
  .comparison-row { grid-template-columns: 100px repeat(4, 1fr); font-size: 12px; }
}

/* Hot Page */
.hot-page { padding: 120px 24px 80px; min-height: 100vh; }
.hot-intro { text-align: center; max-width: 800px; margin: 0 auto 48px; }
.hot-intro p { color: #a1a1aa; font-size: 16px; line-height: 1.7; }
.hot-categories { max-width: 1100px; margin: 0 auto; }
.hot-category { margin-bottom: 48px; }
.category-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #262626; }
.category-icon { font-size: 42px; }
.category-info h2 { font-size: 24px; margin-bottom: 6px; }
.category-info p { color: #71717a; font-size: 14px; }
.category-items { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.hot-item { background: #1a1a1a; border: 1px solid #262626; border-radius: 12px; padding: 20px; transition: all 0.3s; position: relative; }
.hot-item:hover { border-color: #22d3ee; transform: translateY(-2px); }
.hot-item.has-link { cursor: pointer; }
.item-link { position: absolute; inset: 0; z-index: 1; }
.hot-item:hover { border-color: #22d3ee; transform: translateY(-2px); }
.item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.item-header h3 { font-size: 16px; margin: 0; }
.item-status { font-size: 11px; padding: 3px 10px; border-radius: 12px; font-weight: 600; }
.item-status.领先 { background: rgba(34,211,238,0.15); color: #22d3ee; }
.item-status.主流 { background: rgba(168,85,247,0.15); color: #a855f7; }
.item-status.新兴 { background: rgba(244,114,182,0.15); color: #f472b6; }
.item-status.开创 { background: rgba(251,191,36,0.15); color: #fbbf24; }
.item-status.底层 { background: rgba(107,114,128,0.15); color: #9ca3af; }
.item-status.基础设施 { background: rgba(59,130,246,0.15); color: #3b82f6; }
.item-desc { color: #a1a1aa; font-size: 13px; margin-bottom: 12px; line-height: 1.5; }
.item-apps { display: flex; gap: 6px; flex-wrap: wrap; }
.app-tag { background: #262626; color: #d4d4d8; padding: 3px 8px; border-radius: 4px; font-size: 11px; }
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

</style>
