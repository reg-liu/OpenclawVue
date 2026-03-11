// 重新设计数据库结构
import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

async function redesign() {
  console.log('=== 重新设计数据库结构 ===\n')

  // 1. 分类表（已有，保留）
  console.log('1. 分类表 categories - 已有')

  // 2. 工作流表
  console.log('2. 创建工作流表 workflows...')
  await client.execute(`
    CREATE TABLE IF NOT EXISTS workflows (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      steps TEXT,
      sort INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  console.log('   ✅ workflows 表创建完成')

  // 3. 热门任务表
  console.log('3. 创建热门任务表 hot_tasks...')
  await client.execute(`
    CREATE TABLE IF NOT EXISTS hot_tasks (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      heat INTEGER DEFAULT 0,
      sort INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  console.log('   ✅ hot_tasks 表创建完成')

  // 4. 工具擅长表（工具在不同场景下的优势）
  console.log('4. 创建工具擅长表 tool_strengths...')
  await client.execute(`
    CREATE TABLE IF NOT EXISTS tool_strengths (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tool_id INTEGER,
      category_id TEXT NOT NULL,
      strength TEXT NOT NULL,
      level TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tool_id) REFERENCES tools(id)
    )
  `)
  console.log('   ✅ tool_strengths 表创建完成')

  console.log('\n=== 数据库结构重新设计完成 ===')
}

redesign().catch(console.error)
