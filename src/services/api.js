// API服务
// Vercel 版本 - 直接调用源API
const API_BASE = '/api'

// 获取页面完整数据（统一接口）
export async function fetchPageData(page, category = null) {
  try {
    const url = `${API_BASE}/tools?type=page&page=${page}&cat=${category || ''}`
    
    const response = await fetch(url)
    const result = await response.json()
    
    if (result.success) {
      return result.data
    }
    return null
  } catch (error) {
    console.error('Failed to fetch page data:', error)
    return null
  }
}

// 过滤工具（兼容旧代码）
export function filterToolsByCategory(tools, categoryId) {
  if (!categoryId) return tools
  return tools.filter(tool => tool.scenes?.includes(categoryId))
}

// 获取分类数据
export async function fetchCategories() {
  try {
    const url = `${API_BASE}/tools?type=categories`
    const response = await fetch(url)
    const result = await response.json()
    if (result.success) {
      return result.data
    }
    return []
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

// 获取工作流数据
export async function fetchWorkflows(category = null) {
  try {
    const url = category 
      ? `${API_BASE}/tools?type=workflows&category=${category}`
      : `${API_BASE}/tools?type=workflows`
    const response = await fetch(url)
    const result = await response.json()
    if (result.success) {
      return result.data
    }
    return []
  } catch (error) {
    console.error('Failed to fetch workflows:', error)
    return []
  }
}

// 获取热门任务
export async function fetchHotTasks(category = null) {
  try {
    const url = category 
      ? `${API_BASE}/tools?type=hot_tasks&category=${category}`
      : `${API_BASE}/tools?type=hot_tasks`
    const response = await fetch(url)
    const result = await response.json()
    if (result.success) {
      return result.data
    }
    return []
  } catch (error) {
    console.error('Failed to fetch hot tasks:', error)
    return []
  }
}

// 获取工具数据
export async function fetchTools(sceneId = null) {
  try {
    const url = sceneId 
      ? `${API_BASE}/tools?scene=${sceneId}`
      : `${API_BASE}/tools`
    const response = await fetch(url)
    const result = await response.json()
    if (result.success) {
      return {
        tools: result.data,
        scenes: result.scenes
      }
    }
    return { tools: [], scenes: [] }
  } catch (error) {
    console.error('Failed to fetch tools:', error)
    return { tools: [], scenes: [] }
  }
}

// 获取所有场景
export const scenes = [
  { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI' },
  { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景' },
  { id: 'ai-create', name: 'AI创作', icon: '🎨', description: '写文章，做视频、生成图片' },
  { id: 'ai-code', name: 'AI编程', icon: '💻', description: '代码辅助、调试，Bug修复' },
  { id: 'ai-study', name: 'AI学习', icon: '📚', description: '看论文、学新技术' }
]

// 获取分类（兼容旧代码）
export function getCategories() {
  return scenes
}
