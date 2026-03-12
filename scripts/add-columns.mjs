import { createClient } from '@libsql/client'

const TURSO_URL = 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

async function addMissingColumns() {
  console.log('检查并添加缺失的字段...')
  
  const columnsToAdd = [
    { table: 'tools', column: 'cons', type: 'TEXT' },
    { table: 'tools', column: 'mobile', type: 'TEXT' },
    { table: 'tools', column: 'recommended', type: 'TEXT' },
    { table: 'hot_tasks', column: 'description', type: 'TEXT' },
    { table: 'workflows', column: 'category_id', type: 'TEXT' }
  ]
  
  for (const col of columnsToAdd) {
    try {
      await client.execute(`ALTER TABLE ${col.table} ADD COLUMN ${col.column} ${col.type}`)
      console.log(`✓ ${col.table}表添加${col.column}字段`)
    } catch (error) {
      if (error.message.includes('duplicate')) {
        console.log(`- ${col.table}.${col.column} 已存在`)
      } else {
        console.error(`✗ ${col.table}.${col.column} 失败: ${error.message}`)
      }
    }
  }
  
  console.log('\n✅ 完成！')
}

addMissingColumns()
