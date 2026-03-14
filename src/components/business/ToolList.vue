<template>
  <div class="tool-list">
    <div v-for="group in toolGroups" :key="group.categoryId" class="tool-group">
      <div class="group-header">
        <h2 class="group-title">{{ group.categoryName }}</h2>
        <p v-if="group.description" class="group-desc">{{ group.description }}</p>
      </div>
      <div class="tools-grid">
        <ToolCard v-for="tool in group.tools" :key="tool.id" :tool="tool" @navigate="handleNavigate" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ToolCard from './ToolCard.vue'
const props = defineProps({ tools: { type: Array, default: () => [] }, categories: { type: Array, default: () => [] } })
const emit = defineEmits(['navigate'])
const toolGroups = () => { const groups = []; const toolsByCategory = {}; props.tools.forEach(tool => { const catId = tool.category || 'default'; if (!toolsByCategory[catId]) { toolsByCategory[catId] = [] } toolsByCategory[catId].push(tool) }); Object.keys(toolsByCategory).forEach(catId => { const category = props.categories.find(c => c.id === catId); groups.push({ categoryId: catId, categoryName: category?.name || catId, description: category?.description || '', tools: toolsByCategory[catId] }) }); return groups }
const handleNavigate = (data) => { emit('navigate', data) }
</script>

<style scoped>
.tool-list { max-width: 1200px; margin: 0 auto; padding: 0 24px 60px; }
.tool-group { margin-bottom: 48px; }
.group-header { margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #2d2d4a; }
.group-title { font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.group-desc { color: #94a3b8; font-size: 15px; }
.tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
</style>
