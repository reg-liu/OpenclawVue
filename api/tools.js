import { createClient } from '@libsql/client'

const TURSO_URL = process.env.TURSO_URL || 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = process.env.TURSO_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

// 后备分类数据
const defaultCategories = [
  { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI', children: [] },
  { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景', children: [
    { id: 'ai-writing', name: 'AI写作', icon: '✍️', description: '文案撰写，内容创作' },
    { id: 'ai-presentation', name: 'AI PPT', icon: '📊', description: 'PPT制作与演示' },
    { id: 'ai-data', name: 'AI数据分析', icon: '📈', description: '数据分析与可视化' }
  ]},
  { id: 'ai-create', name: 'AI创作', icon: '🎨', description: '写文章，做视频、生成图片', children: [
    { id: 'ai-image', name: 'AI图像', icon: '🖼️', description: 'AI图像生成' },
    { id: 'ai-video', name: 'AI视频', icon: '🎬', description: 'AI视频生成' },
    { id: 'ai-audio', name: 'AI音频', icon: '🎵', description: 'AI语音合成' }
  ]},
  { id: 'ai-code', name: 'AI编程', icon: '💻', description: '代码辅助、调试，Bug修复', children: [] },
  { id: 'ai-study', name: 'AI学习', icon: '📚', description: '看论文、学新技术', children: [] }
]

// 后备工作流数据
const fallbackWorkflows = {
  'ai-office': [
    { id: 'wf-1', category_id: 'ai-office', title: 'AI办公工作流', description: '使用AI工具提升办公效率的完整流程', steps: [] },
    { id: 'wf-2', category_id: 'ai-office', title: 'AI写作工作流', description: 'AI辅助文章撰写流程', steps: [] }
  ],
  'ai-create': [
    { id: 'wf-3', category_id: 'ai-create', title: 'AI创作工作流', description: '使用AI工具完成创意作品的完整流程', steps: [] }
  ],
  'video': [
    { id: 'wf-v1', category_id: 'video', title: '视频制作工作流', description: 'AI辅助视频制作的完整流程', steps: [] }
  ],
  'image': [
    { id: 'wf-i1', category_id: 'image', title: 'AI绘画工作流', description: '从提示词到成图的AI绘画流程', steps: [] }
  ],
  'coding': [
    { id: 'wf-c1', category_id: 'coding', title: '编程开发工作流', description: 'AI辅助编程的完整流程', steps: [] }
  ],
  'ai-learn': [
    { id: 'wf-l1', category_id: 'ai-learn', title: 'AI学习工作流', description: 'AI辅助学习新知识的流程', steps: [] }
  ],
  'ai-life': [
    { id: 'wf-lf1', category_id: 'ai-life', title: 'AI生活工作流', description: 'AI让生活更智能', steps: [] }
  ]
}

