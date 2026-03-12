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
  'office-writing': [{ id: 'wf-1', category_id: 'office-writing', title: 'AI写作工作流', description: '使用AI工具完成文章撰写的完整流程', steps: [{ step: 1, title: '确定主题', desc: '明确写作目标和受众' }, { step: 2, title: 'AI生成大纲', desc: 'AI自动生成文章结构' }, { step: 3, title: '内容扩写', desc: '根据大纲填充详细内容' }, { step: 4, title: '润色校对', desc: '检查语法、优化表达' }] }],
  'office-business': [{ id: 'wf-2', category_id: 'office-business', title: 'AI商业文案工作流', description: '使用AI工具完成商业文案撰写的完整流程', steps: [{ step: 1, title: '确定目标', desc: '明确商业文案的目标和受众' }, { step: 2, title: 'AI生成大纲', desc: 'AI自动生成文案结构' }, { step: 3, title: '内容填充', desc: '根据大纲填充商业内容' }, { step: 4, title: '优化发布', desc: '检查优化并准备发布' }] }],
  'create-video': [{ id: 'wf-3', category_id: 'create-video', title: 'AI视频生成工作流', description: '使用AI工具完成视频创作的完整流程', steps: [{ step: 1, title: '确定主题', desc: '明确视频主题和内容' }, { step: 2, title: '生成脚本', desc: 'AI生成视频脚本' }, { step: 3, title: '生成视频', desc: 'AI生成视频内容' }, { step: 4, title: '后期剪辑', desc: 'AI辅助剪辑和优化' }] }],
  'create-image': [{ id: 'wf-4', category_id: 'create-image', title: 'AI图像生成工作流', description: '使用AI工具完成图像创作的完整流程', steps: [{ step: 1, title: '构思描述', desc: '明确想要生成的图像内容' }, { step: 2, title: '选择模型', desc: '根据需求选择合适的AI模型' }, { step: 3, title: '生成图像', desc: '输入提示词生成图像' }, { step: 4, title: '后期处理', desc: '调整尺寸、优化细节' }] }],
  'learn-coding': [{ id: 'wf-5', category_id: 'learn-coding', title: 'AI编程工作流', description: '使用AI工具辅助编程的完整流程', steps: [{ step: 1, title: '需求分析', desc: '明确要实现的功能' }, { step: 2, title: 'AI生成代码', desc: '描述需求让AI生成代码' }, { step: 3, title: '调试优化', desc: 'AI辅助调试和优化' }, { step: 4, title: '测试部署', desc: '运行测试并部署' }] }]
}

// 后备工具数据
const fallbackTools = {
  'ai-entry': [{ id: 1, name: 'ChatGPT', icon: '💬', description: 'OpenAI开发的AI对话工具，适合日常问答和内容创作', price: '免费/付费', difficulty: '入门', features: '对话、写作、编程', network: '需要VPN' }, { id: 2, name: 'Claude', icon: '🧠', description: 'Anthropic推出的AI助手，长文本处理能力强', price: '免费/付费', difficulty: '进阶', features: '长文本、编程，分析', network: '需要VPN' }, { id: 3, name: 'Kimi', icon: '🦊', description: '月之暗面推出的中文AI助手，超长上下文', price: '免费', difficulty: '入门', features: '长文本、中文优化', network: '国内可直接访问' }],
  'create-video': [{ id: 1, name: 'Runway', icon: '🎬', description: 'AI视频生成和编辑平台，功能全面', price: '免费/付费', difficulty: '进阶', features: '视频生成、编辑、特效', network: '需要VPN' }, { id: 2, name: 'Pika', icon: '🎥', description: 'AI视频生成工具，快速生成视频', price: '免费/付费', difficulty: '入门', features: '文字转视频、视频编辑', network: '需要VPN' }, { id: 3, name: '可灵', icon: '🦁', description: '快手AI视频生成，国产视频生成标杆', price: '免费/付费', difficulty: '入门', features: '视频生成、文字转视频', network: '国内可直接访问' }, { id: 4, name: '即梦', icon: '✨', description: '字节跳动AI视频生成工具', price: '免费', difficulty: '入门', features: '视频生成、AI作图', network: '国内可直接访问' }, { id: 5, name: 'Sora', icon: '🌊', description: 'OpenAI视频生成模型（未公测）', price: '待定', difficulty: '进阶', features: '视频生成、世界模拟', network: '需要VPN' }, { id: 6, name: 'Luma Dream Machine', icon: '💫', description: 'AI视频生成新星，效果惊艳', price: '免费/付费', difficulty: '入门', features: '视频生成、动画', network: '需要VPN' }],
  'create-image': [{ id: 1, name: 'Midjourney', icon: '🎨', description: 'AI图像生成标杆，画质最高', price: '付费', difficulty: '进阶', features: '艺术创作、概念设计', network: '需要VPN' }, { id: 2, name: 'DALL-E 3', icon: '🖼️', description: 'OpenAI图像生成，GPT集成更智能', price: '付费', difficulty: '入门', features: '图像生成、编辑', network: '需要VPN' }, { id: 3, name: 'Stable Diffusion', icon: '⚡', description: '开源本地运行，可自定义模型', price: '免费', difficulty: '进阶', features: '本地部署、自定义', network: '本地运行' }],
  'learn-coding': [{ id: 1, name: 'GitHub Copilot', icon: '💻', description: '微软AI编程助手，代码补全能力强', price: '付费', difficulty: '入门', features: '代码补全、调试', network: '需要VPN' }, { id: 2, name: 'Cursor', icon: '📝', description: 'AI编程IDE，基于VS Code', price: '免费/付费', difficulty: '入门', features: '代码编辑、AI对话', network: '需要VPN' }, { id: 3, name: 'Claude Code', icon: '🤖', description: 'Anthropic推出的AI编程助手', price: '免费', difficulty: '进阶', features: '代码生成、调试', network: '需要VPN' }]
}

