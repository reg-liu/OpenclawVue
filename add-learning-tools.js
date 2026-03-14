import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN })

// 学习分类的工具数据
const learningTools = [
  // 教育工具
  { name: 'Unreal Speech', icon: '🎙️', description: 'Transform text into lifelike, customizable voiceovers effortlessly.', url: 'https://unrealspeech.com/', price: 'Freemium', rating: 5.0, category_id: 'ai-learning', subcategory_id: 'education-tools', features: 'Text-to-Speech, Voice Customization, Multiple Languages', pros: 'High Quality Output, Customizable', cons: 'Limited Free Version' },
  { name: 'Grammarly', icon: '✏️', description: 'Elevate writing with real-time grammar, tone, and plagiarism checks.', url: 'https://www.grammarly.com/', price: 'Freemium', rating: 4.8, category_id: 'ai-learning', subcategory_id: 'education-tools', features: 'Grammar Check, Tone Detection, Plagiarism Checker', pros: 'Comprehensive Checking, Real-time Feedback', cons: 'Premium Required' },
  { name: 'Coursera', icon: '🎓', description: 'Unlock learning: courses, degrees, and certificates online.', url: 'https://www.coursera.org/', price: 'Paid', rating: 4.7, category_id: 'ai-learning', subcategory_id: 'education-tools', features: 'Online Courses, Degrees, Certificates', pros: 'Wide Range of Courses, Accredited', cons: 'Certificate Costs' },
  { name: 'Duolingo', icon: '🦉', description: 'Master new languages with gamified, personalized learning.', url: 'https://www.duolingo.com/', price: 'Freemium', rating: 4.9, category_id: 'ai-learning', subcategory_id: 'education-tools', features: 'Language Learning, Gamification, Personalized Path', pros: 'Fun and Engaging, Free to Start', cons: 'Premium Required' },
  { name: 'TutorAI', icon: '📚', description: 'AI-driven, personalized, and interactive learning for all.', url: 'https://www.tutorai.me/', price: 'Freemium', rating: 4.2, category_id: 'ai-learning', subcategory_id: 'education-tools', features: 'Interactive Learning, Personalized tutoring, Multiple Subjects', pros: 'Personalized Attention, Convenient', cons: 'Limited Free Usage' },
  { name: 'Socratic by Google', icon: '🔍', description: 'Unlock learning with AI: visual aids, diverse subjects, free educational support.', url: 'https://socratic.org/', price: 'Free', rating: 4.5, category_id: 'ai-learning', subcategory_id: 'education-tools', features: 'Visual Learning, Multiple Subjects, Free Access', pros: 'Completely Free, Google-powered', cons: 'Limited Advanced Topics' },
  { name: 'Adobe Podcast', icon: '🎧', description: 'Upgrade your audio with powerful web-based enhancements and tools.', url: 'https://podcast.adobe.com/', price: 'Free', rating: 4.3, category_id: 'ai-learning', subcategory_id: 'education-tools', features: 'Audio Enhancement, Recording, Editing', pros: 'Free and Powerful', cons: 'Requires Adobe Account' },
  
  // 研究助手
  { name: 'PaperBrain', icon: '📄', description: 'Transform academic research with AI-driven summarization.', url: 'https://paperbrain.org/', price: 'Free', rating: 4.0, category_id: 'ai-learning', subcategory_id: 'research-tools', features: 'Paper Summarization, Literature Management', pros: 'Free Access, Efficient Research', cons: 'Limited Features' },
  { name: 'JungleAI', icon: '🌴', description: 'Generate instant flashcards and questions from any study material.', url: 'https://jungleai.com/', price: 'Freemium', rating: 4.5, category_id: 'ai-learning', subcategory_id: 'research-tools', features: 'Flashcard Generation, Quiz Creation', pros: 'Time-Saving, Effective Learning', cons: 'Premium Features' },
  { name: 'Kahi AI', icon: '🔬', description: 'AI-powered research assistant for academic papers and literature review.', url: 'https://kahi.ai/', price: 'Freemium', rating: 4.4, category_id: 'ai-learning', subcategory_id: 'research-tools', features: 'Literature Review, Paper Analysis', pros: 'Research-focused, Time-saving', cons: 'Learning Curve' },
  { name: 'ScholarAI', icon: '🎓', description: 'AI assistant for academic research, paper writing, and knowledge discovery.', url: 'https://scholarai.io/', price: 'Freemium', rating: 4.3, category_id: 'ai-learning', subcategory_id: 'research-tools', features: 'Research Assistant, Paper Writing', pros: 'Comprehensive Research Tool', cons: 'Premium for Full Access' },
  { name: 'Elicit', icon: '💡', description: 'AI research assistant that automates literature review and synthesis.', url: 'https://elicit.org/', price: 'Freemium', rating: 4.6, category_id: 'ai-learning', subcategory_id: 'research-tools', features: 'Automated Literature Review, Paper Summarization', pros: 'Automation, Accurate', cons: 'Limited Free Queries' },
  { name: 'Consensus', icon: '✅', description: 'AI-powered search engine for scientific research and insights.', url: 'https://consensus.app/', price: 'Freemium', rating: 4.5, category_id: 'ai-learning', subcategory_id: 'research-tools', features: 'Scientific Search, Consensus Finding', pros: 'Evidence-based, Search Quality', cons: 'Limited Free Access' },
  
  // 学生工具
  { name: 'Quizlet', icon: '📝', description: 'AI-powered learning tools for students: flashcards, quizzes, and games.', url: 'https://quizlet.com/', price: 'Freemium', rating: 4.7, category_id: 'ai-learning', subcategory_id: 'student-tools', features: 'Flashcards, Quizzes, Games, Study Modes', pros: 'Comprehensive Study Tool, Free to Use', cons: 'Premium for AI Features' },
  { name: 'Chegg', icon: '📖', description: 'AI-powered tutoring and homework help for students.', url: 'https://www.chegg.com/', price: 'Paid', rating: 4.2, category_id: 'ai-learning', subcategory_id: 'student-tools', features: 'Tutoring, Homework Help, Exam Prep', pros: 'Expert Tutors, Comprehensive Help', cons: 'Subscription Required' },
  { name: 'Khan Academy', icon: '🏫', description: 'Free online courses, lessons and practice for students.', url: 'https://www.khanacademy.org/', price: 'Free', rating: 4.9, category_id: 'ai-learning', subcategory_id: 'student-tools', features: 'Free Courses, Practice Exercises, Personalized Learning', pros: 'Completely Free, High Quality', cons: 'Limited Advanced Courses' },
  { name: 'Canva for Education', icon: '🎨', description: 'Design tool for students and educators with education features.', url: 'https://www.canva.com/education/', price: 'Free', rating: 4.8, category_id: 'ai-learning', subcategory_id: 'student-tools', features: 'Design Tools, Templates, Team Collaboration', pros: 'Easy to Use, Free for Education', cons: 'Advanced Features Need Pro' },
  { name: 'Notion', icon: '📒', description: 'All-in-one workspace for notes, docs, and student projects.', url: 'https://www.notion.so/', price: 'Freemium', rating: 4.6, category_id: 'ai-learning', subcategory_id: 'student-tools', features: 'Note-taking, Project Management, Collaboration', pros: 'Versatile, Free for Students', cons: 'Learning Curve' },
  { name: 'Otter.ai', icon: '🦦', description: 'AI note-taking and transcription for lectures and meetings.', url: 'https://otter.ai/', price: 'Freemium', rating: 4.4, category_id: 'ai-learning', subcategory_id: 'student-tools', features: 'Note-taking, Transcription, Summarization', pros: 'Real-time Notes, Time-saving', cons: 'Limited Free Minutes' },
  { name: 'Perplexity', icon: '🔮', description: 'AI-powered search and answer engine for research and learning.', url: 'https://www.perplexity.ai/', price: 'Freemium', rating: 4.7, category_id: 'ai-learning', subcategory_id: 'student-tools', features: 'AI Search, Research Assistant, Instant Answers', pros: 'Fast Answers, Reliable Sources', cons: 'Premium for Advanced Features' }
]

async function main() {
  await client.execute({sql: "DELETE FROM tools WHERE category_id = 'ai-learning'", args: []})
  console.log('Cleared existing learning tools')
  
  for (const tool of learningTools) {
    await client.execute({
      sql: `INSERT INTO tools (name, icon, description, url, price, rating, category_id, subcategory_id, features, pros, cons) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [tool.name, tool.icon, tool.description, tool.url, tool.price, tool.rating, tool.category_id, tool.subcategory_id, tool.features || '', tool.pros || '', tool.cons || '']
    })
    console.log(`Added: ${tool.name} (${tool.subcategory_id})`)
  }
  
  const result = await client.execute({sql: "SELECT subcategory_id, COUNT(*) as cnt FROM tools WHERE category_id = 'ai-learning' GROUP BY subcategory_id", args: []})
  console.log('\n=== Learning Tools Summary ===')
  result.rows.forEach(r => console.log(`  ${r.subcategory_id}: ${r.cnt} tools`))
  console.log(`\nTotal: ${learningTools.length} tools`)
}

main()
