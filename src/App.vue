<script setup>
import { ref, computed, onMounted } from 'vue'
import { House, Clock, QuestionFilled, ArrowRight, Star, Setting, Menu, Check, Trophy, Rocket, Tools, MagicStick, Sparkles, Globe, Code, Palette } from '@element-plus/icons-vue'

const activeMain = ref('home')
const selectedCategory = ref('frontend')
const showMobileMenu = ref(false)
const scrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 50
  })
})

const theoryCategories = ref([
  {
    id: 'frontend',
    name: 'Frontend Core',
    icon: 'MagicStick',
    questions: [
      { q: 'What is a closure?', a: 'A closure is a function that has access to variables from its outer scope. Uses: 1. Avoid global pollution 2. Encapsulate private data 3. Implement modules 4. Debounce/throttle 5. Singleton pattern.' },
      { q: 'JS Inheritance patterns?', a: '1. Constructor inheritance via call/apply 2. Prototype chain 3. Prototypal inheritance Object.create() 4. Composite inheritance (most common) 5. ES6 class inheritance.' },
      { q: 'Prototype chain?', a: 'Each function has prototype property pointing to prototype object; prototype has constructor pointing back to function; objects have __proto__ pointing to prototype; forms prototype chain ending at Object.prototype.' },
      { q: 'Event Loop?', a: 'JS is single-threaded, uses event loop for async. Order: 1. Sync code 2. Microtasks (Promise/async) 3. Macrotasks (setTimeout/UI render) 4. Next loop. Microtasks run first.' },
      { q: 'Debounce vs Throttle?', a: 'Debounce: executes last only after stop, for search inputs. Throttle: executes at fixed intervals, for scroll/clicks.' },
      { q: 'URL to page render?', a: '1. DNS lookup 2. TCP handshake 3. HTTP request 4. Server response 5. Parse HTML 6. Build DOM/CSSOM 7. Render tree 8. Layout 9. Paint 10. Composite.' },
      { q: 'DNS Hijacking prevention?', a: 'Solutions: 1. CDN + main domain both host resources 2. Listen for load errors 3. Fallback to main domain on CDN failure.' },
      { q: 'Execution context?', a: 'Execution context is the environment when function executes, containing variable object, scope chain, this binding. Used for variable lookup.' },
      { q: 'Performance optimization?', a: '1. Resource optimization (compress, merge, CDN) 2. Reduce reflow/repaint 3. Code splitting 4. Caching 5. HTTP2 6. Image optimization.' },
      { q: 'HTTP caching?', a: 'Strong cache: Expires/Cache-Control, use directly. Negotiated cache: Last-Modified/ETag, need server validation. Cache-Control has higher priority.' }
    ]
  },
  {
    id: 'openclaw',
    name: 'OpenClaw',
    icon: 'Setting',
    questions: [
      { q: 'What is OpenClaw?', a: 'Open source AI assistant framework, supports multi-channel (Discord/Telegram/Feishu), multi-model, customizable skills.' },
      { q: 'Supported models?', a: 'OpenAI, Anthropic, Gemini, Moonshot and more, with auto model pool switching.' },
      { q: 'Multi-channel messaging?', a: 'Gateway receives messages from all channels, processes and distributes. Supports Discord, Telegram, Feishu, etc.' },
      { q: 'What is Skill?', a: 'Skill system lets AI call tools to complete tasks: file operations, browser control, message sending, etc.' },
      { q: 'Heartbeat mechanism?', a: 'Periodic polling for tasks like email, calendar, weather, can push messages to user proactively.' },
      { q: 'How to develop Skill?', a: 'Create SKILL.md file, define tool descriptions and usage scenarios, AI will call automatically.' },
      { q: 'Memory system?', a: 'Short-term memory (daily notes) and long-term memory (MEMORY.md), supports semantic search.' },
      { q: 'Voice support?', a: 'TTS voice synthesis supported, can be used for storytelling and voice output.' }
    ]
  },
  {
    id: 'vibe',
    name: 'Vibe Coding',
    icon: 'Sparkles',
    questions: [
      { q: 'What is Vibe Coding?', a: 'New programming paradigm, describe requirements in natural language, AI assists code generation, human-AI collaboration.' },
      { q: 'vs Traditional coding?', a: 'Traditional: code-first; Vibe Coding: intent-first, human reviews AI-generated code, focus on requirement expression.' },
      { q: 'Core capabilities?', a: 'Natural language understanding, code generation, context understanding, multi-turn correction, tool calling.' },
      { q: 'How to improve?', a: 'Clear requirements, reasonable task breakdown, timely feedback, leverage toolchain integration.' },
      { q: 'Best scenarios?', a: 'Rapid prototyping, repetitive code generation, learning new tech, cross-language development.' },
      { q: 'Limitations?', a: 'Complex logic still needs human input, code quality depends on prompts, debugging hard, edge cases insufficient.' },
      { q: 'Future trends?', a: 'Smarter context understanding, multimodal interaction, autonomous decision-making, end-to-end automation.' },
      { q: 'How to be good AI collaborator?', a: 'Learn to express needs clearly, understand AI thinking, have code review skills, continuous learning.' }
    ]
  }
])

