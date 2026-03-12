import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// API 插件 - 带超时控制的开发时 API 代理
const apiPlugin = () => ({
  name: 'api-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url.startsWith('/api/')) {
        const timeoutMs = 8000 // 8秒超时
        
        try {
          const url = new URL(req.url, 'http://localhost')
          req.query = Object.fromEntries(url.searchParams)
          
          // 导入 API handler
          const { default: handler } = await import('./api/tools.js')
          
          // 处理 CORS 预检请求
          if (req.method === 'OPTIONS') {
            res.writeHead(200, {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type'
            })
            res.end()
            return
          }
          
          // 完整的 Express response 模拟
          const response = {
            statusCode: 200,
            headers: {},
            _body: null,
            _ended: false,
            
            status(code) {
              this.statusCode = code
              return this
            },
            
            json(data) {
              this._body = JSON.stringify(data)
              return this
            },
            
            setHeader(name, value) {
              this.headers[name] = value
              return this
            },
            
            end(data) {
              this._ended = true
              if (data !== undefined) {
                this._body = typeof data === 'string' ? data : JSON.stringify(data)
              }
              res.writeHead(this.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                ...this.headers
              })
              res.end(this._body)
              return this
            }
          }
          
          // 使用 Promise.race 添加超时
          const handlerPromise = handler(req, response)
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('API timeout')), timeoutMs)
          )
          
          await Promise.race([handlerPromise, timeoutPromise])
          
          // 如果没有自动结束，手动结束
          if (!response._ended) {
            response.end(response._body || JSON.stringify({ error: 'timeout' }))
          }
          
        } catch (error) {
          console.error('API Error:', error.message)
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          })
          // 返回后备数据
          const fallbackData = getFallbackData(req.query)
          res.end(JSON.stringify(fallbackData))
        }
      } else {
        next()
      }
    })
  }
})

// 后备数据
function getFallbackData(query) {
  if (query.type === 'categories') {
    return {
      success: true,
      data: [
        { id: 'ai-entry', name: 'AI入门', icon: '🚀', description: '零基础用户不知道怎么开始学习AI', children: [] },
        { id: 'ai-office', name: 'AI办公', icon: '💼', description: '日常办公场景', children: [
          { id: 'ai-writing', name: 'AI写作', icon: '✍️', description: '文案撰写、内容创作' },
          { id: 'ai-presentation', name: 'AI PPT', icon: '📊', description: 'PPT制作与演示' },
          { id: 'ai-data', name: 'AI数据分析', icon: '📈', description: '数据分析与可视化' }
        ]},
        { id: 'ai-create', name: 'AI创作', icon: '🎨', description: '写文章，做视频、生成图片', children: [
          { id: 'ai-image', name: 'AI图像', icon: '🖼️', description: 'AI图像生成' },
          { id: 'ai-video', name: 'AI视频', icon: '🎬', description: 'AI视频生成' },
          { id: 'ai-audio', name: 'AI音频', icon: '🎵', description: 'AI语音合成' }
        ]},
        { id: 'ai-code', name: 'AI编程', icon: '💻', description: '代码辅助、调试，Bug修复', children: [] },
        { id: 'ai-study', name: 'AI学习', icon: '📚', description: '看论文、学新技术', children: [] }
      ]
    }
  }
  
  if (query.type === 'hot_tasks') {
    return {
      success: true,
      data: [
        { id: 1, name: '文案创作', description: '使用AI生成营销文案、博客文章', heat: 5200 },
        { id: 2, name: 'PPT制作', description: 'AI辅助制作演示文稿', heat: 4800 },
        { id: 3, name: '代码辅助', description: 'AI编程助手，提高开发效率', heat: 4500 },
        { id: 4, name: '图像生成', description: 'AI生成创意图片和插画', heat: 4200 },
        { id: 5, name: '视频剪辑', description: 'AI辅助视频编辑和生成', heat: 3800 },
        { id: 6, name: '数据分析', description: 'AI处理和分析数据', heat: 3500 }
      ]
    }
  }
  
  if (query.type === 'workflows') {
    return {
      success: true,
      data: [
        {
          id: 'wf-1',
          category_id: query.category || 'ai-office',
          title: 'AI PPT制作工作流',
          description: '使用AI工具完成PPT制作的完整流程',
          steps: [
            { step: 1, title: '输入主题' },
            { step: 2, title: 'AI生成大纲' },
            { step: 3, title: '选择模板' },
            { step: 4, title: '自动生成' }
          ]
        },
        {
          id: 'wf-2',
          category_id: query.category || 'ai-office',
          title: 'AI写作工作流',
          description: '使用AI工具完成文章撰写的完整流程',
          steps: [
            { step: 1, title: '确定主题' },
            { step: 2, title: 'AI生成大纲' },
            { step: 3, title: '内容扩写' },
            { step: 4, title: '润色校对' }
          ]
        }
      ]
    }
  }
  
  if (query.scene) {
    return {
      success: true,
      tools: [
        { id: 1, name: 'ChatGPT', description: 'OpenAI的AI对话助手', price: '免费/付费', difficulty: '入门', scenes: ['ai-entry'], icon: '💬' },
        { id: 2, name: 'Claude', description: 'Anthropic推出的AI助手', price: '免费/付费', difficulty: '进阶', scenes: ['ai-entry', 'ai-code'], icon: '🧠' }
      ]
    }
  }
  
  return { success: true, data: [] }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), apiPlugin()],
  optimizeDeps: {
    exclude: ['api']
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  build: {
    rollupOptions: {
      external: ['/api/']
    }
  }
})
