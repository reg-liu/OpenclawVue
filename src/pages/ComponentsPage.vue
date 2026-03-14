<template>
  <div class="components-page">
    <div class="page-header">
      <span class="scene-icon-large">🎯</span>
      <h1>业务组件展示</h1>
      <p>AI工具导航网站使用的业务组件库</p>
    </div>

    <!-- 目录导航 -->
    <div class="toc">
      <a href="#common" class="toc-item">一、通用组件</a>
      <a href="#product" class="toc-item">二、产品页组件</a>
      <a href="#subproduct" class="toc-item">三、副产品页组件</a>
    </div>

    <!-- 一、通用组件 -->
    <section id="common" class="component-section">
      <h2 class="section-title">一、通用组件</h2>
      
      <div class="component-block">
        <h3 class="component-name">面包屑组件 (Breadcrumb)</h3>
        <p class="component-desc">显示当前位置导航，产品页和副产品页共用</p>
        
        <div class="info-row">
          <span class="info-label">用途：</span>
          <span class="info-value">显示当前位置导航</span>
        </div>
        <div class="info-row">
          <span class="info-label">位置：</span>
          <span class="info-value">页面顶部</span>
        </div>
        <div class="info-row">
          <span class="info-label">路径：</span>
          <span class="info-value">src/components/business/Breadcrumb.vue</span>
        </div>
        <div class="info-row">
          <span class="info-label">内容：</span>
          <span class="info-value">首页 > 一级分类名称</span>
        </div>
        
        <div class="component-demo">
          <div class="breadcrumb-demo">
            <span class="breadcrumb-item">首页</span>
            <span class="breadcrumb-separator">></span>
            <span class="breadcrumb-item active">AI办公</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 二、产品页组件 -->
    <section id="product" class="component-section">
      <h2 class="section-title">二、产品页组件（一级页面）</h2>
      
      <!-- 概览卡片组件 -->
      <div class="component-block">
        <h3 class="component-name">1. 概览卡片组件 (OverviewCard)</h3>
        <p class="component-desc">介绍一级分类的功能和用途，位于面包屑下方</p>
        
        <div class="info-row">
          <span class="info-label">用途：</span>
          <span class="info-value">介绍一级分类的功能和用途</span>
        </div>
        <div class="info-row">
          <span class="info-label">位置：</span>
          <span class="info-value">面包屑下方</span>
        </div>
        <div class="info-row">
          <span class="info-label">路径：</span>
          <span class="info-value">src/components/business/OverviewCard.vue</span>
        </div>
        <div class="info-row">
          <span class="info-label">内容：</span>
          <span class="info-value">一级分类标题、一级分类简介、一级分类图片</span>
        </div>
        
        <div class="component-demo">
          <div class="overview-card-demo">
            <div class="overview-content">
              <h1 class="overview-title">AI办公</h1>
              <p class="overview-desc">利用AI提升日常办公效率，涵盖文档处理、数据分析、演示制作等场景，让工作更高效、更专业。</p>
            </div>
            <div class="overview-image">
              <div class="image-placeholder"><span class="placeholder-icon">🖼️</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 工具列表组件 -->
      <div class="component-block">
        <h3 class="component-name">2. 工具列表组件 (ToolList)</h3>
        <p class="component-desc">按二级分类展示工具列表，位于概览卡片下方</p>
        
        <div class="info-row">
          <span class="info-label">用途：</span>
          <span class="info-value">按二级分类展示工具列表</span>
        </div>
        <div class="info-row">
          <span class="info-label">位置：</span>
          <span class="info-value">概览卡片下方</span>
        </div>
        <div class="info-row">
          <span class="info-label">路径：</span>
          <span class="info-value">src/components/business/ToolList.vue</span>
        </div>
        <div class="info-row">
          <span class="info-label">内容：</span>
          <span class="info-value">分类名称、分类简介、卡片列表（最多两行，每行4个卡片列表项）</span>
        </div>
        <div class="info-row">
          <span class="info-label">卡片列表项展示项目：</span>
          <span class="info-value">工具图标、工具名称、工具评分、工具简介、工具标签、工具地址</span>
        </div>
        
        <div class="component-demo">
          <div class="tool-list-demo">
            <div class="tool-group">
              <div class="group-header">
                <h2 class="group-title">AI写作</h2>
                <p class="group-desc">智能写作辅助工具</p>
              </div>
              <div class="tools-grid">
                <div class="tool-card-mini">
                  <div class="tool-row1">
                    <span class="tool-icon">💬</span>
                    <div class="tool-title-rating">
                      <span class="tool-name">ChatGPT</span>
                      <div class="tool-rating"><span class="stars"><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star">★</span></span><span class="rating-value">4.5</span></div>
                    </div>
                  </div>
                  <p class="tool-desc">OpenAI开发的AI对话工具</p>
                  <div class="tool-row3"><div class="tool-tags"><span class="tag tag-free">免费</span><span class="tag">入门</span></div></div>
                  <div class="tool-row4"><span class="tool-link">访问工具</span></div>
                </div>
                <div class="tool-card-mini">
                  <div class="tool-row1">
                    <span class="tool-icon">✍️</span>
                    <div class="tool-title-rating">
                      <span class="tool-name">Claude</span>
                      <div class="tool-rating"><span class="stars"><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span></span><span class="rating-value">4.9</span></div>
                    </div>
                  </div>
                  <p class="tool-desc">Anthropic开发的AI助手</p>
                  <div class="tool-row3"><div class="tool-tags"><span class="tag tag-paid">付费</span><span class="tag">进阶</span></div></div>
                  <div class="tool-row4"><span class="tool-link">访问工具</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 三、副产品页组件 -->
    <section id="subproduct" class="component-section">
      <h2 class="section-title">三、副产品页组件（二级页面）</h2>
      
      <!-- 详细卡片组件 -->
      <div class="component-block">
        <h3 class="component-name">1. 详细卡片组件 (DetailCard)</h3>
        <p class="component-desc">展示工具基本信息，位于面包屑下方</p>
        
        <div class="info-row">
          <span class="info-label">用途：</span>
          <span class="info-value">展示工具基本信息</span>
        </div>
        <div class="info-row">
          <span class="info-label">位置：</span>
          <span class="info-value">面包屑下方</span>
        </div>
        <div class="info-row">
          <span class="info-label">路径：</span>
          <span class="info-value">src/components/business/DetailCard.vue</span>
        </div>
        <div class="info-row">
          <span class="info-label">内容：</span>
          <span class="info-value">工具图标、工具名称、工具评分（5星评级）、工具简介、工具标签（免费/付费、难度等）、定价模式、工具地址（官网链接）、工具图片</span>
        </div>
        
        <div class="component-demo">
          <div class="detail-card-demo">
            <div class="detail-left">
              <div class="detail-icon">🎬</div>
              <div class="detail-info">
                <h1 class="detail-title">PowerDirector</h1>
                <div class="detail-rating">
                  <span class="stars"><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star">★</span></span>
                  <span class="rating-value">4.2</span>
                </div>
                <p class="detail-desc">专业的视频编辑软件，支持AI功能，适合各类视频创作需求。</p>
                <div class="detail-tags">
                  <span class="tag tag-paid">付费</span>
                  <span class="tag">进阶</span>
                </div>
                <div class="detail-pricing">
                  <span class="pricing-label">定价：</span>
                  <span class="pricing-value">¥399起</span>
                </div>
              </div>
            </div>
            <div class="detail-right">
              <div class="detail-image-placeholder"><span>工具图片</span></div>
              <a class="visit-btn">访问官网</a>
            </div>
          </div>
        </div>
      </div>

      <!-- 工具详情组件 -->
      <div class="component-block">
        <h3 class="component-name">2. 工具详情组件 (ToolDetail)</h3>
        <p class="component-desc">展示工具详细信息，位于详细卡片下方</p>
        
        <div class="info-row">
          <span class="info-label">用途：</span>
          <span class="info-value">展示工具详细信息</span>
        </div>
        <div class="info-row">
          <span class="info-label">位置：</span>
          <span class="info-value">详细卡片下方</span>
        </div>
        <div class="info-row">
          <span class="info-label">路径：</span>
          <span class="info-value">src/components/business/ToolDetail.vue</span>
        </div>
        <div class="info-row">
          <span class="info-label">内容：</span>
          <span class="info-value">工具详情（详细描述）、主要特点、优点、缺点、适合人群、定价模式（详细价格方案）</span>
        </div>
        
        <div class="component-demo">
          <div class="tool-detail-demo">
            <div class="detail-section">
              <h2 class="section-title-inner">工具详情</h2>
              <p class="detail-text">PowerDirector是一款专业的视频编辑软件，集成AI技术，提供智能剪辑、自动配乐、AI特效等功能。</p>
            </div>
            <div class="detail-section">
              <h2 class="section-title-inner">主要特点</h2>
              <div class="features-grid">
                <div class="feature-item"><span class="feature-icon">✨</span><span class="feature-text">AI智能剪辑</span></div>
                <div class="feature-item"><span class="feature-icon">✨</span><span class="feature-text">自动配乐</span></div>
                <div class="feature-item"><span class="feature-icon">✨</span><span class="feature-text">AI特效</span></div>
                <div class="feature-item"><span class="feature-icon">✨</span><span class="feature-text">模板丰富</span></div>
              </div>
            </div>
            <div class="detail-section">
              <h2 class="section-title-inner">优点</h2>
              <div class="pros-list">
                <div class="pros-item"><span class="pros-icon">✅</span><span class="pros-text">功能全面，专业性强</span></div>
                <div class="pros-item"><span class="pros-icon">✅</span><span class="pros-text">AI功能实用，提升效率</span></div>
                <div class="pros-item"><span class="pros-icon">✅</span><span class="pros-text">模板丰富，易上手</span></div>
              </div>
            </div>
            <div class="detail-section">
              <h2 class="section-title-inner">缺点</h2>
              <div class="cons-list">
                <div class="cons-item"><span class="cons-icon">⚠️</span><span class="cons-text">需要付费订阅</span></div>
                <div class="cons-item"><span class="cons-icon">⚠️</span><span class="cons-text">学习曲线较陡</span></div>
              </div>
            </div>
            <div class="detail-section">
              <h2 class="section-title-inner">适合人群</h2>
              <div class="target-users">
                <span class="user-tag">视频创作者</span>
                <span class="user-tag">内容创作者</span>
                <span class="user-tag">进阶用户</span>
              </div>
            </div>
            <div class="detail-section">
              <h2 class="section-title-inner">定价模式</h2>
              <p class="pricing-text">基础版：¥399/年 | 完整版：¥699/年 | 终身版：¥1299</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 替代工具组件 -->
      <div class="component-block">
        <h3 class="component-name">3. 工具列表组件 (AlternativeTools)</h3>
        <p class="component-desc">展示同类别的其他工具，位于工具详情下方</p>
        
        <div class="info-row">
          <span class="info-label">用途：</span>
          <span class="info-value">展示同类别的其他工具</span>
        </div>
        <div class="info-row">
          <span class="info-label">位置：</span>
          <span class="info-value">工具详情下方</span>
        </div>
        <div class="info-row">
          <span class="info-label">路径：</span>
          <span class="info-value">src/components/business/AlternativeTools.vue</span>
        </div>
        <div class="info-row">
          <span class="info-label">内容：</span>
          <span class="info-value">与产品页工具列表组件一致，展示同类别的其他工具</span>
        </div>
        <div class="info-row">
          <span class="info-label">卡片列表项展示项目：</span>
          <span class="info-value">工具图标、工具名称、工具评分、工具简介、工具标签、工具地址</span>
        </div>
        
        <div class="component-demo">
          <div class="alternative-demo">
            <h2 class="section-title-inner">PowerDirector 的替代方案</h2>
            <div class="alternatives-grid">
              <div class="alternative-card">
                <div class="alt-row1">
                  <span class="alt-icon">🎥</span>
                  <div class="alt-title-rating">
                    <span class="alt-name">Premiere Pro</span>
                    <div class="alt-rating"><span class="stars"><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star">★</span></span><span class="rating-value">4.3</span></div>
                  </div>
                </div>
                <p class="alt-desc">Adobe专业视频编辑软件</p>
                <div class="alt-row3"><div class="alt-tags"><span class="tag tag-paid">付费</span><span class="tag">高级</span></div></div>
                <div class="alt-row4"><span class="alt-link">访问工具</span></div>
              </div>
              <div class="alternative-card">
                <div class="alt-row1">
                  <span class="alt-icon">🎞</span>
                  <div class="alt-title-rating">
                    <span class="alt-name">Final Cut Pro</span>
                    <div class="alt-rating"><span class="stars"><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star">★</span><span class="star">★</span></span><span class="rating-value">3.9</span></div>
                  </div>
                </div>
                <p class="alt-desc">苹果专业视频编辑软件</p>
                <div class="alt-row3"><div class="alt-tags"><span class="tag tag-paid">付费</span><span class="tag">进阶</span></div></div>
                <div class="alt-row4"><span class="alt-link">访问工具</span></div>
              </div>
              <div class="alternative-card">
                <div class="alt-row1">
                  <span class="alt-icon">✂️</span>
                  <div class="alt-title-rating">
                    <span class="alt-name">剪映</span>
                    <div class="alt-rating"><span class="stars"><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star">★</span></span><span class="rating-value">4.1</span></div>
                  </div>
                </div>
                <p class="alt-desc">字节跳动视频编辑工具</p>
                <div class="alt-row3"><div class="alt-tags"><span class="tag tag-free">免费</span><span class="tag">入门</span></div></div>
                <div class="alt-row4"><span class="alt-link">访问工具</span></div>
              </div>
              <div class="alternative-card">
                <div class="alt-row1">
                  <span class="alt-icon">🎬</span>
                  <div class="alt-title-rating">
                    <span class="alt-name">DaVinci Resolve</span>
                    <div class="alt-rating"><span class="stars"><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star">★</span><span class="star">★</span></span><span class="rating-value">3.7</span></div>
                  </div>
                </div>
                <p class="alt-desc">免费专业视频编辑软件</p>
                <div class="alt-row3"><div class="alt-tags"><span class="tag tag-free">免费</span><span class="tag">进阶</span></div></div>
                <div class="alt-row4"><span class="alt-link">访问工具</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧导航组件 -->
      <div class="component-block">
        <h3 class="component-name">4. 右侧导航组件</h3>
        <p class="component-desc">页面内快速导航，位于页面右侧固定</p>
        
        <div class="info-row">
          <span class="info-label">用途：</span>
          <span class="info-value">页面内快速导航</span>
        </div>
        <div class="info-row">
          <span class="info-label">位置：</span>
          <span class="info-value">页面右侧固定</span>
        </div>
        <div class="info-row">
          <span class="info-label">路径：</span>
          <span class="info-value">src/components/RightSidebar.vue（已存在）</span>
        </div>
        <div class="info-row">
          <span class="info-label">锚点：</span>
          <span class="info-value">工具简介（#tool-intro）、详细说明（#tool-detail）、替代工具（#alternative-tools）</span>
        </div>
        
        <div class="component-demo">
          <div class="sidebar-demo">
            <a class="nav-item active">工具简介</a>
            <a class="nav-item">详细说明</a>
            <a class="nav-item">替代工具</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.components-page { max-width: 1100px; margin: 0 auto; padding: 120px 24px 60px; }
