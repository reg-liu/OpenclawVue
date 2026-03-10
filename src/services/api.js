// API服务
// 公网地址: https://6a295361.cpolar.io/api
const API_BASE = 'https://6a295361.cpolar.io/api'

// 从API获取工具数据
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
    console.error('获取工具数据失败:', error)
    return { tools: [], scenes: [] }
  }
}

// 场景配置
export const scenes = [
  { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI' },
  { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景（写文档，做PPT、整理数据）' },
  { id: 'ai-create', name: 'AI创作', icon: '🎨', description: '写文章，做视频、生成图片' },
  { id: 'ai-code', name: 'AI编程', icon: '💻', description: '代码辅助、调试，Bug修复' },
  { id: 'ai-study', name: 'AI学习', icon: '📚', description: '看论文、学新技术' }
]

// 获取场景下的分类
export function getCategories(sceneTools) {
  return [...new Set(sceneTools.map(t => t.category))]
}

// 获取某场景某分类的工具
export function filterToolsByCategory(tools, category) {
  return tools.filter(t => t.category === category)
}
