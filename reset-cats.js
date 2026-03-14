import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN })

async function main() {
  // 清空现有数据
  await client.execute('DELETE FROM subcategories')
  await client.execute('DELETE FROM categories')
  console.log('Cleared all data')
  
  // 按需求文档添加4个一级分类
  const categories = [
    { id: 'ai-office', name: '办公', icon: '💼', description: '利用AI提升工作效率，涵盖营销、编程、自动化等场景', sort: 0 },
    { id: 'ai-learning', name: '学习', icon: '📚', description: 'AI辅助学习、研究和教育工具', sort: 1 },
    { id: 'ai-creation', name: '创作', icon: '🎨', description: 'AI赋能创意工作，涵盖视频、图像、音频、文本生成', sort: 2 },
    { id: 'ai-life', name: '生活', icon: '🏠', description: 'AI让生活更美好，涵盖健身、健康、宗教、时尚、礼物推荐、旅行、美食', sort: 3 }
  ]
  
  for (const cat of categories) {
    await client.execute({
      sql: 'INSERT INTO categories (id, name, icon, description, sort) VALUES (?, ?, ?, ?, ?)',
      args: [cat.id, cat.name, cat.icon, cat.description, cat.sort]
    })
    console.log(`Added: ${cat.name}`)
  }
  
  // 查看结果
  const result = await client.execute('SELECT * FROM categories ORDER BY sort')
  console.log('\nAll categories:')
  result.rows.forEach(c => console.log(`  ${c.id}: ${c.name} ${c.icon}`))
}

main()
