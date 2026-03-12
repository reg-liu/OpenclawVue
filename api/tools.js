// 工具数据API - Turso云数据库版
import { createClient } from '@libsql/client'

// Turso 配置
const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = process.env.TURSO_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

const scenes = [
  { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI' },
  { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景' },
  { id: 'ai-create', name: 'AI创作', icon: '🎨', description: '写文章，做视频、生成图片' },
  { id: 'ai-code', name: 'AI编程', icon: '💻', description: '代码辅助、调试，Bug修复' },
  { id: 'ai-study', name: 'AI学习', icon: '📚', description: '看论文、学新技术' }
]

// 场景名称映射
const sceneNameMap = {
  'ai-entry': 'AI入门',
  'ai-office': 'AI办公', 
  'ai-create': 'AI创作',
  'ai-code': 'AI编程',
  'ai-study': 'AI学习'
}

export default async function handler(req, res) {
  const { scene, type, category } = req.query
  console.log('API called:', { scene, type, category })
  
  try {
    // 获取分类
    if (type === 'categories') {
      console.log('Returning categories...')
      
      // 默认场景数据（后备）
      const defaultCategories = [
        { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI', children: [] },
        { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景', children: [
          { id: 'ai-writing', name: 'AI写作', icon: '✍️', description: '文案撰写、内容创作' },
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
      
      try {
        const catResult = await client.execute({
          sql: 'SELECT * FROM categories ORDER BY sort ASC',
          args: []
        })
        
        // 处理分类层级
        const allCategories = catResult.rows
        const mainCategories = allCategories.filter(c => !c.parent)
        const subCategories = allCategories.filter(c => c.parent)
        
        // 为每个主分类添加子分类
        const categories = mainCategories.map(main => ({
          ...main,
          children: subCategories
            .filter(sub => sub.parent === main.id)
            .sort((a, b) => a.sort - b.sort)
        }))
        
        // 如果数据库有数据则使用数据库数据，否则使用默认数据
        const finalData = categories.length > 0 ? categories : defaultCategories
        
        return res.status(200).json({
          success: true,
          data: finalData
        })
      } catch (err) {
        console.error('Database error, using fallback:', err.message)
        // 数据库出错时返回默认数据
        return res.status(200).json({
          success: true,
          data: defaultCategories
        })
      }
    }
    
    // 获取热门任务
    if (type === 'hot_tasks') {
      let sql = 'SELECT * FROM hot_tasks'
      const params = []
      
      if (category) {
        sql += ' WHERE category_id = ?'
        params.push(category)
      }
      
      sql += ' ORDER BY heat DESC'
      
      const result = await client.execute({ sql, args: params })
      
      return res.status(200).json({
        success: true,
        data: result.rows
      })
    }
    
    // 获取工作流
    if (type === 'workflows') {
      // 后备工作流数据
      const fallbackWorkflows = {
        'office-business': [
          {
            id: 'wf-business-1',
            category_id: 'office-business',
            title: 'AI商业文案工作流',
            description: '使用AI工具完成商业文案撰写的完整流程',
            steps: [
              { step: 1, title: '确定目标', desc: '明确商业文案的目标和受众' },
              { step: 2, title: 'AI生成大纲', desc: 'AI自动生成文案结构' },
              { step: 3, title: '内容填充', desc: '根据大纲填充商业内容' },
              { step: 4, title: '优化发布', desc: '检查优化并准备发布' }
            ]
          }
        ],
        'office-writing': [
          {
            id: 'wf-writing-1',
            category_id: 'office-writing',
            title: 'AI写作工作流',
            description: '使用AI工具完成文章撰写的完整流程',
            steps: [
              { step: 1, title: '确定主题', desc: '明确写作目标和受众' },
              { step: 2, title: 'AI生成大纲', desc: 'AI自动生成文章结构' },
              { step: 3, title: '内容扩写', desc: '根据大纲填充详细内容' },
              { step: 4, title: '润色校对', desc: '检查语法、优化表达' }
            ]
          }
        ],
        'create-image': [
          {
            id: 'wf-image-1',
            category_id: 'create-image',
            title: 'AI图像生成工作流',
            description: '使用AI工具完成图像创作的完整流程',
            steps: [
              { step: 1, title: '构思描述', desc: '明确想要生成的图像内容' },
              { step: 2, title: '选择模型', desc: '根据需求选择合适的AI模型' },
              { step: 3, title: '生成图像', desc: '输入提示词生成图像' },
              { step: 4, title: '后期处理', desc: '调整尺寸、优化细节' }
            ]
          }
        ],
        'learn-coding': [
          {
            id: 'wf-coding-1',
            category_id: 'learn-coding',
            title: 'AI编程工作流',
            description: '使用AI工具辅助编程的完整流程',
            steps: [
              { step: 1, title: '需求分析', desc: '明确要实现的功能' },
              { step: 2, title: 'AI生成代码', desc: '描述需求让AI生成代码' },
              { step: 3, title: '调试优化', desc: 'AI辅助调试和优化' },
              { step: 4, title: '测试部署', desc: '运行测试并部署' }
            ]
          }
        ]
      }
      
      try {
        let sql = 'SELECT * FROM workflows'
        const params = []
        
        if (category) {
          sql += ' WHERE category_id = ?'
          params.push(category)
        }
        
        sql += ' ORDER BY sort ASC'
        
        const result = await client.execute({ sql, args: params })
        
        // 解析steps JSON
        let workflows = result.rows.map(w => ({
          ...w,
          steps: w.steps ? JSON.parse(w.steps) : []
        }))
        
        // 如果数据库没有数据，使用后备数据
        if (workflows.length === 0 && fallbackWorkflows[category]) {
          workflows = fallbackWorkflows[category]
        }
        
        return res.status(200).json({
          success: true,
          data: workflows
        })
      } catch (err) {
        // 数据库出错时使用后备数据
        const workflows = fallbackWorkflows[category] || []
        return res.status(200).json({
          success: true,
          data: workflows
        })
      }
    }
    
    // 获取工具
    // 后备工具数据
    const fallbackTools = {
      'office-writing': [
        { id: 1, name: 'ChatGPT', icon: '💬', description: 'OpenAI开发的AI对话工具，适合日常问答和内容创作', price: '免费/付费', difficulty: '入门', features: '对话、写作、编程', network: '需要VPN' },
        { id: 2, name: 'Claude', icon: '🧠', description: 'Anthropic推出的AI助手，长文本处理能力强', price: '免费/付费', difficulty: '进阶', features: '长文本、编程、分析', network: '需要VPN' },
        { id: 3, name: 'Kimi', icon: '🦊', description: '月之暗面推出的中文AI助手，超长上下文', price: '免费', difficulty: '入门', features: '长文本、中文优化', network: '国内可直接访问' },
        { id: 4, name: '文心一言', icon: '🔥', description: '百度推出的中文AI助手，文学创作能力强', price: '免费', difficulty: '入门', features: '中文创作、知识问答', network: '国内可直接访问' }
      ],
      'create-image': [
        { id: 5, name: 'Midjourney', icon: '🎨', description: 'AI图像生成标杆，画质最高', price: '付费', difficulty: '进阶', features: '艺术创作、概念设计', network: '需要VPN' },
        { id: 6, name: 'DALL-E 3', icon: '🖼️', description: 'OpenAI图像生成，GPT集成更智能', price: '付费', difficulty: '入门', features: '图像生成、编辑', network: '需要VPN' },
        { id: 7, name: 'Stable Diffusion', icon: '⚡', description: '开源本地运行，可自定义模型', price: '免费', difficulty: '进阶', features: '本地部署、自定义', network: '本地运行' }
      ],
      'learn-coding': [
        { id: 8, name: 'GitHub Copilot', icon: '💻', description: '微软AI编程助手，代码补全能力强', price: '付费', difficulty: '入门', features: '代码补全、调试', network: '需要VPN' },
        { id: 9, name: 'Cursor', icon: '📝', description: 'AI编程IDE，基于VS Code', price: '免费/付费', difficulty: '入门', features: '代码编辑、AI对话', network: '需要VPN' },
        { id: 10, name: 'Claude Code', icon: '🤖', description: 'Anthropic推出的AI编程助手', price: '免费', difficulty: '进阶', features: '代码生成、调试', network: '需要VPN' }
      ]
    }
    
    let sql = 'SELECT * FROM tools WHERE status = ?'
    const params = ['已发布']
    
    // 按场景过滤
    if (scene) {
      sql += ' AND scenes LIKE ?'
      params.push(`%${scene}%`)
    }
    
    sql += ' ORDER BY sort ASC'
    
    const result = await client.execute({
      sql,
      args: params
    })
    const rows = result.rows
    
    // 转换数据格式
    const tools = rows.map(row => ({
      id: row.id,
      name: row.name,
      icon: row.icon,
      category: row.category,
      subcategory: row.subcategory,
      description: row.description,
      scenes: row.scenes ? row.scenes.split(',') : [],
      price: row.price,
      priceDetail: row.price_detail,
      difficulty: row.difficulty,
      network: row.network,
      mobile: row.mobile,
      pros: row.pros,
      cons: row.cons,
      features: row.features ? row.features.split(',') : [],
      workflow: row.workflow,
      workflowSteps: row.workflow_steps ? JSON.parse(row.workflow_steps) : [],
      openclaw_practice: row.openclaw_practice,
      website: row.website,
      sort: row.sort
    }))
    
    // 如果数据库没有数据，使用后备数据
    let finalTools = tools
    if (tools.length === 0 && fallbackTools[scene]) {
      finalTools = fallbackTools[scene]
    }
    
    res.status(200).json({
      success: true,
      data: finalTools,
      scenes: scenes
    })
  } catch (error) {
    console.error('获取数据失败:', error)
    // 出错时返回后备数据
    const fallbackT = fallbackTools[scene] || []
    res.status(200).json({
      success: true,
      data: fallbackT,
      scenes: []
    })
  }
}
