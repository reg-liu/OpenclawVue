import { createClient } from '@libsql/client'

const TURSO_URL = process.env.TURSO_URL || 'libsql://openclaw-reg-liu.aws-ap-northeast-1.turso.io'
const TURSO_TOKEN = process.env.TURSO_TOKEN || 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMDE0OTksImlkIjoiMDE5Y2RiMGItNDQwMS03NmJmLWJiZmEtYTZhYzc5ZDM5Y2VjIiwicmlkIjoiMWIzY2E4MDQtODk5MS00NTViLTlhMDgtNzIzMTY5NDczYWMxIn0.8bA-3CpXA7I_hR9jCLKTNoAj8kSf_krSEFaciqykcfA0EwbMy8wDHAsoNe78N60kf8dfKV-eHaxn4_Jz01B9Aw'

const client = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN
})

// 解析 JSON 字段
function parseJsonField(value) {
  if (!value) return []
  try {
    return JSON.parse(value)
  } catch {
    return []
  }
}

export default async function handler(req, res) {
  const { type, cat, category, id, subcategory_id } = req.query
  console.log('API called:', { type, cat, category, id, subcategory_id })
  
  // ========== 获取所有一级分类 ==========
  if (type === 'categories') {
    try {
      const result = await client.execute('SELECT * FROM categories ORDER BY sort')
      return res.status(200).json({
        success: true,
        data: result.rows
      })
    } catch (err) {
      console.error('Categories DB error:', err)
      return res.status(500).json({ success: false, error: err.message })
    }
  }
  
  // ========== 获取单个一级分类（含二级分类） ==========
  if (type === 'category' && category) {
    try {
      // 获取一级分类
      const catResult = await client.execute({
        sql: 'SELECT * FROM categories WHERE id = ?',
        args: [category]
      })
      
      if (catResult.rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Category not found' })
      }
      
      // 获取二级分类
      const subResult = await client.execute({
        sql: 'SELECT * FROM subcategories WHERE category_id = ? ORDER BY sort',
        args: [category]
      })
      
      return res.status(200).json({
        success: true,
        data: {
          ...catResult.rows[0],
          subcategories: subResult.rows
        }
      })
    } catch (err) {
      console.error('Category DB error:', err)
      return res.status(500).json({ success: false, error: err.message })
    }
  }
  
  // ========== 获取所有二级分类（带一级分类信息）==========
  if (type === 'all-subcategories') {
    try {
      const result = await client.execute({
        sql: `SELECT s.*, c.name as parent_name, c.id as parent_id 
              FROM subcategories s 
              LEFT JOIN categories c ON s.category_id = c.id 
              ORDER BY c.sort, s.sort`
      })
      return res.status(200).json({
        success: true,
        data: result.rows
      })
    } catch (err) {
      console.error('All subcategories DB error:', err)
      return res.status(500).json({ success: false, error: err.message })
    }
  }
  if (type === 'subcategories') {
    try {
      let sql = 'SELECT * FROM subcategories'
      let args = []
      
      if (category) {
        sql += ' WHERE category_id = ?'
        args = [category]
      }
      
      sql += ' ORDER BY category_id, sort'
      const result = await client.execute({ sql, args })
      return res.status(200).json({
        success: true,
        data: result.rows
      })
    } catch (err) {
      console.error('Subcategories DB error:', err)
      return res.status(500).json({ success: false, error: err.message })
    }
  }
  
  // ========== 获取单个工具 ==========
  if (type === 'tool' && id) {
    try {
      const result = await client.execute({
        sql: 'SELECT * FROM tools WHERE id = ?',
        args: [parseInt(id)]
      })
      
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Tool not found' })
      }
      
      return res.status(200).json({
        success: true,
        data: result.rows[0]
      })
    } catch (err) {
      console.error('Tool DB error:', err)
      return res.status(500).json({ success: false, error: err.message })
    }
  }
  
  // ========== 获取工具列表 ==========
  if (type === 'tools') {
    try {
      let sql = 'SELECT * FROM tools WHERE (status IS NULL OR status = ? OR status = ?)'
      let args = ['active', '']
      
      if (category) {
        sql += ' AND category_id = ?'
        args.push(category)
      }
      
      if (subcategory_id) {
        sql += ' AND subcategory_id = ?'
        args.push(subcategory_id)
      }
      
      sql += ' ORDER BY sort, rating DESC'
      const result = await client.execute({ sql, args })
      
      return res.status(200).json({
        success: true,
        data: result.rows
      })
    } catch (err) {
      console.error('Tools DB error:', err)
      return res.status(500).json({ success: false, error: err.message })
    }
  }
  
  // ========== 产品页数据（分类 + 二级分类 + 工具） ==========
  // 支持两种情况：
  // 1. category = 一级分类ID (如 ai-create) → 返回所有二级分类和工具
  // 2. category = 二级分类ID (如 video-enhancer) → 返回该二级分类的工具
  if (type === 'product' && category) {
    try {
      // 1. 先判断是 一级分类 还是 二级分类
      const catResult = await client.execute({
        sql: 'SELECT * FROM categories WHERE id = ?',
        args: [category]
      })
      
      let isPrimaryCategory = catResult.rows.length > 0
      let categoryData = null
      let targetCategoryId = category
      
      if (isPrimaryCategory) {
        // 是一级分类
        categoryData = catResult.rows[0]
        targetCategoryId = category
      } else {
        // 是二级分类，查找其父分类
        const subResult = await client.execute({
          sql: 'SELECT * FROM subcategories WHERE id = ?',
          args: [category]
        })
        
        if (subResult.rows.length === 0) {
          return res.status(404).json({ success: false, error: 'Category not found' })
        }
        
        const subData = subResult.rows[0]
        
        // 获取父分类信息
        const parentResult = await client.execute({
          sql: 'SELECT * FROM categories WHERE id = ?',
          args: [subData.category_id]
        })
        
        categoryData = parentResult.rows[0]
        targetCategoryId = subData.category_id
      }
      
      // 2. 获取所有二级分类
      const subResult = await client.execute({
        sql: 'SELECT * FROM subcategories WHERE category_id = ? ORDER BY sort',
        args: [targetCategoryId]
      })
      
      const subcategories = subResult.rows
      
      // 3. 获取所有工具（按二级分类分组）
      const toolsResult = await client.execute({
        sql: 'SELECT * FROM tools WHERE category_id = ? AND (status IS NULL OR status = ? OR status = ?) ORDER BY subcategory_id, sort, rating DESC',
        args: [targetCategoryId, 'active', '']
      })
      
      // 4. 将工具按二级分类分组
      const toolsBySubcategory = {}
      toolsResult.rows.forEach(tool => {
        const subId = tool.subcategory_id
        if (!toolsBySubcategory[subId]) {
          toolsBySubcategory[subId] = []
        }
        toolsBySubcategory[subId].push(tool)
      })
      
      // 5. 如果是二级分类（只有一个），只返回该分类的工具
      if (!isPrimaryCategory) {
        const targetSub = subcategories.find(s => s.id === category)
        return res.status(200).json({
          success: true,
          data: {
            category: categoryData,
            subcategories: targetSub ? [{
              ...targetSub,
              tools: toolsBySubcategory[category] || []
            }] : [],
            is_subcategory: true,
            current_subcategory: category
          }
        })
      }
      
      // 6. 组装数据（一级分类视图）
      const subcategoriesWithTools = subcategories.map(sub => ({
        ...sub,
        tools: toolsBySubcategory[sub.id] || []
      }))
      
      return res.status(200).json({
        success: true,
        data: {
          category: categoryData,
          subcategories: subcategoriesWithTools,
          is_subcategory: false,
          current_subcategory: null
        }
      })
    } catch (err) {
      console.error('Product page DB error:', err)
      return res.status(500).json({ success: false, error: err.message })
    }
  }
  
  // ========== 副产品页数据（工具详情 + 替代工具） ==========
  if (type === 'subproduct' && id) {
    try {
      // 1. 获取工具详情
      const toolResult = await client.execute({
        sql: 'SELECT * FROM tools WHERE id = ?',
        args: [parseInt(id)]
      })
      
      if (toolResult.rows.length === 0) {
        return res.status(404).json({ success: false, error: 'Tool not found' })
      }
      
      const tool = toolResult.rows[0]
      
      // 2. 获取同一二级分类的其他工具（替代工具）
      const alternativesResult = await client.execute({
        sql: 'SELECT * FROM tools WHERE subcategory_id = ? AND id != ? AND (status IS NULL OR status = ? OR status = ?) ORDER BY rating DESC LIMIT 10',
        args: [tool.subcategory_id, parseInt(id), 'active', '']
      })
      
      // 3. 获取一级分类和二级分类信息
      const catResult = await client.execute({
        sql: 'SELECT * FROM categories WHERE id = ?',
        args: [tool.category_id]
      })
      
      const subResult = await client.execute({
        sql: 'SELECT * FROM subcategories WHERE id = ?',
        args: [tool.subcategory_id]
      })
      
      return res.status(200).json({
        success: true,
        data: {
          tool,
          category: catResult.rows[0] || null,
          subcategory: subResult.rows[0] || null,
          alternatives: alternativesResult.rows
        }
      })
    } catch (err) {
      console.error('Subproduct page DB error:', err)
      return res.status(500).json({ success: false, error: err.message })
    }
  }
  
  // ========== 首页数据 ==========
  if (type === 'home') {
    try {
      // 获取所有一级分类
      const catResult = await client.execute('SELECT * FROM categories ORDER BY sort')
      
      // 获取每个分类的工具数量
      const categories = []
      for (const cat of catResult.rows) {
        const toolCountResult = await client.execute({
          sql: 'SELECT COUNT(*) as count FROM tools WHERE category_id = ? AND (status IS NULL OR status = ? OR status = ?)',
          args: [cat.id, 'active', '']
        })
        
        const subResult = await client.execute({
          sql: 'SELECT * FROM subcategories WHERE category_id = ? ORDER BY sort LIMIT 3',
          args: [cat.id]
        })
        
        categories.push({
          ...cat,
          tool_count: toolCountResult.rows[0]?.count || 0,
          subcategories: subResult.rows
        })
      }
      
      // 获取推荐工具
      const toolsResult = await client.execute({
        sql: 'SELECT * FROM tools WHERE (status IS NULL OR status = ? OR status = ?) ORDER BY rating DESC, sort LIMIT 12',
        args: ['active', '']
      })
      
      return res.status(200).json({
        success: true,
        data: {
          categories,
          featured_tools: toolsResult.rows
        }
      })
    } catch (err) {
      console.error('Home page DB error:', err)
      return res.status(500).json({ success: false, error: err.message })
    }
  }
  
  // 默认返回空数据
  return res.status(200).json({
    success: true,
    data: null
  })
}
