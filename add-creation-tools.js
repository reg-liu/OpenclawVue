import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN })

// 创作分类的工具数据
const creationTools = [
  // 视频编辑
  { name: 'Topaz Labs', icon: '💎', description: 'AI-enhanced photo and video editing with local, secure processing.', url: 'https://www.topazlabs.com/', price: 'Paid', rating: 4.8, category_id: 'ai-creation', subcategory_id: 'video-tools', features: 'AI Video Enhancement, Photo Editing', pros: 'High Quality, Local Processing', cons: 'One-time Purchase' },
  { name: 'DaVinci Resolve', icon: '🎬', description: 'Unify editing, color, VFX, and audio post-production.', url: 'https://www.blackmagicdesign.com/products/davinciresolve/', price: 'Freemium', rating: 4.9, category_id: 'ai-creation', subcategory_id: 'video-tools', features: 'Professional Editing, Color Grading', pros: 'Free Version, Professional Quality', cons: 'Steep Learning Curve' },
  { name: 'Adobe Premiere Pro', icon: '🎥', description: 'Transform videos with AI, edit, mix audio, and color grade.', url: 'https://www.adobe.com/products/premiere.html', price: 'Paid', rating: 4.7, category_id: 'ai-creation', subcategory_id: 'video-tools', features: 'Professional Video Editing, AI Features', pros: 'Industry Standard', cons: 'Subscription Required' },
  { name: 'CapCut', icon: '✂️', description: 'Advanced video editing with AI-driven features and effects.', url: 'https://www.capcut.com/', price: 'Freemium', rating: 4.6, category_id: 'ai-creation', subcategory_id: 'video-tools', features: 'AI Editing, Templates, Effects', pros: 'Free and Feature-rich', cons: 'Mobile-focused' },
  { name: 'Filmora', icon: '🎞️', description: 'Easy-to-use video editing software for creators of all levels.', url: 'https://filmora.wondershare.com/', price: 'Free Trial', rating: 4.5, category_id: 'ai-creation', subcategory_id: 'video-tools', features: 'AI Editing, Templates, Easy Interface', pros: 'Beginner Friendly', cons: 'Limited Advanced Features' },
  { name: 'Synthesia', icon: '🎭', description: 'AI-powered platform for quick, multilingual video creation.', url: 'https://www.synthesia.io/', price: 'Paid', rating: 4.7, category_id: 'ai-creation', subcategory_id: 'video-tools', features: 'AI Avatars, Text-to-Video', pros: 'Professional Results', cons: 'Premium Pricing' },
  { name: 'Pictory', icon: '📹', description: 'Transform text into polished videos effortlessly.', url: 'https://pictory.ai/', price: 'Free Trial', rating: 4.5, category_id: 'ai-creation', subcategory_id: 'video-tools', features: 'Text-to-Video, Video Editing', pros: 'Easy to Use', cons: 'Limited Customization' },
  { name: 'invideo AI', icon: '🎬', description: 'Effortlessly transform text into dynamic, full-length videos.', url: 'https://invideo.io/', price: 'Freemium', rating: 4.6, category_id: 'ai-creation', subcategory_id: 'video-tools', features: 'AI Video Generation, Templates', pros: 'Fast Generation', cons: 'Watermark in Free' },
  { name: 'Lumen5', icon: '📺', description: 'Transform text into dynamic videos using AI.', url: 'https://lumen5.com/', price: 'Freemium', rating: 4.4, category_id: 'ai-creation', subcategory_id: 'video-tools', features: 'Text-to-Video, Social Media', pros: 'Content Marketing Tool', cons: 'Limited Video Quality' },

  // 图像生成
  { name: 'Midjourney', icon: '🖼️', description: 'Create stunning AI artwork and images from text prompts.', url: 'https://www.midjourney.com/', price: 'Freemium', rating: 4.9, category_id: 'ai-creation', subcategory_id: 'image-tools', features: 'Text-to-Image, Style Transfer', pros: 'Stunning Results', cons: 'Requires Discord' },
  { name: 'DALL-E', icon: '🎨', description: 'OpenAI image generation from text descriptions.', url: 'https://openai.com/dall-e-3', price: 'Paid', rating: 4.8, category_id: 'ai-creation', subcategory_id: 'image-tools', features: 'Text-to-Image, Inpainting', pros: 'High Quality', cons: 'Credit-based Pricing' },
  { name: 'Stable Diffusion', icon: '⚡', description: 'Open-source AI image generation model.', url: 'https://stability.ai/stable-diffusion', price: 'Freemium', rating: 4.7, category_id: 'ai-creation', subcategory_id: 'image-tools', features: 'Text-to-Image, Local Deployment', pros: 'Free, Customizable', cons: 'Technical Setup Required' },
  { name: 'Adobe Firefly', icon: '🔥', description: 'AI-powered creative generative models for images.', url: 'https://www.adobe.com/firefly.html', price: 'Freemium', rating: 4.6, category_id: 'ai-creation', subcategory_id: 'image-tools', features: 'Text-to-Image, Generative Fill', pros: 'Adobe Integration', cons: 'Limited Free Usage' },
  { name: 'Leonardo.ai', icon: '🎯', description: 'AI-powered platform for creating stunning visuals.', url: 'https://leonardo.ai/', price: 'Freemium', rating: 4.6, category_id: 'ai-creation', subcategory_id: 'image-tools', features: 'Text-to-Image, Canvas', pros: 'Feature-rich', cons: 'Credit System' },
  { name: 'Runway', icon: '🏃', description: 'AI creative tools for video, image, and audio generation.', url: 'https://runwayml.com/', price: 'Freemium', rating: 4.7, category_id: 'ai-creation', subcategory_id: 'image-tools', features: 'Video Editing, Image Generation', pros: 'Comprehensive Tool', cons: 'Subscription for Pro' },

  // 音频处理
  { name: 'Murf AI', icon: '🎙️', description: 'Studio-quality voiceovers with AI-powered voice synthesis.', url: 'https://murf.ai/', price: 'Freemium', rating: 4.5, category_id: 'ai-creation', subcategory_id: 'audio-tools', features: 'AI Voiceover, Voice Cloning', pros: 'Natural Voices', cons: 'Limited Free Minutes' },
  { name: 'ElevenLabs', icon: '🔊', description: 'AI voice generator with lifelike speech synthesis.', url: 'https://elevenlabs.io/', price: 'Freemium', rating: 4.8, category_id: 'ai-creation', subcategory_id: 'audio-tools', features: 'Voice Cloning, Multilingual', pros: 'Ultra-realistic Voices', cons: 'Credit-based' },
  { name: 'Audo AI', icon: '🎧', description: 'AI-powered audio cleaning and enhancement tool.', url: 'https://audo.ai/', price: 'Freemium', rating: 4.3, category_id: 'ai-creation', subcategory_id: 'audio-tools', features: 'Audio Cleaning, Enhancement', pros: 'Automatic Cleanup', cons: 'Limited Free Usage' },
  { name: 'Lovo.ai', icon: '🔈', description: 'AI voice generator and text-to-speech platform.', url: 'https://lovo.ai/', price: 'Freemium', rating: 4.4, category_id: 'ai-creation', subcategory_id: 'audio-tools', features: 'Voice Generation, Text-to-Speech', pros: 'Multiple Languages', cons: 'Premium for Best Voices' },
  { name: 'WellSaid Labs', icon: '💬', description: 'AI text-to-speech with realistic voice avatars.', url: 'https://wellsaidlabs.com/', price: 'Paid', rating: 4.6, category_id: 'ai-creation', subcategory_id: 'audio-tools', features: 'Realistic Voices, Corporate Training', pros: 'Professional Quality', cons: 'No Free Version' },
  { name: 'Boomy', icon: '🎵', description: 'Create original songs with AI in seconds.', url: 'https://boomy.com/', price: 'Freemium', rating: 4.2, category_id: 'ai-creation', subcategory_id: 'audio-tools', features: 'AI Music Generation', pros: 'Create Original Music', cons: 'Royalty Sharing' },
  { name: 'AIVA', icon: '🎼', description: 'AI-powered music composition tool for creators.', url: 'https://aiva.ai/', price: 'Freemium', rating: 4.4, category_id: 'ai-creation', subcategory_id: 'audio-tools', features: 'Music Composition, Customizable', pros: 'Professional Music', cons: 'Premium for Full Rights' },

  // 文本创作
  { name: 'ChatGPT', icon: '💬', description: 'OpenAI advanced AI chatbot for text generation.', url: 'https://chat.openai.com/', price: 'Freemium', rating: 4.9, category_id: 'ai-creation', subcategory_id: 'text-tools', features: 'Text Generation, Coding, Analysis', pros: 'Versatile, Free to Use', cons: 'Premium for GPT-4' },
  { name: 'Claude', icon: '🧠', description: 'Anthropic AI assistant for thoughtful, capable AI.', url: 'https://claude.ai/', price: 'Freemium', rating: 4.8, category_id: 'ai-creation', subcategory_id: 'text-tools', features: 'Long-form Analysis, Writing, Coding', pros: 'Thoughtful Responses', cons: 'Limited Free Usage' },
  { name: 'Jasper', icon: '📝', description: 'AI writing assistant for marketing and content.', url: 'https://jasper.ai/', price: 'Paid', rating: 4.5, category_id: 'ai-creation', subcategory_id: 'text-tools', features: 'Content Writing, Marketing Copy', pros: 'Marketing-focused', cons: 'Subscription Required' },
  { name: 'Copy.ai', icon: '📄', description: 'AI-powered copywriting tool for marketers.', url: 'https://www.copy.ai/', price: 'Freemium', rating: 4.3, category_id: 'ai-creation', subcategory_id: 'text-tools', features: 'Copywriting, Marketing Content', pros: 'Fast Content Generation', cons: 'Limited Free Credits' },
  { name: 'Notion AI', icon: '📒', description: 'AI assistant integrated into Notion workspace.', url: 'https://www.notion.so/product/ai', price: 'Paid', rating: 4.6, category_id: 'ai-creation', subcategory_id: 'text-tools', features: 'Writing Assistant, Summarization', pros: 'Integrated Workspace', cons: 'Add-on Required' },
  { name: 'Writesonic', icon: '✍️', description: 'AI writing platform for content creation.', url: 'https://writesonic.com/', price: 'Freemium', rating: 4.4, category_id: 'ai-creation', subcategory_id: 'text-tools', features: 'Article Writing, SEO, Ad Copy', pros: 'Wide Range of Content', cons: 'Credit System' },
  { name: 'Kimi', icon: '🌙', description: 'AI assistant from Moonchat for intelligent assistance.', url: 'https://kimi.moonshot.cn/', price: 'Free', rating: 4.5, category_id: 'ai-creation', subcategory_id: 'text-tools', features: 'Conversation, Writing, Research', pros: 'Free, Chinese Optimized', cons: 'Limited to Chinese' }
]

async function main() {
  await client.execute({sql: "DELETE FROM tools WHERE category_id = 'ai-creation'", args: []})
  console.log('Cleared existing creation tools')
  
  for (const tool of creationTools) {
    await client.execute({
      sql: `INSERT INTO tools (name, icon, description, url, price, rating, category_id, subcategory_id, features, pros, cons) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [tool.name, tool.icon, tool.description, tool.url, tool.price, tool.rating, tool.category_id, tool.subcategory_id, tool.features || '', tool.pros || '', tool.cons || '']
    })
    console.log(`Added: ${tool.name} (${tool.subcategory_id})`)
  }
  
  const result = await client.execute({sql: "SELECT subcategory_id, COUNT(*) as cnt FROM tools WHERE category_id = 'ai-creation' GROUP BY subcategory_id", args: []})
  console.log('\n=== Creation Tools Summary ===')
  result.rows.forEach(r => console.log(`  ${r.subcategory_id}: ${r.cnt} tools`))
  console.log(`\nTotal: ${creationTools.length} tools`)
}

main()
