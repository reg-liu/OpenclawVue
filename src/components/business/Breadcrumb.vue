<template>
  <div class="breadcrumb">
    <span class="breadcrumb-item" @click="navigateToHome">首页</span>
    <span class="breadcrumb-separator">></span>
    <span 
      v-if="category" 
      class="breadcrumb-item" 
      :class="{ active: !subCategory }"
      @click="navigateToCategory"
    >
      {{ categoryName }}
    </span>
    <template v-if="subCategory">
      <span class="breadcrumb-separator">></span>
      <span class="breadcrumb-item active">{{ subCategoryName }}</span>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  category: {
    type: String,
    default: ''
  },
  subCategory: {
    type: String,
    default: ''
  },
  categoryName: {
    type: String,
    default: ''
  },
  subCategoryName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['navigate'])

const navigateToHome = () => {
  emit('navigate', { page: 'home', category: '' })
}

const navigateToCategory = () => {
  if (props.category) {
    emit('navigate', { page: 'product', category: props.category })
  }
}
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  font-size: 14px;
  max-width: 1100px;
  margin: 0 auto;
}

.breadcrumb-item {
  color: #71717a;
  cursor: pointer;
  transition: color 0.2s;
}

.breadcrumb-item:hover {
  color: #22d3ee;
}

.breadcrumb-item.active {
  color: #fff;
  cursor: default;
}

.breadcrumb-item.active:hover {
  color: #fff;
}

.breadcrumb-separator {
  color: #52525b;
}
</style>
