// 添加小众AI产品
import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

const nicheTools = [
  // AI入门 - 小众问答AI
  {
    name: 'Poe',
    icon: '🦉',
    category: '问答式AI',
    subcategory: 'AI聚合平台',
    description: 'Quora出品的AI聚合平台，一个应用内可以使用ChatGPT、Claude等多个AI模型',
    scenes: 'ai-entry',
    price: '免费/付费',
    priceDetail: '免费版有限，付费版$19.99/月',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: 'iOS/Android',
    pros: '多模型聚合、无需翻墙、性价比高',
    cons: '需要账号、部分模型需付费',
    features: '多模型聚合,快速切换,社区分享',
    workflow: '选择AI模型→输入问题→获得回答',
    workflowSteps: JSON.stringify([
      { step: 1, title: '选择模型', desc: '在ChatGPT/Claude等模型中选择' },
      { step: 2, title: '提问', desc: '输入你的问题' },
      { step: 3, title: '获取回答', desc: '获得AI回答' }
    ]),
    openclaw_practice: 'Poe API',
    website: 'https://poe.com',
    sort: 10
  },
  {
    name: 'Copilot',
    icon: '🤖',
    category: '问答式AI',
    subcategory: '微软AI助手',
    description: '微软AI助手，基于GPT-4，免费使用，深度集成Edge浏览器',
    scenes: 'ai-entry',
    price: '免费',
    priceDetail: '完全免费',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: 'iOS/Android',
    pros: '免费使用、微软生态集成、Edge深度集成',
    cons: '需要微软账号',
    features: '免费GPT-4,浏览器集成,图像生成',
    workflow: '打开Edge→点击Copilot→开始对话',
    workflowSteps: JSON.stringify([
      { step: 1, title: '打开Edge', desc: '使用Edge浏览器' },
      { step: 2, title: '启动Copilot', desc: '点击右上角Copilot图标' },
      { step: 3, title: '开始对话', desc: '输入问题获取回答' }
    ]),
    openclaw_practice: 'Microsoft Copilot API',
    website: 'https://copilot.microsoft.com',
    sort: 11
  },
  // AI办公 - 小众文档处理
  {
    name: 'Craft',
    icon: '📒',
    category: '文档处理',
    subcategory: '笔记工具',
    description: '苹果风笔记工具，AI辅助写作，界面美观',
    scenes: 'ai-office',
    price: '免费/付费',
    priceDetail: '免费版有限，Pro版$9.99/月',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: 'iOS/Mac',
    pros: '界面美观、跨平台、AI写作辅助',
    cons: '免费版功能有限',
    features: 'AI写作,跨平台,文档整理',
    workflow: '创建文档→AI辅助写作→整理保存',
    workflowSteps: JSON.stringify([
      { step: 1, title: '创建文档', desc: '新建空白文档' },
      { step: 2, title: 'AI辅助', desc: '使用AI生成或润色内容' }
    ]),
    openclaw_practice: 'Craft API',
    website: 'https://craft.do',
    sort: 55
  },
  {
    name: 'Raycast AI',
    icon: '⚡',
    category: '文档处理',
    subcategory: '效率工具',
    description: 'Mac效率工具，AI辅助搜索、写作和编程',
    scenes: 'ai-office,ai-code',
    price: '免费/付费',
    priceDetail: '基础功能免费，Pro版$10/月',
    difficulty: '进阶',
    network: '🌐 全球',
    mobile: '桌面端',
    pros: '效率提升神器、深度Mac集成、AI功能强大',
    cons: '仅支持Mac',
    features: 'AI搜索,快速启动,窗口管理,AI写作',
    workflow: '快捷键启动→输入需求→AI处理',
    workflowSteps: JSON.stringify([
      { step: 1, title: '启动', desc: '按空格键启动Raycast' },
      { step: 2, title: 'AI处理', desc: '描述需求，AI执行' }
    ]),
    openclaw_practice: 'Raycast API',
    website: 'https://raycast.com',
    sort: 56
  },
  // AI创作 - 小众
  {
    name: 'Leonardo.ai',
    icon: '🎨',
    category: 'AI图像',
    subcategory: '图像生成',
    description: '免费开源的AI图像生成平台，每日免费额度',
    scenes: 'ai-create',
    price: '免费/付费',
    priceDetail: '每日免费150Token',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: '网页版',
    pros: '免费额度多、社区活跃、模型丰富',
    cons: '需要网络工具、高峰期需排队',
    features: '文生图,图生图,ControlNet,模型训练',
    workflow: '输入提示词→选择模型→生成图像',
    workflowSteps: JSON.stringify([
      { step: 1, title: '输入描述', desc: '描述想要的图像' },
      { step: 2, title: '选择模型', desc: '选择风格模型' },
      { step: 3, title: '生成', desc: '等待AI生成' }
    ]),
    openclaw_practice: 'Leonardo API',
    website: 'https://leonardo.ai',
    sort: 26
  },
  {
    name: 'Pika.art',
    icon: '🎬',
    category: 'AI视频',
    subcategory: '视频生成',
    description: '轻量级AI视频生成，简单易用',
    scenes: 'ai-create',
    price: '免费',
    priceDetail: '免费试用',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: '网页版',
    pros: '完全免费、操作简单、生成快速',
    cons: '功能相对基础',
    features: '文生视频,图生视频,视频延长',
    workflow: '输入描述→生成视频→下载',
    workflowSteps: JSON.stringify([
      { step: 1, title: '输入描述', desc: '描述视频内容' },
      { step: 2, title: '生成', desc: '等待AI生成' }
    ]),
    openclaw_practice: 'Pika API',
    website: 'https://pika.art',
    sort: 30
  },
  {
    name: 'Luma Dream Machine',
    icon: '💭',
    category: 'AI视频',
    subcategory: '视频生成',
    description: 'Luma AI的视频生成工具，效果出色',
    scenes: 'ai-create',
    price: '免费/付费',
    priceDetail: '免费版有限',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: '网页版',
    pros: '视频质量高、免费试用',
    cons: '需要网络工具',
    features: '文生视频,图生视频',
    workflow: '输入描述/上传图片→生成视频',
    workflowSteps: JSON.stringify([
      { step: 1, title: '输入', desc: '描述或上传图片' },
      { step: 2, title: '生成', desc: '等待视频生成' }
    ]),
    openclaw_practice: 'Luma API',
    website: 'https://lumalabs.ai/dream-machine',
    sort: 31
  },
  {
    name: 'Murf AI',
    icon: '🎤',
    category: 'AI音频',
    subcategory: '语音合成',
    description: '专业AI语音合成，多种音色选择',
    scenes: 'ai-create',
    price: '免费/付费',
    priceDetail: '免费版有限，付费版$29/月',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: '网页版',
    pros: '音色丰富、专业配音、Studio品质',
    cons: '免费版有限',
    features: '语音合成,多音色,配音 studio',
    workflow: '输入文本→选择音色→生成音频',
    workflowSteps: JSON.stringify([
      { step: 1, title: '输入文本', desc: '输入要转语音的文字' },
      { step: 2, title: '选择音色', desc: '选择合适的音色' }
    ]),
    openclaw_practice: 'Murf API',
    website: 'https://murf.ai',
    sort: 32
  },
  // AI编程 - 小众
  {
    name: 'Amazon CodeWhisperer',
    icon: '🔵',
    category: '编程工具',
    subcategory: 'AI代码助手',
    description: '亚马逊出品的免费AI编程助手',
    scenes: 'ai-code',
    price: '免费',
    priceDetail: '完全免费',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: 'IDE插件',
    pros: '完全免费、AWS集成、实时建议',
    cons: '功能相对基础',
    features: '代码补全,安全扫描,建议解释',
    workflow: '安装插件→编写代码→获得建议',
    workflowSteps: JSON.stringify([
      { step: 1, title: '安装', desc: '在IDE中安装CodeWhisperer' },
      { step: 2, title: '编写', desc: '正常编写代码' }
    ]),
    openclaw_practice: 'CodeWhisperer',
    website: 'https://aws.amazon.com/codewhisperer',
    sort: 50
  },
  {
    name: 'Tabnine',
    icon: '↹',
    category: '编程工具',
    subcategory: 'AI代码补全',
    description: '老牌AI代码补全工具，支持多种语言和IDE',
    scenes: 'ai-code',
    price: '免费/付费',
    priceDetail: '基础版免费，Pro版$12/月',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: 'IDE插件',
    pros: '支持语言多、IDE集成广、隐私保护',
    cons: '免费版功能有限',
    features: '代码补全,上下文感知,隐私模式',
    workflow: '安装插件→编写代码→自动补全',
    workflowSteps: JSON.stringify([
      { step: 1, title: '安装', desc: '安装Tabnine插件' },
      { step: 2, title: '使用', desc: '编写代码自动获得补全建议' }
    ]),
    openclaw_practice: 'Tabnine',
    website: 'https://tabnine.com',
    sort: 51
  },
  {
    name: 'Mintlify',
    icon: '📖',
    category: '编程工具',
    subcategory: '文档工具',
    description: 'AI自动生成代码文档，支持多种编程语言',
    scenes: 'ai-code',
    price: '免费/付费',
    priceDetail: '免费版有限，付费版$49/月',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: '网页版',
    pros: '自动生成文档、多语言支持、集成方便',
    cons: '免费版有限',
    features: 'AI文档生成,代码理解,API文档',
    workflow: '连接代码库→AI分析→生成文档',
    workflowSteps: JSON.stringify([
      { step: 1, title: '连接', desc: '连接GitHub仓库' },
      { step: 2, title: '生成', desc: 'AI自动分析并生成文档' }
    ]),
    openclaw_practice: 'Mintlify',
    website: 'https://mintlify.com',
    sort: 52
  },
  // AI学习 - 小众
  {
    name: 'Consensus',
    icon: '🎓',
    category: 'AI搜索',
    subcategory: '学术搜索',
    description: 'AI学术搜索引擎，专门搜索论文和研究结果',
    scenes: 'ai-study',
    price: '免费/付费',
    priceDetail: '免费版有限，Pro版$9/月',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: '网页版',
    pros: '学术论文搜索、结果基于研究、引用导出',
    cons: '需要英文搜索',
    features: '论文搜索,研究摘要,引用生成',
    workflow: '输入问题→AI搜索论文→获取结论',
    workflowSteps: JSON.stringify([
      { step: 1, title: '搜索', desc: '输入研究问题' },
      { step: 2, title: '获取', desc: 'AI返回相关论文和结论' }
    ]),
    openclaw_practice: 'Consensus API',
    website: 'https://consensus.app',
    sort: 70
  },
  {
    name: 'Elicit',
    icon: '🔬',
    category: 'AI搜索',
    subcategory: '研究助手',
    description: 'AI研究助手，自动分析论文和提取关键信息',
    scenes: 'ai-study',
    price: '免费',
    priceDetail: '免费使用',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: '网页版',
    pros: '完全免费、自动提取信息、研究效率高',
    cons: '需要英文',
    features: '论文分析,信息提取,自动化研究',
    workflow: '输入主题→AI分析论文→提取信息',
    workflowSteps: JSON.stringify([
      { step: 1, title: '输入', desc: '输入研究主题' },
      { step: 2, title: '分析', desc: 'AI自动分析相关论文' }
    ]),
    openclaw_practice: 'Elicit',
    website: 'https://elicit.org',
    sort: 71
  },
  {
    name: 'Tome',
    icon: '📑',
    category: '文档处理',
    subcategory: 'PPT生成',
    description: 'AI驱动的PPT制作工具，快速生成演示文稿',
    scenes: 'ai-office,ai-create',
    price: '免费/付费',
    priceDetail: '免费版有限，Pro版$16/月',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: '网页版',
    pros: 'AI驱动、模板丰富、生成快速',
    cons: '免费版有限',
    features: 'AI生成PPT,模板丰富,在线演示',
    workflow: '输入主题→AI生成→编辑完善',
    workflowSteps: JSON.stringify([
      { step: 1, title: '描述', desc: '描述PPT主题' },
      { step: 2, title: '生成', desc: 'AI自动生成PPT' }
    ]),
    openclaw_practice: 'Tome API',
    website: 'https://tome.app',
    sort: 35
  }
]

