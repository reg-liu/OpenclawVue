// 查看当前数据库中的所有工具数据
import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

async function main() {
  // 获取所有工具
  const result = await client.execute({
    sql: 'SELECT id, name, category, scenes FROM tools ORDER BY sort',
    args: []
  })
  
  console.log('=== 当前数据库中的工具 ===\n')
  
  // 按分类统计
  const categories = {}
  result.rows.forEach(tool => {
    if (!categories[tool.category]) {
      categories[tool.category] = []
    }
    categories[tool.category].push(tool.name)
  })
  
  for (const [cat, tools] of Object.entries(categories)) {
    console.log(`【${cat}】(${tools.length}个)`)
    tools.forEach(t => console.log(`  - ${t}`))
    console.log()
  }
  
  // 获取所有场景
  const sceneResult = await client.execute({
    sql: 'SELECT DISTINCT scenes FROM tools',
    args: []
  })
  
  console.log('\n=== 场景分布 ===')
  sceneResult.rows.forEach(row => {
    console.log(row.scenes)
  })
}

main().catch(console.error)