const practicePaths = ref([
  { id: 1, title: 'OpenClaw Deployment', time: '2026-03', description: 'Manually deploy OpenClaw on Windows server, understand architecture', details: ['Node.js setup', 'Clone source', 'Gateway config', 'Chrome extension'], prompt: 'Help me install OpenClaw', highlight: true },
  { id: 2, title: 'ClawX Automation', time: '2026-03', description: 'Use ClawX desktop app to simplify deployment', details: ['Client install', 'One-click start', 'Feishu config', 'Verify functions'], prompt: 'Help me install ClawX', highlight: true },
  { id: 3, title: 'Feishu Integration', time: '2026-03', description: 'Integrate Feishu with OpenClaw for enterprise AI assistant', details: ['Create app', 'Permissions', 'Message channel'], prompt: 'Help me integrate Feishu', highlight: false },
  { id: 4, title: 'VS Code Setup', time: '2026-03', description: 'Configure frontend development environment', details: ['Editor install', 'Extensions', 'Git setup'], prompt: 'Help me setup VS Code', highlight: false },
  { id: 5, title: 'Vue3 Project', time: '2026-03', description: 'Create Vue3 project with Vite and push to GitHub', details: ['Init project', 'Build UI', 'GitHub push'], prompt: 'Help me create Vue project', highlight: true },
  { id: 6, title: 'UI Optimization', time: '2026-03', description: 'Continuously optimize project UI and content', details: ['Layout tuning', 'Style polish', 'Add animations'], prompt: 'Help me optimize UI', highlight: true }
])

const currentQuestions = computed(() => {
  const cat = theoryCategories.value.find(c => c.id === selectedCategory.value)
  return cat ? cat.questions : []
})

const menuItems = [
  { key: 'home', icon: House, title: 'Home' },
  { key: 'practice', icon: Clock, title: 'Practice' },
  { key: 'knowledge', icon: QuestionFilled, title: 'Knowledge' }
]

