// 本地API服务器 - 读取SQLite
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, 'data', 'tools.db')

const db = new Database(dbPath)

const scenes = [
  { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI' },
  { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景' },
  { id: 'ai-create', name: 'AI创作', icon: '🎨', description: '写文章，做视频、生成图片' },
  { id: 'ai-code', name: 'AI编程', icon: '💻', description: '代码辅助、调试，Bug修复' },
  { id: 'ai-study', name: 'AI学习', icon: '📚', description: '看论文、学新技术' }
]

// 场景名称转换 - 数据库用连字符，前端用下划线
const sceneToApi = {
  'ai-entry': 'ai_entry',
  'ai-office': 'ai_office', 
  'ai-create': 'ai_create',
  'ai-code': 'ai_code',
  'ai-study': 'ai_study'
}

const apiToScene = {
  'ai_entry': 'ai-entry',
  'ai_office': 'ai-office', 
  'ai_create': 'ai-create',
  'ai_code': 'ai-code',
  'ai_study': 'ai-study'
}

const server = http.createServer((req, res) => {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  // API路由
  if (req.url === '/api/tools' || req.url.startsWith('/api/tools?')) {
    const url = new URL(req.url, `http://localhost:${PORT}`)
    const scene = url.searchParams.get('scene')
    
    try {
      let sql = 'SELECT * FROM tools WHERE status = ?'
      const params = ['已发布']
      
      // 转换场景参数 - 前端用下划线，数据库用连字符
      if (scene && apiToScene[scene]) {
        sql += ' AND scenes LIKE ?'
        params.push(`%${apiToScene[scene]}%`)
      }
      
      sql += ' ORDER BY sort ASC'
      
      const stmt = db.prepare(sql)
      const rows = stmt.all(...params)
      
      const tools = rows.map(row => ({
        id: row.id,
        name: row.name,
        icon: row.icon,
        category: row.category,
        subcategory: row.subcategory,
        description: row.description,
        // 转换场景为前端格式（下划线）
        scenes: row.scenes ? row.scenes.split(',').map(s => sceneToApi[s] || s) : [],
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
      
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: tools, scenes }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: error.message }))
    }
    return
  }
  
  // 健康检查
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', timestamp: Date.now() }))
    return
  }
  
  res.writeHead(404)
  res.end('Not Found')
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`
✅ 本地API服务器已启动
📡 地址: http://localhost:${PORT}/api/tools
🔧 场景过滤: /api/tools?scene=ai_entry
`)
})
