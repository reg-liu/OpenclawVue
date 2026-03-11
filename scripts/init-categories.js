// 创建分类数据
import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

// 分类数据
const categories = [
  // 一级分类
  { id: 'office', name: '办公', icon: '💼', description: '提升日常工作效率，AI辅助处理文档、PPT、会议等工作', sort: 1 },
  { id: 'create', name: '创作', icon: '🎨', description: '释放创意无限可能，AI辅助图像、视频、音频等创作', sort: 2 },
  { id: 'learn', name: '学习', icon: '📚', description: 'AI辅助学术研究、论文阅读、技能提升', sort: 3 },
  { id: 'life', name: '生活', icon: '🌿', description: 'AI让生活更美好，健康、旅行、美食等', sort: 4 },
  
  // 二级分类 - 办公
  { id: 'office-business', name: '商业', icon: '💰', description: '商业计划书、市场分析', parent: 'office', sort: 1 },
  { id: 'office-efficiency', name: '效率', icon: '⚡', description: '日程管理、任务提醒', parent: 'office', sort: 2 },
  { id: 'office-writing', name: '写作', icon: '✍️', description: '文案撰写、内容创作', parent: 'office', sort: 3 },
  { id: 'office-data', name: '数据分析', icon: '📊', description: '数据处理、图表生成', parent: 'office', sort: 4 },
  { id: 'office-marketing', name: '营销', icon: '📢', description: '营销文案、社交媒体', parent: 'office', sort: 5 },
  { id: 'office-finance', name: '金融', icon: '💵', description: '投资分析、预算管理', parent: 'office', sort: 6 },
  
  // 二级分类 - 创作
  { id: 'create-image', name: '图片', icon: '🖼️', description: 'AI图像生成、修图', parent: 'create', sort: 1 },
  { id: 'create-video', name: '视频', icon: '🎬', description: 'AI视频生成、剪辑', parent: 'create', sort: 2 },
  { id: 'create-design', name: '设计', icon: '🎯', description: 'UI设计、海报设计', parent: 'create', sort: 3 },
  { id: 'create-art', name: '艺术', icon: '🎭', description: '数字艺术、动漫创作', parent: 'create', sort: 4 },
  { id: 'create-music', name: '音乐', icon: '🎵', description: 'AI音乐创作、配音', parent: 'create', sort: 5 },
  
  // 二级分类 - 学习
  { id: 'learn-education', name: '教育', icon: '🏫', description: '课程学习、作业辅导', parent: 'learn', sort: 1 },
  { id: 'learn-research', name: '研究', icon: '🔬', description: '论文阅读、学术研究', parent: 'learn', sort: 2 },
  { id: 'learn-coding', name: '编程', icon: '💻', description: '代码学习、项目实战', parent: 'learn', sort: 3 },
  { id: 'learn-language', name: '语言', icon: '🌏', description: '语言学习、翻译', parent: 'learn', sort: 4 },
  
  // 二级分类 - 生活
  { id: 'life-health', name: '健康', icon: '❤️', description: '健身计划、健康管理', parent: 'life', sort: 1 },
  { id: 'life-travel', name: '旅行', icon: '✈️', description: '行程规划、景点推荐', parent: 'life', sort: 2 },
  { id: 'life-food', name: '美食', icon: '🍳', description: '食谱推荐、烹饪技巧', parent: 'life', sort: 3 },
  { id: 'life-fashion', name: '时尚', icon: '👗', description: '穿搭建议、购物推荐', parent: 'life', sort: 4 }
]

async function main() {
  console.log('创建分类数据...\n 创建')
  
  //分类表（如果不存在）
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT,
        description TEXT,
        parent TEXT,
        sort INTEGER DEFAULT 0
      )
    `)
    console.log('✅ categories 表就绪\n')
  } catch (e) {
    console.log('表创建错误:', e.message)
  }
  
  // 插入分类数据
  for (const cat of categories) {
    try {
      await client.execute({
        sql: `INSERT OR REPLACE INTO categories (id, name, icon, description, parent, sort) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [cat.id, cat.name, cat.icon, cat.description, cat.parent || null, cat.sort]
      })
      console.log(`✅ ${cat.name}`)
    } catch (e) {
      console.log(`❌ ${cat.name}: ${e.message}`)
    }
  }
  
  console.log('\n完成！')
  
  // 验证
  const result = await client.execute('SELECT COUNT(*) as cnt FROM categories')
  console.log(`\n总分类数: ${result.rows[0].cnt}`)
}

main().catch(console.error)
