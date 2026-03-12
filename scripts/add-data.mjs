import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

// 工作流数据
const workflows = [
  // AI写作工作流
  {
    category_id: 'office-writing',
    title: 'AI写作工作流',
    description: '使用AI工具完成文章撰写的完整流程',
    steps: JSON.stringify([
      { step: 1, title: '确定主题', desc: '明确写作目标和受众' },
      { step: 2, title: 'AI生成大纲', desc: 'AI自动生成文章结构' },
      { step: 3, title: '内容扩写', desc: '根据大纲填充详细内容' },
      { step: 4, title: '润色校对', desc: '检查语法、优化表达' }
    ])
  },
  // AI图像工作流
  {
    category_id: 'create-image',
    title: 'AI图像生成工作流',
    description: '使用AI工具完成图像创作的完整流程',
    steps: JSON.stringify([
      { step: 1, title: '构思描述', desc: '明确想要生成的图像内容' },
      { step: 2, title: '选择模型', desc: '根据需求选择合适的AI模型' },
      { step: 3, title: '生成图像', desc: '输入提示词生成图像' },
      { step: 4, title: '后期处理', desc: '调整尺寸、优化细节' }
    ])
  },
  // AI编程工作流
  {
    category_id: 'learn-coding',
    title: 'AI编程工作流',
    description: '使用AI工具辅助编程的完整流程',
    steps: JSON.stringify([
      { step: 1, title: '需求分析', desc: '明确要实现的功能' },
      { step: 2, title: 'AI生成代码', desc: '描述需求让AI生成代码' },
      { step: 3, title: '调试优化', desc: 'AI辅助调试和优化' },
      { step: 4, title: '测试部署', desc: '运行测试并部署' }
    ])
  }
]

// 工具数据
const tools = [
  // 写作相关工具
  {
    name: 'ChatGPT',
    icon: '💬',
    description: 'OpenAI开发的AI对话工具，适合日常问答和内容创作',
    price: '免费/付费',
    difficulty: '入门',
    scenes: 'ai-entry,office-writing',
    features: '对话、写作、编程',
    network: '需要VPN'
  },
  {
    name: 'Claude',
    icon: '🧠',
    description: 'Anthropic推出的AI助手，长文本处理能力强',
    price: '免费/付费',
    difficulty: '进阶',
    scenes: 'ai-entry,office-writing,learn-coding',
    features: '长文本、编程、分析',
    network: '需要VPN'
  },
  {
    name: 'Kimi',
    icon: '🦊',
    description: '月之暗面推出的中文AI助手，超长上下文',
    price: '免费',
    difficulty: '入门',
    scenes: 'ai-entry,office-writing',
    features: '长文本、中文优化',
    network: '国内可直接访问'
  },
  {
    name: '文心一言',
    icon: '🔥',
    description: '百度推出的中文AI助手，文学创作能力强',
    price: '免费',
    difficulty: '入门',
    scenes: 'ai-entry,office-writing',
    features: '中文创作、知识问答',
    network: '国内可直接访问'
  },
  // 图像相关工具
  {
    name: 'Midjourney',
    icon: '🎨',
    description: 'AI图像生成标杆，画质最高',
    price: '付费',
    difficulty: '进阶',
    scenes: 'create-image',
    features: '艺术创作、概念设计',
    network: '需要VPN'
  },
  {
    name: 'DALL-E 3',
    icon: '🖼️',
    description: 'OpenAI图像生成，GPT集成更智能',
    price: '付费',
    difficulty: '入门',
    scenes: 'create-image',
    features: '图像生成、编辑',
    network: '需要VPN'
  },
  {
    name: 'Stable Diffusion',
    icon: '⚡',
    description: '开源本地运行，可自定义模型',
    price: '免费',
    difficulty: '进阶',
    scenes: 'create-image',
    features: '本地部署、自定义',
    network: '本地运行'
  },
  // 编程相关工具
  {
    name: 'GitHub Copilot',
    icon: '💻',
    description: '微软AI编程助手，代码补全能力强',
    price: '付费',
    difficulty: '入门',
    scenes: 'learn-coding',
    features: '代码补全、调试',
    network: '需要VPN'
  },
  {
    name: 'Cursor',
    icon: '📝',
    description: 'AI编程IDE，基于VS Code',
    price: '免费/付费',
    difficulty: '入门',
    scenes: 'learn-coding',
    features: '代码编辑、AI对话',
    network: '需要VPN'
  }
]

async function main() {
  console.log('开始添加数据...')
  
  // 添加工具数据
  for (const tool of tools) {
    try {
      await client.execute({
        sql: `INSERT OR REPLACE INTO tools (name, icon, description, price, difficulty, scenes, features, network) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [tool.name, tool.icon, tool.description, tool.price, tool.difficulty, tool.scenes, tool.features, tool.network]
      })
      console.log(`✓ 添加工具: ${tool.name}`)
    } catch (err) {
      console.error(`✗ 添加工具失败: ${tool.name}`, err.message)
    }
  }
  
  // 添加工作流数据
  for (const wf of workflows) {
    try {
      await client.execute({
        sql: `INSERT OR REPLACE INTO workflows (category_id, title, description, steps) VALUES (?, ?, ?, ?)`,
        args: [wf.category_id, wf.title, wf.description, wf.steps]
      })
      console.log(`✓ 添加工作流: ${wf.title}`)
    } catch (err) {
      console.error(`✗ 添加工作流失败: ${wf.title}`, err.message)
    }
  }
  
  console.log('数据添加完成!')
}

main()
