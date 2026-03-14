import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN })

async function main() {
  // 清空现有二级分类
  await client.execute('DELETE FROM subcategories')
  
  // 按需求文档添加二级分类
  const subcategories = [
    // 办公 - 4个
    { id: 'marketing-tools', name: '营销工具', name_en: 'marketing', category_id: 'ai-office', description: '营销策划、社交媒体管理', sort: 1 },
    { id: 'programming-tools', name: '编程工具', name_en: 'programming', category_id: 'ai-office', description: '代码生成、代码审查', sort: 2 },
    { id: 'office-tools', name: '办公效率', name_en: 'office', category_id: 'ai-office', description: '文档处理、数据分析', sort: 3 },
    { id: 'automation-tools', name: '自动化工具', name_en: 'automation', category_id: 'ai-office', description: '工作流程自动化', sort: 4 },
    // 学习 - 3个
    { id: 'education-tools', name: '教育工具', name_en: 'education', category_id: 'ai-learning', description: '在线教育、课程辅助', sort: 1 },
    { id: 'research-tools', name: '研究助手', name_en: 'research', category_id: 'ai-learning', description: '学术研究、文献分析', sort: 2 },
    { id: 'student-tools', name: '学生工具', name_en: 'student', category_id: 'ai-learning', description: '学习笔记、考试准备', sort: 3 },
    // 创作 - 4个
    { id: 'video-tools', name: '视频编辑', name_en: 'video', category_id: 'ai-creation', description: '视频剪辑、特效制作', sort: 1 },
    { id: 'image-tools', name: '图像生成', name_en: 'image', category_id: 'ai-creation', description: 'AI绘画、图片处理', sort: 2 },
    { id: 'audio-tools', name: '音频处理', name_en: 'audio', category_id: 'ai-creation', description: '语音合成、音乐制作', sort: 3 },
    { id: 'text-tools', name: '文本创作', name_en: 'text', category_id: 'ai-creation', description: '写作辅助、内容生成', sort: 4 },
    // 生活 - 7个
    { id: 'fitness-tools', name: '健身工具', name_en: 'fitness', category_id: 'ai-life', description: '健身计划、运动指导', sort: 1 },
    { id: 'health-tools', name: '健康工具', name_en: 'health', category_id: 'ai-life', description: '健康监测、医疗辅助', sort: 2 },
    { id: 'religious-tools', name: '宗教工具', name_en: 'religious', category_id: 'ai-life', description: '宗教相关', sort: 3 },
    { id: 'fashion-tools', name: '时尚工具', name_en: 'fashion', category_id: 'ai-life', description: '时尚搭配、美妆建议', sort: 4 },
    { id: 'gift-tools', name: '礼物推荐', name_en: 'gift', category_id: 'ai-life', description: '礼物建议', sort: 5 },
    { id: 'travel-tools', name: '旅行工具', name_en: 'travel', category_id: 'ai-life', description: '旅行规划', sort: 6 },
    { id: 'food-tools', name: '美食工具', name_en: 'food', category_id: 'ai-life', description: '食谱推荐、烹饪辅助', sort: 7 }
  ]
  
  for (const sub of subcategories) {
    await client.execute({
      sql: 'INSERT INTO subcategories (id, name, name_en, category_id, description, sort) VALUES (?, ?, ?, ?, ?, ?)',
      args: [sub.id, sub.name, sub.name_en, sub.category_id, sub.description, sub.sort]
    })
    console.log(`Added: ${sub.name} (${sub.category_id})`)
  }
  
  // 查看结果
  const result = await client.execute('SELECT * FROM subcategories ORDER BY category_id, sort')
  console.log('\nTotal subcategories:', result.rows.length)
  console.log('By category:')
  const byCat = {}
  result.rows.forEach(r => {
    if (!byCat[r.category_id]) byCat[r.category_id] = []
    byCat[r.category_id].push(r.name)
  })
  Object.keys(byCat).forEach(cat => console.log(`  ${cat}: ${byCat[cat].join(', ')}`))
}

main()