// 后备工具数据
const fallbackTools = {
  'ai-office': [
    { id: 1, name: 'WPS AI', icon: '📝', description: '智能文档处理助手', price: '免费', difficulty: '入门', features: '智能写作', network: '在线', tags: '["文档处理"]', strengths: '中文处理强', pros: '集成办公', cons: '高级付费', mobile: '支持', recommended: '是' },
    { id: 2, name: 'Notion AI', icon: '📋', description: '智能笔记工具', price: '付费', difficulty: '入门', features: '笔记管理', network: '在线', tags: '["项目管理"]', strengths: '多功能', pros: '协作方便', cons: '需翻墙', mobile: '支持', recommended: '是' },
    { id: 3, name: 'ChatGPT', icon: '🤖', description: '通用AI助手', price: '免费', difficulty: '入门', features: '问答对话', network: '在线', tags: '["通用AI"]', strengths: '通用力强', pros: '能力全面', cons: '需翻墙', mobile: '支持', recommended: '是' },
    { id: 4, name: 'Copilot', icon: '💡', description: '微软AI助手', price: '付费', difficulty: '入门', features: 'PPT生成', network: '在线', tags: '["Office"]', strengths: 'Office集成', pros: '自动化高', cons: '需订阅', mobile: '支持', recommended: '是' }
  ],
  'ai-create': [
    { id: 5, name: 'Midjourney', icon: '🎨', description: 'AI图像生成', price: '付费', difficulty: '进阶', features: '文生图', network: '在线', tags: '["AI绘画"]', strengths: '图像质量高', pros: '艺术感强', cons: '需Discord', mobile: '不支持', recommended: '是' },
    { id: 6, name: 'Runway', icon: '🎬', description: 'AI视频生成', price: '付费', difficulty: '进阶', features: '视频生成', network: '在线', tags: '["视频"]', strengths: '视频功能全', pros: '效果好', cons: '价格高', mobile: '不支持', recommended: '是' }
  ],
  'video': [
    { id: 6, name: 'Runway', icon: '🎬', description: 'AI视频生成和编辑平台', price: '付费', difficulty: '进阶', features: '视频生成、编辑、特效', network: '在线', tags: '["视频"]', strengths: '视频功能全面', pros: '效果好', cons: '价格高', mobile: '不支持', recommended: '是' },
    { id: 7, name: 'Pika', icon: '🎥', description: 'AI视频生成工具', price: '免费/付费', difficulty: '入门', features: '文字转视频', network: '在线', tags: '["视频"]', strengths: '快速生成', pros: '使用简单', cons: '功能有限', mobile: '不支持', recommended: '是' },
    { id: 8, name: '可灵', icon: '🦁', description: '快手AI视频生成', price: '免费/付费', difficulty: '入门', features: '视频生成', network: '在线', tags: '["视频"]', strengths: '中文友好', pros: '免费可用', cons: '功能较少', mobile: '支持', recommended: '是' },
    { id: 9, name: '即梦', icon: '✨', description: '字节跳动AI视频工具', price: '免费', difficulty: '入门', features: '视频生成', network: '在线', tags: '["视频"]', strengths: '字节生态', pros: '免费', cons: '较新', mobile: '支持', recommended: '是' }
  ],
  'image': [
    { id: 5, name: 'Midjourney', icon: '🎨', description: 'AI图像生成标杆', price: '付费', difficulty: '进阶', features: '文生图', network: '在线', tags: '["AI绘画"]', strengths: '图像质量高', pros: '艺术感强', cons: '需Discord', mobile: '不支持', recommended: '是' },
    { id: 10, name: 'DALL-E', icon: '🖼️', description: 'OpenAI图像生成', price: '付费', difficulty: '入门', features: '图像生成', network: '在线', tags: '["AI绘画"]', strengths: 'GPT集成', pros: '使用简单', cons: '价格较高', mobile: '支持', recommended: '是' },
    { id: 11, name: 'Stable Diffusion', icon: '⚡', description: '开源AI图像模型', price: '免费', difficulty: '困难', features: '本地部署', network: '离线', tags: '["开源"]', strengths: '可定制', pros: '免费开源', cons: '需要显卡', mobile: '不支持', recommended: '是' }
  ],
  'coding': [
    { id: 12, name: 'GitHub Copilot', icon: '👨‍💻', description: 'AI编程助手', price: '付费', difficulty: '入门', features: '代码补全', network: '在线', tags: '["编程"]', strengths: '补全准确', pros: '支持支流IDE', cons: '需付费', mobile: '不支持', recommended: '是' },
    { id: 13, name: 'Cursor', icon: '⌨️', description: 'AI代码编辑器', price: '免费/付费', difficulty: '入门', features: '代码编辑', network: '在线', tags: '["IDE"]', strengths: 'AI深度集成', pros: '免费可用', cons: '功能较少', mobile: '不支持', recommended: '是' },
    { id: 14, name: 'Claude', icon: '🧠', description: 'AI编程助手', price: '免费', difficulty: '入门', features: '代码编写', network: '在线', tags: '["编程"]', strengths: '编程能力强', pros: '输出稳定', cons: '需翻墙', mobile: '支持', recommended: '是' }
  ],
  'ai-learn': [
    { id: 15, name: 'DeepL', icon: '🌐', description: 'AI翻译工具', price: '免费', difficulty: '入门', features: '翻译', network: '在线', tags: '["翻译"]', strengths: '翻译质量高', pros: '支持文档', cons: '额度有限', mobile: '支持', recommended: '是' }
  ]
}

