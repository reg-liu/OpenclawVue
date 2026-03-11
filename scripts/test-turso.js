// 测试 Turso 连接
import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = process.env.TURSO_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

async function test() {
  console.log('测试 Turso 连接...')
  const result = await client.execute({
    sql: 'SELECT COUNT(*) as cnt FROM tools',
    args: []
  })
  console.log('记录数:', result.rows[0].cnt)
  
  const tools = await client.execute({
    sql: 'SELECT name, category FROM tools ORDER BY sort ASC LIMIT 5',
    args: []
  })
  console.log('\n前5条工具:')
  tools.rows.forEach(t => console.log(`  - ${t.name} (${t.category})`))
}

test().catch(console.error)
