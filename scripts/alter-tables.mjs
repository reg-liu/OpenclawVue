import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

async function alterTables() {
  console.log('开始修改表结构...')
  
  try {
    // categories表添加新字段
    await client.execute('ALTER TABLE categories ADD COLUMN tags TEXT')
    console.log('✓ categories表添加tags字段')
    
    await client.execute('ALTER TABLE tools ADD COLUMN tags TEXT')
    console.log('✓ tools表添加tags字段')
    
    await client.execute('ALTER TABLE tools ADD COLUMN strengths TEXT')
    console.log('✓ tools表添加strengths字段')
    
    await client.execute('ALTER TABLE tools ADD COLUMN pros TEXT')
    console.log('✓ tools表添加pros字段')
    
    await client.execute('ALTER TABLE tools ADD COLUMN cons TEXT')
    console.log('✓ tools表添加cons字段')
    
    await client.execute('ALTER TABLE tools ADD COLUMN mobile TEXT')
    console.log('✓ tools表添加mobile字段')
    
    await client.execute('ALTER TABLE tools ADD COLUMN recommended TEXT')
    console.log('✓ tools表添加recommended字段')
    
    await client.execute('ALTER TABLE hot_tasks ADD COLUMN description TEXT')
    console.log('✓ hot_tasks表添加description字段')
    
    await client.execute('ALTER TABLE workflows ADD COLUMN category_id TEXT')
    console.log('✓ workflows表添加category_id字段')
    
    console.log('\n✅ 表结构修改完成！')
  } catch (error) {
    console.error('修改表结构失败:', error.message)
  }
}

alterTables()
