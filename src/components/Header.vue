<template>
  <!-- Nav -->
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <router-link to="/" class="logo">
        <span class="logo-icon">&#9670;</span>
        <span>OpenClaw</span>
      </router-link>
      <div class="nav-links">
        <router-link to="/" :class="{ active: $route.path === '/' }">首页</router-link>
        
        <!-- 一级分类 -->
        <div class="nav-dropdown" v-for="cat in categoriesData" :key="cat.id">
          <router-link :to="'/ai-tools/' + cat.id" class="nav-dropdown-trigger">
            {{ cat.icon }} {{ cat.name }}
          </router-link>
        </div>
      </div>
      <div class="nav-right">
        <span class="badge">{{ content.badge }}</span>
        <button class="menu-btn" @click="toggleMenu">&#9776;</button>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <div v-if="mobileMenuOpen" class="mobile-menu">
    <router-link to="/" @click="closeMenu">首页</router-link>
    <router-link 
      v-for="cat in categoriesData" 
      :key="cat.id"
      :to="'/ai-tools/' + cat.id"
      @click="closeMenu"
    >
      {{ cat.icon }} {{ cat.name }}
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import data from '../data.json'
import { fetchCategories } from '../services/api.js'

const content = ref(data)
const categoriesData = ref([])
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMenu = () => {
  mobileMenuOpen.value = false
}

onMounted(async () => {
  const cats = await fetchCategories()
  categoriesData.value = cats
  
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})
</script>

<style scoped>
/* Nav */
.nav { 
  position: fixed; 
  top: 0; 
  left: 0; 
  right: 0; 
  z-index: 100; 
  padding: 20px 0; 
  transition: all 0.3s; 
  background: linear-gradient(180deg, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0) 100%);
}
.nav.scrolled { 
  background: rgba(13,13,13,0.95); 
  backdrop-filter: blur(20px); 
  padding: 12px 0; 
}
.nav-container { 
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; 
  padding: 0 24px; 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  box-sizing: border-box;
}
.logo { 
  display: flex; 
  align-items: center; 
  gap: 10px; 
  font-weight: 700; 
  font-size: 20px; 
  cursor: pointer; 
  color: #fff; 
  text-decoration: none; 
}
.logo-icon { font-size: 24px; color: #22d3ee; }
.nav-links { display: flex; gap: 8px; }
.nav-links a { 
  padding: 10px 20px; 
  color: #a1a1aa; 
  text-decoration: none; 
  border-radius: 8px; 
  cursor: pointer; 
  transition: all 0.2s; 
}
.nav-links a:hover { color: #fff; }
.nav-links a.active { color: #fff; background: #22d3ee; }

/* 下拉导航 */
.nav-dropdown { position: relative; }
.nav-dropdown-trigger { 
  padding: 10px 20px; 
  color: #a1a1aa; 
  cursor: pointer; 
  transition: all 0.2s; 
  display: block; 
  text-decoration: none;
}
.nav-dropdown-trigger:hover { color: #fff; }
.nav-dropdown-menu { 
  display: none; 
  position: absolute; 
  top: 100%; 
  left: 0; 
  background: #1f1f3d; 
  border: 1px solid #2d2d4a; 
  border-radius: 8px; 
  padding: 8px 0; 
  min-width: 160px; 
  z-index: 100; 
}
.nav-dropdown:hover .nav-dropdown-menu { display: block; }
.nav-dropdown-menu a { 
  display: block; 
  padding: 10px 20px; 
  color: #a1a1aa; 
  font-size: 14px; 
  cursor: pointer; 
  text-decoration: none;
}
.nav-dropdown-menu a:hover { color: #fff; background: #2d2d4a; }
.nav-right { display: flex; align-items: center; gap: 16px; }
.badge { 
  background: #22d3ee; 
  color: #000; 
  padding: 4px 12px; 
  border-radius: 20px; 
  font-size: 12px; 
  font-weight: 600; 
}
.menu-btn { display: none; background: none; border: none; color: #fff; font-size: 24px; cursor: pointer; }

/* Mobile Menu */
.mobile-menu { 
  display: none; 
  position: fixed; 
  top: 70px; 
  left: 0; 
  right: 0; 
  background: #0d0d0d; 
  padding: 20px; 
  border-bottom: 1px solid #222; 
  z-index: 50; 
}
.mobile-menu a { 
  display: block; 
  padding: 14px; 
  color: #a1a1aa; 
  text-decoration: none; 
  border-bottom: 1px solid #1a1a1a; 
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .menu-btn { display: block; }
  .mobile-menu { display: block; }
}
</style>