async function main() {
  console.log('开始添加小众AI产品...\n')
  
  let inserted = 0
  for (const tool of nicheTools) {
    try {
      await client.execute({
        sql: `INSERT INTO tools (name, icon, category, subcategory, description, scenes, price, price_detail, difficulty, network, mobile, pros, cons, features, workflow, workflow_steps, openclaw_practice, website, sort, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '已发布')`,
        args: [
          tool.name, tool.icon, tool.category, tool.subcategory,
          tool.description, tool.scenes, tool.price, tool.priceDetail,
          tool.difficulty, tool.network, tool.mobile, tool.pros, tool.cons,
          tool.features, tool.workflow, tool.workflowSteps,
          tool.openclaw_practice, tool.website, tool.sort
        ]
      })
      console.log(`+ ${tool.name} (${tool.category})`)
      inserted++
    } catch (e) {
      console.log(`× ${tool.name}: ${e.message}`)
    }
  }
  
  console.log(`\n完成！共插入 ${inserted} 个工具`)
  
  // 统计
  const result = await client.execute({
    sql: 'SELECT category, COUNT(*) as cnt FROM tools WHERE status = "已发布" GROUP BY category ORDER BY cnt DESC',
    args: []
  })
  
  console.log('\n=== 当前工具统计 ===')
  result.rows.forEach(r => {
    console.log(`${r.category}: ${r.cnt}个`)
  })
  
  console.log(`\n总计: ${result.rows.reduce((sum, r) => sum + r.cnt, 0)}个工具`)
}

main().catch(console.error)
