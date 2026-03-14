<template>
  <div class="overview-card">
    <div class="overview-content">
      <h1 class="overview-title">{{ category.name || '-' }}</h1>
      <p class="overview-desc">{{ category.description || '-' }}</p>
    </div>
    <div class="overview-image">
      <div v-if="category.icon" class="icon-display">
        <span class="category-icon">{{ category.icon }}</span>
      </div>
      <div v-else class="image-placeholder">
        <span class="placeholder-icon">🖼️</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  category: { type: Object, required: true }
})
</script>

<style scoped>
.overview-card { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%); 
  border: 1px solid #3d3d5c; 
  border-radius: 20px; 
  padding: 40px; 
  width: 100%; 
  max-width: 1200px; 
  margin: 0 auto; 
  gap: 40px; 
  box-sizing: border-box;
}
.overview-content { flex: 1; text-align: left; }
.overview-title { font-size: 42px; font-weight: 800; color: #fff; margin-bottom: 16px; line-height: 1.2; }
.overview-desc { color: #94a3b8; font-size: 17px; line-height: 1.7; }
.overview-image { flex-shrink: 0; width: 200px; height: 200px; border-radius: 50%; overflow: hidden; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; }
.icon-display { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
.category-icon { font-size: 80px; }
.image-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.placeholder-icon { font-size: 48px; }
@media (max-width: 768px) { 
  .overview-card { 
    flex-direction: column; 
    padding: 24px; 
    max-width: calc(100% - 48px);
  } 
  .overview-title { font-size: 32px; } 
  .overview-image { width: 150px; height: 150px; } 
  .category-icon { font-size: 60px; } 
}
</style>
