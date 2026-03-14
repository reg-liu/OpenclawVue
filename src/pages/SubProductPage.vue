<template>
  <div class="subproduct-page">
    <div class="subproduct-container">
      <div class="main-content">
        <!-- 面包屑 -->
        <Breadcrumb 
          :category="categoryData?.id"
          :categoryName="categoryData?.name"
          :subCategory="subcategoryData?.id"
          :subCategoryName="subcategoryData?.name"
          @navigate="handleNavigate"
        />

        <!-- 详细卡片 -->
        <DetailCard :tool="toolData" />

        <!-- 工具详情 -->
        <ToolDetail :tool="toolData" />

        <!-- 替代工具 -->
        <AlternativeTools 
          :tools="alternativesData"
          :currentToolId="toolId"
        />
      </div>
    </div>
    
    <!-- 右侧导航 - 固定定位 -->
    <aside class="right-sidebar">
      <nav class="sidebar-nav">
        <a href="#tool-intro" class="nav-item">工具简介</a>
        <a href="#tool-details" class="nav-item">详细说明</a>
        <a href="#alternatives" class="nav-item">替代工具</a>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Breadcrumb from '../components/business/Breadcrumb.vue'
import DetailCard from '../components/business/DetailCard.vue'
import ToolDetail from '../components/business/ToolDetail.vue'
import AlternativeTools from '../components/business/AlternativeTools.vue'

const route = useRoute()
const router = useRouter()

const toolId = computed(() => route.params.id || '')
const pageData = ref(null)
const loading = ref(false)

const toolData = computed(() => pageData.value?.tool || {})
const categoryData = computed(() => pageData.value?.category || {})
const subcategoryData = computed(() => pageData.value?.subcategory || {})
const alternativesData = computed(() => pageData.value?.alternatives || [])

const loadData = async () => {
  loading.value = true
  try {
    const response = await fetch(`/api/tools?type=subproduct&id=${toolId.value}`)
    const result = await response.json()
    if (result.success) {
      pageData.value = result.data
    }
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    loading.value = false
  }
}

const handleNavigate = (data) => {
  if (data.page === 'home') router.push('/')
  else if (data.page === 'product') router.push(`/ai-tools/${data.category}`)
  else if (data.page === 'subproduct') router.push(`/tool/${data.category}`)
}

onMounted(() => loadData())
watch(() => route.params.id, () => loadData())
</script>

<style scoped>
.subproduct-page {
  padding-top: 80px;
  min-height: 100vh;
  background: #0d0d0d;
}

.subproduct-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 60px;
}

.main-content {
  width: 100%;
}

/* 各模块间距 */
.main-content > * {
  margin-bottom: 32px;
  scroll-margin-top: 100px;
}

.main-content > *:last-child {
  margin-bottom: 0;
}

/* 右侧导航 - 固定定位，不影响内容宽度 */
.right-sidebar {
  width: 180px;
  position: fixed;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
}

.sidebar-nav {
  background: #1a1a2e;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #2d2d4a;
}

.nav-item {
  display: block;
  padding: 10px 14px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  border-radius: 8px;
  margin-bottom: 4px;
  transition: all 0.2s;
}

.nav-item:hover, .nav-item.active {
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
}

@media (max-width: 1200px) {
  .right-sidebar {
    display: none;
  }
}
</style>
