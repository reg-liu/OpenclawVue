// 填充热门任务数据（基于竞品数据）
import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

// 热门任务数据（基于竞品TAAFT）
const hotTasksData = [
  // 办公
  { category_id: 'office', name: '文案撰写', description: '广告文案、社交媒体文案、产品描述', heat: 9800, sort: 1 },
  { category_id: 'office', name: '数据分析', description: '数据处理、统计分析、图表生成', heat: 6270, sort: 2 },
  { category_id: 'office', name: '会议纪要', description: '会议总结、要点提取、待办事项', heat: 4500, sort: 3 },
  { category_id: 'office', name: 'PPT制作', description: '演示文稿生成、幻灯片设计', heat: 4200, sort: 4 },
  { category_id: 'office', name: '邮件处理', description: '邮件撰写、回复模板、垃圾邮件过滤', heat: 3800, sort: 5 },
  { category_id: 'office', name: '简历优化', description: '简历撰写、面试准备', heat: 3500, sort: 6 },
  
  // 创作
  { category_id: 'create', name: '图像生成', description: 'AI绘画、概念设计、艺术创作', heat: 323574, sort: 1 },
  { category_id: 'create', name: '视频生成', description: 'AI视频、动画短片', heat: 21919, sort: 2 },
  { category_id: 'create', name: '音乐创作', description: 'AI作曲、配音制作', heat: 11322, sort: 3 },
  { category_id: 'create', name: 'Logo设计', description: '品牌标识、商标设计', heat: 28835, sort: 4 },
  { category_id: 'create', name: '室内设计', description: '装修设计、空间规划', heat: 8407, sort: 5 },
  { category_id: 'create', name: '动漫创作', description: '二次元角色、漫画创作', heat: 8322, sort: 6 },
  // 学习
  { category_id: 'learn', name: '论文阅读', description: '学术论文解析、研究摘要', heat: 7149, sort: 1 },
  { category_id: 'learn', name: '编程学习', description: '代码教学、项目实战', heat: 9576, sort: 2 },
  { category_id: 'learn', name: '语言学习', description: '翻译、语法纠正、口语练习', heat: 2656, sort: 3 },
  { category_id: 'learn', name: '知识问答', description: '问题解答、概念解释', heat: 4530, sort: 4 },
  { category_id: 'learn', name: '考试准备', description: '题库练习、知识点复习', heat: 3712, sort: 5 },
  // 生活
  { category_id: 'life', name: '健康建议', description: '健身计划、健康管理', heat: 1196, sort: 1 },
  { category_id: 'life', name: '食谱推荐', description: '菜谱生成、烹饪技巧', heat: 1415, sort: 2 },
  { category_id: 'life', name: '旅行规划', description: '行程安排、景点推荐', heat: 14, sort: 3 },
  { category_id: 'life', name: '时尚穿搭', description: '服装搭配、购物建议', heat: 2687, sort: 4 },
  { category_id: 'life', name: '情感咨询', description: '人际关系、心理健康', heat: 1196, sort: 5 }
]

// 工作流数据
const workflowsData = [
  // 办公 - 文案撰写
  { category_id: 'office', title: 'AI文案撰写工作流', description: '使用AI完成各类文案撰写', 
    steps: JSON.stringify([
      { step: 1, title: '确定文案类型', desc: '明确是广告文案、社交媒体还是产品描述' },
      { step: 2, title: 'AI生成初稿', desc: '输入需求，AI生成多个版本' },
      { step: 3, title: '人工润色', desc: '根据品牌风格调整' },
      { step: 4, title: '最终输出', desc: '导出完成' }
    ]), sort: 1 },
  // 创作 - 图像生成
  { category_id: 'create', title: 'AI图像生成工作流', description: '从概念到成品的AI绘画流程', 
    steps: JSON.stringify([
      { step: 1, title: '构思描述', desc: '明确想要生成的图像内容' },
      { step: 2, title: '选择模型', desc: 'Midjourney/Stable Diffusion/DALL-E' },
      { step: 3, title: '生成图像', desc: '输入提示词，AI生成' },
      { step: 4, title: '后期调整', desc: '局部修改、放大尺寸' }
    ]), sort: 1 },
  // 创作 - 视频生成
  { category_id: 'create', title: 'AI视频创作工作流', description: '从脚本到成片的AI视频制作', 
    steps: JSON.stringify([
      { step: 1, title: '脚本生成', desc: 'ChatGPT生成视频脚本' },
      { step: 2, title: '画面生成', desc: 'Midjourney生成关键帧' },
      { step: 3, title: '视频生成', desc: 'Runway/Pika生成视频' },
      { step: 4, title: '后期剪辑', desc: '剪映添加配乐字幕' }
    ]), sort: 2 },
  // 学习 - 论文阅读
  { category_id: 'learn', title: 'AI学术研究工作流', description: '高效阅读和理解学术论文', 
    steps: JSON.stringify([
      { step: 1, title: '论文搜索', desc: 'Perplexity/Google搜索相关论文' },
      { step: 2, title: '文档理解', desc: 'Kimi/Zotero分析论文内容' },
      { step: 3, title: '问答交互', desc: '针对疑问向AI提问' },
      { step: 4, title: '笔记整理', desc: '提取关键观点生成笔记' }
    ]), sort: 1 }
]

async function main() {
  console.log('=== 填充热门任务数据 ===\n')
  
  // 插入热门任务
  console.log('1. 插入热门任务...')
  for (const task of hotTasksData) {
    await client.execute({
      sql: `INSERT INTO hot_tasks (id, category_id, name, description, heat, sort) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [task.category_id + '-' + task.sort, task.category_id, task.name, task.description, task.heat, task.sort]
    })
    console.log(`   ✅ ${task.name} (${task.heat})`)
  }
  
  // 插入工作流
  console.log('\n2. 插入工作流...')
  for (const wf of workflowsData) {
    await client.execute({
      sql: `INSERT INTO workflows (id, category_id, title, description, steps, sort) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [wf.category_id + '-wf-' + wf.sort, wf.category_id, wf.title, wf.description, wf.steps, wf.sort]
    })
    console.log(`   ✅ ${wf.title}`)
  }
  
  // 验证
  const taskResult = await client.execute('SELECT COUNT(*) as cnt FROM hot_tasks')
  const wfResult = await client.execute('SELECT COUNT(*) as cnt FROM workflows')
  console.log(`\n总热门任务: ${taskResult.rows[0].cnt}`)
  console.log(`总工作流: ${wfResult.rows[0].cnt}`)
  console.log('\n完成！')
}

main().catch(console.error)
