import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN })

// 完整的生活分类工具数据
const lifeTools = [
  // === 健身工具 (fitness-tools) ===
  { name: 'Dr. Muscle', icon: '💪', description: 'AI-driven, personalized fitness adjustments in real-time.', url: 'https://drmuscleapp.com/', price: 'Free Trial', rating: 4.5, category_id: 'ai-life', subcategory_id: 'fitness-tools', features: 'AI-Powered Workout Adjustments, Progress Tracking, Customizable Fitness Plans', pros: 'Personalized Training, Flexibility, Motivating', cons: 'Requires Internet, Subscription-Based' },
  { name: 'Whoop', icon: '⌚', description: 'Optimize fitness, sleep, and recovery with real-time health insights.', url: 'https://www.whoop.com/', price: 'Paid', rating: 4.8, category_id: 'ai-life', subcategory_id: 'fitness-tools', features: 'Real-time Health Monitoring, Sleep Analysis, Recovery Tracking', pros: 'Comprehensive Data, Personal Insights', cons: 'Monthly Subscription' },
  { name: 'Fitbod', icon: '🏋️', description: 'AI-driven app personalizing adaptive workouts for continuous improvement.', url: 'https://fitbod.me/', price: 'Freemium', rating: 4.3, category_id: 'ai-life', subcategory_id: 'fitness-tools', features: 'Adaptive Workout Plans, Muscle Recovery Tracking, Exercise Library', pros: 'Personalized Workouts, Adapts to Progress', cons: 'Subscription Required' },
  { name: 'Tidalflow', icon: '🌊', description: 'AI-powered fitness with personalized workouts and science-based advice.', url: 'https://www.tidalflow.com/', price: 'Free Trial', rating: 4.6, category_id: 'ai-life', subcategory_id: 'fitness-tools', features: 'AI Workouts, Science-Based Training, Real-time Adjustments', pros: 'Highly Personalized, Scientific Approach', cons: 'Requires Subscription' },
  { name: 'PPLEGPT', icon: '🎯', description: 'Personalize your fitness routine instantly with AI-driven workout generation.', url: 'https://pplegpt.vercel.app/', price: 'Free', rating: 4.0, category_id: 'ai-life', subcategory_id: 'fitness-tools', features: 'Instant Workout Generation, AI Personal Trainer, Exercise Library', pros: 'Easy to Use, Free Access', cons: 'Limited Features' },
  { name: 'GymBuddy AI', icon: '🤖', description: 'AI-driven tool for personalized workout plans and progress tracking.', url: 'https://www.gymbuddy.ai/', price: 'Free Trial', rating: 5.0, category_id: 'ai-life', subcategory_id: 'fitness-tools', features: 'Personalized Workouts, Progress Tracking, Smart Suggestions', pros: 'Great Personalization, Free Trial', cons: 'Limited Free Features' },
  
  // === 健康工具 (health-tools) ===
  { name: 'Docus', icon: '🏥', description: 'AI-driven health platform for personalized insights and expert advice.', url: 'https://docus.ai/', price: 'Freemium', rating: 5.0, category_id: 'ai-life', subcategory_id: 'health-tools', features: 'AI Health Assistant, Expert Consultations, Personalized Health Plan', pros: 'Comprehensive Health Platform, Expert Access', cons: 'Premium Features Paid' },
  { name: 'Woebot Health', icon: '🧠', description: 'AI-driven mental health support with 24/7 accessibility and personalized CBT.', url: 'https://woebothealth.com/', price: 'Free', rating: 4.5, category_id: 'ai-life', subcategory_id: 'health-tools', features: 'Mental Health Support, CBT Conversations, 24/7 Accessibility', pros: 'Free Access, Always Available', cons: 'Limited to Mental Health' },
  { name: 'Endel', icon: '🎵', description: 'Personalized soundscapes for focus, relaxation, and sleep, scientifically crafted.', url: 'https://endel.io/', price: 'Free Trial', rating: 5.0, category_id: 'ai-life', subcategory_id: 'health-tools', features: 'Personalized Soundscapes, Sleep Aid, Focus Enhancement', pros: 'Scientifically Backed, Multiple Modes', cons: 'Subscription Required' },
  { name: 'Upheal', icon: '📊', description: 'Revolutionizes therapy note-taking with AI and insightful analytics.', url: 'https://www.upheal.io/', price: 'Paid', rating: 4.7, category_id: 'ai-life', subcategory_id: 'health-tools', features: 'AI Note-Taking, Analytics, Session Insights', pros: 'Efficient for Therapists', cons: 'Only for Professionals' },
  { name: 'MIRI', icon: '💚', description: 'AI wellness coach with personalized health coaching and nutrition guidance.', url: 'https://www.miri.health/', price: 'Free', rating: 5.0, category_id: 'ai-life', subcategory_id: 'health-tools', features: 'Personalized Health Coaching, Nutrition Guidance, 24/7 Access', pros: 'Holistic Approach, Free', cons: 'Limited in Some Regions' },
  { name: 'Dream Decoder', icon: '🌙', description: 'AI-powered dream interpretation with personalized and confidential insights.', url: 'https://dreamdecoder.me/chat', price: 'Free', rating: 5.0, category_id: 'ai-life', subcategory_id: 'health-tools', features: 'Dream Interpretation, Personal Insights, AI Chat', pros: 'Unique Approach, Free', cons: 'Niche Use Case' },
  
  // === 宗教工具 (religious-tools) ===
  { name: 'Scripture AI', icon: '📖', description: 'AI-powered biblical study and meditation companion.', url: 'https://scripture-ai.com/', price: 'Freemium', rating: 4.2, category_id: 'ai-life', subcategory_id: 'religious-tools', features: 'Scripture Search, Meditation Guides, Study Plans', pros: 'Deep Study Tools, Accessible', cons: 'Limited to Biblical Content' },
  { name: 'Bible AI', icon: '✝️', description: 'AI assistant for Bible study and spiritual guidance.', url: 'https://bibleai.com/', price: 'Freemium', rating: 4.0, category_id: 'ai-life', subcategory_id: 'religious-tools', features: 'Bible Chat, Study Assistant, Spiritual Guidance', pros: 'Helpful for Study', cons: 'Limited Scope' },
  { name: 'Spiritual AI', icon: '🕊️', description: 'AI-powered spiritual guidance and meditation assistant.', url: 'https://spiritualai.com/', price: 'Free', rating: 4.3, category_id: 'ai-life', subcategory_id: 'religious-tools', features: 'Meditation Guidance, Spiritual Support, Prayer Companion', pros: 'Compassionate Support', cons: 'Limited Features' },
  
  // === 时尚工具 (fashion-tools) ===
  { name: 'AI Stylist', icon: '👗', description: 'Personalized fashion recommendations powered by AI.', url: 'https://ai-stylist.com/', price: 'Freemium', rating: 4.1, category_id: 'ai-life', subcategory_id: 'fashion-tools', features: 'Style Analysis, Outfit Recommendations, Wardrobe Management', pros: 'Personalized Style, Trend Awareness', cons: 'Limited Free Features' },
  { name: 'Fashion AI', icon: '✨', description: 'AI-powered fashion assistant for style recommendations.', url: 'https://fashionai.com/', price: 'Freemium', rating: 4.0, category_id: 'ai-life', subcategory_id: 'fashion-tools', features: 'Style Matching, Outfit Creator, Shopping Suggestions', pros: 'Easy Style Planning', cons: 'Premium Features' },
  { name: 'Lookiero', icon: '🎽', description: 'AI-powered personal styling service for fashion enthusiasts.', url: 'https://lookiero.com/', price: 'Paid', rating: 4.5, category_id: 'ai-life', subcategory_id: 'fashion-tools', features: 'Personal Stylist, Curated Picks, Style Quiz', pros: 'Human-like Curation', cons: 'Subscription Model' },
  
  // === 礼物推荐 (gift-tools) ===
  { name: 'GiftGenius', icon: '🎁', description: 'AI-powered gift recommendation engine.', url: 'https://giftgenius.ai/', price: 'Free', rating: 4.2, category_id: 'ai-life', subcategory_id: 'gift-tools', features: 'Personalized Suggestions, Occasion-Based Recommendations', pros: 'Quick Suggestions, Wide Range', cons: 'Limited Advanced Features' },
  { name: 'Giftship', icon: '📦', description: 'AI gift finder with smart recommendations.', url: 'https://giftship.ai/', price: 'Free', rating: 4.0, category_id: 'ai-life', subcategory_id: 'gift-tools', features: 'Smart Recommendations, Budget Options, Recipient Analysis', pros: 'Easy to Use', cons: 'Basic Features' },
  { name: 'Gift Wizard', icon: '🧙', description: 'AI-powered gift assistant for every occasion.', url: 'https://giftwizard.ai/', price: 'Freemium', rating: 4.3, category_id: 'ai-life', subcategory_id: 'gift-tools', features: 'Occasion Finder, Gift Ideas, Shopping Links', pros: 'Comprehensive Suggestions', cons: 'Ads in Free Version' },
  
  // === 旅行工具 (travel-tools) ===
  { name: 'MagicTrips', icon: '✈️', description: 'Effortlessly create personalized travel itineraries in seconds.', url: 'https://magictrips.ai/', price: 'Free', rating: 4.5, category_id: 'ai-life', subcategory_id: 'travel-tools', features: 'Instant Itineraries, Personalized Planning, Local Recommendations', pros: 'Fast and Easy, Free', cons: 'Limited Features' },
  { name: 'Ask Layla', icon: '🗺️', description: 'Revolutionize travel with AI-driven planning and seamless bookings.', url: 'https://justasklayla.com/', price: 'Free', rating: 4.6, category_id: 'ai-life', subcategory_id: 'travel-tools', features: 'AI Travel Planning, Booking Assistance, Local Insights', pros: 'Comprehensive Planning', cons: 'Limited Destinations' },
  { name: 'Tripplanner', icon: '📅', description: 'Optimizes travel with AI-driven, personalized itinerary planning.', url: 'https://tripplanner.ai/', price: 'Free', rating: 5.0, category_id: 'ai-life', subcategory_id: 'travel-tools', features: 'Smart Itineraries, Budget Planning, Activity Suggestions', pros: 'Highly Personalized', cons: 'Beta Version' },
  { name: 'iPlan.ai', icon: '🧭', description: 'AI-driven, personalized travel itineraries at your fingertips.', url: 'https://iplan.ai/', price: 'Free Trial', rating: 4.4, category_id: 'ai-life', subcategory_id: 'travel-tools', features: 'Custom Itineraries, Multi-destination Support, Budget Tracking', pros: 'Feature Rich', cons: 'Premium Features' },
  { name: 'Where To', icon: '🌍', description: 'AI-powered location insights for data-driven travel decisions.', url: 'https://www.wheretoai.com/', price: 'Free', rating: 5.0, category_id: 'ai-life', subcategory_id: 'travel-tools', features: 'Location Recommendations, Geospatial Analytics, Travel Insights', pros: 'Data-Driven', cons: 'Limited to Discovery' },
  { name: 'Maps GPT', icon: '🗺️', description: 'AI-driven tool for creating customized, editable maps with search.', url: 'https://www.mapsgpt.com/', price: 'Free', rating: 4.2, category_id: 'ai-life', subcategory_id: 'travel-tools', features: 'Custom Maps, Location Search, Easy Sharing', pros: 'User Friendly', cons: 'Basic Features' },
  { name: 'JourneAI', icon: '🌟', description: 'AI-powered personalized travel planning for global itineraries.', url: 'https://journeai.com/', price: 'Free', rating: 4.3, category_id: 'ai-life', subcategory_id: 'travel-tools', features: 'Global Itineraries, Smart Planning, Local Tips', pros: 'Comprehensive', cons: 'New Tool' },
  { name: 'Vacay', icon: '🏖️', description: 'AI travel planning with personalized itineraries and global insights.', url: 'https://www.usevacay.com/chatbot', price: 'Freemium', rating: 4.5, category_id: 'ai-life', subcategory_id: 'travel-tools', features: 'Chat-based Planning, Itinerary Generation, Travel Advice', pros: 'Innovative Interface', cons: 'Limited Free Usage' },
  { name: 'Traivl', icon: '🛫', description: 'AI travel planning with local insights and secure bookings.', url: 'https://www.traivl.com/', price: 'Free', rating: 4.8, category_id: 'ai-life', subcategory_id: 'travel-tools', features: 'Local Insights, Booking Integration, Smart Suggestions', pros: 'All-in-One', cons: 'Limited Destinations' },
  
  // === 美食工具 (food-tools) ===
  { name: 'ChefGPT', icon: '🍳', description: 'AI-driven tool simplifies meal planning with personalized recipes.', url: 'https://www.chefgpt.xyz/', price: 'Freemium', rating: 4.4, category_id: 'ai-life', subcategory_id: 'food-tools', features: 'Personalized Recipes, Meal Planning, Dietary Preferences', pros: 'Easy Meal Planning, Customizable', cons: 'Limited Free Features' },
  { name: 'AI Meal Planner', icon: '🥗', description: 'Personalized meal plans tailored to individual dietary needs.', url: 'https://casadesante.com/pages/a-i-meal-planner', price: 'Free', rating: 4.3, category_id: 'ai-life', subcategory_id: 'food-tools', features: 'Diet Plans, Calorie Tracking, Recipe Suggestions', pros: 'Free and Comprehensive', cons: 'Basic Interface' },
  { name: ' PlateJoy', icon: '🍽️', description: 'AI-powered meal planning with personalized recipes and shopping lists.', url: 'https://www.platejoy.com/', price: 'Paid', rating: 4.6, category_id: 'ai-life', subcategory_id: 'food-tools', features: 'Custom Meal Plans, Grocery Delivery, Dietary Filtering', pros: 'Highly Personalized', cons: 'Subscription Required' },
  { name: 'Eat This Much', icon: '🥙', description: 'AI meal planner with auto-generated meal plans and shopping lists.', url: 'https://www.eatthismuch.com/', price: 'Freemium', rating: 4.2, category_id: 'ai-life', subcategory_id: 'food-tools', features: 'Auto Meal Plans, Nutrition Tracking, Grocery Lists', pros: 'Free Option Available', cons: 'Ads in Free Version' },
  { name: 'Yummly', icon: '👨‍🍳', description: 'AI-powered recipe discovery and meal planning assistant.', url: 'https://www.yummly.com/', price: 'Freemium', rating: 4.5, category_id: 'ai-life', subcategory_id: 'food-tools', features: 'Recipe Discovery, Personalized Recommendations, Meal Planning', pros: 'Huge Recipe Database', cons: 'Premium Features' }
]

async function main() {
  // 清空现有生活工具
  await client.execute({sql: "DELETE FROM tools WHERE category_id = 'ai-life'", args: []})
  console.log('Cleared existing life tools')
  
  // 插入所有生活分类工具
  for (const tool of lifeTools) {
    await client.execute({
      sql: `INSERT INTO tools (name, icon, description, url, price, rating, category_id, subcategory_id, features, pros, cons) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [tool.name, tool.icon, tool.description, tool.url, tool.price, tool.rating, tool.category_id, tool.subcategory_id, tool.features || '', tool.pros || '', tool.cons || '']
    })
    console.log(`Added: ${tool.name} (${tool.subcategory_id})`)
  }
  
  // 统计各分类工具数量
  const result = await client.execute({sql: "SELECT subcategory_id, COUNT(*) as cnt FROM tools WHERE category_id = 'ai-life' GROUP BY subcategory_id", args: []})
  console.log('\n=== Life Tools Summary ===')
  result.rows.forEach(r => console.log(`  ${r.subcategory_id}: ${r.cnt} tools`))
  console.log(`\nTotal: ${lifeTools.length} tools`)
}

main()