const navTo = (key) => {
  activeMain.value = key
  showMobileMenu.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const stats = [
  { num: '6+', label: 'Projects', icon: Rocket },
  { num: '26+', label: 'Topics', icon: QuestionFilled },
  { num: '3', label: 'Tech Areas', icon: Code }
]
</script>

<template>
  <div class="portfolio">
    <!-- Navigation -->
    <nav class="nav" :class="{ scrolled }">
      <div class="nav-inner">
        <div class="logo" @click="navTo('home')">
          <span class="logo-icon">&#9889;</span>
          <span class="logo-text">AI-Developer</span>
        </div>
        <div class="nav-links">
          <a v-for="item in menuItems" :key="item.key" :class="{ active: activeMain === item.key }" @click="navTo(item.key)">
            <el-icon><component :is="item.icon" /></el-icon>
            {{ item.title }}
          </a>
        </div>
        <div class="nav-actions">
          <el-tag type="success" effect="dark" size="small">Vibe Coding</el-tag>
        </div>
        <div class="mobile-toggle" @click="showMobileMenu = !showMobileMenu">
          <el-icon><Menu /></el-icon>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="showMobileMenu" class="mobile-menu">
      <a v-for="item in menuItems" :key="item.key" :class="{ active: activeMain === item.key }" @click="navTo(item.key)">
        <el-icon><component :is="item.icon" /></el-icon>
        {{ item.title }}
      </a>
    </div>

    <!-- Home Page -->
    <div v-if="activeMain === 'home'" class="page-home">
      <!-- Hero -->
      <section class="hero">
        <div class="hero-bg">
          <div class="grid"></div>
          <div class="glow glow-1"></div>
          <div class="glow glow-2"></div>
        </div>
        <div class="hero-content">
          <div class="hero-badge">
            <el-icon><Sparkles /></el-icon>
            Vibe Coding Practitioner
          </div>
          <h1 class="hero-title">
            AI Programming<br/>
            <span class="gradient">Portfolio</span>
          </h1>
          <p class="hero-desc">
            Documenting the journey from environment setup to project construction using AI-assisted development
          </p>
          <div class="hero-actions">
            <button class="btn-primary" @click="navTo('practice')">
              View Practice <el-icon><ArrowRight /></el-icon>
            </button>
            <button class="btn-secondary" @click="navTo('knowledge')">
              Knowledge Base
            </button>
          </div>
          <div class="hero-stats">
            <div v-for="stat in stats" :key="stat.label" class="stat-item">
              <el-icon><component :is="stat.icon" /></el-icon>
              <span class="stat-num">{{ stat.num }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
        <div class="scroll-hint">
          <span>Scroll Down</span>
          <div class="scroll-arrow"></div>
        </div>
      </section>

      <!-- About -->
      <section class="section about">
        <div class="section-inner">
          <h2 class="section-title">
            <span class="title-num">01</span>
            About This Project
          </h2>
          <div class="about-grid">
            <div class="about-card">
              <div class="card-icon"><el-icon :size="32"><MagicStick /></el-icon></div>
              <h3>AI-Driven Development</h3>
              <p>Using OpenClaw and ClawX tools, collaborate with AI through natural language to complete full-cycle development from environment setup to application building.</p>
            </div>
            <div class="about-card">
              <div class="card-icon"><el-icon :size="32"><Globe /></el-icon></div>
              <h3>Multi-Channel Integration</h3>
              <p>Integrating Feishu, Discord, Telegram for enterprise-level AI assistant scenarios with multi-channel messaging.</p>
            </div>
            <div class="about-card">
              <div class="card-icon"><el-icon :size="32"><Palette /></el-icon></div>
              <h3>Modern Frontend</h3>
              <p>Built with Vue3 + Vite + Element Plus, practicing latest frontend engineering workflows.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Tech Stack -->
      <section class="section tech">
        <div class="section-inner">
          <h2 class="section-title">
            <span class="title-num">02</span>
            Tech Stack
          </h2>
          <div class="tech-grid">
            <div class="tech-item">
              <img src="https://openclaw.ai/img/logo.svg" alt="OpenClaw"/>
              <span>OpenClaw</span>
            </div>
            <div class="tech-item">
              <img src="https://vuejs.org/logo.svg" alt="Vue"/>
              <span>Vue 3</span>
            </div>
            <div class="tech-item">
              <img src="https://vitejs.dev/logo.svg" alt="Vite"/>
              <span>Vite</span>
            </div>
            <div class="tech-item">
              <img src="https://element-plus.org/images/element-plus-logo.svg" alt="Element Plus"/>
              <span>Element Plus</span>
            </div>
            <div class="tech-item">
              <img src="https://www.feishu.cn/favicon.ico" alt="Feishu"/>
              <span>Feishu</span>
            </div>
            <div class="tech-item">
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub"/>
              <span>GitHub</span>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="section cta">
        <div class="section-inner">
          <h2>Start Your AI Programming Journey</h2>
          <p>Master Vibe Coding skills and boost development efficiency</p>
          <button class="btn-primary large" @click="navTo('practice')">
            Explore Practice Timeline <el-icon><ArrowRight /></el-icon>
          </button>
        </div>
      </section>
    </div>

    <!-- Practice Page -->
    <div v-else-if="activeMain === 'practice'" class="page-practice">
      <div class="page-header">
        <h1><el-icon><Rocket /></el-icon> Practice Timeline</h1>
        <p>Vibe Coding practice projects</p>
      </div>
      <div class="timeline">
        <div v-for="(item, index) in practicePaths" :key="item.id" class="timeline-item" :class="{ highlight: item.highlight }">
          <div class="timeline-marker">
            <div class="marker-dot"></div>
            <div v-if="index < practicePaths.length - 1" class="marker-line"></div>
          </div>
          <div class="timeline-content">
            <div class="timeline-time">{{ item.time }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <ul>
              <li v-for="d in item.details" :key="d"><el-icon><Check /></el-icon>{{ d }}</li>
            </ul>
            <div v-if="item.prompt" class="prompt-tip">
              <el-icon><Tools /></el-icon> AI Prompt: {{ item.prompt }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Knowledge Page -->
    <div v-else-if="activeMain === 'knowledge'" class="page-knowledge">
      <div class="page-header">
        <h1><el-icon><Trophy /></el-icon> Knowledge Base</h1>
        <p>Core knowledge topics</p>
      </div>
      <div class="knowledge-tabs">
        <button v-for="cat in theoryCategories" :key="cat.id" :class="{ active: selectedCategory === cat.id }" @click="selectedCategory = cat.id">
          <el-icon><component :is="cat.icon" /></el-icon>
          {{ cat.name }}
        </button>
      </div>
      <div class="knowledge-list">
        <div v-for="(q, index) in currentQuestions" :key="index" class="knowledge-item">
          <div class="q-header">
            <span class="q-num">{{ index + 1 }}</span>
            <span class="q-text">{{ q.q }}</span>
          </div>
          <div class="q-answer">{{ q.a }}</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-logo">
          <span class="logo-icon">&#9889;</span>
          <span>AI-Developer</span>
        </div>
        <p>2026 Vibe Coding Practice Project</p>
        <div class="footer-links">
          <a href="https://github.com/reg-liu/OpenclawVue" target="_blank">GitHub</a>
          <a href="https://openclaw.ai" target="_blank">OpenClaw</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { 
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
  background: #0a0a0f; color: #e4e4e7; line-height: 1.6;
}

/* Navigation */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 16px 0; transition: all 0.3s; }
.nav.scrolled { background: rgba(10, 10, 15, 0.9); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.05); }
.nav-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; }
.logo { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 20px; cursor: pointer; }
.logo-icon { font-size: 24px; }
.logo-text { background: linear-gradient(135deg, #a78bfa, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.nav-links { display: flex; gap: 8px; }
.nav-links a { display: flex; align-items: center; gap: 6px; padding: 10px 20px; color: #71717a; text-decoration: none; border-radius: 10px; transition: all 0.3s; cursor: pointer; }
.nav-links a:hover { color: #fff; background: rgba(255,255,255,0.05); }
.nav-links a.active { color: #fff; background: linear-gradient(135deg, #a78bfa, #f472b6); }
.nav-actions { display: flex; align-items: center; gap: 16px; }
.mobile-toggle { display: none; font-size: 24px; cursor: pointer; }
.mobile-menu { display: none; position: fixed; top: 64px; left: 0; right: 0; background: rgba(10,10,15,0.98); padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.mobile-menu a { display: flex; align-items: center; gap: 10px; padding: 16px; color: #71717a; text-decoration: none; border-radius: 10px; }

/* Hero */
.hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 100px 24px 60px; }
.hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, #1e1b4b 0%, #0a0a0f 70%); }
.hero-bg .grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 60px 60px; }
.hero-bg .glow { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.4; }
.glow-1 { width: 600px; height: 600px; background: #7c3aed; top: -200px; left: -100px; }
.glow-2 { width: 500px; height: 500px; background: #db2777; bottom: -100px; right: -100px; }
.hero-content { position: relative; text-align: center; max-width: 800px; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; background: rgba(167, 139, 250, 0.1); border: 1px solid rgba(167, 139, 250, 0.3); border-radius: 50px; color: #a78bfa; font-size: 14px; margin-bottom: 24px; }
.hero-title { font-size: 72px; font-weight: 800; line-height: 1.1; margin-bottom: 24px; letter-spacing: -2px; }
.hero-title .gradient { background: linear-gradient(135deg, #a78bfa, #f472b6, #fb923c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-desc { font-size: 20px; color: #aaa; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
.hero-actions { display: flex; gap: 16px; justify-content: center; margin-bottom: 60px; }
.btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: linear-gradient(135deg, #a78bfa, #f472b6); border: none; border-radius: 12px; color: #fff; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 40px rgba(167, 139, 250, 0.4); }
.btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: transparent; border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; color: #fff; font-size: 16px; cursor: pointer; transition: all 0.3s; }
.btn-secondary:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.3); }
.btn-primary.large { padding: 18px 36px; font-size: 18px; }
.hero-stats { display: flex; justify-content: center; gap: 48px; }
.stat-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.stat-item .el-icon { font-size: 24px; color: #a78bfa; margin-bottom: 8px; }
.stat-num { font-size: 36px; font-weight: 700; background: linear-gradient(135deg, #a78bfa, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.stat-label { font-size: 14px; color: #71717a; }
.scroll-hint { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; color: #52525b; font-size: 12px; }
.scroll-arrow { width: 20px; height: 20px; border-right: 2px solid #52525b; border-bottom: 2px solid #52525b; transform: rotate(45deg); animation: scrollBounce 2s infinite; }
@keyframes scrollBounce { 0%, 100% { transform: rotate(45deg) translateY(0); } 50% { transform: rotate(45deg) translateY(8px); } }

/* Sections */
.section { padding: 100px 24px; }
.section-inner { max-width: 1200px; margin: 0 auto; }
.section-title { display: flex; align-items: center; gap: 16px; font-size: 36px; font-weight: 700; margin-bottom: 48px; }
.title-num { font-size: 14px; color: #a78bfa; font-weight: 400; }

/* About */
.about { background: linear-gradient(180deg, #0a0a0f 0%, #18181b 100%); }
.about-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.about-card { padding: 32px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; transition: all 0.3s; }
.about-card:hover { background: rgba(255,255,255,0.05); transform: translateY(-4px); }
.card-icon { width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(167,139,250,0.2), rgba(244,114,182,0.2)); border-radius: 16px; color: #a78bfa; margin-bottom: 20px; }
.about-card h3 { font-size: 20px; margin-bottom: 12px; }
.about-card p { color: #a1a1aa; font-size: 15px; }

/* Tech */
.tech-grid { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }
.tech-item { display: flex; align-items: center; gap: 12px; padding: 20px 28px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; transition: all 0.3s; }
.tech-item:hover { background: rgba(255,255,255,0.08); transform: scale(1.05); }
.tech-item img { width: 32px; height: 32px; }
.tech-item span { font-weight: 500; color: #d4d4d8; }

/* CTA */
.cta { text-align: center; background: linear-gradient(180deg, #18181b 0%, #0a0a0f 100%); }
.cta h2 { font-size: 40px; margin-bottom: 16px; }
.cta p { color: #a1a1aa; font-size: 18px; margin-bottom: 32px; }

/* Practice Page */
.page-practice, .page-knowledge { padding: 120px 24px 80px; min-height: 100vh; }
.page-header { text-align: center; margin-bottom: 60px; }
.page-header h1 { display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 40px; margin-bottom: 12px; }
.page-header p { color: #a1a1aa; font-size: 18px; }

.timeline { max-width: 800px; margin: 0 auto; }
.timeline-item { display: flex; gap: 24px; margin-bottom: 32px; }
.timeline-marker { display: flex; flex-direction: column; align-items: center; }
.marker-dot { width: 16px; height: 16px; border-radius: 50%; background: #3f3f46; border: 3px solid #18181b; }
.timeline-item.highlight .marker-dot { background: #f472b6; }
.marker-line { width: 2px; flex: 1; background: #27272a; margin-top: 8px; }
.timeline-content { flex: 1; padding: 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; }
.timeline-time { font-size: 12px; color: #a78bfa; margin-bottom: 8px; }
.timeline-content h3 { font-size: 20px; margin-bottom: 8px; }
.timeline-content p { color: #a1a1aa; margin-bottom: 12px; font-size: 14px; }
.timeline-content ul { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.timeline-content ul li { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #71717a; }
.timeline-content ul li .el-icon { color: #34d399; }
.prompt-tip { display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 10px; font-size: 13px; color: #fbbf24; }

/* Knowledge Page */
.knowledge-tabs { display: flex; gap: 12px; justify-content: center; margin-bottom: 40px; flex-wrap: wrap; }
.knowledge-tabs button { display: flex; align-items: center; gap: 8px; padding: 12px 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; color: #a1a1aa; font-size: 15px; cursor: pointer; transition: all 0.3s; }
.knowledge-tabs button:hover { background: rgba(255,255,255,0.08); }
.knowledge-tabs button.active { background: linear-gradient(135deg, #a78bfa, #f472b6); border-color: transparent; color: #fff; }
.knowledge-list { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
.knowledge-item { padding: 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; }
.q-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.q-num { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: linear-gradient(135deg, #a78bfa, #f472b6); border-radius: 8px; font-size: 14px; font-weight: 600; flex-shrink: 0; }
.q-text { font-weight: 600; font-size: 16px; }
.q-answer { padding-left: 44px; color: #a1a1aa; line-height: 1.8; font-size: 14px; }

/* Footer */
.footer { border-top: 1px solid rgba(255,255,255,0.05); padding: 48px 24px; }
.footer-inner { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 16px; }
.footer-logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; }
.footer-logo .logo-icon { font-size: 20px; }
.footer p { color: #52525b; font-size: 14px; }
.footer-links { display: flex; gap: 24px; }
.footer-links a { color: #71717a; text-decoration: none; font-size: 14px; transition: color 0.3s; }
.footer-links a:hover { color: #a78bfa; }

/* Responsive */
@media (max-width: 768px) {
  .nav-links, .nav-actions { display: none; }
  .mobile-toggle { display: block; }
  .mobile-menu { display: block; }
  .hero-title { font-size: 40px; }
  .hero-desc { font-size: 16px; }
  .hero-actions { flex-direction: column; }
  .hero-stats { flex-wrap: wrap; gap: 32px; }
  .about-grid { grid-template-columns: 1fr; }
  .section-title { font-size: 28px; }
}
</style>
