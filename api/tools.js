// 工具数据API
// 模拟从飞书Bitable获取数据

const tools = [
  // ===== AI入门 =====
  { id: '1', name: 'ChatGPT', icon: '💬', category: '问答式AI', description: 'OpenAI开发的AI对话工具，适合日常问答和内容创作', scenes: ['ai-entry', 'ai-office', 'ai-create', 'ai-study'], price: '免费', difficulty: '入门', workflow: '入门提示词：描述问题 → AI回答 → 优化提示词 → 获得更好结果', openclaw_practice: '通过 OpenAI API skill 调用接口', website: 'https://chat.openai.com', sort: 1 },
  { id: '2', name: 'Claude', icon: '🧠', category: '问答式AI', description: 'Anthropic开发的AI助手，擅长推理和复杂分析', scenes: ['ai-entry', 'ai-office', 'ai-study'], price: '免费', difficulty: '入门', workflow: '深度推理：提出复杂问题 → AI分析 → 追问细节 → 获得深入解答', openclaw_practice: '通过 Anthropic API skill 调用', website: 'https://claude.ai', sort: 2 },
  { id: '3', name: 'Gemini', icon: '🌟', category: '问答式AI', description: 'Google推出的多模态AI，支持图像理解和生成', scenes: ['ai-entry', 'ai-create'], price: '免费', difficulty: '入门', workflow: '多模态交互：文本+图像 → 综合理解 → 多形式输出', openclaw_practice: '通过 Google Gemini API', website: 'https://gemini.google.com', sort: 3 },
  { id: '4', name: '通义千问', icon: '🐰', category: '问答式AI', description: '阿里推出的中文AI助手，针对中文场景优化', scenes: ['ai-entry', 'ai-office', 'ai-study'], price: '免费', difficulty: '入门', workflow: '中文办公：PPT大纲 → 自动生成 → AI配图 → 智能排版', openclaw_practice: '通过 阿里云API 集成', website: 'https://tongyi.aliyun.com', sort: 4 },
  { id: '5', name: 'Kimi', icon: '🌙', category: '问答式AI', description: '月之暗面推出的长文本AI，支持超长上下文', scenes: ['ai-entry', 'ai-office', 'ai-study'], price: '免费', difficulty: '入门', workflow: '长文本处理：上传文档 → AI总结 → 问答互动 → 深度理解', openclaw_practice: '通过 Kimi API', website: 'https://kimi.moonshot.cn', sort: 5 },
  { id: '6', name: 'GPT-4', icon: '🔮', category: 'AI模型', description: 'OpenAI最强大的语言模型，适合高质量内容生成', scenes: ['ai-entry'], price: '付费', difficulty: '进阶', workflow: 'API调用：设置角色 → 发送请求 → 处理响应 → 结果优化', openclaw_practice: '通过 OpenAI API skill 调用 GPT-4', website: 'https://platform.openai.com', sort: 6 },

  // ===== AI办公 =====
  { id: '8', name: 'Notion AI', icon: '📝', category: '文档处理', description: 'Notion内置AI功能，帮助写作和整理笔记', scenes: ['ai-office', 'ai-study'], price: '付费', difficulty: '入门', workflow: '写作工作流：AI生成大纲 → 撰写初稿 → AI润色 → 自动整理 → 导出分享', openclaw_practice: '通过飞书+Notion API 联动', website: 'https://notion.so/product/ai', sort: 8 },
  { id: '9', name: 'WPS AI', icon: '📄', category: '文档处理', description: '金山WPS内置AI，中文办公更顺手', scenes: ['ai-office'], price: '免费', difficulty: '入门', workflow: '文档处理：AI续写 → 智能排版 → 内容润色 → 一键生成', openclaw_practice: '通过 WPS AI API', website: 'https://ai.wps.cn', sort: 9 },
  { id: '11', name: 'Gamma', icon: '📊', category: 'PPT生成', description: 'AI自动生成PPT，输入主题即可获得完整演示文稿', scenes: ['ai-office'], price: '付费', difficulty: '入门', workflow: 'PPT工作流：输入主题 → AI生成大纲 → 选择模板 → 自动生成 → 细节调整', openclaw_practice: '通过 Gamma API 集成', website: 'https://gamma.app', sort: 11 },
  { id: '13', name: 'Canva AI', icon: '🎯', category: 'PPT生成', description: '设计平台+AI，快速创建演示文稿', scenes: ['ai-office', 'ai-create'], price: '免费', difficulty: '入门', workflow: '设计工作流：选择尺寸 → 描述需求 → AI生成 → 调整 → 导出', openclaw_practice: '通过 Canva API', website: 'https://www.canva.com', sort: 13 },
  { id: '14', name: 'Excel AI', icon: '📈', category: '数据分析', description: 'Microsoft Excel内置AI，数据分析更智能', scenes: ['ai-office'], price: '免费', difficulty: '入门', workflow: '数据分析：导入数据 → AI分析建议 → 自动生成图表 → 报告解读', openclaw_practice: '通过 Microsoft Graph API', website: 'https://excel.microsoft.com', sort: 14 },

  // ===== AI创作 =====
  { id: '16', name: 'Copy.ai', icon: '✍️', category: 'AI写作', description: '营销文案AI生成，适合电商和社交媒体', scenes: ['ai-create'], price: '免费', difficulty: '入门', workflow: '营销文案：选择类型 → 输入产品信息 → AI生成 → 优化 → 导出', openclaw_practice: '通过 Copy.ai API', website: 'https://www.copy.ai', sort: 16 },
  { id: '19', name: 'Midjourney', icon: '🎨', category: 'AI图像', description: '强大的AI图像生成工具，艺术性强', scenes: ['ai-create'], price: '付费', difficulty: '进阶', workflow: '图像生成：构思场景 → 编写详细提示词 → 调整参数 → 生成 → AI修复', openclaw_practice: '通过 DALL-E skill 实践', website: 'https://www.midjourney.com', sort: 19 },
  { id: '20', name: 'DALL-E 3', icon: '🖼️', category: 'AI图像', description: 'OpenAI图像生成，GPT集成更智能', scenes: ['ai-create'], price: '付费', difficulty: '入门', workflow: '图像+文本：描述需求 → GPT优化提示词 → DALL-E生成 → 编辑', openclaw_practice: '通过 DALL-E API', website: 'https://openai.com/dall-e-3', sort: 20 },
  { id: '21', name: 'Stable Diffusion', icon: '⚡', category: 'AI图像', description: '开源本地运行，可自定义模型', scenes: ['ai-create'], price: '免费', difficulty: '进阶', workflow: '本地部署：安装模型 → 编写提示词 → 参数调整 → 本地生成', openclaw_practice: '通过 ComfyUI 工作流', website: 'https://stability.ai', sort: 21 },
  { id: '23', name: 'Runway', icon: '🎬', category: 'AI视频', description: 'AI视频生成和编辑，功能全面', scenes: ['ai-create'], price: '付费', difficulty: '进阶', workflow: '视频创作：ChatGPT写文案 → Midjourney配图 → Runway生成视频 → AI配音 → 后期', openclaw_practice: '通过 Runway API', website: 'https://runway.ml', sort: 23 },
  { id: '24', name: 'Pika', icon: '📽️', category: 'AI视频', description: '文字转视频，新手友好', scenes: ['ai-create'], price: '免费', difficulty: '入门', workflow: '文字转视频：输入描述 → 选择风格 → AI生成 → 预览', openclaw_practice: '通过 Pika API', website: 'https://pika.art', sort: 24 },
  { id: '25', name: 'HeyGen', icon: '👤', category: 'AI视频', description: '数字人视频生成，适合营销和培训', scenes: ['ai-create'], price: '付费', difficulty: '入门', workflow: '数字人：选择形象 → 输入文案 → AI驱动 → 视频导出', openclaw_practice: '通过 HeyGen API', website: 'https://heygen.com', sort: 25 },
  { id: '27', name: 'ElevenLabs', icon: '🎤', category: 'AI音频', description: 'AI配音，语音克隆技术领先', scenes: ['ai-create'], price: '免费', difficulty: '入门', workflow: '配音工作流：输入文案 → 选择声音 → AI生成 → 调整语速 → 导出', openclaw_practice: '通过 ElevenLabs API', website: 'https://elevenlabs.io', sort: 27 },

  // ===== AI编程 =====
  { id: '29', name: 'GitHub Copilot', icon: '💻', category: 'IDE插件', description: 'AI代码助手，代码补全首选', scenes: ['ai-code'], price: '付费', difficulty: '进阶', workflow: '编程工作流：描述需求 → AI生成代码 → Copilot补全 → AI Debug → 完成', openclaw_practice: '通过 VS Code 集成', website: 'https://github.com/features/copilot', sort: 29 },
  { id: '30', name: 'Tabnine', icon: '🔵', category: 'IDE插件', description: '本地AI代码补全，保护隐私', scenes: ['ai-code'], price: '免费', difficulty: '入门', workflow: '本地补全：安装插件 → 设置偏好 → 自动补全 → 学习习惯', openclaw_practice: 'Tabnine 本地运行', website: 'https://www.tabnine.com', sort: 30 },
  { id: '31', name: 'Codeium', icon: '⚡', category: 'IDE插件', description: '免费AI编程助手，Copilot替代', scenes: ['ai-code'], price: '免费', difficulty: '入门', workflow: '免费补全：安装插件 → 登录 → 自动补全 → 代码生成', openclaw_practice: 'Codeium 免费使用', website: 'https://codeium.com', sort: 31 },
  { id: '32', name: 'Cursor', icon: '⚡', category: '编程工具', description: 'AI优先的代码编辑器，基于VS Code', scenes: ['ai-code'], price: '免费', difficulty: '入门', workflow: 'AI编程：描述功能 → AI编写代码 → 预览效果 → 迭代修改 → 完成', openclaw_practice: '内置 AI 编程功能', website: 'https://cursor.sh', sort: 32 },
  { id: '33', name: 'Claude Code', icon: '🧬', category: '编程工具', description: 'Anthropic编程助手，擅长复杂逻辑', scenes: ['ai-code'], price: '免费', difficulty: '入门', workflow: '代码开发：描述需求 → AI分析 → 生成代码 → 调试优化 → 交付', openclaw_practice: 'Claude Code CLI', website: 'https://claude.com/claude-code', sort: 33 },
  { id: '35', name: 'Replit Agent', icon: '🖥️', category: '编程工具', description: 'AI帮你写代码，从描述开始', scenes: ['ai-code'], price: '免费', difficulty: '入门', workflow: '自然编程：描述想要的应用 → AI分析 → 自动编写 → 部署', openclaw_practice: 'Replit Agent AI', website: 'https://replit.com', sort: 35 },

  // ===== AI学习 =====
  { id: '38', name: 'Perplexity', icon: '🔍', category: 'AI问答', description: 'AI搜索引擎，结合GPT-4提供精准答案', scenes: ['ai-entry', 'ai-study'], price: '免费', difficulty: '入门', workflow: '学术研究：输入课题 → AI搜索整合 → 获取摘要 → 深入阅读 → 笔记整理', openclaw_practice: '通过 Perplexity API', website: 'https://www.perplexity.ai', sort: 38 },
  { id: '39', name: '秘塔搜索', icon: '🔎', category: 'AI问答', description: '中文AI搜索引擎，无广告', scenes: ['ai-entry', 'ai-study'], price: '免费', difficulty: '入门', workflow: '中文搜索：输入问题 → AI整理 → 结构化答案 → 深入了解', openclaw_practice: '秘塔AI搜索', website: 'https://metaso.cn', sort: 39 },
  { id: '41', name: 'Kimi', icon: '🌙', category: '论文阅读', description: '长文本理解，适合论文和书籍', scenes: ['ai-study'], price: '免费', difficulty: '入门', workflow: '论文精读：上传文档 → AI总结 → 问答分析 → 提取要点', openclaw_practice: '通过 Kimi API', website: 'https://kimi.moonshot.cn', sort: 41 },
  { id: '42', name: 'Obsidian AI', icon: '💎', category: '笔记整理', description: '双向链接笔记+AI辅助思考', scenes: ['ai-study'], price: '免费', difficulty: '入门', workflow: '知识管理：记录笔记 → AI关联 → 思维导图 → 深度理解', openclaw_practice: '通过 Obsidian Plugins', website: 'https://obsidian.md', sort: 42 }
]

const scenes = [
  { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI' },
  { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景' },
  { id: 'ai-create', name: 'AI创作', icon: '🎨', description: '写文章，做视频、生成图片' },
  { id: 'ai-code', name: 'AI编程', icon: '💻', description: '代码辅助、调试，Bug修复' },
  { id: 'ai-study', name: 'AI学习', icon: '📚', description: '看论文、学新技术' }
]

export default function handler(req, res) {
  const { scene } = req.query
  
  let result = tools
  
  // 按场景过滤
  if (scene) {
    result = tools.filter(t => t.scenes.includes(scene))
  }
  
  // 返回数据
  res.status(200).json({
    success: true,
    data: result,
    scenes: scenes
  })
}
