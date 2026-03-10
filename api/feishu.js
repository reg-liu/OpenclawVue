// 飞书API工具模块

const APP_ID = process.env.FEISHU_APP_ID || 'cli_xxx'
const APP_SECRET = process.env.FEISHU_APP_SECRET || 'xxx'
const APP_TOKEN = 'LzUsbHaTaayqshsKFTQcOHLMnCh'
const TABLE_ID = 'tbloERDmAF9a4qc6'

let tenantAccessToken = null
let tokenExpireTime = 0

// 获取tenant_access_token
async function getTenantAccessToken() {
  const now = Date.now()
  if (tenantAccessToken && tokenExpireTime > now) {
    return tenantAccessToken
  }
  
  const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      app_id: APP_ID,
      app_secret: APP_SECRET
    })
  })
  
  const data = await response.json()
  
  if (data.msg === 'success') {
    tenantAccessToken = data.tenant_access_token
    tokenExpireTime = now + (data.expire - 300) * 1000 // 提前5分钟过期
    return tenantAccessToken
  }
  
  throw new Error('获取tenant_access_token失败: ' + data.msg)
}

// 从Bitable获取数据
async function getBitableData() {
  const token = await getTenantAccessToken()
  
  const response = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  
  const data = await response.json()
  
  if (data.msg === 'success') {
    return data.data.items || []
  }
  
  throw new Error('获取Bitable数据失败: ' + data.msg)
}

export { getBitableData }
