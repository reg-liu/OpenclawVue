// 飞书Bitable API服务
// 文档：https://open.feishu.cn/document/server-docs/bithubble-v1/introduction

const APP_TOKEN = 'LzUsbHaTaayqshsKFTQcOHLMnCh'
const TABLE_ID = 'tbloERDmAF9a4qc6'

// 获取工具列表
export async function getTools() {
  const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${await getAccessToken()}`
      }
    })
    const data = await response.json()
    
    if (data.data && data.data.items) {
      return data.data.items
        .filter(item => item.fields.status === '已发布')
        .map(item => ({
          id: item.record_id,
          name: item.fields['AI工具导航'],
          icon: item.fields.icon,
          description: item.fields.description,
          scenes: item.fields.scenes || [],
          price: item.fields.price,
          difficulty: item.fields.difficulty,
          openclaw_practice: item.fields.openclaw_practice,
          website: item.fields.website,
          sort: item.fields.sort || 0
        }))
        .sort((a, b) => a.sort - b.sort)
    }
    return []
  } catch (error) {
    console.error('获取工具列表失败:', error)
    return []
  }
}

// 获取访问令牌（需要实现应用认证）
// 简化版本：使用公开表格或代理服务
async function getAccessToken() {
  // TODO: 实现飞书应用认证
  // 临时返回空字符串，需要配置应用权限
  return ''
}

// 场景配置
export const scenes = [
  { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI' },
  { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景（写文档，做PPT、整理数据）' },
  { id: 'ai-create', name: 'AI创作', icon: '🎨', description: '写文章，做视频、生成图片' },
  { id: 'ai-code', name: 'AI编程', icon: '💻', description: '代码辅助、调试、Bug修复' },
  { id: 'ai-study', name: 'AI学习', icon: '📚', description: '看论文、学新技术' }
]

// 根据场景筛选工具
export function getToolsByScene(tools, sceneId) {
  const sceneMap = {
    'ai-entry': 'AI入门',
    'ai-office': 'AI办公', 
    'ai-create': 'AI创作',
    'ai-code': 'AI编程',
    'ai-study': 'AI学习'
  }
  
  const sceneName = sceneMap[sceneId]
  return tools.filter(tool => tool.scenes && tool.scenes.includes(sceneName))
}
