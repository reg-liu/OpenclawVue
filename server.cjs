// 本地API服务器 - Turso云数据库版
// 注意：此文件仅用于本地开发，生产环境使用 Vercel API
const { createClient } = require('@libsql/client')
const http = require('http')

// Turso 配置
const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

const scenes = [
  { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI' },
  { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景' },
  { id: 'ai-create', name: 'AI创作', icon: '🎨', description: '写文章，做视频、生成图片' },
  { id: 'ai-code', name: 'AI编程', icon: '💻', description: '代码辅助、调试、Bug修复' },
  { id: 'ai-study', name: 'AI学习', icon: '📚', description: '看论文、学新技术' }
]

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  if (req.url === '/api/tools' || req.url.startsWith('/api/tools?')) {
    const url = new URL(req.url, `http://localhost:${PORT}`)
    const scene = url.searchParams.get('scene')
    
    try {
      let sql = 'SELECT * FROM tools WHERE status = ?'
      const params = ['已发布']
      
      if (scene) {
        sql += ' AND scenes LIKE ?'
        params.push(`%${scene}%`)
      }
      
      sql += ' ORDER BY sort ASC'
      
      const result = await client.execute({ sql, args: params })
      const rows = result.rows
      
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
      
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: tools, scenes }))
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: false, error: error.message }))
    }
    return
  }
  
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
✅ 本地API服务器已启动 (Turso云数据库)
📡 地址: http://localhost:${PORT}/api/tools
☁️ 数据源: Turso (libSQL)
`)
})
