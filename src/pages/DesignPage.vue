<template>
  <div class="design-page">
    <div class="page-header">
      <h1>🎨 AI工具导航 - 设计规范</h1>
      <p>基于竞品分析的设计规范，包含颜色、组件、交互等完整定义</p>
    </div>

    <!-- Colors -->
    <div class="design-section">
      <h2>1. 颜色系统</h2>
      <div class="color-grid">
        <div class="color-card">
          <div class="color-swatch primary"></div>
          <div class="color-info">
            <strong>主色 Primary</strong>
            <code>#7c3aed</code>
            <span>主按钮、选中态、链接</span>
          </div>
        </div>
        <div class="color-card">
          <div class="color-swatch secondary"></div>
          <div class="color-info">
            <strong>次色 Secondary</strong>
            <code>#06b6d4</code>
            <span>次要按钮、辅助图标</span>
          </div>
        </div>
        <div class="color-card">
          <div class="color-swatch success"></div>
          <div class="color-info">
            <strong>成功 Success</strong>
            <code>#10b981</code>
            <span>成功状态、免费标签</span>
          </div>
        </div>
        <div class="color-card">
          <div class="color-swatch warning"></div>
          <div class="color-info">
            <strong>警告 Warning</strong>
            <code>#f59e0b</code>
            <span>警告、付费标签</span>
          </div>
        </div>
        <div class="color-card">
          <div class="color-swatch error"></div>
          <div class="color-info">
            <strong>错误 Error</strong>
            <code>#ef4444</code>
            <span>错误状态、危险操作</span>
          </div>
        </div>
        <div class="color-card">
          <div class="color-swatch bg-dark"></div>
          <div class="color-info">
            <strong>背景 BG Dark</strong>
            <code>#1a1a2e</code>
            <span>页面主背景</span>
          </div>
        </div>
        <div class="color-card">
          <div class="color-swatch card-bg"></div>
          <div class="color-info">
            <strong>卡片 Card BG</strong>
            <code>#1f1f3d</code>
            <span>卡片、浮层背景</span>
          </div>
        </div>
        <div class="color-card">
          <div class="color-swatch border"></div>
          <div class="color-info">
            <strong>边框 Border</strong>
            <code>#2d2d4a</code>
            <span>分割线、边框</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="design-section">
      <h2>2. 按钮组件</h2>
      <div class="button-showcase">
        <button class="btn-demo primary">主按钮</button>
        <button class="btn-demo secondary">次按钮</button>
        <button class="btn-demo text">文字按钮</button>
        <button class="btn-demo danger">危险按钮</button>
        <button class="btn-demo primary" disabled>禁用</button>
      </div>
    </div>

    <!-- Tags -->
    <div class="design-section">
      <h2>3. 标签</h2>
      <div class="tag-showcase">
        <span class="tag-demo free">免费</span>
        <span class="tag-demo paid">付费</span>
        <span class="tag-demo beginner">入门</span>
        <span class="tag-demo intermediate">进阶</span>
        <span class="tag-demo advanced">高级</span>
      </div>
    </div>

    <!-- Cards -->
    <div class="design-section">
      <h2>4. 卡片</h2>
      <div class="card-showcase">
        <div class="card-demo">
          <h3>基础卡片</h3>
          <p>悬浮查看效果 - 边框发光+上浮</p>
        </div>
        <div class="card-demo hover">
          <h3>悬浮状态</h3>
          <p>这是hover后的效果</p>
        </div>
      </div>
    </div>

    <!-- Scene Cards -->
    <div class="design-section">
      <h2>5. 场景入口卡片</h2>
      <div class="scene-showcase">
        <div class="scene-card">
          <div class="scene-icon">🚀</div>
          <div class="scene-name">AI入门</div>
        </div>
        <div class="scene-card">
          <div class="scene-icon">💼</div>
          <div class="scene-name">AI办公</div>
        </div>
        <div class="scene-card">
          <div class="scene-icon">🎨</div>
          <div class="scene-name">AI创作</div>
        </div>
        <div class="scene-card">
          <div class="scene-icon">💻</div>
          <div class="scene-name">AI编程</div>
        </div>
        <div class="scene-card">
          <div class="scene-icon">📚</div>
          <div class="scene-name">AI学习</div>
        </div>
      </div>
    </div>

    <!-- Tool Card -->
    <div class="design-section">
      <h2>6. 工具卡片 (含OpenClaw实践)</h2>
      <div class="tool-demo">
        <div class="tool-header">
          <span class="tool-icon">💬</span>
          <span class="tool-name">ChatGPT</span>
        </div>
        <p class="tool-desc">OpenAI开发的AI对话工具，适合日常问答和内容创作</p>
        <div class="tool-tags">
          <span class="tag-demo free">免费</span>
          <span class="tag-demo beginner">入门</span>
        </div>
        <div class="tool-openclaw">
          <div class="openclaw-title">🔧 OpenClaw 实践</div>
          <p class="openclaw-desc">通过 OpenAI API skill 调用接口，实现自定义AI助手</p>
        </div>
      </div>
    </div>

    <!-- Spacing -->
    <div class="design-section">
      <h2>7. 间距系统</h2>
      <div class="spacing-showcase">
        <div class="spacing-item"><span class="spacing-label">xs</span><div class="spacing-box" style="width:4px;height:4px;"></div><code>4px</code></div>
        <div class="spacing-item"><span class="spacing-label">sm</span><div class="spacing-box" style="width:8px;height:8px;"></div><code>8px</code></div>
        <div class="spacing-item"><span class="spacing-label">md</span><div class="spacing-box" style="width:16px;height:16px;"></div><code>16px</code></div>
        <div class="spacing-item"><span class="spacing-label">lg</span><div class="spacing-box" style="width:24px;height:24px;"></div><code>24px</code></div>
        <div class="spacing-item"><span class="spacing-label">xl</span><div class="spacing-box" style="width:32px;height:32px;"></div><code>32px</code></div>
      </div>
    </div>

    <!-- Typography -->
    <div class="design-section">
      <h2>8. 字体系统</h2>
      <div class="type-showcase">
        <div class="type-item"><span class="type-label">H1</span><span class="type-sample h1">章节标题 32px</span></div>
        <div class="type-item"><span class="type-label">H2</span><span class="type-sample h2">小节标题 24px</span></div>
        <div class="type-item"><span class="type-label">H3</span><span class="type-sample h3">子标题 18px</span></div>
        <div class="type-item"><span class="type-label">Body</span><span class="type-sample body">正文内容 14px</span></div>
        <div class="type-item"><span class="type-label">Small</span><span class="type-sample small">辅助说明 12px</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.design-page {
  padding: 120px 24px 80px;
  min-height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-header h1 {
  font-size: 40px;
  margin-bottom: 12px;
}

.page-header p {
  color: #94a3b8;
  font-size: 18px;
}

.design-section {
  margin-bottom: 60px;
  background: #1a1a2e;
  border-radius: 16px;
  padding: 32px;
}

.design-section h2 {
  font-size: 24px;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #262626;
  color: #fff;
}

/* Colors */
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.color-card {
  background: #1a1a1a;
  border: 1px solid #262626;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 16px;
}

.color-swatch {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  flex-shrink: 0;
}

.color-swatch.primary { background: #7c3aed; }
.color-swatch.secondary { background: #06b6d4; }
.color-swatch.success { background: #10b981; }
.color-swatch.warning { background: #f59e0b; }
.color-swatch.error { background: #ef4444; }
.color-swatch.bg-dark { background: #1a1a2e; border: 1px solid #333; }
.color-swatch.card-bg { background: #1f1f3d; border: 1px solid #333; }
.color-swatch.border { background: #2d2d4a; border: 1px solid #444; }

.color-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.color-info strong {
  font-size: 14px;
  color: #fff;
}

.color-info code {
  font-size: 12px;
  color: #22d3ee;
  font-family: monospace;
}

.color-info span {
  font-size: 12px;
  color: #71717a;
}

/* Buttons */
.button-showcase {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.btn-demo {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-demo.primary {
  background: #7c3aed;
  color: white;
}

.btn-demo.primary:hover {
  background: #8b5cf6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}

.btn-demo.secondary {
  background: transparent;
  color: #7c3aed;
  border: 1px solid #7c3aed;
}

.btn-demo.text {
  background: transparent;
  color: #7c3aed;
}

.btn-demo.danger {
  background: #ef4444;
  color: white;
}

.btn-demo:disabled {
  background: #374151;
  color: #6b7280;
  cursor: not-allowed;
}

/* Tags */
.tag-showcase {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-demo {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.tag-demo.free {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid #10b981;
}

.tag-demo.paid {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

.tag-demo.beginner {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.tag-demo.intermediate {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

.tag-demo.advanced {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid #ef4444;
}

/* Cards */
.card-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.card-demo {
  background: #1f1f3d;
  border: 1px solid #2d2d4a;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s;
}

.card-demo:hover {
  border-color: #7c3aed;
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.2);
  transform: translateY(-4px);
}

.card-demo h3 {
  font-size: 16px;
  margin-bottom: 8px;
  color: #fff;
}

.card-demo p {
  font-size: 13px;
  color: #94a3b8;
}

/* Scene Cards */
.scene-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

.scene-card {
  background: linear-gradient(135deg, #1f1f3d 0%, #2d2d4a 100%);
  border-radius: 16px;
  padding: 32px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #2d2d4a;
}

.scene-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(124, 58, 237, 0.3);
  border-color: #7c3aed;
}

.scene-icon {
  font-size: 36px;
  display: block;
  margin-bottom: 12px;
}

.scene-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

/* Tool Demo */
.tool-demo {
  background: #1f1f3d;
  border: 1px solid #2d2d4a;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
}

.tool-demo .tool-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.tool-demo .tool-icon {
  width: 40px;
  height: 40px;
  background: rgba(124, 58, 237, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.tool-demo .tool-name {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.tool-demo .tool-desc {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 12px;
}

.tool-demo .tool-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tool-openclaw {
  padding: 12px;
  background: rgba(124, 58, 237, 0.1);
  border-radius: 8px;
  border-left: 3px solid #7c3aed;
}

.tool-openclaw .openclaw-title {
  font-size: 12px;
  color: #7c3aed;
  font-weight: 600;
  margin-bottom: 4px;
}

.tool-openclaw .openclaw-desc {
  font-size: 12px;
  color: #94a3b8;
}

/* Spacing */
.spacing-showcase {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-end;
}

.spacing-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spacing-label {
  font-size: 12px;
  color: #71717a;
  width: 24px;
}

.spacing-box {
  background: #7c3aed;
}

.spacing-item code {
  font-size: 12px;
  color: #22d3ee;
  font-family: monospace;
}

/* Typography */
.type-showcase {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.type-item {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.type-label {
  font-size: 12px;
  color: #71717a;
  width: 50px;
}

.type-sample.h1 {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
}

.type-sample.h2 {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
}

.type-sample.h3 {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.type-sample.body {
  font-size: 14px;
  color: #e5e5e5;
}

.type-sample.small {
  font-size: 12px;
  color: #94a3b8;
}

@media (max-width: 600px) {
  .design-page {
    padding: 100px 16px 40px;
  }
  
  .color-grid {
    grid-template-columns: 1fr;
  }
  
  .button-showcase {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .scene-showcase {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
