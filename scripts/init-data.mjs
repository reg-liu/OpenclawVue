import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

// 使用现有的表结构
const tools = [
  { name: 'WPS AI', icon: '📝', description: '智能文档处理助手', price: '免费', difficulty: '入门', features: '智能写作', network: '在线', website: 'https://ai.wps.cn', category: 'ai-office', subcategory: 'writing', scenes: '["写作","办公"]', tags: '["文档处理"]', strengths: '中文处理强', pros: '集成办公', cons: '高级付费', mobile: '支持', recommended: '是', status: 'published', sort: 1 },
  { name: 'Notion AI', icon: '📋', description: '智能笔记工具', price: '付费', difficulty: '入门', features: '笔记管理', network: '在线', website: 'https://notion.so', category: 'ai-office', subcategory: 'efficiency', scenes: '["笔记","项目"]', tags: '["项目管理"]', strengths: '多功能', pros: '协作方便', cons: '需翻墙', mobile: '支持', recommended: '是', status: 'published', sort: 2 },
  { name: 'ChatGPT', icon: '🤖', description: '通用AI助手', price: '免费', difficulty: '入门', features: '问答对话', network: '在线', website: 'https://chat.openai.com', category: 'ai-office', subcategory: 'writing', scenes: '["问答","写作","编程"]', tags: '["通用AI"]', strengths: '通用力强', pros: '能力全面', cons: '需翻墙', mobile: '支持', recommended: '是', status: 'published', sort: 3 },
  { name: 'Copilot', icon: '💡', description: '微软AI助手', price: '付费', difficulty: '入门', features: 'PPT生成', network: '在线', website: 'https://copilot.microsoft.com', category: 'ai-office', subcategory: 'efficiency', scenes: '["办公","数据分析"]', tags: '["Office"]', strengths: 'Office集成', pros: '自动化高', cons: '需订阅', mobile: '支持', recommended: '是', status: 'published', sort: 4 },
  { name: 'Midjourney', icon: '🎨', description: 'AI图像生成', price: '付费', difficulty: '进阶', features: '文生图', network: '在线', website: 'https://midjourney.com', category: 'ai-create', subcategory: 'image', scenes: '["设计","艺术"]', tags: '["AI绘画"]', strengths: '图像质量高', pros: '艺术感强', cons: '需Discord', mobile: '不支持', recommended: '是', status: 'published', sort: 5 },
  { name: 'Runway', icon: '🎬', description: 'AI视频生成', price: '付费', difficulty: '进阶', features: '视频生成', network: '在线', website: 'https://runwayml.com', category: 'ai-create', subcategory: 'video', scenes: '["视频","特效"]', tags: '["视频"]', strengths: '视频功能全', pros: '效果好', cons: '价格高', mobile: '不支持', recommended: '是', status: 'published', sort: 6 },
  { name: 'GitHub Copilot', icon: '👨‍💻', description: 'AI编程助手', price: '付费', difficulty: '入门', features: '代码补全', network: '在线', website: 'https://github.com/features/copilot', category: 'ai-learn', subcategory: 'coding', scenes: '["编程","开发"]', tags: '["编程"]', strengths: '补全准确', pros: '支持主流IDE', cons: '需付费', mobile: '不支持', recommended: '是', status: 'published', sort: 7 },
  { name: 'Cursor', icon: '⌨️', description: 'AI代码编辑器', price: '免费', difficulty: '入门', features: '代码编辑', network: '在线', website: 'https://cursor.sh', category: 'ai-learn', subcategory: 'coding', scenes: '["编程","开发"]', tags: '["IDE"]', strengths: 'AI深度集成', pros: '免费可用', cons: '功能较少', mobile: '不支持', recommended: '是', status: 'published', sort: 8 },
  { name: 'Claude', icon: '🧠', description: 'AI编程助手', price: '免费', difficulty: '入门', features: '代码编写', network: '在线', website: 'https://claude.ai', category: 'ai-learn', subcategory: 'coding', scenes: '["编程","分析"]', tags: '["编程"]', strengths: '编程能力强', pros: '输出稳定', cons: '需翻墙', mobile: '支持', recommended: '是', status: 'published', sort: 9 },
  { name: 'DeepL', icon: '🌐', description: 'AI翻译工具', price: '免费', difficulty: '入门', features: '翻译', network: '在线', website: 'https://deepl.com', category: 'ai-learn', subcategory: 'language', scenes: '["翻译","语言学习"]', tags: '["翻译"]', strengths: '翻译质量高', pros: '支持文档', cons: '额度有限', mobile: '支持', recommended: '是', status: 'published', sort: 10 }
]

