// 扩充工具数据，添加更多字段和工具
import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

// 新工具数据
const newTools = [
  // AI办公 - 文档处理
  {
    name: 'Notion AI',
    icon: '📝',
    category: '文档处理',
    subcategory: 'AI写作',
    description: 'Notion内置的AI写作助手，帮助写文档、总结笔记、头脑风暴',
    scenes: 'ai-office',
    price: '免费/付费',
    priceDetail: '免费版有限额，付费版$10/月',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: 'iOS/Android',
    pros: '集成在Notion中、多功能、模板丰富',
    cons: '需要网络工具、免费版额度少',
    features: 'AI写作,智能补全,笔记总结,头脑风暴,翻译',
    workflow: '选择文档类型→AI生成初稿→人工润色→完成',
    workflowSteps: JSON.stringify([
      { step: 1, title: '选择文档类型', desc: '选择报告/邮件/文章等' },
      { step: 2, title: 'AI生成初稿', desc: '描述需求，AI自动生成' },
      { step: 3, title: '人工润色', desc: '根据AI内容进行修改完善' }
    ]),
    openclaw_practice: '通过 Notion API skill 调用',
    website: 'https://notion.so',
    sort: 50
  },
  {
    name: 'WPS AI',
    icon: '📊',
    category: '文档处理',
    subcategory: '办公套件',
    description: 'WPS Office内置AI功能，PPT智能生成、数据分析',
    scenes: 'ai-office',
    price: '免费',
    priceDetail: '基础功能免费，会员$5/月',
    difficulty: '入门',
    network: '🇨🇳 国内',
    mobile: 'iOS/Android',
    pros: '国产、本土化好、免费额度多',
    cons: '功能相对基础',
    features: 'PPT生成,智能写作,数据分析,PDF转换',
    workflow: '选择功能→输入需求→AI生成→编辑保存',
    workflowSteps: JSON.stringify([
      { step: 1, title: '选择功能', desc: 'PPT/文档/表格' },
      { step: 2, title: '输入需求', desc: '描述想要的内容' },
      { step: 3, title: 'AI生成', desc: '自动生成内容' }
    ]),
    openclaw_practice: 'WPS AI API (如有)',
    website: 'https://www.wps.cn',
    sort: 51
  },
  {
    name: '通义听悟',
    icon: '🎧',
    category: '语音处理',
    subcategory: '会议纪要',
    description: '阿里AI会议助手，实时语音转文字、会议纪要生成',
    scenes: 'ai-office,ai-study',
    price: '免费',
    priceDetail: '每日免费时长',
    difficulty: '入门',
    network: '🇨🇳 国内',
    mobile: 'iOS/Android',
    pros: '免费、会议记录准确、支持多种语言',
    cons: '需要阿里账号',
    features: '语音转文字,会议纪要,实时翻译,智能摘要',
    workflow: '开始录音→实时转写→AI总结→导出纪要',
    workflowSteps: JSON.stringify([
      { step: 1, title: '开始录音', desc: '导入音频或实时录音' },
      { step: 2, title: '实时转写', desc: 'AI实时转为文字' },
      { step: 3, title: 'AI总结', desc: '自动提取关键信息' }
    ]),
    openclaw_practice: '通过通义API调用',
    website: 'https://tingwu.aliyun.com',
    sort: 52
  },
  // AI办公 - 数据分析
  {
    name: 'Excel AI',
    icon: '📈',
    category: '数据分析',
    subcategory: '表格处理',
    description: '微软Excel内置AI，分析数据、生成图表、公式建议',
    scenes: 'ai-office',
    price: '付费',
    priceDetail: 'Microsoft 365订阅$10/月',
    difficulty: '进阶',
    network: '🌐 全球',
    mobile: 'iOS/Android',
    pros: '功能强大、与其他Office集成',
    cons: '需要订阅',
    features: '数据分析,图表生成,公式建议,智能填充',
    workflow: '选择数据→描述需求→AI分析→可视化展示',
    workflowSteps: JSON.stringify([
      { step: 1, title: '选择数据区域', desc: '选中需要分析的数据' },
      { step: 2, title: '描述需求', desc: '告诉AI想要的分析结果' },
      { step: 3, title: 'AI处理', desc: '自动生成图表/公式' }
    ]),
    openclaw_practice: 'Microsoft Graph API',
    website: 'https://excel.microsoft.com',
    sort: 53
  },
  // AI创作 - 视频
  {
    name: 'Runway',
    icon: '🎬',
    category: 'AI视频',
    subcategory: '视频生成',
    description: 'AI视频创作平台，文生视频、图生视频、视频编辑',
    scenes: 'ai-create',
    price: '免费/付费',
    priceDetail: '免费版有限额，付费版$15/月',
    difficulty: '进阶',
    network: '🌐 全球',
    mobile: '网页版',
    pros: '功能强大、视频质量高、持续更新',
    cons: '需要网络工具、免费版额度少',
    features: '文生视频,图生视频,视频编辑,绿幕抠像,运动追踪',
    workflow: '输入提示词→选择风格→AI生成→后期编辑',
    workflowSteps: JSON.stringify([
      { step: 1, title: '输入提示词', desc: '描述想要的视频内容' },
      { step: 2, title: '选择风格', desc: '选择视频风格和参数' },
      { step: 3, title: 'AI生成', desc: '等待视频生成' },
      { step: 4, title: '后期编辑', desc: '添加配乐、字幕等' }
    ]),
    openclaw_practice: '通过 Runway API',
    website: 'https://runwayml.com',
    sort: 25
  },
  {
    name: 'Pika',
    icon: '🎥',
    category: 'AI视频',
    subcategory: '视频生成',
    description: '快速AI视频生成工具，简单易用',
    scenes: 'ai-create',
    price: '免费',
    priceDetail: '免费试用',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: '网页版',
    pros: '操作简单、生成速度快',
    cons: '功能相对基础',
    features: '文生视频,图生视频,视频延长',
    workflow: '输入描述→选择时长→生成视频',
    workflowSteps: JSON.stringify([
      { step: 1, title: '输入描述', desc: '描述视频内容' },
      { step: 2, title: '生成', desc: '等待AI生成' }
    ]),
    openclaw_practice: 'Pika API (如有)',
    website: 'https://pika.art',
    sort: 26
  },
  {
    name: 'HeyGen',
    icon: '👤',
    category: 'AI视频',
    subcategory: '数字人',
    description: 'AI数字人视频生成，营销视频、培训视频制作',
    scenes: 'ai-create',
    price: '免费/付费',
    priceDetail: '免费版1分钟，付费版$29/月',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: '网页版',
    pros: '数字人逼真、多语言支持',
    cons: '付费版性价比一般',
    features: '数字人出镜,语音克隆,视频翻译,服装更换',
    workflow: '选择数字人→输入文案→选择语音→生成视频',
    workflowSteps: JSON.stringify([
      { step: 1, title: '选择数字人', desc: '从素材库选择或自定义' },
      { step: 2, title: '输入文案', desc: '输入要播报的内容' },
      { step: 3, title: '选择语音', desc: '选择AI配音' },
      { step: 4, title: '生成', desc: '生成视频' }
    ]),
    openclaw_practice: 'HeyGen API',
    website: 'https://heygen.com',
    sort: 27
  },
  // AI创作 - 音频
  {
    name: 'ElevenLabs',
    icon: '🎤',
    category: 'AI音频',
    subcategory: '语音合成',
    description: 'AI语音合成，支持多语言、多音色，语音克隆',
    scenes: 'ai-create',
    price: '免费/付费',
    priceDetail: '免费版10000字符，付费版$5/月',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: '网页版',
    pros: '语音自然、支持语音克隆、多语言',
    cons: '需要网络工具',
    features: '语音合成,语音克隆,多语言支持,情感控制',
    workflow: '输入文本→选择音色→调整参数→生成音频',
    workflowSteps: JSON.stringify([
      { step: 1, title: '输入文本', desc: '输入要转换的文字' },
      { step: 2, title: '选择音色', desc: '选择预设或克隆声音' },
      { step: 3, title: '生成', desc: '导出音频文件' }
    ]),
    openclaw_practice: '通过 ElevenLabs API skill',
    website: 'https://elevenlabs.io',
    sort: 28
  },
  {
    name: '剪映',
    icon: '✂️',
    category: 'AI视频',
    subcategory: '视频剪辑',
    description: '字节跳动AI视频剪辑工具，智能剪辑、自动字幕',
    scenes: 'ai-create',
    price: '免费',
    priceDetail: '基础功能免费，会员$9/月',
    difficulty: '入门',
    network: '🇨🇳 国内',
    mobile: 'iOS/Android',
    pros: '免费、本土化好、功能丰富',
    cons: '会员功能更强大',
    features: '智能剪辑,自动字幕,AI特效,模板丰富',
    workflow: '导入素材→AI剪辑→添加特效→导出',
    workflowSteps: JSON.stringify([
      { step: 1, title: '导入素材', desc: '上传视频/图片' },
      { step: 2, title: 'AI剪辑', desc: '一键粗剪、智能识别精彩片段' },
      { step: 3, title: '添加特效', desc: '添加AI特效、滤镜' }
    ]),
    openclaw_practice: '剪映开放平台API',
    website: 'https://capcut.cn',
    sort: 29
  },
  // AI编程
  {
    name: 'Windsurf',
    icon: '🌊',
    category: '编程工具',
    subcategory: 'AI IDE',
    description: '新一代AI编程工具，深度理解代码库',
    scenes: 'ai-code',
    price: '免费/付费',
    priceDetail: '免费版有限，Pro版$10/月',
    difficulty: '进阶',
    network: '🌐 全球',
    mobile: '网页版',
    pros: '理解力强、代码库分析、Actions功能',
    cons: '相对较新',
    features: '代码补全,项目分析,Actions自动化,智能重构',
    workflow: '打开项目→AI分析→编码建议→自动完成',
    workflowSteps: JSON.stringify([
      { step: 1, title: '打开项目', desc: '打开现有代码库' },
      { step: 2, title: 'AI分析', desc: 'AI理解整个项目结构' },
      { step: 3, title: '编码', desc: '获得AI编码建议' }
    ]),
    openclaw_practice: 'Windsurf API',
    website: 'https://codeium.com/windsurf',
    sort: 43
  },
  {
    name: 'Replit AI',
    icon: '💻',
    category: '编程工具',
    subcategory: '在线IDE',
    description: '在线编程平台，内置AI助手，从零构建应用',
    scenes: 'ai-code',
    price: '免费/付费',
    priceDetail: '免费版有限，付费版$10/月',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: '网页版',
    pros: '无需配置、从零开始构建、快速部署',
    cons: '网络依赖',
    features: 'AI编程助手,在线运行,一键部署,协作开发',
    workflow: '描述需求→AI生成代码→调试→部署',
    workflowSteps: JSON.stringify([
      { step: 1, title: '描述需求', desc: '告诉AI想要什么应用' },
      { step: 2, title: 'AI生成', desc: '自动生成代码' },
      { step: 3, title: '调试', desc: 'AI协助调试' }
    ]),
    openclaw_practice: 'Replit API',
    website: 'https://replit.com',
    sort: 44
  },
  // AI学习
  {
    name: 'Kimi',
    icon: '📄',
    category: '文档处理',
    subcategory: '文档理解',
    description: '月之暗面出品，长文档理解、论文阅读、智能助手',
    scenes: 'ai-study,ai-office',
    price: '免费',
    priceDetail: '免费使用',
    difficulty: '入门',
    network: '🇨🇳 国内',
    mobile: 'iOS/Android',
    pros: '长文本理解强、免费使用体验好',
    cons: '相对较新',
    features: '长文档摘要,论文阅读,智能问答,资料整理',
    workflow: '上传文档→AI分析→问答交互→整理输出',
    workflowSteps: JSON.stringify([
      { step: 1, title: '上传文档', desc: '上传PDF/Word等文档' },
      { step: 2, title: 'AI分析', desc: '理解文档内容' },
      { step: 3, title: '问答', desc: '针对文档提问' }
    ]),
    openclaw_practice: 'Kimi API',
    website: 'https://kimi.moonshot.cn',
    sort: 60
  },
  {
    name: 'Zotero AI',
    icon: '📚',
    category: '学术研究',
    subcategory: '文献管理',
    description: '开源文献管理工具，AI辅助文献阅读和引用',
    scenes: 'ai-study',
    price: '免费',
    priceDetail: '免费开源',
    difficulty: '进阶',
    network: '🌐 全球',
    mobile: '桌面端',
    pros: '免费开源、插件丰富、AI阅读辅助',
    cons: '学习曲线',
    features: '文献管理,AI摘要,自动引用,Zotero GPT插件',
    workflow: '导入文献→AI阅读→笔记整理→引用生成',
    workflowSteps: JSON.stringify([
      { step: 1, title: '导入文献', desc: '从数据库导入论文' },
      { step: 2, title: 'AI阅读', desc: '使用GPT插件辅助阅读' },
      { step: 3, title: '整理', desc: '笔记和标签整理' }
    ]),
    openclaw_practice: 'Zotero API + GPT插件',
    website: 'https://www.zotero.org',
    sort: 61
  },
  {
    name: 'Perplexity',
    icon: '🔍',
    category: 'AI搜索',
    subcategory: '问答引擎',
    description: 'AI问答搜索引擎，实时获取最新信息',
    scenes: 'ai-study,ai-entry',
    price: '免费/付费',
    priceDetail: '免费版有限，Pro版$20/月',
    difficulty: '入门',
    network: '🌐 全球',
    mobile: 'iOS/Android',
    pros: '实时联网、回答准确、来源透明',
    cons: '需要网络工具',
    features: 'AI搜索,实时信息,来源引用,深度研究',
    workflow: '输入问题→AI搜索→整理答案→来源引用',
    workflowSteps: JSON.stringify([
      { step: 1, title: '输入问题', desc: '描述想要了解的内容' },
      { step: 2, title: 'AI搜索', desc: '实时搜索互联网' },
      { step: 3, title: '整理', desc: '整理答案和来源' }
    ]),
    openclaw_practice: 'Perplexity API',
    website: 'https://www.perplexity.ai',
    sort: 62
  }
]

async function main() {
  console.log('开始扩充工具数据...\n')
  
  let inserted = 0
  for (const tool of newTools) {
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
}

main().catch(console.error)