.page-header { text-align: left; margin-bottom: 32px; }
.scene-icon-large { font-size: 64px; display: block; margin-bottom: 16px; }
.page-header h1 { font-size: 42px; font-weight: 800; margin-bottom: 12px; color: #fff; }
.page-header p { color: #94a3b8; font-size: 18px; }
.toc { display: flex; justify-content: flex-start; gap: 24px; margin-bottom: 48px; padding: 16px; background: #1a1a2e; border-radius: 12px; flex-wrap: wrap; }
.toc-item { color: #94a3b8; text-decoration: none; font-size: 15px; padding: 8px 16px; border-radius: 8px; transition: all 0.2s; }
.toc-item:hover { color: #fff; background: rgba(139, 92, 246, 0.15); }
.component-section { margin-bottom: 64px; }
.section-title { font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid #3d3d5c; }
.component-block { background: #1a1a2e; border-radius: 16px; padding: 24px; margin-bottom: 24px; }
.component-name { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.component-desc { color: #94a3b8; font-size: 14px; margin-bottom: 16px; }
.info-row { display: flex; margin-bottom: 8px; font-size: 13px; }
.info-label { color: #a78bfa; font-weight: 600; min-width: 140px; }
.info-value { color: #94a3b8; }
.component-demo { background: #0f0f1a; padding: 24px; border-radius: 12px; margin-top: 16px; }

/* 面包屑 */
.breadcrumb-demo { display: flex; align-items: center; gap: 8px; font-size: 14px; }
.breadcrumb-item { color: #71717a; }
.breadcrumb-item.active { color: #fff; }
.breadcrumb-separator { color: #52525b; }

/* 概览卡片 */
.overview-card-demo { display: flex; align-items: center; justify-content: space-between; background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%); border: 1px solid #3d3d5c; border-radius: 20px; padding: 32px; gap: 32px; }
.overview-content { flex: 1; text-align: left; }
.overview-title { font-size: 36px; font-weight: 800; color: #fff; margin-bottom: 12px; }
.overview-desc { color: #94a3b8; font-size: 15px; line-height: 1.7; }
.overview-image { flex-shrink: 0; width: 200px; height: 140px; border-radius: 12px; overflow: hidden; }
.overview-image img { width: 100%; height: 100%; object-fit: cover; }
.image-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; }
.placeholder-icon { font-size: 36px; }

/* 工具列表 */
.tool-group { margin-bottom: 24px; }
.group-header { margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #2d2d4a; text-align: left; }
.group-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 4px; text-align: left; }
.group-desc { color: #94a3b8; font-size: 13px; }
.tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
.tool-card-mini { background: #1a1a2e; border: 1px solid #2d2d4a; border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 8px; }
.tool-row1 { display: flex; align-items: flex-start; gap: 10px; }
.tool-icon { font-size: 28px; flex-shrink: 0; }
.tool-title-rating { flex: 1; text-align: left; }
.tool-name { font-size: 14px; font-weight: 600; color: #fff; display: block; margin-bottom: 4px; }
.tool-rating { display: flex; align-items: center; gap: 4px; }
.stars { display: flex; }
.star { color: #3f3f46; font-size: 11px; }
.star.filled { color: #f59e0b; }
.rating-value { color: #a1a1aa; font-size: 10px; }
.tool-desc { color: #94a3b8; font-size: 11px; line-height: 1.4; text-align: left; }
.tool-row3 { text-align: left; }
.tool-tags { display: flex; gap: 4px; }
.tool-row4 { text-align: left; }
.tool-link { color: #22d3ee; font-size: 10px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tag { padding: 2px 6px; border-radius: 4px; font-size: 10px; background: rgba(139, 92, 246, 0.15); color: #a78bfa; }
.tag-free { background: rgba(16, 185, 129, 0.15); color: #10b981; }
.tag-paid { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }

/* 详细卡片 */
.detail-card-demo { background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%); border: 1px solid #3d3d5c; border-radius: 16px; padding: 24px; display: flex; gap: 24px; }
.detail-left { flex: 1; display: flex; gap: 18px; }
.detail-icon { width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 36px; flex-shrink: 0; }
.detail-info { flex: 1; text-align: left; }
.detail-title { font-size: 26px; font-weight: 700; color: #fff; margin-bottom: 6px; text-align: left; }
.detail-rating { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; text-align: left; }
.detail-rating .star { font-size: 14px; }
.detail-desc { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 12px; text-align: left; }
.detail-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; text-align: left; }
.detail-pricing { display: flex; align-items: center; gap: 6px; text-align: left; }
.pricing-label { color: #94a3b8; font-size: 13px; }
.pricing-value { color: #10b981; font-size: 14px; font-weight: 600; }
.detail-right { width: 160px; display: flex; flex-direction: column; gap: 10px; }
.detail-image-placeholder { width: 100%; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.placeholder-icon { font-size: 36px; }
.visit-btn { padding: 10px 16px; background: linear-gradient(135deg, #8b5cf6, #a855f7); color: #fff; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; text-align: center; text-decoration: none; }

/* 工具详情 */
.tool-detail-demo { display: flex; flex-direction: column; gap: 14px; }
.detail-section { background: #1a1a2e; border-radius: 10px; padding: 16px; }
.section-title-inner { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid #2d2d4a; text-align: left; }
.detail-text { color: #94a3b8; font-size: 13px; line-height: 1.7; text-align: left; }
.features-text { text-align: left; }
.feature-paragraph { color: #e5e5e5; font-size: 13px; line-height: 1.8; margin-bottom: 8px; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 8px; }
.feature-item { display: flex; align-items: center; gap: 6px; padding: 8px; background: rgba(139, 92, 246, 0.1); border-radius: 6px; }
.feature-icon { font-size: 12px; }
.feature-text { color: #e5e5e5; font-size: 12px; }
.pros-list, .cons-list { display: flex; flex-direction: column; gap: 6px; text-align: left; }
.pros-item, .cons-item { display: flex; align-items: flex-start; gap: 8px; padding: 8px; border-radius: 6px; }
.pros-item { background: rgba(16, 185, 129, 0.1); }
.pros-icon { font-size: 12px; flex-shrink: 0; }
.pros-text { color: #10b981; font-size: 12px; line-height: 1.6; }
.cons-item { background: rgba(245, 158, 11, 0.1); }
.cons-icon { font-size: 12px; flex-shrink: 0; }
.cons-text { color: #f59e0b; font-size: 12px; line-height: 1.6; }
.target-users-text { text-align: left; }
.user-paragraph { color: #60a5fa; font-size: 13px; line-height: 1.8; margin-bottom: 8px; }
.user-paragraph:last-child { margin-bottom: 0; }
.pricing-text { color: #94a3b8; font-size: 13px; line-height: 1.6; text-align: left; }

/* 替代工具 */
.alternative-demo { width: 100%; }
.alternative-demo .section-title-inner { font-size: 20px; margin-bottom: 14px; text-align: left; }
.alternatives-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.alternative-card { background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%); border: 1px solid #3d3d5c; border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 8px; }
.alt-row1 { display: flex; align-items: flex-start; gap: 10px; }
.alt-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
.alt-icon { font-size: 28px; flex-shrink: 0; }
.alt-title-rating { flex: 1; text-align: left; }
.alt-rating { display: flex; align-items: center; gap: 3px; }
.alt-name { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 4px; text-align: left; }
.alt-desc { color: #94a3b8; font-size: 11px; line-height: 1.4; text-align: left; flex: 1; }
.alt-row3 { text-align: left; }
.alt-row4 { text-align: left; }
.alt-link { color: #22d3ee; font-size: 10px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.alt-tags { display: flex; gap: 4px; flex-wrap: wrap; }

/* 右侧导航 */
.sidebar-demo { background: #1a1a2e; border-radius: 10px; padding: 12px; border: 1px solid #2d2d4a; width: 140px; }
.nav-item { display: block; padding: 8px 12px; color: #94a3b8; text-decoration: none; font-size: 12px; border-radius: 6px; margin-bottom: 4px; }
.nav-item:hover, .nav-item.active { background: rgba(139, 92, 246, 0.15); color: #a78bfa; }

@media (max-width: 900px) { 
  .alternatives-grid { grid-template-columns: repeat(2, 1fr); } 
  .detail-card-demo { flex-direction: column; } 
  .detail-left { flex-direction: column; } 
  .detail-right { width: 100%; } 
}
</style>
