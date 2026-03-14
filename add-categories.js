import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

async function main() {
  // 添加缺失的一级分类
  const newCategories = [
    { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI', sort: 0 },
    { id: 'ai-learning', name: 'AI学习', icon: '📚', description: 'AI辅助学习、研究和教育工具', sort: 4 }
  ]
  
  for (const cat of newCategories) {
    try {
      await client.execute({
        sql: 'INSERT OR REPLACE INTO categories (id, name, icon, description, sort) VALUES (?, ?, ?, ?, ?)',
        args: [cat.id, cat.name, cat.icon, cat.description, cat.sort]
      })
      console.log(`Added: ${cat.name}`)
    } catch(e) {
      console.log(`Error adding ${cat.name}:`, e.message)
    }
  }
  
  // 更新生活分类的描述
  await client.execute({
    sql: "UPDATE categories SET description = 'AI让生活更美好，涵盖健身、健康、宗教、时尚、礼物推荐、旅行、美食' WHERE id = 'ai-life'",
    args: []
  })
  console.log('Updated ai-life description')
  
  // 查看结果
  const cats = await client.execute('SELECT * FROM categories ORDER BY sort')
  console.log('All categories:', cats.rows)
}

main()
