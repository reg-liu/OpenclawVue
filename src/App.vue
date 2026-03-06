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

const selectedCategory = ref(content.value.knowledge.categories[0].id)
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
          <div class="hero-stats">
            <div class="stat"><span class="stat-num">6</span><span class="stat-label">{{ content.home.stats.projects }}</span></div>
            <div class="stat"><span class="stat-num">26</span><span class="stat-label">{{ content.home.stats.topics }}</span></div>
            <div class="stat"><span class="stat-num">3</span><span class="stat-label">{{ content.home.stats.focus }}</span></div>
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
        <button v-for="cat in content.questions.categories" :key="cat.id" :class="{ active: selectedCategory === cat.id }" @click="selectedCategory = cat.id">
          {{ cat.name }}
        </button>
      </div>
      <div class="knowledge-list">
        <div v-for="item in content.questions.categories.find(c => c.id === selectedCategory).items" :key="item.q" class="knowledge-item">
          <div class="knowledge-q">{{ item.q }}</div>
          <div class="knowledge-a">{{ item.a }}</div>
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
.tech-grid { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }
.tech-item { display: flex; align-items: center; gap: 12px; padding: 20px 28px; background: #1a1a1a; border: 1px solid #262626; border-radius: 12px; transition: all 0.3s; }
.tech-item:hover { background: #222; transform: scale(1.05); }
.tech-item img { width: 28px; height: 28px; }
.tech-item span { font-weight: 500; color: #d4d4d8; }

/* Projects */
.projects { padding: 120px 24px 80px; min-height: 100vh; }
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
</style>
