import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN })

async function main() {
  // 为一级分类添加图标字段
  await client.execute("UPDATE categories SET icon = '💼' WHERE id = 'ai-office'")
  await client.execute("UPDATE categories SET icon = '📚' WHERE id = 'ai-learning'")
  await client.execute("UPDATE categories SET icon = '🎨' WHERE id = 'ai-creation'")
  await client.execute("UPDATE categories SET icon = '🏠' WHERE id = 'ai-life'")
  console.log('Updated categories icons')
  
  // 查看结果
  const result = await client.execute('SELECT * FROM categories ORDER BY sort')
  console.log('\nCategories:')
  result.rows.forEach(c => console.log(`  ${c.id}: ${c.name} ${c.icon}`))
}

main()
