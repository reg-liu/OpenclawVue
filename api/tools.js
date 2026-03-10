// 工具数据API - SQLite版
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'data', 'tools.db')

const db = new Database(dbPath)

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

export default function handler(req, res) {
  const { scene } = req.query
  
  try {
    let sql = 'SELECT * FROM tools WHERE status = ?'
    const params = ['已发布']
    
    // 按场景过滤
    if (scene) {
      sql += ' AND scenes LIKE ?'
      params.push(`%${scene}%`)
    }
    
    sql += ' ORDER BY sort ASC'
    
    const stmt = db.prepare(sql)
    const rows = stmt.all(...params)
    
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
