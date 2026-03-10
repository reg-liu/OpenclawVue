// 场景配置
export const scenes = [
  { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI' },
  { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景（写文档，做PPT、整理数据）' },
  { id: 'ai-create', name: 'AI创作', icon: '🎨', description: '写文章，做视频、生成图片' },
  { id: 'ai-code', name: 'AI编程', icon: '💻', description: '代码辅助、调试，Bug修复' },
  { id: 'ai-study', name: 'AI学习', icon: '📚', description: '看论文、学新技术' }
]

// 工具数据
export const tools = [
  // AI入门 - 问答式AI
  {
    id: '1',
    name: 'ChatGPT',
    icon: '💬',
    category: '问答式AI',
    description: 'OpenAI开发的AI对话工具，适合日常问答和内容创作',
    scenes: ['ai-entry', 'ai-office', 'ai-create', 'ai-study'],
    price: '免费',
    difficulty: '入门',
    workflow: '入门提示词：描述你的问题 → AI生成回答 → 优化提示词 → 获取更好的结果',
    openclaw_practice: '通过 OpenAI API skill 调用接口',
    website: 'https://chat.openai.com',
    sort: 1
  },
  {
    id: '2',
    name: 'Claude',
    icon: '🧠',
    category: '问答式AI',
    description: 'Anthropic开发的AI助手，擅长推理和复杂任务',
    scenes: ['ai-entry', 'ai-office', 'ai-study'],
    price: '免费',
    difficulty: '入门',
    workflow: '深度推理：提出复杂问题 → AI分析 → 追问细节 → 获得深入解答',
    openclaw_practice: '通过 Anthropic API skill 调用接口',
    website: 'https://claude.ai',
    sort: 2
  },
  // AI入门 - AI模型
  {
    id: '3',
    name: 'GPT-4',
    icon: '🔮',
    category: 'AI模型',
    description: 'OpenAI最强大的语言模型，适合高质量内容生成',
    scenes: ['ai-entry'],
    price: '付费',
    difficulty: '进阶',
    workflow: 'API调用：设置角色 → 发送请求 → 处理响应 → 结果优化',
    openclaw_practice: '通过 OpenAI API skill 调用 GPT-4',
    website: 'https://platform.openai.com',
    sort: 3
  },
  // AI办公 - 文档
  {
    id: '4',
    name: 'Notion AI',
    icon: '📝',
    category: '文档处理',
    description: 'Notion内置AI功能，帮助写作和整理笔记',
    scenes: ['ai-office', 'ai-study'],
    price: '付费',
    difficulty: '入门',
    workflow: '写作工作流：AI生成大纲 → 撰写初稿 → AI润色 → 自动整理 → 导出分享',
    openclaw_practice: '通过飞书+Notion API 联动',
    website: 'https://notion.so/product/ai',
    sort: 4
  },
  // AI办公 - PPT
  {
    id: '5',
    name: 'Gamma',
    icon: '📊',
    category: 'PPT生成',
    description: 'AI自动生成PPT，输入主题即可获得完整演示文稿',
    scenes: ['ai-office'],
    price: '付费',
    difficulty: '入门',
    workflow: 'PPT工作流：输入主题 → AI生成大纲 → 选择模板 → 自动生成 → 细节调整',
    openclaw_practice: '通过 Gamma API 集成到工作流',
    website: 'https://gamma.app',
    sort: 5
  },
  // AI创作 - 图像
  {
    id: '6',
    name: 'Midjourney',
    icon: '🎨',
    category: 'AI图像',
    description: '强大的AI图像生成工具，通过文字描述创建精美图片',
    scenes: ['ai-create'],
    price: '付费',
    difficulty: '进阶',
    workflow: '图像生成：构思场景 → 编写详细提示词 → 调整参数 → 生成图片 → AI修复细节',
    openclaw_practice: '通过 DALL-E skill 实践提示词工程',
    website: 'https://www.midjourney.com',
    sort: 6
  },
  // AI创作 - 视频
  {
    id: '7',
    name: 'Runway',
    icon: '🎬',
    category: 'AI视频',
    description: 'AI视频生成和编辑平台，文字转视频',
    scenes: ['ai-create'],
    price: '付费',
    difficulty: '进阶',
    workflow: '视频创作：ChatGPT写文案 → Midjourney生成配图 → Runway生成视频 → AI配音 → 后期剪辑',
    openclaw_practice: '通过 Runway API 集成',
    website: 'https://runway.ml',
    sort: 7
  },
  // AI编程 - IDE插件
  {
    id: '8',
    name: 'GitHub Copilot',
    icon: '💻',
    category: 'IDE插件',
    description: 'AI代码助手，提供智能代码补全和生成',
    scenes: ['ai-code'],
    price: '付费',
    difficulty: '进阶',
    workflow: '编程工作流：描述需求 → AI生成代码 → Copilot补全 → AI Debug → 完成',
    openclaw_practice: '通过 VS Code 集成 OpenAI API',
    website: 'https://github.com/features/copilot',
    sort: 8
  },
  // AI编程 - 编程工具
  {
    id: '9',
    name: 'Cursor',
    icon: '⚡',
    category: '编程工具',
    description: 'AI优先的代码编辑器，基于VS Code',
    scenes: ['ai-code'],
    price: '免费',
    difficulty: '入门',
    workflow: 'AI编程：描述功能 → AI编写代码 → 预览效果 → 迭代修改 → 完成',
    openclaw_practice: '内置 AI 编程功能',
    website: 'https://cursor.sh',
    sort: 9
  },
  {
    id: '10',
    name: 'Claude Code',
    icon: '🧬',
    category: '编程工具',
    description: 'Anthropic推出的AI编程助手，擅长复杂逻辑',
    scenes: ['ai-code'],
    price: '免费',
    difficulty: '入门',
    workflow: '代码开发：描述需求 → AI分析 → 生成代码 → 调试优化 → 交付',
    openclaw_practice: 'Claude Code CLI 工具',
    website: 'https://claude.com/claude-code',
    sort: 10
  },
  // AI学习
  {
    id: '11',
    name: 'Perplexity',
    icon: '🔍',
    category: 'AI问答',
    description: 'AI搜索引擎，结合GPT-4提供精准答案',
    scenes: ['ai-entry', 'ai-study'],
    price: '免费',
    difficulty: '入门',
    workflow: '学术研究：输入研究课题 → AI搜索整合 → 获取摘要 → 深入阅读 → 笔记整理',
    openclaw_practice: '通过 Perplexity API',
    website: 'https://www.perplexity.ai',
    sort: 11
  },
  {
    id: '12',
    name: '通义千问',
    icon: '🐰',
    category: '问答式AI',
    description: '阿里推出的中文AI助手',
    scenes: ['ai-entry', 'ai-office', 'ai-study'],
    price: '免费',
    difficulty: '入门',
    workflow: '中文办公：PPT大纲 → 自动生成 slides → AI配图 → 智能排版',
    openclaw_practice: '通过 阿里云API 集成',
    website: 'https://tongyi.aliyun.com',
    sort: 12
  }
]

// 根据场景和分类获取工具
export function getToolsByScene(sceneId) {
  return tools.filter(tool => tool.scenes.includes(sceneId))
}

export function getToolsByCategory(sceneId, category) {
  return tools.filter(tool => tool.scenes.includes(sceneId) && tool.category === category)
}

export function getCategories(sceneId) {
  const sceneTools = tools.filter(tool => tool.scenes.includes(sceneId))
  const categories = [...new Set(sceneTools.map(t => t.category))]
  return categories
}
