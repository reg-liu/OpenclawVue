import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'data', 'tools.db')

const db = new Database(dbPath)

// 获取表结构
const schema = db.prepare("SELECT sql FROM sqlite_master WHERE type='table'").all()
console.log('=== 表结构 ===')
schema.forEach(s => console.log(s.sql))

// 获取数据量
const count = db.prepare("SELECT COUNT(*) as cnt FROM tools").get()
console.log('\n=== 数据量 ===')
console.log('tools 表记录数:', count.cnt)

// 获取所有数据
const rows = db.prepare("SELECT * FROM tools").all()
console.log('\n=== 前3条数据 ===')
console.log(JSON.stringify(rows.slice(0, 3), null, 2))

db.close()
