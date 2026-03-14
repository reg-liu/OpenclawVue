<template>
  <div class="product-page">
    <div class="product-container">
      <div class="main-content">
        <!-- 面包屑 -->
        <Breadcrumb 
          :category="categoryId"
          :categoryName="categoryName"
          @navigate="handleNavigate"
        />

        <!-- 概览卡片 -->
        <OverviewCard :category="categoryData" />

        <!-- 工具列表 -->
        <div v-if="subCategoriesData.length > 0" class="tool-sections">
          <div 
            v-for="sub in subCategoriesData" 
            :key="sub.id" 
            class="tool-section"
          >
            <div class="section-header">
              <h2 class="section-title">{{ sub.name }}</h2>
              <p v-if="sub.description" class="section-desc">{{ sub.description }}</p>
            </div>
            <div v-if="sub.tools && sub.tools.length > 0" class="tools-grid">
              <ToolCard 
                v-for="tool in sub.tools" 
                :key="tool.id" 
                :tool="tool"
                @navigate="handleToolNavigate"
              />
            </div>
            <div v-else class="no-tools">
              <p>暂无工具数据</p>
            </div>
          </div>
        </div>
        <div v-else class="no-category">
          <p>暂无分类数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Breadcrumb from '../components/business/Breadcrumb.vue'
import OverviewCard from '../components/business/OverviewCard.vue'
import ToolCard from '../components/business/ToolCard.vue'

const route = useRoute()
const router = useRouter()

const categoryId = computed(() => route.params.category || '')
const pageData = ref(null)
const loading = ref(false)

const categoryData = computed(() => pageData.value?.category || {})
const categoryName = computed(() => categoryData.value?.name || '')
const subCategoriesData = computed(() => pageData.value?.subcategories || [])

const loadData = async () => {
  loading.value = true
  try {
    const response = await fetch(`/api/tools?type=product&category=${categoryId.value}`)
    const result = await response.json()
    if (result.success) {
      pageData.value = result.data
    }
  } catch (error) {
    console.error('Failed to load product data:', error)
  } finally {
    loading.value = false
  }
}

const handleNavigate = (data) => {
  if (data.page === 'home') router.push('/')
  else if (data.page === 'product') router.push(`/ai-tools/${data.category}`)
  else if (data.page === 'subproduct') router.push(`/tool/${data.category}`)
}

const handleToolNavigate = (data) => {
  router.push(`/tool/${data.category}`)
}

onMounted(() => loadData())
watch(() => route.params.category, () => loadData())
</script>

<style scoped>
.product-page {
  padding-top: 80px;
  min-height: 100vh;
  background: #0d0d0d;
}

.product-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 60px;
}

.main-content {
  width: 100%;
}

/* 工具区域 */
.tool-sections {
  margin-top: 40px;
}

.tool-section {
  margin-bottom: 48px;
}

.section-header {
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #2d2d4a;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  text-align: left;
}

.section-desc {
  color: #94a3b8;
  font-size: 14px;
  text-align: left;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.no-tools, .no-category {
  text-align: center;
  padding: 60px 20px;
  color: #71717a;
  font-size: 15px;
}
</style>
