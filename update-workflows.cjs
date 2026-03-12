const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'api/tools.js');
let content = fs.readFileSync(filePath, 'utf8');

// 新的工作流数据
const newWorkflows = `const fallbackWorkflows = {
        'office-writing': [
          { id: 'wf-writing-1', category_id: 'office-writing', title: 'AI写作工作流', description: '使用AI工具完成文章撰写的完整流程', steps: [{ step: 1, title: '确定主题', desc: '明确写作目标和受众' }, { step: 2, title: 'AI生成大纲', desc: 'AI自动生成文章结构' }, { step: 3, title: '内容扩写', desc: '根据大纲填充详细内容' }, { step: 4, title: '润色校对', desc: '检查语法、优化表达' }] }
        ],
        'office-business': [
          { id: 'wf-business-1', category_id: 'office-business', title: 'AI商业文案工作流', description: '使用AI工具完成商业文案撰写的完整流程', steps: [{ step: 1, title: '确定目标', desc: '明确商业文案的目标和受众' }, { step: 2, title: 'AI生成大纲', desc: 'AI自动生成文案结构' }, { step: 3, title: '内容填充', desc: '根据大纲填充商业内容' }, { step: 4, title: '优化发布', desc: '检查优化并准备发布' }] }
        ],
        'office-efficiency': [
          { id: 'wf-efficiency-1', category_id: 'office-efficiency', title: 'AI效率提升工作流', description: '使用AI工具提升办公效率的完整流程', steps: [{ step: 1, title: '识别痛点', desc: '识别日常工作中的重复性任务' }, { step: 2, title: '选择工具', desc: '根据需求选择合适的AI工具' }, { step: 3, title: '自动化设置', desc: '配置自动化工作流程' }, { step: 4, title: '持续优化', desc: '根据效果持续调整优化' }] }
        ],
        'office-data': [
          { id: 'wf-data-1', category_id: 'office-data', title: 'AI数据分析工作流', description: '使用AI工具完成数据分析的完整流程', steps: [{ step: 1, title: '数据收集', desc: '整理和导入需要分析的数据' }, { step: 2, title: 'AI分析', desc: '使用AI进行数据洞察和分析' }, { step: 3, title: '可视化', desc: 'AI生成数据可视化图表' }, { step: 4, title: '报告生成', desc: 'AI辅助生成分析报告' }] }
        ],
        'office-marketing': [
          { id: 'wf-marketing-1', category_id: 'office-marketing', title: 'AI营销工作流', description: '使用AI工具完成营销内容创作的完整流程', steps: [{ step: 1, title: '确定目标', desc: '明确营销目标和受众' }, { step: 2, title: 'AI生成内容', desc: 'AI生成多种营销内容方案' }, { step: 3, title: '优化选择', desc: '选择最优方案进行优化' }, { step: 4, title: '发布追踪', desc: '发布并追踪效果' }] }
        ],
        'office-finance': [
          { id: 'wf-finance-1', category_id: 'office-finance', title: 'AI财务工作流', description: '使用AI工具辅助财务分析的完整流程', steps: [{ step: 1, title: '数据整理', desc: '整理财务数据' }, { step: 2, title: 'AI分析', desc: 'AI进行财务分析' }, { step: 3, title: '预测规划', desc: 'AI辅助财务预测' }, { step: 4, title: '报告生成', desc: '生成财务分析报告' }] }
        ],
        'create-image': [
          { id: 'wf-image-1', category_id: 'create-image', title: 'AI图像生成工作流', description: '使用AI工具完成图像创作的完整流程', steps: [{ step: 1, title: '构思描述', desc: '明确想要生成的图像内容' }, { step: 2, title: '选择模型', desc: '根据需求选择合适的AI模型' }, { step: 3, title: '生成图像', desc: '输入提示词生成图像' }, { step: 4, title: '后期处理', desc: '调整尺寸、优化细节' }] }
        ],
        'create-video': [
          { id: 'wf-video-1', category_id: 'create-video', title: 'AI视频生成工作流', description: '使用AI工具完成视频创作的完整流程', steps: [{ step: 1, title: '确定主题', desc: '明确视频主题和内容' }, { step: 2, title: '生成脚本', desc: 'AI生成视频脚本' }, { step: 3, title: '生成视频', desc: 'AI生成视频内容' }, { step: 4, title: '后期剪辑', desc: 'AI辅助剪辑和优化' }] }
        ],
        'create-design': [
          { id: 'wf-design-1', category_id: 'create-design', title: 'AI设计工作流', description: '使用AI工具完成设计工作的完整流程', steps: [{ step: 1, title: '需求分析', desc: '明确设计需求和目标' }, { step: 2, title: 'AI生成方案', desc: 'AI生成多种设计方案' }, { step: 3, title: '选择优化', desc: '选择方案并进行优化' }, { step: 4, title: '导出使用', desc: '导出设计稿投入使用' }] }
        ],
        'create-art': [
          { id: 'wf-art-1', category_id: 'create-art', title: 'AI艺术创作工作流', description: '使用AI工具完成艺术创作的完整流程', steps: [{ step: 1, title: '构思灵感', desc: '明确艺术创作的主题和风格' }, { step: 2, title: 'AI生成', desc: 'AI生成艺术作品' }, { step: 3, title: '细节调整', desc: '调整细节和优化' }, { step: 4, title: '作品完成', desc: '完成艺术作品' }] }
        ],
        'create-music': [
          { id: 'wf-music-1', category_id: 'create-music', title: 'AI音乐创作工作流', description: '使用AI工具完成音乐创作的完整流程', steps: [{ step: 1, title: '确定风格', desc: '明确音乐风格和主题' }, { step: 2, title: 'AI生成', desc: 'AI生成音乐旋律' }, { step: 3, title: '编曲制作', desc: 'AI辅助编曲和制作' }, { step: 4, title: '后期混音', desc: '后期混音和优化' }] }
        ],
        'learn-coding': [
          { id: 'wf-coding-1', category_id: 'learn-coding', title: 'AI编程工作流', description: '使用AI工具辅助编程的完整流程', steps: [{ step: 1, title: '需求分析', desc: '明确要实现的功能' }, { step: 2, title: 'AI生成代码', desc: '描述需求让AI生成代码' }, { step: 3, title: '调试优化', desc: 'AI辅助调试和优化' }, { step: 4, title: '测试部署', desc: '运行测试并部署' }] }
        ],
        'learn-education': [
          { id: 'wf-education-1', category_id: 'learn-education', title: 'AI学习工作流', description: '使用AI工具提升学习效率的完整流程', steps: [{ step: 1, title: '确定目标', desc: '明确学习目标和内容' }, { step: 2, title: 'AI辅导', desc: 'AI进行个性化辅导' }, { step: 3, title: '练习巩固', desc: 'AI生成练习题' }, { step: 4, title: '评估反馈', desc: 'AI评估学习效果并反馈' }] }
        ],
        'learn-research': [
          { id: 'wf-research-1', category_id: 'learn-research', title: 'AI研究工作流', description: '使用AI工具辅助学术研究的完整流程', steps: [{ step: 1, title: '确定课题', desc: '明确研究课题' }, { step: 2, title: '文献搜索', desc: 'AI搜索相关文献' }, { step: 3, title: '分析总结', desc: 'AI分析总结文献内容' }, { step: 4, title: '报告撰写', desc: 'AI辅助撰写研究报告' }] }
        ],
        'learn-language': [
          { id: 'wf-language-1', category_id: 'learn-language', title: 'AI语言学习工作流', description: '使用AI工具学习语言的完整流程', steps: [{ step: 1, title: '确定目标', desc: '明确学习目标和水平' }, { step: 2, title: 'AI对话', desc: 'AI进行语言对话练习' }, { step: 3, title: '纠正反馈', desc: 'AI纠正发音和语法' }, { step: 4, title: '持续练习', desc: 'AI推荐练习内容' }] }
        ],
        'life-health': [
          { id: 'wf-health-1', category_id: 'life-health', title: 'AI健康管理工作流', description: '使用AI工具进行健康管理的完整流程', steps: [{ step: 1, title: '健康评估', desc: 'AI评估健康状况' }, { step: 2, title: '制定计划', desc: 'AI制定健康计划' }, { step: 3, title: '执行跟踪', desc: 'AI跟踪执行情况' }, { step: 4, title: '调整优化', desc: '根据反馈调整计划' }] }
        ],
        'life-travel': [
          { id: 'wf-travel-1', category_id: 'life-travel', title: 'AI旅行规划工作流', description: '使用AI工具规划旅行的完整流程', steps: [{ step: 1, title: '确定需求', desc: '明确旅行目的地和时间' }, { step: 2, title: 'AI规划', desc: 'AI生成旅行计划' }, { step: 3, title: '预订安排', desc: 'AI辅助预订' }, { step: 4, title: '行程优化', desc: '根据实际情况优化行程' }] }
        ],
        'life-food': [
          { id: 'wf-food-1', category_id: 'life-food', title: 'AI美食工作流', description: '使用AI工具辅助美食的完整流程', steps: [{ step: 1, title: '确定需求', desc: '确定想做的菜品或食材' }, { step: 2, title: 'AI推荐', desc: 'AI推荐食谱' }, { step: 3, title: '烹饪指导', desc: 'AI提供烹饪指导' }, { step: 4, title: '分享评价', desc: '分享成果并获取反馈' }] }
        ],
        'life-fashion': [
          { id: 'wf-fashion-1', category_id: 'life-fashion', title: 'AI时尚工作流', description: '使用AI工具辅助时尚搭配的完整流程', steps: [{ step: 1, title: '确定场合', desc: '明确穿搭场合和需求' }, { step: 2, title: 'AI搭配', desc: 'AI推荐穿搭方案' }, { step: 3, title: '虚拟试穿', desc: 'AI虚拟试穿效果' }, { step: 4, title: '购买建议', desc: 'AI推荐购买链接' }] }
        ]
      }`;

// 替换工作流数据
content = content.replace(/const fallbackWorkflows = \{[\s\S]*?^\s{2}\}/m, newWorkflows);

fs.writeFileSync(filePath, content);
console.log('Done!');
