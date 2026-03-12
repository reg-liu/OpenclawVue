// 工具数据API - Turso云数据库版
import { createClient } from '@libsql/client'

// Turso 配置
const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = process.env.TURSO_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

const scenes = [
  { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI' },
  { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景' },
  { id: 'ai-create', name: 'AI创作', icon: '🎨', description: '写文章，做视频、生成图片' },
  { id: 'ai-code', name: 'AI编程', icon: '💻', description: '代码辅助、调试，Bug修复' },
  { id: 'ai-study', name: 'AI学习', icon: '📚', description: '看论文、学新技术' }
]

// 场景名称映射
const sceneNameMap = {
  'ai-entry': 'AI入门',
  'ai-office': 'AI办公', 
  'ai-create': 'AI创作',
  'ai-code': 'AI编程',
  'ai-study': 'AI学习'
}

export default async function handler(req, res) {
  const { scene, type, category } = req.query
  console.log('API called:', { scene, type, category })
  
  try {
    // 获取分类
    if (type === 'categories') {
      console.log('Returning categories...')
      
      // 默认场景数据（后备）
      const defaultCategories = [
        { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI', children: [] },
        { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景', children: [
          { id: 'ai-writing', name: 'AI写作', icon: '✍️', description: '文案撰写、内容创作' },
          { id: 'ai-presentation', name: 'AI PPT', icon: '📊', description: 'PPT制作与演示' },
          { id: 'ai-data', name: 'AI数据分析', icon: '📈', description: '数据分析与可视化' }
        ]},
        { id: 'ai-create', name: 'AI创作', icon: '🎨', description: '写文章，做视频、生成图片', children: [
          { id: 'ai-image', name: 'AI图像', icon: '🖼️', description: 'AI图像生成' },
          { id: 'ai-video', name: 'AI视频', icon: '🎬', description: 'AI视频生成' },
          { id: 'ai-audio', name: 'AI音频', icon: '🎵', description: 'AI语音合成' }
        ]},
        { id: 'ai-code', name: 'AI编程', icon: '💻', description: '代码辅助、调试，Bug修复', children: [] },
        { id: 'ai-study', name: 'AI学习', icon: '📚', description: '看论文、学新技术', children: [] }
      ]
      
      try {
        const catResult = await client.execute({
          sql: 'SELECT * FROM categories ORDER BY sort ASC',
          args: []
        })
        
        // 处理分类层级
        const allCategories = catResult.rows
        const mainCategories = allCategories.filter(c => !c.parent)
        const subCategories = allCategories.filter(c => c.parent)
        
        // 为每个主分类添加子分类
        const categories = mainCategories.map(main => ({
          ...main,
          children: subCategories
            .filter(sub => sub.parent === main.id)
            .sort((a, b) => a.sort - b.sort)
        }))
        
        // 如果数据库有数据则使用数据库数据，否则使用默认数据
        const finalData = categories.length > 0 ? categories : defaultCategories
        
        return res.status(200).json({
          success: true,
          data: finalData
        })
      } catch (err) {
        console.error('Database error, using fallback:', err.message)
        // 数据库出错时返回默认数据
        return res.status(200).json({
          success: true,
          data: defaultCategories
        })
      }
    }
    
    // 获取热门任务
    if (type === 'hot_tasks') {
      let sql = 'SELECT * FROM hot_tasks'
      const params = []
      
      if (category) {
        sql += ' WHERE category_id = ?'
        params.push(category)
      }
      
      sql += ' ORDER BY heat DESC'
      
      const result = await client.execute({ sql, args: params })
      
      return res.status(200).json({
        success: true,
        data: result.rows
      })
    }
    
    // 获取工作流
    if (type === 'workflows') {
      // 后备工作流数据
      const fallbackWorkflows = {
        'office-business': [
          {
            id: 'wf-business-1',
            category_id: 'office-business',
            title: 'AI商业文案工作流',
            description: '使用AI工具完成商业文案撰写的完整流程',
            steps: [
              { step: 1, title: '确定目标', desc: '明确商业文案的目标和受众' },
              { step: 2, title: 'AI生成大纲', desc: 'AI自动生成文案结构' },
              { step: 3, title: '内容填充', desc: '根据大纲填充商业内容' },
              { step: 4, title: '优化发布', desc: '检查优化并准备发布' }
            ]
          }
        ],
        'office-writing': [
          {
            id: 'wf-writing-1',
            category_id: 'office-writing',
            title: 'AI写作工作流',
            description: '使用AI工具完成文章撰写的完整流程',
            steps: [
              { step: 1, title: '确定主题', desc: '明确写作目标和受众' },
              { step: 2, title: 'AI生成大纲', desc: 'AI自动生成文章结构' },
              { step: 3, title: '内容扩写', desc: '根据大纲填充详细内容' },
              { step: 4, title: '润色校对', desc: '检查语法、优化表达' }
            ]
          }
        ],
        'create-image': [
          {
            id: 'wf-image-1',
            category_id: 'create-image',
            title: 'AI图像生成工作流',
            description: '使用AI工具完成图像创作的完整流程',
            steps: [
              { step: 1, title: '构思描述', desc: '明确想要生成的图像内容' },
              { step: 2, title: '选择模型', desc: '根据需求选择合适的AI模型' },
              { step: 3, title: '生成图像', desc: '输入提示词生成图像' },
              { step: 4, title: '后期处理', desc: '调整尺寸、优化细节' }
            ]
          }
        ],
        'create-video': [
          {
            id: 'wf-video-1',
            category_id: 'create-video',
            title: 'AI视频生成工作流',
            description: '使用AI工具完成视频创作的完整流程',
            steps: [
              { step: 1, title: '确定主题', desc: '明确视频主题和内容' },
              { step: 2, title: '生成脚本', desc: 'AI生成视频脚本' },
              { step: 3, title: '生成视频', desc: 'AI生成视频内容' },
              { step: 4, title: '后期剪辑', desc: 'AI辅助剪辑和优化' }
            ]
          }
        ],
        'learn-coding': [
          {
            id: 'wf-coding-1',
            category_id: 'learn-coding',
            title: 'AI编程工作流',
            description: '使用AI工具辅助编程的完整流程',
            steps: [
              { step: 1, title: '需求分析', desc: '明确要实现的功能' },
              { step: 2, title: 'AI生成代码', desc: '描述需求让AI生成代码' },
              { step: 3, title: '调试优化', desc: 'AI辅助调试和优化' },
              { step: 4, title: '测试部署', desc: '运行测试并部署' }
            ]
          }
        ]
      }
      
      // 直接返回后备数据
      const workflows = fallbackWorkflows[category] || []
      return res.status(200).json({
        success: true,
        data: workflows
      })
    }
    
    // 获取工具
    // 后备工具数据 - 按垂直领域分类
    const fallbackTools = {
      // AI入门
      'ai-entry': [
        { id: 1, name: 'ChatGPT', icon: '💬', description: 'OpenAI开发的AI对话工具，适合日常问答和内容创作', price: '免费/付费', difficulty: '入门', features: '对话、写作、编程', network: '需要VPN' },
        { id: 2, name: 'Claude', icon: '🧠', description: 'Anthropic推出的AI助手，长文本处理能力强', price: '免费/付费', difficulty: '进阶', features: '长文本、编程，分析', network: '需要VPN' },
        { id: 3, name: 'Kimi', icon: '🦊', description: '月之暗面推出的中文AI助手，超长上下文', price: '免费', difficulty: '入门', features: '长文本、中文优化', network: '国内可直接访问' }
      ],
      // AI办公 - 写作
      'office-writing': [
        { id: 1, name: 'ChatGPT', icon: '💬', description: 'OpenAI开发的AI对话工具，适合日常问答和内容创作', price: '免费/付费', difficulty: '入门', features: '对话、写作、编程', network: '需要VPN' },
        { id: 2, name: 'Claude', icon: '🧠', description: 'Anthropic推出的AI助手，长文本处理能力强', price: '免费/付费', difficulty: '进阶', features: '长文本、写作，分析', network: '需要VPN' },
        { id: 3, name: 'Kimi', icon: '🦊', description: '月之暗面推出的中文AI助手，超长上下文', price: '免费', difficulty: '入门', features: '长文本、中文优化', network: '国内可直接访问' },
        { id: 4, name: '文心一言', icon: '🔥', description: '百度推出的中文AI助手，文学创作能力强', price: '免费', difficulty: '入门', features: '中文创作、知识问答', network: '国内可直接访问' },
        { id: 5, name: '通义千问', icon: '🦅', description: '阿里推出的中文AI助手，多模态能力强', price: '免费', difficulty: '入门', features: '中文优化、多模态', network: '国内可直接访问' }
      ],
      // AI办公 - 商业
      'office-business': [
        { id: 1, name: 'Notion AI', icon: '📓', description: 'Notion内置AI助手，文档和项目管理智能化', price: '付费', difficulty: '入门', features: '文档管理、项目协作', network: '需要VPN' },
        { id: 2, name: 'Copilot', icon: '🤖', description: '微软AI助手，深度集成Office办公软件', price: '付费', difficulty: '入门', features: 'Office自动化、数据分析', network: '需要VPN' },
        { id: 3, name: 'WPS AI', icon: '📊', description: 'WPS Office内置AI助手，国产办公软件', price: '免费', difficulty: '入门', features: '文档处理、PPT制作', network: '国内可直接访问' }
      ],
      // AI办公 - 效率
      'office-efficiency': [
        { id: 1, name: 'Notion AI', icon: '📓', description: 'Notion内置AI助手，提升工作效率', price: '付费', difficulty: '入门', features: '笔记、任务管理', network: '需要VPN' },
        { id: 2, name: 'Otter.ai', icon: '🦦', description: 'AI会议记录工具，自动生成会议纪要', price: '免费/付费', difficulty: '入门', features: '会议转录、总结', network: '需要VPN' },
        { id: 3, name: 'Tome', icon: '📖', description: 'AI PPT制作工具，快速生成演示文稿', price: '免费/付费', difficulty: '入门', features: 'AI生成PPT、故事叙述', network: '需要VPN' }
      ],
      // AI办公 - 数据分析
      'office-data': [
        { id: 1, name: 'ChatGPT', icon: '💬', description: 'OpenAI开发的AI对话工具，辅助数据分析', price: '免费/付费', difficulty: '入门', features: '数据分析、代码生成', network: '需要VPN' },
        { id: 2, name: 'Python', icon: '🐍', description: '数据分析编程语言，AI辅助编程', price: '免费', difficulty: '进阶', features: '数据分析、机器学习', network: '本地运行' },
        { id: 3, name: 'Excel AI', icon: '📊', description: '微软Excel内置AI，分析数据更智能', price: '付费', difficulty: '入门', features: '数据分析、图表生成', network: '本地运行' }
      ],
      // AI办公 - 营销
      'office-marketing': [
        { id: 1, name: 'Copy.ai', icon: '✍️', description: 'AI营销文案生成工具，快速创建广告文案', price: '免费/付费', difficulty: '入门', features: '营销文案、社交媒体', network: '需要VPN' },
        { id: 2, name: 'Jasper', icon: '📝', description: 'AI内容创作平台，营销内容生成', price: '付费', difficulty: '入门', features: '博客、广告文案', network: '需要VPN' },
        { id: 3, name: 'Writesonic', icon: '🎯', description: 'AI写作工具，SEO内容优化', price: '免费/付费', difficulty: '入门', features: 'SEO优化、营销文案', network: '需要VPN' }
      ],
      // AI办公 - 金融
      'office-finance': [
        { id: 1, name: 'ChatGPT', icon: '💬', description: 'AI辅助金融分析，报告撰写', price: '免费/付费', difficulty: '入门', features: '金融分析、报告生成', network: '需要VPN' },
        { id: 2, name: 'Excel AI', icon: '📊', description: 'Excel内置AI，财务数据分析', price: '付费', difficulty: '入门', features: '财务分析、预测', network: '本地运行' }
      ],
      // AI创作 - 图像
      'create-image': [
        { id: 1, name: 'Midjourney', icon: '🎨', description: 'AI图像生成标杆，画质最高', price: '付费', difficulty: '进阶', features: '艺术创作、概念设计', network: '需要VPN' },
        { id: 2, name: 'DALL-E 3', icon: '🖼️', description: 'OpenAI图像生成，GPT集成更智能', price: '付费', difficulty: '入门', features: '图像生成、编辑', network: '需要VPN' },
        { id: 3, name: 'Stable Diffusion', icon: '⚡', description: '开源本地运行，可自定义模型', price: '免费', difficulty: '进阶', features: '本地部署、自定义', network: '本地运行' },
        { id: 4, name: 'Leonardo AI', icon: '🎭', description: '开源AI图像生成平台，功能丰富', price: '免费/付费', difficulty: '入门', features: '图像生成、训练模型', network: '需要VPN' },
        { id: 5, name: '通义万相', icon: '🏞️', description: '阿里AI图像生成，中文提示词优化', price: '免费', difficulty: '入门', features: '中文优化、图像生成', network: '国内可直接访问' },
        { id: 6, name: '文心一格', icon: '🎪', description: '百度AI图像生成，艺术风格多样', price: '免费/付费', difficulty: '入门', features: '中文优化、艺术创作', network: '国内可直接访问' }
      ],
      // AI创作 - 视频
      'create-video': [
        { id: 1, name: 'Runway', icon: '🎬', description: 'AI视频生成和编辑平台，功能全面', price: '免费/付费', difficulty: '进阶', features: '视频生成、编辑、特效', network: '需要VPN' },
        { id: 2, name: 'Pika', icon: '🎥', description: 'AI视频生成工具，快速生成视频', price: '免费/付费', difficulty: '入门', features: '文字转视频、视频编辑', network: '需要VPN' },
        { id: 3, name: '可灵', icon: '🦁', description: '快手AI视频生成，国产视频生成标杆', price: '免费/付费', difficulty: '入门', features: '视频生成、文字转视频', network: '国内可直接访问' },
        { id: 4, name: '即梦', icon: '✨', description: '字节跳动AI视频生成工具', price: '免费', difficulty: '入门', features: '视频生成、AI作图', network: '国内可直接访问' },
        { id: 5, name: 'Sora', icon: '🌊', description: 'OpenAI视频生成模型（未公测）', price: '待定', difficulty: '进阶', features: '视频生成、世界模拟', network: '需要VPN' },
        { id: 6, name: 'Luma Dream Machine', icon: '💫', description: 'AI视频生成新星，效果惊艳', price: '免费/付费', difficulty: '入门', features: '视频生成、动画', network: '需要VPN' }
      ],
      // AI创作 - 设计
      'create-design': [
        { id: 1, name: 'Figma AI', icon: '🎨', description: 'Figma内置AI设计助手，智能设计辅助', price: '付费', difficulty: '入门', features: 'UI设计、自动布局', network: '需要VPN' },
        { id: 2, name: 'Midjourney', icon: '🎭', description: 'AI图像生成，辅助概念设计', price: '付费', difficulty: '进阶', features: '概念设计、插画', network: '需要VPN' },
        { id: 3, name: 'Canva AI', icon: '🖌️', description: 'Canva内置AI设计工具，快速出图', price: '免费/付费', difficulty: '入门', features: '海报、社交媒体', network: '需要VPN' }
      ],
      // AI创作 - 艺术
      'create-art': [
        { id: 1, name: 'Midjourney', icon: '🎨', description: 'AI艺术创作标杆，画质最高', price: '付费', difficulty: '进阶', features: '艺术创作，数字绘画', network: '需要VPN' },
        { id: 2, name: 'DALL-E 3', icon: '🖼️', description: 'OpenAI艺术图像生成', price: '付费', difficulty: '入门', features: '艺术创作、概念艺术', network: '需要VPN' },
        { id: 3, name: 'Stable Diffusion', icon: '⚡', description: '开源艺术创作，可训练模型', price: '免费', difficulty: '进阶', features: '艺术创作、本地运行', network: '本地运行' }
      ],
      // AI创作 - 音乐
      'create-music': [
        { id: 1, name: 'Suno', icon: '🎵', description: 'AI音乐生成神器，生成完整歌曲', price: '免费/付费', difficulty: '入门', features: '音乐生成、词曲创作', network: '需要VPN' },
        { id: 2, name: 'AIVA', icon: '🎹', description: 'AI音乐创作助手，专业作曲', price: '免费/付费', difficulty: '入门', features: '作曲、编曲', network: '需要VPN' },
        { id: 3, name: '网易天音', icon: '🎶', description: '网易AI音乐生成，国产音乐AI', price: '免费', difficulty: '入门', features: '音乐生成、中文歌词', network: '国内可直接访问' }
      ],
      // AI学习 - 编程
      'learn-coding': [
        { id: 1, name: 'GitHub Copilot', icon: '💻', description: '微软AI编程助手，代码补全能力强', price: '付费', difficulty: '入门', features: '代码补全、调试', network: '需要VPN' },
        { id: 2, name: 'Cursor', icon: '📝', description: 'AI编程IDE，基于VS Code', price: '免费/付费', difficulty: '入门', features: '代码编辑、AI对话', network: '需要VPN' },
        { id: 3, name: 'Claude Code', icon: '🤖', description: 'Anthropic推出的AI编程助手', price: '免费', difficulty: '进阶', features: '代码生成、调试', network: '需要VPN' },
        { id: 4, name: 'Windsurf', icon: '🌊', description: 'AI编程工具，Flow AI功能强大', price: '免费/付费', difficulty: '入门', features: '代码补全，项目管理', network: '需要VPN' },
        { id: 5, name: 'Replit AI', icon: '⚡', description: '在线AI编程环境，快速开发', price: '免费/付费', difficulty: '入门', features: '在线IDE、AI辅助', network: '需要VPN' }
      ],
      // AI学习 - 教育
      'learn-education': [
        { id: 1, name: 'Khanmigo', icon: '🎓', description: '可汗学院AI导师，个性化学习', price: '付费', difficulty: '入门', features: '个性化辅导、作业辅助', network: '需要VPN' },
        { id: 2, name: 'Duolingo AI', icon: '🦉', description: '多邻国AI语言学习，个性化辅导', price: '免费/付费', difficulty: '入门', features: '语言学习、AI对话', network: '需要VPN' },
        { id: 3, name: 'ChatGPT', icon: '💬', description: 'AI学习助手，解答各种问题', price: '免费/付费', difficulty: '入门', features: '问答、辅导', network: '需要VPN' }
      ],
      // AI学习 - 研究
      'learn-research': [
        { id: 1, name: 'Perplexity', icon: '🔍', description: 'AI搜索工具，学术研究好帮手', price: '免费/付费', difficulty: '入门', features: 'AI搜索、文献总结', network: '需要VPN' },
        { id: 2, name: 'Elicit', icon: '📚', description: 'AI学术研究工具，文献综述', price: '免费', difficulty: '入门', features: '文献搜索、总结', network: '需要VPN' },
        { id: 3, name: 'Scholar AI', icon: '🎓', description: 'AI学术搜索引擎，论文查找', price: '免费/付费', difficulty: '入门', features: '论文搜索、阅读', network: '需要VPN' }
      ],
      // AI学习 - 语言学习
      'learn-language': [
        { id: 1, name: 'Duolingo AI', icon: '🦉', description: 'AI语言学习，个性化辅导', price: '免费/付费', difficulty: '入门', features: '口语练习、语法纠正', network: '需要VPN' },
        { id: 2, name: 'ChatGPT', icon: '💬', description: 'AI语言对话伙伴，口语练习', price: '免费/付费', difficulty: '入门', features: '对话练习、翻译', network: '需要VPN' },
        { id: 3, name: 'Speak', icon: '🗣️', description: 'AI口语教练，实时纠正', price: '付费', difficulty: '入门', features: '口语练习、发音纠正', network: '需要VPN' }
      ],
      // AI生活 - 健康
      'life-health': [
        { id: 1, name: 'ChatGPT', icon: '💬', description: 'AI健康咨询助手，生活建议', price: '免费/付费', difficulty: '入门', features: '健康咨询、生活建议', network: '需要VPN' },
        { id: 2, name: 'Fitbod', icon: '🏋️', description: 'AI健身计划定制，个性化训练', price: '付费', difficulty: '入门', features: '健身计划，运动指导', network: '需要VPN' }
      ],
      // AI生活 - 旅行
      'life-travel': [
        { id: 1, name: 'ChatGPT', icon: '💬', description: 'AI旅行规划助手，行程制定', price: '免费/付费', difficulty: '入门', features: '旅行规划、景点推荐', network: '需要VPN' },
        { id: 2, name: 'Roam Around', icon: '🗺️', description: 'AI旅行规划工具，智能行程', price: '免费/付费', difficulty: '入门', features: '行程规划、预订建议', network: '需要VPN' }
      ],
      // AI生活 - 美食
      'life-food': [
        { id: 1, name: 'ChatGPT', icon: '💬', description: 'AI食谱推荐，做饭助手', price: '免费/付费', difficulty: '入门', features: '食谱推荐、烹饪建议', network: '需要VPN' },
        { id: 2, name: 'Supercook', icon: '🍳', description: 'AI食谱搜索，根据食材推荐', price: '免费', difficulty: '入门', features: '食谱搜索、食材推荐', network: '需要VPN' }
      ],
      // AI生活 - 时尚
      'life-fashion': [
        { id: 1, name: 'ChatGPT', icon: '💬', description: 'AI时尚搭配建议，购物助手', price: '免费/付费', difficulty: '入门', features: '搭配建议、趋势分析', network: '需要VPN' },
        { id: 2, name: 'Midjourney', icon: '🎨', description: 'AI时尚设计，效果图生成', price: '付费', difficulty: '进阶', features: '设计辅助、效果预览', network: '需要VPN' }
      ]
    }
    
    let sql = 'SELECT * FROM tools WHERE status = ?'
    const params = ['已发布']
    
    // 按场景过滤
    if (scene) {
      sql += ' AND scenes LIKE ?'
      params.push(`%${scene}%`)
    }
    
    sql += ' ORDER BY sort ASC'
    
    const result = await client.execute({
      sql,
      args: params
    })
    const rows = result.rows
    
    // 转换数据格式
    const tools = rows.map(row => ({
      id: row.id,
      name: row.name,
      icon: row.icon,
      category: row.category,
      subcategory: row.subcategory,
      description: row.description,
      scenes: row.scenes ? row.scenes.split(',') : [],
      price: row.price,
      priceDetail: row.price_detail,
      difficulty: row.difficulty,
      network: row.network,
      mobile: row.mobile,
      pros: row.pros,
      cons: row.cons,
      features: row.features ? row.features.split(',') : [],
      workflow: row.workflow,
      workflowSteps: row.workflow_steps ? JSON.parse(row.workflow_steps) : [],
      openclaw_practice: row.openclaw_practice,
      website: row.website,
      sort: row.sort
    }))
    
    // 如果数据库没有数据，使用后备数据
    let finalTools = tools
    if (tools.length === 0 && fallbackTools[scene]) {
      finalTools = fallbackTools[scene]
    }
    
    res.status(200).json({
      success: true,
      data: finalTools,
      scenes: scenes
    })
  } catch (error) {
    console.error('获取数据失败:', error)
    // 出错时返回后备数据
    const fallbackT = fallbackTools[scene] || []
    res.status(200).json({
      success: true,
      data: fallbackT,
      scenes: []
    })
  }
}
