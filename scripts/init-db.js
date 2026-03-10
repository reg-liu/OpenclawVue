// 数据库初始化脚本
import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'tools.db')

// 确保data目录存在
const dataDir = path.dirname(dbPath)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const db = new Database(dbPath)

// 创建表
db.exec(`
  CREATE TABLE IF NOT EXISTS tools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    icon TEXT,
    category TEXT,
    subcategory TEXT,
    description TEXT,
    scenes TEXT,
    price TEXT,
    price_detail TEXT,
    difficulty TEXT,
    network TEXT,
    mobile TEXT,
    pros TEXT,
    cons TEXT,
    features TEXT,
    workflow TEXT,
    workflow_steps TEXT,
    openclaw_practice TEXT,
    website TEXT,
    sort INTEGER DEFAULT 0,
    status TEXT DEFAULT '已发布',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// 工具数据
const tools = [
  // AI入门 - 问答式AI
  { name: 'ChatGPT', icon: '💬', category: '问答式AI', subcategory: '通用AI',
    description: 'OpenAI开发的AI对话工具，适合日常问答和内容创作',
    scenes: 'ai-entry,ai-office,ai-create,ai-study',
    price: '免费/付费', price_detail: '免费版GPT-3.5，付费版GPT-4约20$/月',
    difficulty: '入门', network: '🌐 全球', mobile: 'iOS/Android',
    pros: '功能全面、社区活跃、插件生态丰富',
    cons: '需要网络工具、国内支付不便',
    workflow: '提示词工程：描述问题 → AI回答 → 优化提示词 → 获得更好结果',
    openclaw_practice: '通过 OpenAI API skill 调用接口',
    website: 'https://chat.openai.com', sort: 1 },
  
  { name: 'Claude', icon: '🧠', category: '问答式AI', subcategory: '通用AI',
    description: 'Anthropic开发的AI助手，擅长推理和复杂分析，超长上下文',
    scenes: 'ai-entry,ai-office,ai-study',
    price: '免费', price_detail: '免费使用，付费版约25$/月',
    difficulty: '入门', network: '🌐 全球', mobile: 'iOS/Android',
    pros: '推理能力强、长文本处理优秀、输出安全',
    cons: '需要网络工具、国内支付不便',
    workflow: '深度推理：提出复杂问题 → AI分析 → 追问细节 → 获得深入解答',
    openclaw_practice: '通过 Anthropic API skill 调用',
    website: 'https://claude.ai', sort: 2 },

  { name: 'Gemini', icon: '🌟', category: '问答式AI', subcategory: '多模态AI',
    description: 'Google推出的多模态AI，支持图像理解和生成',
    scenes: 'ai-entry,ai-create',
    price: '免费', price_detail: '免费版有限额，付费版约20$/月',
    difficulty: '入门', network: '🌐 全球', mobile: 'iOS/Android',
    pros: '多模态能力强、Google生态集成、免费额度多',
    cons: '需要网络工具、偶尔不稳定',
    workflow: '多模态交互：文本+图像 → 综合理解 → 多形式输出',
    openclaw_practice: '通过 Google Gemini API',
    website: 'https://gemini.google.com', sort: 3 },

  { name: '通义千问', icon: '🐰', category: '问答式AI', subcategory: '国产AI',
    description: '阿里推出的中文AI助手，针对中文场景优化',
    scenes: 'ai-entry,ai-office,ai-study',
    price: '免费', price_detail: '完全免费',
    difficulty: '入门', network: '🇨🇳 国内', mobile: 'iOS/Android',
    pros: '中文优化好、国内直连、完全免费',
    cons: '英文能力较弱、推理能力不如Claude',
    workflow: '中文办公：PPT大纲 → 自动生成 → AI配图 → 智能排版',
    openclaw_practice: '通过 阿里云API 集成',
    website: 'https://tongyi.aliyun.com', sort: 4 },

  { name: 'Kimi', icon: '🌙', category: '问答式AI', subcategory: '国产AI',
    description: '月之暗面推出的长文本AI，支持超长上下文，200万字',
    scenes: 'ai-entry,ai-office,ai-study',
    price: '免费', price_detail: '免费使用，付费版约50$/月',
    difficulty: '入门', network: '🇨🇳 国内', mobile: 'iOS/Android',
    pros: '长文本能力极强、中文理解好、国内直连',
    cons: '推理能力不如Claude、起步较晚',
    workflow: '长文本处理：上传文档 → AI总结 → 问答互动 → 深度理解',
    openclaw_practice: '通过 Kimi API',
    website: 'https://kimi.moonshot.cn', sort: 5 },

  { name: '文心一言', icon: '🦅', category: '问答式AI', subcategory: '国产AI',
    description: '百度推出的中文AI助手，文学创作能力强',
    scenes: 'ai-entry,ai-office',
    price: '免费', price_detail: '免费使用，付费版约60$/年',
    difficulty: '入门', network: '🇨🇳 国内', mobile: 'iOS/Android',
    pros: '中文理解好、国内直连、文学创作能力强',
    cons: '推理能力较弱、回答质量不稳定',
    workflow: '中文创作：输入主题 → AI生成 → 润色修改 → 导出',
    openclaw_practice: '通过 百度文心API',
    website: 'https://yiyan.baidu.com', sort: 6 },

  { name: '讯飞星火', icon: '🔥', category: '问答式AI', subcategory: '国产AI',
    description: '科大讯飞推出的AI助手，语音能力突出',
    scenes: 'ai-entry,ai-office',
    price: '免费', price_detail: '完全免费',
    difficulty: '入门', network: '🇨🇳 国内', mobile: 'iOS/Android',
    pros: '语音能力强、中文理解好、国内直连',
    cons: '推理能力一般、回答有时过于简短',
    workflow: '语音交互：语音输入 → AI处理 → 语音输出',
    openclaw_practice: '通过 讯飞星火API',
    website: 'https://xinghuo.xfyun.com', sort: 7 },

  // AI创作 - AI图像
  { name: 'Midjourney', icon: '🎨', category: 'AI图像', subcategory: '图像生成',
    description: '强大的AI图像生成工具，艺术性强',
    scenes: 'ai-create',
    price: '付费', price_detail: '约10$/月',
    difficulty: '进阶', network: '🌐 全球', mobile: '无(Discord)',
    pros: '艺术性强，社区活跃、提示词丰富',
    cons: '需要网络工具、学习曲线陡峭、Discord操作复杂',
    workflow: '图像生成流程：构思场景 → 编写详细提示词 → 调整参数 → 生成 → AI修复',
    openclaw_practice: '通过 DALL-E skill 实践',
    website: 'https://www.midjourney.com', sort: 20 },

  { name: 'DALL-E 3', icon: '🖼️', category: 'AI图像', subcategory: '图像生成',
    description: 'OpenAI图像生成，GPT集成更智能',
    scenes: 'ai-create',
    price: '付费', price_detail: '约15$/100张',
    difficulty: '入门', network: '🌐 全球', mobile: '网页版',
    pros: 'GPT集成、生成稳定、安全性好',
    cons: '需要网络工具、艺术性不如MJ、价格较贵',
    workflow: '图像+文本流程：描述需求 → GPT优化提示词 → DALL-E生成 → 编辑',
    openclaw_practice: '通过 DALL-E API',
    website: 'https://openai.com/dall-e-3', sort: 21 },

  { name: 'Stable Diffusion', icon: '⚡', category: 'AI图像', subcategory: '本地部署',
    description: '开源本地运行，可自定义模型，完全免费',
    scenes: 'ai-create',
    price: '免费', price_detail: '需要显卡硬件',
    difficulty: '进阶', network: '🖥️ 本地', mobile: '无',
    pros: '完全免费、本地部署可控、可训练模型',
    cons: '需要显卡硬件、配置复杂、学习曲线陡峭',
    workflow: '本地部署流程：安装模型 → 编写提示词 → 参数调整 → 本地生成',
    openclaw_practice: '通过 ComfyUI 工作流',
    website: 'https://stability.ai', sort: 22 },

  // AI办公 - PPT生成
  { name: 'Gamma', icon: '📊', category: 'PPT生成', subcategory: 'AI PPT',
    description: 'AI自动生成PPT，输入主题即可获得完整演示文稿',
    scenes: 'ai-office',
    price: '付费', price_detail: '免费有限额，付费约12$/月',
    difficulty: '入门', network: '🌐 全球', mobile: '网页版',
    pros: 'AI生成能力强、模板美观、快速出片',
    cons: '需要网络工具、国内支付不便、中文模板较少',
    workflow: 'Gamma工作流：输入主题 → AI生成大纲 → 选择模板 → 自动生成 → 细节调整',
    openclaw_practice: '通过 Gamma API 集成',
    website: 'https://gamma.app', sort: 30 },

  { name: 'AiPPT', icon: '🎯', category: 'PPT生成', subcategory: 'AI PPT',
    description: '中文AI PPT生成工具，国内可访问',
    scenes: 'ai-office',
    price: '免费', price_detail: '免费有限额，VIP约60$/年',
    difficulty: '入门', network: '🇨🇳 国内', mobile: '网页版',
    pros: '国内可访问、中文优化好、价格便宜',
    cons: '模板美观度一般、AI能力有限',
    workflow: '中文PPT流程：输入主题 → AI生成大纲 → 选择模板 → 一键生成',
    openclaw_practice: 'AiPPT API',
    website: 'https://aippt.cn', sort: 31 },

  // AI编程
  { name: 'GitHub Copilot', icon: '💻', category: 'IDE插件', subcategory: '代码补全',
    description: 'AI代码助手，代码补全首选',
    scenes: 'ai-code',
    price: '付费', price_detail: '约10$/月',
    difficulty: '进阶', network: '🌐 全球', mobile: '无',
    pros: '补全准确、支持多语言、社区支持好',
    cons: '需要网络工具、付费较贵、隐私担忧',
    workflow: '编程工作流：描述需求 → AI生成代码 → Copilot补全 → AI Debug → 完成',
    openclaw_practice: '通过 VS Code 集成',
    website: 'https://github.com/features/copilot', sort: 40 },

  { name: 'Cursor', icon: '⚡', category: '编程工具', subcategory: 'AI IDE',
    description: 'AI优先的代码编辑器，基于VS Code',
    scenes: 'ai-code',
    price: '免费', price_detail: '免费版有限额，付费版约20$/月',
    difficulty: '入门', network: '🇨🇳 国内', mobile: '无',
    pros: '免费额度多、国内可访问、操作类似VS Code',
    cons: '付费版功能提升有限、偶尔响应慢',
    workflow: 'AI编程：描述功能 → AI编写代码 → 预览效果 → 迭代修改 → 完成',
    openclaw_practice: '内置 AI 编程功能',
    website: 'https://cursor.sh', sort: 41 },

  { name: 'Claude Code', icon: '🧬', category: '编程工具', subcategory: 'CLI工具',
    description: 'Anthropic编程助手，擅长复杂逻辑',
    scenes: 'ai-code',
    price: '免费', price_detail: '免费使用',
    difficulty: '入门', network: '🌐 全球', mobile: '无',
    pros: '免费使用、推理能力强、适合复杂任务',
    cons: '需要网络工具、CLI操作有门槛',
    workflow: '代码开发：描述需求 → AI分析 → 生成代码 → 调试优化 → 交付',
    openclaw_practice: 'Claude Code CLI',
    website: 'https://claude.com/claude-code', sort: 42 },
]

// 清空并插入数据
const deleteStmt = db.prepare('DELETE FROM tools')
deleteStmt.run()

const insertStmt = db.prepare(`
  INSERT INTO tools (name, icon, category, subcategory, description, scenes, price, price_detail, difficulty, network, mobile, pros, cons, workflow, openclaw_practice, website, sort, status)
  VALUES (@name, @icon, @category, @subcategory, @description, @scenes, @price, @price_detail, @difficulty, @network, @mobile, @pros, @cons, @workflow, @openclaw_practice, @website, @sort, '已发布')
`)

const insertMany = db.transaction((tools) => {
  for (const tool of tools) {
    insertStmt.run(tool)
  }
})

insertMany(tools)

console.log(`✅ 数据库初始化完成，共 ${tools.length} 条数据`)
console.log(`📁 数据库位置: ${dbPath}`)

// 查询验证
const count = db.prepare('SELECT COUNT(*) as count FROM tools').get()
console.log(`📊 当前记录数: ${count.count}`)
