// 迁移本地 SQLite 数据到 Turso
import { createClient } from '@libsql/client'
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Turso 配置
const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

// 本地数据库
const localDbPath = path.join(__dirname, '..', 'data', 'tools.db')
const localDb = new Database(localDbPath)

// Turso 客户端
const turso = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

async function migrate() {
  console.log('=== 开始迁移 ===\n')

  // 1. 创建表
  console.log('1. 创建表...')
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS tools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      icon TEXT,
      category TEXT,
      subcategory TEXT,
      description TEXT,
      scenes TEXT,
      price TEXT,
      price_detail TEXT,
      difficulty TEXT,
      network TEXT,
      mobile TEXT,
      pros TEXT,
      cons TEXT,
      features TEXT,
      workflow TEXT,
      workflow_steps TEXT,
      openclaw_practice TEXT,
      website TEXT,
      sort INTEGER DEFAULT 0,
      status TEXT DEFAULT '已发布',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  console.log('   表创建完成\n')

  // 2. 获取本地数据
  console.log('2. 获取本地数据...')
  const rows = localDb.prepare('SELECT * FROM tools WHERE status = ?').all('已发布')
  console.log(`   获取到 ${rows.length} 条数据\n`)

  // 3. 插入数据到 Turso
  console.log('3. 插入数据到 Turso...')
  let inserted = 0
  for (const row of rows) {
    await turso.execute({
      sql: `INSERT INTO tools (name, icon, category, subcategory, description, scenes, price, price_detail, difficulty, network, mobile, pros, cons, features, workflow, workflow_steps, openclaw_practice, website, sort, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        row.name, row.icon, row.category, row.subcategory, row.description,
        row.scenes, row.price, row.price_detail, row.difficulty, row.network,
        row.mobile, row.pros, row.cons, row.features, row.workflow,
        row.workflow_steps, row.openclaw_practice, row.website, row.sort, row.status
      ]
    })
    inserted++
    console.log(`   插入: ${row.name}`)
  }

  console.log(`\n=== 迁移完成！共插入 ${inserted} 条数据 ===`)

  // 4. 验证数据
  console.log('\n4. 验证远程数据...')
  const result = await turso.execute('SELECT COUNT(*) as cnt FROM tools')
  console.log(`   远程数据库记录数: ${result.rows[0].cnt}`)

  localDb.close()
}

migrate().catch(console.error)