const workflows = [
  { category_id: 'business', title: '商业文案工作流', description: '从需求到成品的流程', sort: 1 },
  { category_id: 'efficiency', title: '日程管理工作流', description: 'AI辅助日程规划', sort: 2 },
  { category_id: 'writing', title: '文章创作工作流', description: 'AI辅助写作', sort: 3 },
  { category_id: 'image', title: 'AI绘画工作流', description: '从提示词到成图', sort: 1 },
  { category_id: 'video', title: '视频制作工作流', description: 'AI辅助视频制作', sort: 2 },
  { category_id: 'coding', title: '编程开发工作流', description: 'AI辅助编程', sort: 1 }
]

const hotTasks = [
  { category_id: 'ai-office', name: '智能写作', description: 'AI帮你完成文章', heat: 100, sort: 1 },
  { category_id: 'ai-office', name: 'PPT制作', description: 'AI生成演示文稿', heat: 95, sort: 2 },
  { category_id: 'ai-office', name: '数据整理', description: '自动整理数据', heat: 90, sort: 3 },
  { category_id: 'ai-create', name: 'AI绘画', description: '文字生成图片', heat: 100, sort: 1 },
  { category_id: 'ai-create', name: '视频生成', description: '输入文案生成视频', heat: 95, sort: 2 },
  { category_id: 'ai-learn', name: '代码编写', description: 'AI生成代码', heat: 100, sort: 1 },
  { category_id: 'ai-learn', name: '英语翻译', description: '高质量翻译', heat: 95, sort: 2 },
  { category_id: 'ai-life', name: '健康咨询', description: 'AI健康建议', heat: 85, sort: 1 },
  { category_id: 'ai-life', name: '旅行规划', description: 'AI规划行程', heat: 80, sort: 2 }
]

async function insertData() {
  console.log('开始插入数据...')
  
  try {
    // 插入工具
    for (const tool of tools) {
      await client.execute(
        'INSERT INTO tools (name, icon, description, price, difficulty, features, network, website, category, subcategory, scenes, tags, strengths, pros, cons, mobile, recommended, status, sort) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [tool.name, tool.icon, tool.description, tool.price, tool.difficulty, tool.features, tool.network, tool.website, tool.category, tool.subcategory, tool.scenes, tool.tags, tool.strengths, tool.pros, tool.cons, tool.mobile, tool.recommended, tool.status, tool.sort]
      )
      console.log(`✓ ${tool.name}`)
    }
    
    // 插入工作流
    for (const wf of workflows) {
      await client.execute(
        'INSERT INTO workflows (category_id, title, description, sort) VALUES (?, ?, ?, ?)',
        [wf.category_id, wf.title, wf.description, wf.sort]
      )
      console.log(`✓ ${wf.title}`)
    }
    
    // 插入热门任务
    for (const task of hotTasks) {
      await client.execute(
        'INSERT INTO hot_tasks (category_id, name, description, heat, sort) VALUES (?, ?, ?, ?, ?)',
        [task.category_id, task.name, task.description, task.heat, task.sort]
      )
      console.log(`✓ ${task.name}`)
    }
    
    console.log('\n✅ 数据插入完成!')
  } catch (error) {
    console.error('失败:', error.message)
  }
}

insertData()
