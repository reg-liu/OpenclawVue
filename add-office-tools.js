import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN })

// 办公分类的工具数据
const officeTools = [
  // 营销工具
  { name: 'Jasper', icon: '📈', description: 'AI writing assistant for marketing teams and content creators.', url: 'https://jasper.ai/', price: 'Paid', rating: 4.7, category_id: 'ai-office', subcategory_id: 'marketing-tools', features: 'AI Writing, Marketing Copy, SEO, Templates', pros: 'Marketing-focused, Templates', cons: 'Subscription Required' },
  { name: 'Copy.ai', icon: '📝', description: 'AI-powered copywriting tool for marketers and businesses.', url: 'https://www.copy.ai/', price: 'Freemium', rating: 4.5, category_id: 'ai-office', subcategory_id: 'marketing-tools', features: 'Copywriting, Ad Copy, Product Descriptions', pros: 'Fast Generation', cons: 'Limited Free Credits' },
  { name: 'Writesonic', icon: '✍️', description: 'AI writing platform for articles, ads, and websites.', url: 'https://writesonic.com/', price: 'Freemium', rating: 4.4, category_id: 'ai-office', subcategory_id: 'marketing-tools', features: 'Article Writing, SEO, Ads', pros: 'Wide Range', cons: 'Credit System' },
  { name: 'Anyword', icon: '📊', description: 'AI copywriting tool with predictive performance scores.', url: 'https://anyword.com/', price: 'Freemium', rating: 4.3, category_id: 'ai-office', subcategory_id: 'marketing-tools', features: 'Copywriting, Predictive Scores, A/B Testing', pros: 'Data-driven', cons: 'Limited Free Usage' },
  { name: 'CopyMonkey', icon: '🐒', description: 'AI-powered Amazon listing optimization tool.', url: 'https://copymonkey.ai/', price: 'Paid', rating: 4.2, category_id: 'ai-office', subcategory_id: 'marketing-tools', features: 'Amazon Listings, SEO, Product Descriptions', pros: 'Amazon Focused', cons: 'Niche Tool' },
  { name: 'Ocoya', icon: '🛒', description: 'AI-powered platform for social media content creation.', url: 'https://ocoya.com/', price: 'Freemium', rating: 4.4, category_id: 'ai-office', subcategory_id: 'marketing-tools', features: 'Social Media, Scheduling, Content Creation', pros: 'All-in-One Social', cons: 'Learning Curve' },
  { name: 'Adcreative.ai', icon: '🎯', description: 'Generate ad creatives with AI for better conversions.', url: 'https://www.adcreative.ai/', price: 'Freemium', rating: 4.5, category_id: 'ai-office', subcategory_id: 'marketing-tools', features: 'Ad Creatives, Banner Generation, Optimization', pros: 'Conversion-focused', cons: 'Credit System' },

  // 编程工具
  { name: 'GitHub Copilot', icon: '💻', description: 'AI pair programmer for code suggestions and autocompletion.', url: 'https://github.com/features/copilot', price: 'Paid', rating: 4.8, category_id: 'ai-office', subcategory_id: 'programming-tools', features: 'Code Completion, Suggestions, Multi-language', pros: 'Industry Standard', cons: 'Subscription Required' },
  { name: 'Amazon CodeWhisperer', icon: '🔧', description: 'AI coding companion for faster development.', url: 'https://aws.amazon.com/codewhisperer/', price: 'Free', rating: 4.5, category_id: 'ai-office', subcategory_id: 'programming-tools', features: 'Code Suggestions, Security Scanning', pros: 'Free, AWS Integration', cons: 'Limited Languages' },
  { name: 'Cursor', icon: '📝', description: 'AI-first code editor for pair programming.', url: 'https://cursor.sh/', price: 'Freemium', rating: 4.7, category_id: 'ai-office', subcategory_id: 'programming-tools', features: 'Code Editor, AI Chat, Refactoring', pros: 'VS Code Fork', cons: 'Limited Free Usage' },
  { name: 'Codeium', icon: '⚡', description: 'Free AI-powered code completion and chat.', url: 'https://codeium.com/', price: 'Free', rating: 4.6, category_id: 'ai-office', subcategory_id: 'programming-tools', features: 'Code Completion, Chat, Enterprise', pros: 'Completely Free', cons: 'Less Features than Copilot' },
  { name: 'Tabnine', icon: '🔵', description: 'AI code assistant for faster programming.', url: 'https://www.tabnine.com/', price: 'Freemium', rating: 4.4, category_id: 'ai-office', subcategory_id: 'programming-tools', features: 'Code Completion, Local Processing', pros: 'Local Option', cons: 'Limited AI Features' },
  { name: 'MutableAI', icon: '🧪', description: 'AI-accelerated development platform.', url: 'https://mutable.ai/', price: 'Freemium', rating: 4.3, category_id: 'ai-office', subcategory_id: 'programming-tools', features: 'Code Generation, Refactoring, Testing', pros: 'Fast Development', cons: 'Beta' },
  { name: 'Mintlify', icon: '📚', description: 'AI-powered documentation writer.', url: 'https://mintlify.com/', price: 'Freemium', rating: 4.4, category_id: 'ai-office', subcategory_id: 'programming-tools', features: 'Documentation, Auto-generation, Integration', pros: 'Auto Documentation', cons: 'Setup Required' },

  // 办公效率
  { name: 'Notion AI', icon: '📒', description: 'AI assistant integrated into Notion workspace.', url: 'https://www.notion.so/product/ai', price: 'Paid', rating: 4.7, category_id: 'ai-office', subcategory_id: 'office-tools', features: 'Writing, Summarization, Brainstorming', pros: 'Integrated Workspace', cons: 'Add-on Required' },
  { name: 'Microsoft 365 Copilot', icon: '📊', description: 'AI assistant for Microsoft Office apps.', url: 'https://www.microsoft.com/en-us/microsoft-365/copilot', price: 'Paid', rating: 4.6, category_id: 'ai-office', subcategory_id: 'office-tools', features: 'Excel, Word, PowerPoint AI', pros: 'Office Integration', cons: 'Expensive' },
  { name: 'Grammarly', icon: '✏️', description: 'AI writing assistant for clear, error-free writing.', url: 'https://www.grammarly.com/', price: 'Freemium', rating: 4.8, category_id: 'ai-office', subcategory_id: 'office-tools', features: 'Grammar, Spelling, Tone, Plagiarism', pros: 'Comprehensive', cons: 'Premium for Advanced' },
  { name: 'Otter.ai', icon: '🦦', description: 'AI meeting assistant for notes and transcriptions.', url: 'https://otter.ai/', price: 'Freemium', rating: 4.5, category_id: 'ai-office', subcategory_id: 'office-tools', features: 'Meeting Notes, Transcription, Summaries', pros: 'Real-time Notes', cons: 'Limited Free Minutes' },
  { name: 'Clockwise', icon: '🕐', description: 'AI-powered calendar optimization for meetings.', url: 'https://www.clockwise.software/', price: 'Freemium', rating: 4.3, category_id: 'ai-office', subcategory_id: 'office-tools', features: 'Calendar Scheduling, Meeting Optimization', pros: 'Saves Time', cons: 'Limited Free Usage' },
  { name: 'Beautiful.ai', icon: '🎨', description: 'AI-powered presentation software.', url: 'https://www.beautiful.ai/', price: 'Freemium', rating: 4.4, category_id: 'ai-office', subcategory_id: 'office-tools', features: 'AI Presentations, Templates, Design', pros: 'Beautiful Slides', cons: 'Premium Features' },
  { name: 'Tome', icon: '📖', description: 'AI storytelling tool for presentations.', url: 'https://tome.app/', price: 'Freemium', rating: 4.5, category_id: 'ai-office', subcategory_id: 'office-tools', features: 'AI Presentations, Storytelling, Templates', pros: 'Creative Presentations', cons: 'Limited Free Usage' },

  // 自动化工具
  { name: 'Zapier', icon: '⚡', description: 'Automate workflows with AI-powered integrations.', url: 'https://zapier.com/', price: 'Freemium', rating: 4.6, category_id: 'ai-office', subcategory_id: 'automation-tools', features: 'Workflow Automation, Integrations, AI', pros: '5000+ Apps', cons: 'Complex for Beginners' },
  { name: 'Make (Integromat)', icon: '🔄', description: 'Visual automation platform with AI capabilities.', url: 'https://www.make.com/', price: 'Freemium', rating: 4.5, category_id: 'ai-office', subcategory_id: 'automation-tools', features: 'Visual Automation, AI, Integrations', pros: 'Visual Interface', cons: 'Learning Curve' },
  { name: 'Bardeen', icon: '🎯', description: 'AI-powered automation for repetitive tasks.', url: 'https://www.bardeen.ai/', price: 'Freemium', rating: 4.4, category_id: 'ai-office', subcategory_id: 'automation-tools', features: 'Workflow Automation, Scraping, AI', pros: 'AI-powered Automation', cons: 'Limited Free Usage' },
  { name: 'Raycast', icon: '🚀', description: 'AI-powered launcher and productivity tool for Mac.', url: 'https://www.raycast.com/', price: 'Freemium', rating: 4.7, category_id: 'ai-office', subcategory_id: 'automation-tools', features: 'Productivity, Automation, AI Chat', pros: 'Mac Essential', cons: 'Mac Only' },
  { name: 'Alfred', icon: '🔍', description: 'Productivity app for Mac with AI features.', url: 'https://www.alfredapp.com/', price: 'Freemium', rating: 4.5, category_id: 'ai-office', subcategory_id: 'automation-tools', features: 'Launcher, Workflows, AI', pros: 'Mac Power User', cons: 'Mac Only' },
  { name: 'TextBlaze', icon: '📋', description: 'AI-powered text expansion and snippets.', url: 'https://blaze.today/', price: 'Freemium', rating: 4.2, category_id: 'ai-office', subcategory_id: 'automation-tools', features: 'Text Expansion, Templates, Snippets', pros: 'Saves Typing', cons: 'Limited Free Usage' }
]

async function main() {
  await client.execute({sql: "DELETE FROM tools WHERE category_id = 'ai-office'", args: []})
  console.log('Cleared existing office tools')
  
  for (const tool of officeTools) {
    await client.execute({
      sql: `INSERT INTO tools (name, icon, description, url, price, rating, category_id, subcategory_id, features, pros, cons) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [tool.name, tool.icon, tool.description, tool.url, tool.price, tool.rating, tool.category_id, tool.subcategory_id, tool.features || '', tool.pros || '', tool.cons || '']
    })
    console.log(`Added: ${tool.name} (${tool.subcategory_id})`)
  }
  
  const result = await client.execute({sql: "SELECT subcategory_id, COUNT(*) as cnt FROM tools WHERE category_id = 'ai-office' GROUP BY subcategory_id", args: []})
  console.log('\n=== Office Tools Summary ===')
  result.rows.forEach(r => console.log(`  ${r.subcategory_id}: ${r.cnt} tools`))
  console.log(`\nTotal: ${officeTools.length} tools`)
}

main()
