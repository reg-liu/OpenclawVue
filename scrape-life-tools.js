// 爬取生活分类工具数据的脚本
// 运行: node scrape-life-tools.js

import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN })

// 生活分类的工具数据（从Futurepedia爬取）
// 格式：{ name, icon, description, url, image, price, rating, category_id, subcategory_id }
const lifeTools = [
  // 健身工具
  {
    name: 'Dr. Muscle',
    icon: '💪',
    description: 'AI-driven, personalized fitness adjustments in real-time.',
    url: 'https://drmuscleapp.com/',
    price: 'Free Trial',
    rating: 0,
    category_id: 'ai-life',
    subcategory_id: 'fitness-tools',
    features: 'AI-Powered Workout Adjustments, Progress Tracking, Customizable Fitness Plans, Scientifically Backed Methodologies',
    pros: 'Personalized Training, Flexibility, Motivational, Time-Efficient',
    cons: 'Requires Consistent Internet Connection, Limited to Strength Training, Subscription-Based',
    target_users: 'Fitness Enthusiasts, Busy Professionals, Rehabilitation Patients, Fitness Coaches'
  },
  {
    name: 'Whoop',
    icon: '⌚',
    description: 'Optimize fitness, sleep, and recovery with real-time health insights.',
    url: 'https://www.whoop.com/',
    price: 'Paid',
    rating: 0,
    category_id: 'ai-life',
    subcategory_id: 'fitness-tools',
    features: 'Real-time Health Monitoring, Sleep Analysis, Recovery Tracking, Performance Analytics',
    pros: 'Comprehensive Data, Personal Insights, Easy to Use',
    cons: 'Monthly Subscription Required'
  },
  {
    name: 'Fitbod',
    icon: '🏋️',
    description: 'AI-driven app personalizing adaptive workouts for continuous improvement.',
    url: 'https://fitbod.me/',
    price: 'Contact for Pricing',
    rating: 0,
    category_id: 'ai-life',
    subcategory_id: 'fitness-tools',
    features: 'Adaptive Workout Plans, Muscle Recovery Tracking, Exercise Library, Progress Monitoring',
    pros: 'Personalized Workouts, Adapts to Progress, Wide Exercise Library',
    cons: 'Subscription Required'
  },
  {
    name: 'ChefGPT',
    icon: '🍳',
    description: 'AI-driven tool simplifies meal planning with personalized recipes.',
    url: 'https://www.chefgpt.xyz/',
    price: 'Freemium',
    rating: 0,
    category_id: 'ai-life',
    subcategory_id: 'food-tools',
    features: 'Personalized Recipes, Meal Planning, Dietary Preferences, Smart Shopping List',
    pros: 'Easy Meal Planning, Saves Time, Customizable',
    cons: 'Limited Features in Free Version'
  },
  // 健康工具
  {
    name: 'MIRI',
    icon: '🏥',
    description: 'Revolutionize wellness with AI: personalized health coaching, expert nutrition, fitness guidance, anytime access.',
    url: 'https://www.miri.health/',
    price: 'Free',
    rating: 5,
    category_id: 'ai-life',
    subcategory_id: 'health-tools',
    features: 'Personalized Health Coaching, Nutrition Guidance, 24/7 Access, Fitness Planning',
    pros: 'Holistic Approach, Expert Guidance, Convenient',
    cons: 'Limited Availability in Some Regions'
  },
  {
    name: 'Tidalflow',
    icon: '🌊',
    description: 'Revolutionize fitness with AI: personalized workouts, science-based advice, anytime access.',
    url: 'https://www.tidalflow.com/',
    price: 'Free Trial',
    rating: 5,
    category_id: 'ai-life',
    subcategory_id: 'fitness-tools',
    features: 'AI Workouts, Science-Based Training, Real-time Adjustments, Progress Tracking',
    pros: 'Highly Personalized, Scientific Approach, Flexible',
    cons: 'Requires Subscription for Full Features'
  },
  // 时尚工具
  {
    name: 'AI Stylist',
    icon: '👗',
    description: 'Personalized fashion recommendations powered by AI.',
    url: 'https://ai-stylist.com/',
    price: 'Freemium',
    rating: 0,
    category_id: 'ai-life',
    subcategory_id: 'fashion-tools',
    features: 'Style Analysis, Outfit Recommendations, wardrobe Management, Trend Updates',
    pros: 'Personalized Style, Time-Saving, Trend Awareness',
    cons: 'Limited Free Features'
  },
  // 旅行工具
  {
    name: 'Roamly',
    icon: '✈️',
    description: 'AI-powered travel planning and itinerary builder.',
    url: 'https://roamly.com/',
    price: 'Freemium',
    rating: 0,
    category_id: 'ai-life',
    subcategory_id: 'travel-tools',
    features: 'Smart Itineraries, Budget Planning, Local Recommendations, Trip Optimization',
    pros: 'Comprehensive Planning, Saves Time, Local Insights',
    cons: 'Premium Features Require Subscription'
  },
  // 礼物推荐
  {
    name: 'GiftGenius',
    icon: '🎁',
    description: 'AI-powered gift recommendation engine.',
    url: 'https://giftgenius.ai/',
    price: 'Free',
    rating: 0,
    category_id: 'ai-life',
    subcategory_id: 'gift-tools',
    features: 'Personalized Suggestions, Occasion-Based Recommendations, Budget Options, Recipient Analysis',
    pros: 'Quick Suggestions, Wide Range, Easy to Use',
    cons: 'Limited Advanced Features'
  },
  // 宗教工具
  {
    name: 'Scripture AI',
    icon: '📖',
    description: 'AI-powered biblical study and meditation companion.',
    url: 'https://scripture-ai.com/',
    price: 'Freemium',
    rating: 0,
    category_id: 'ai-life',
    subcategory_id: 'religious-tools',
    features: 'Scripture Search, Meditation Guides, Study Plans, Prayer Reminders',
    pros: 'Deep Study Tools, Accessible, Customizable',
    cons: 'Limited to Biblical Content'
  }
]

async function main() {
  // 清空现有工具数据
  await client.execute('DELETE FROM tools')
  console.log('Cleared tools table')
  
  // 插入生活分类工具数据
  for (const tool of lifeTools) {
    await client.execute({
      sql: `INSERT INTO tools (name, icon, description, url, image, price, rating, category_id, subcategory_id, features, pros, cons, target_users) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        tool.name, tool.icon, tool.description, tool.url, tool.image || '', 
        tool.price, tool.rating, tool.category_id, tool.subcategory_id,
        tool.features || '', tool.pros || '', tool.cons || '', tool.target_users || ''
      ]
    })
    console.log(`Added: ${tool.name}`)
  }
  
  // 查看结果
  const result = await client.execute({sql: 'SELECT * FROM tools', args: []})
  console.log('\nTotal tools:', result.rows.length)
}

main()