// 后备热门任务数据
const fallbackHotTasks = [
  { id: 1, name: '文案创作', description: '使用AI生成营销文案、博客文章', heat: 5200 },
  { id: 2, name: 'PPT制作', description: 'AI辅助制作演示文稿', heat: 4800 },
  { id: 3, name: '代码辅助', description: 'AI编程助手，提高开发效率', heat: 4500 },
  { id: 4, name: '图像生成', description: 'AI生成创意图片和插画', heat: 4200 },
  { id: 5, name: '视频剪辑', description: 'AI辅助视频编辑和生成', heat: 3800 },
  { id: 6, name: '数据分析', description: 'AI处理和分析数据', heat: 3500 }
]

export default async function handler(req, res) {
  const { scene, type, cat, page } = req.query
  console.log('API called:', { scene, type, cat, page })
  
  // 统一页面数据接口
  if (type === 'page') {
    const categoryId = cat || scene || ''
    console.log('page API:', page, categoryId)
    
    try {
      // 获取一级分类（parent为空或空字符串）
      const catResult = await client.execute('SELECT * FROM categories WHERE parent = "" OR parent IS NULL ORDER BY sort')
      const categories = catResult.rows
      
      // 获取当前分类的子分类
      let subCategories = []
      if (categoryId) {
        const subResult = await client.execute({
          sql: 'SELECT * FROM categories WHERE parent = ? ORDER BY sort',
          args: [categoryId]
        })
        subCategories = subResult.rows
      }
      
      // 获取工作流
      const wfResult = await client.execute({
        sql: 'SELECT * FROM workflows WHERE category_id = ? ORDER BY sort',
        args: [categoryId]
      })
      const workflows = wfResult.rows
      
      // 获取工具
      const toolsResult = await client.execute({
        sql: 'SELECT * FROM tools WHERE category = ? OR subcategory = ? ORDER BY sort',
        args: [categoryId, categoryId]
      })
      const tools = toolsResult.rows
      
      // 获取热门任务
      const htResult = await client.execute({
        sql: 'SELECT * FROM hot_tasks WHERE category_id = ? ORDER BY heat DESC',
        args: [categoryId]
      })
      const hotTasks = htResult.rows
      
      return res.status(200).json({
        success: true,
        data: {
          categories: categories.map(c => ({
            ...c,
            children: subCategories.filter(sc => sc.parent === c.id)
          })),
          workflows,
          tools,
          hotTasks
        }
      })
    } catch (err) {
      console.error('Database error:', err)
      return res.status(200).json({
        success: true,
        data: {
          categories: defaultCategories,
          workflows: fallbackWorkflows[categoryId] || [],
          tools: fallbackTools[categoryId] || [],
          hotTasks: fallbackHotTasks
        }
      })
    }
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
