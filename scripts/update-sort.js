// 更新工具热门程度
import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

// 设置热门工具的sort值（数值越大越热门）
const hotTools = [
  { name: 'ChatGPT', sort: 100 },
  { name: 'Claude', sort: 95 },
  { name: 'Midjourney', sort: 90 },
  { name: 'Cursor', sort: 88 },
  { name: 'GitHub Copilot', sort: 85 },
  { name: 'Kimi', sort: 80 },
  { name: 'Runway', sort: 75 },
  { name: 'Perplexity', sort: 70 },
  { name: 'Gamma', sort: 65 },
  { name: 'Notion AI', sort: 60 }
]

async function main() {
  console.log('更新工具热门程度...\n')
  
  for (const tool of hotTools) {
    await client.execute({
      sql: 'UPDATE tools SET sort = ? WHERE name = ?',
      args: [tool.sort, tool.name]
    })
    console.log(`✅ ${tool.name}: sort = ${tool.sort}`)
  }
  
  console.log('\n完成！')
}

main().catch(console.error)
