const PptxGenJS = require("pptxgenjs");

// 根据飞书文档内容创建PPT
const slidesData = [
  {
    title: "Openclaw部署方案",
    content: [
      "部署方案：本地部署、云端部署",
      "本地部署视频参考：https://www.bilibili.com/video/BV1ayPqzQEUo"
    ]
  },
  {
    title: "大语言模型选择",
    content: [
      "入门阶段：推荐模型及特点",
      "进阶阶段：推荐模型及特点",
      "高级阶段：推荐模型及特点",
      "按能力、擅长方向和费用考虑"
    ]
  },
  {
    title: "平台联动",
    content: [
      "OpenClaw与飞书联动",
      "将OpenClaw作为AI大脑接入飞书",
      "以机器人形式在飞书群里交互",
      "执行任务后返回结果",
      "支持其他平台联动"
    ]
  },
  {
    title: "学习最佳实践",
    content: [
      "从成熟项目直接启用",
      "配置基础软件、技能和定时任务",
      "参考：https://github.com/Work-Fisher/openclaw-ai-assistant-framework"
    ]
  },
  {
    title: "配置逻辑总览",
    content: [
      "人格设定文件说明",
      "IDENTITY - 身份设定",
      "SOUL - 核心原则",
      "USER - 用户信息",
      "AGENTS - 智能体配置",
      "MEMORY - 记忆机制",
      "HEARTBEAT - 定时心跳"
    ]
  },
  {
    title: "人格设定-IDENTITY",
    content: [
      "设定AI的身份信息",
      "Name: AI名称",
      "Creature: AI形态",
      "Vibe: 性格特点",
      "Emoji: 签名图标",
      "Avatar: 头像设置"
    ]
  },
  {
    title: "人格设定-SOUL",
    content: [
      "设定AI的核心原则",
      "行为准则",
      "沟通风格",
      "决策方式"
    ]
  },
  {
    title: "人格设定-USER",
    content: [
      "记录用户信息",
      "用户背景",
      "偏好设置",
      "联系方式"
    ]
  },
  {
    title: "人格设定-AGENTS",
    content: [
      "智能体配置",
      "模型选择",
      "技能启用",
      "定时任务"
    ]
  },
  {
    title: "人格设定-MEMORY",
    content: [
      "记忆机制",
      "短期记忆",
      "长期记忆",
      "记忆更新规则"
    ]
  },
  {
    title: "人格设定-HEARTBEAT",
    content: [
      "定时心跳任务",
      "周期性检查",
      "自动任务触发"
    ]
  },
  {
    title: "定时任务和HEARTBEAT的区别",
    content: [
      "HEARTBEAT: 处理常规、可批量进行的监控任务",
      "例如：每30分钟检查收件箱、日历和通知",
      "定时任务: 处理需要精确到点或较重的专项工作",
      "例如：每天早上7点生成简报、每周一上午9点项目回顾"
    ]
  },
  {
    title: "为什么叫养龙虾",
    content: [
      "项目命名由来",
      "寓意和象征",
      "社区文化"
    ]
  },
  {
    title: "扩展Skill",
    content: [
      "Self-Improving Agent技能",
      "让AI具备持续自我改进能力",
      "记录用户纠正和偏好",
      "Auto-Updater Skill",
      "自动检查更新版本",
      "组合使用效果最佳"
    ]
  },
  {
    title: "规则设置",
    content: [
      "自我改进规则示例",
      "请扫描最近一周会话日志",
      "找出被纠正的错误",
      "找出用户反复强调的偏好",
      "整理成新规则添加到记忆库",
      "",
      "沟通规则 SOUL",
      "请使用第一性原理思考",
      "不假设用户非常清楚需求",
      "保持审慎，停下来讨论"
    ]
  },
  {
    title: "文档管理",
    content: [
      "项目目录",
      "需求文档",
      "设计规范",
      "业务组件",
      "数据结构",
      "项目排期"
    ]
  },
  {
    title: "项目开发",
    content: [
      "生成Demo项目",
      "前后端代码检查",
      "代码提交和部署",
      "数据准备",
      "项目联调",
      "事件上报收集",
      "测试"
    ]
  }
];

// 创建PPT
const pres = new PptxGenJS();
pres.layout = "LAYOUT_16x9";
pres.title = "Openclaw项目开发";
pres.author = "OpenClaw";

// 添加封面页
const coverSlide = pres.addSlide();
coverSlide.addText("Openclaw项目开发", {
  x: 1, y: 2.5, w: 8, h: 1,
  fontSize: 44, bold: true, color: "2D3E50"
});
coverSlide.addText("AI助手框架完整指南", {
  x: 1, y: 3.8, w: 8, h: 0.5,
  fontSize: 20, color: "7F8C8D"
});

// 添加内容页
slidesData.forEach((slideData, index) => {
  const slide = pres.addSlide();
  
  // 标题
  slide.addText(slideData.title, {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 32, bold: true, color: "2D3E50"
  });
  
  // 页码
  slide.addText(`${index + 2}`, {
    x: 9, y: 4.5, w: 0.5, h: 0.3,
    fontSize: 12, color: "95A5A6"
  });
  
  // 内容
  slideData.content.forEach((item, i) => {
    slide.addText(item, {
      x: 0.8, y: 1.8 + i * 0.5, w: 8.5, h: 0.4,
      fontSize: 16, color: "34495E"
    });
  });
});

// 保存文件
pres.writeFile({ fileName: "D:/openclaw/OpenclawVue/Openclaw项目开发.pptx" })
  .then(() => console.log("PPT生成成功！"))
  .catch(err => console.error("生成失败:", err));