// 后备热门任务数据
const fallbackHotTasks = {
  'ai-office': [
    { id: 1, name: '智能写作', description: '输入主题，AI帮你完成文章', heat: 100, sort: 1 },
    { id: 2, name: 'PPT制作', description: '输入内容大纲，AI生成演示文稿', heat: 95, sort: 2 },
    { id: 3, name: '数据整理', description: '自动整理和分析Excel数据', heat: 90, sort: 3 }
  ],
  'ai-create': [
    { id: 4, name: 'AI绘画', description: '文字描述生成精美图片', heat: 100, sort: 1 },
    { id: 5, name: '视频生成', description: '输入文案自动生成视频', heat: 95, sort: 2 }
  ],
  'video': [
    { id: 5, name: '视频生成', description: '输入文案自动生成视频', heat: 100, sort: 1 },
    { id: 6, name: '视频剪辑', description: 'AI辅助视频编辑和生成', heat: 90, sort: 2 }
  ],
  'image': [
    { id: 4, name: 'AI绘画', description: '文字描述生成精美图片', heat: 100, sort: 1 }
  ],
  'coding': [
    { id: 7, name: '代码编写', description: '描述需求，AI生成代码', heat: 100, sort: 1 },
    { id: 8, name: '代码调试', description: 'AI辅助调试和修复bug', heat: 85, sort: 2 }
  ],
  'ai-learn': [
    { id: 9, name: '英语翻译', description: '高质量中英文互译', heat: 95, sort: 1 },
    { id: 10, name: '作业辅导', description: 'AI辅导解答学习问题', heat: 85, sort: 2 }
  ],
  'ai-life': [
    { id: 11, name: '健康咨询', description: 'AI提供健康建议和咨询', heat: 85, sort: 1 },
    { id: 12, name: '旅行规划', description: '输入目的地，AI规划行程', heat: 80, sort: 2 }
  ]
}
]

export default async function handler(req, res) {
  const { scene, type, cat, page } = req.query
  console.log('API called:', { scene, type, cat, page })
  
  // 统一页面数据接口
  if (type === 'page') {
    const categoryId = cat || scene || ''
    console.log('page API:', page, categoryId)
    
    if (!categoryId) {
      return res.status(200).json({
        success: true,
        data: { categories: [], workflows: [], tools: [], hotTasks: [] }
      })
    }
    
    // 使用后备数据
    return res.status(200).json({
      success: true,
      data: {
        categories: defaultCategories,
        workflows: fallbackWorkflows[categoryId] || [],
        tools: fallbackTools[categoryId] || [],
        hotTasks: fallbackHotTasks[categoryId] || fallbackHotTasks['ai-office'] || []
      }
    })
  }
  
  // 获取分类
  if (type === 'categories') {
    try {
      console.log('Fetching categories from database...')
      const result = await client.execute('SELECT * FROM categories ORDER BY sort')
      console.log('All categories:', result.rows.length)
      const categories = result.rows
      
      // 按parent分组
      const parentCategories = categories.filter(c => !c.parent || c.parent === '')
      const childrenMap = {}
      categories.filter(c => c.parent && c.parent !== '').forEach(c => {
        if (!childrenMap[c.parent]) childrenMap[c.parent] = []
        childrenMap[c.parent].push(c)
      })
      
      const categoriesWithChildren = parentCategories.map(c => ({
        ...c,
        children: childrenMap[c.id] || []
      }))
      
      console.log('Parent categories:', categoriesWithChildren.map(c => c.name).join(', '))
      
      return res.status(200).json({
        success: true,
        data: categoriesWithChildren
      })
    } catch (err) {
      console.error('Categories DB error:', err)
      return res.status(200).json({
        success: true,
        data: defaultCategories
      })
    }
  }
  
  // 获取工作流
  if (type === 'workflows') {
    const categoryId = cat || scene || ''
    try {
      const result = await client.execute({
        sql: 'SELECT * FROM workflows WHERE category_id = ? ORDER BY sort',
        args: [categoryId]
      })
      return res.status(200).json({
        success: true,
        data: result.rows
      })
    } catch (err) {
      return res.status(200).json({
        success: true,
        data: fallbackWorkflows[categoryId] || []
      })
    }
  }
  
  // 获取热门任务
  if (type === 'hot_tasks') {
    try {
      const result = await client.execute('SELECT * FROM hot_tasks ORDER BY heat DESC')
      return res.status(200).json({
        success: true,
        data: result.rows
      })
    } catch (err) {
      return res.status(200).json({
        success: true,
        data: fallbackHotTasks
      })
    }
  }
  
  // 获取工具（按场景）
  const tools = fallbackTools[scene] || fallbackTools[cat] || []
  return res.status(200).json({
    success: true,
    data: tools
  })
}
