// 场景配置
export const scenes = [
  { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI' },
  { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景（写文档，做PPT、整理数据）' },
  { id: 'ai-create', name: 'AI创作', icon: '🎨', description: '写文章，做视频、生成图片' },
  { id: 'ai-code', name: 'AI编程', icon: '💻', description: '代码辅助、调试、Bug修复' },
  { id: 'ai-study', name: 'AI学习', icon: '📚', description: '看论文、学新技术' }
]

// 工具数据（开发环境使用）
export const tools = [
  {
    id: '1',
    name: 'ChatGPT',
    icon: '💬',
    description: 'OpenAI开发的AI对话工具，适合日常问答和内容创作',
    scenes: ['ai-entry', 'ai-office', 'ai-create', 'ai-study'],
    price: '免费',
    difficulty: '入门',
    workflow: '入门提示词：描述你的问题 → AI生成回答 → 优化提示词 → 获取更好的结果',
    openclaw_practice: '通过 OpenAI API skill 调用接口，实现自定义AI助手',
    website: 'https://chat.openai.com',
    sort: 1
  },
  {
    id: '2',
    name: 'Claude',
    icon: '🧠',
    description: 'Anthropic开发的AI助手，擅长推理和复杂任务',
    scenes: ['ai-entry', 'ai-office', 'ai-study'],
    price: '免费',
    difficulty: '入门',
    workflow: '深度推理：提出复杂问题 → AI分析 → 追问细节 → 获得深入解答',
    openclaw_practice: '通过 Anthropic API skill 调用接口',
    website: 'https://claude.ai',
    sort: 2
  },
  {
    id: '3',
    name: 'Midjourney',
    icon: '🎨',
    description: '强大的AI图像生成工具，通过文字描述创建精美图片',
    scenes: ['ai-create'],
    price: '付费',
    difficulty: '进阶',
    workflow: '图像生成：构思场景 → 编写详细提示词 → 调整参数 → 生成图片 → AI修复细节',
    openclaw_practice: '通过 DALL-E image generation skill 实践提示词工程',
    website: 'https://www.midjourney.com',
    sort: 3
  },
  {
    id: '4',
    name: 'GitHub Copilot',
    icon: '💻',
    description: 'AI代码助手，提供智能代码补全和生成',
    scenes: ['ai-code'],
    price: '付费',
    difficulty: '进阶',
    workflow: '编程工作流：描述需求 → AI生成代码 → 复制到IDE → Copilot补全 → AI Debug → 完成',
    openclaw_practice: '通过 VS Code 集成 OpenAI API 实现代码补全',
    website: 'https://github.com/features/copilot',
    sort: 4
  },
  {
    id: '5',
    name: 'Notion AI',
    icon: '📝',
    description: 'Notion内置AI功能，帮助写作和整理笔记',
    scenes: ['ai-office', 'ai-study'],
    price: '付费',
    difficulty: '入门',
    workflow: '写作工作流：AI生成大纲 → 撰写初稿 → AI润色 → 自动整理 → 导出分享',
    openclaw_practice: '通过飞书+Notion API 联动实现任务管理',
    website: 'https://notion.so/product/ai',
    sort: 5
  },
  {
    id: '6',
    name: 'Perplexity',
    icon: '🔍',
    description: 'AI搜索引擎，结合GPT-4提供精准答案',
    scenes: ['ai-entry', 'ai-study'],
    price: '免费',
    difficulty: '入门',
    workflow: '学术研究：输入研究课题 → AI搜索整合 → 获取摘要 → 深入阅读 → 笔记整理',
    openclaw_practice: '通过 Perplexity API 获取搜索结果',
    website: 'https://www.perplexity.ai',
    sort: 6
  },
  {
    id: '7',
    name: 'Runway',
    icon: '🎬',
    description: 'AI视频生成和编辑平台',
    scenes: ['ai-create'],
    price: '付费',
    difficulty: '进阶',
    workflow: '视频创作：ChatGPT写文案 → Midjourney生成配图 → Runway生成视频 → AI配音 → 后期剪辑',
    openclaw_practice: '通过 Runway API 集成到自动化工作流',
    website: 'https://runway.ml',
    sort: 7
  },
  {
    id: '8',
    name: '通义千问',
    icon: '🐰',
    description: '阿里推出的中文AI助手',
    scenes: ['ai-entry', 'ai-office', 'ai-study'],
    price: '免费',
    difficulty: '入门',
    workflow: '中文办公：PPT大纲 → 自动生成 slides → AI配图 → 智能排版',
    openclaw_practice: '通过 阿里云API 集成调用',
    website: 'https://tongyi.aliyun.com',
    sort: 8
  }
]

// 根据场景获取工具
export function getToolsByScene(sceneId) {
  return tools.filter(tool => tool.scenes.includes(sceneId))
}
