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

// 获取分类数据（一级+二级）
export async function fetchCategories() {
  try {
    // 同时获取一级和二级分类
    const [catRes, subRes] = await Promise.all([
      fetch(`${API_BASE}/tools?type=categories`),
      fetch(`${API_BASE}/tools?type=subcategories`)
    ])
    
    const catResult = await catRes.json()
    const subResult = await subRes.json()
    
    if (catResult.success && catResult.data) {
      const subcategories = subResult.success ? subResult.data : []
      
      // 按category_id分组
      const subByCat = {}
      subcategories.forEach(sub => {
        if (!subByCat[sub.category_id]) subByCat[sub.category_id] = []
        subByCat[sub.category_id].push({ id: sub.id, name: sub.name })
      })
      
      // 组合一级和二级分类
      return catResult.data.map(cat => ({
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        description: cat.description,
        children: subByCat[cat.id] || []
      }))
    }
    return getFallbackCategories()
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return getFallbackCategories()
  }
}

// 获取所有二级分类（带一级分类信息）
export async function fetchAllSubcategories() {
  try {
    const response = await fetch(`${API_BASE}/tools?type=all-subcategories`)
    const result = await response.json()
    if (result.success) {
      return result.data
    }
    return []
  } catch (error) {
    console.error('Failed to fetch all subcategories:', error)
    return []
  }
}

// 备用分类（API失败时使用）
function getFallbackCategories() {
  return [
    { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI' },
    { id: 'ai-office', name: 'AI办公', icon: '💼', description: '利用AI提升工作效率', children: [
      { id: 'marketing-tools', name: '营销工具' },
      { id: 'programming-tools', name: '编程工具' },
      { id: 'office-tools', name: '办公效率' },
      { id: 'automation-tools', name: '自动化工具' }
    ]},
    { id: 'ai-creation', name: 'AI创作', icon: '🎨', description: 'AI赋能创意工作', children: [
      { id: 'video-tools', name: '视频编辑' },
      { id: 'image-tools', name: '图像生成' },
      { id: 'audio-tools', name: '音频处理' },
      { id: 'text-tools', name: '文本创作' }
    ]},
    { id: 'ai-life', name: 'AI生活', icon: '🏠', description: 'AI让生活更美好', children: [
      { id: 'fitness-tools', name: '健身工具' },
      { id: 'health-tools', name: '健康工具' },
      { id: 'religious-tools', name: '宗教工具' },
      { id: 'fashion-tools', name: '时尚工具' },
      { id: 'gift-tools', name: '礼物推荐' },
      { id: 'travel-tools', name: '旅行工具' },
      { id: 'food-tools', name: '美食工具' }
    ]},
    { id: 'ai-learning', name: 'AI学习', icon: '📚', description: 'AI辅助学习', children: [
      { id: 'education-tools', name: '教育工具' },
      { id: 'research-tools', name: '研究助手' },
      { id: 'student-tools', name: '学生工具' }
    ]}
  ]
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
  { id: 'ai-office', name: 'AI办公', icon: '💼', description: '利用AI提升工作效率，涵盖营销、编程、自动化等场景' },
  { id: 'ai-creation', name: 'AI创作', icon: '🎨', description: 'AI赋能创意工作，涵盖视频、图像、音频、文本生成' },
  { id: 'ai-life', name: 'AI生活', icon: '🏠', description: 'AI让生活更美好，涵盖健身、健康、旅行、美食等' },
  { id: 'ai-learning', name: 'AI学习', icon: '📚', description: 'AI辅助学习、研究和教育工具' }
]

// 获取所有分类（包括一级和二级）
export const categories = {
  'ai-entry': { name: 'AI入门', icon: '🚀', subcategories: [] },
  'ai-office': { 
    name: 'AI办公', 
    icon: '💼', 
    subcategories: [
      { id: 'marketing-tools', name: '营销工具' },
      { id: 'programming-tools', name: '编程工具' },
      { id: 'office-tools', name: '办公效率' },
      { id: 'automation-tools', name: '自动化工具' }
    ]
  },
  'ai-creation': { 
    name: 'AI创作', 
    icon: '🎨', 
    subcategories: [
      { id: 'video-tools', name: '视频编辑' },
      { id: 'image-tools', name: '图像生成' },
      { id: 'audio-tools', name: '音频处理' },
      { id: 'text-tools', name: '文本创作' }
    ]
  },
  'ai-life': { 
    name: 'AI生活', 
    icon: '🏠', 
    subcategories: [
      { id: 'fitness-tools', name: '健身工具' },
      { id: 'health-tools', name: '健康工具' },
      { id: 'religious-tools', name: '宗教工具' },
      { id: 'fashion-tools', name: '时尚工具' },
      { id: 'gift-tools', name: '礼物推荐' },
      { id: 'travel-tools', name: '旅行工具' },
      { id: 'food-tools', name: '美食工具' }
    ]
  },
  'ai-learning': { 
    name: 'AI学习', 
    icon: '📚', 
    subcategories: [
      { id: 'education-tools', name: '教育工具' },
      { id: 'research-tools', name: '研究助手' },
      { id: 'student-tools', name: '学生工具' }
    ]
  }
}

// 获取分类（兼容旧代码）
export function getCategories() {
  return scenes
}
