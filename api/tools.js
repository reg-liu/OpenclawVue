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
  
  try {
    // 获取分类
    if (type === 'categories') {
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
      
      return res.status(200).json({
        success: true,
        data: categories
      })
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
      let sql = 'SELECT * FROM workflows'
      const params = []
      
      if (category) {
        sql += ' WHERE category_id = ?'
        params.push(category)
      }
      
      sql += ' ORDER BY sort ASC'
      
      const result = await client.execute({ sql, args: params })
      
      // 解析steps JSON
      const workflows = result.rows.map(w => ({
        ...w,
        steps: w.steps ? JSON.parse(w.steps) : []
      }))
      
      return res.status(200).json({
        success: true,
        data: workflows
      })
    }
    
    // 获取工具
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
    
    res.status(200).json({
      success: true,
      data: tools,
      scenes: scenes
    })
  } catch (error) {
    console.error('获取数据失败:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
