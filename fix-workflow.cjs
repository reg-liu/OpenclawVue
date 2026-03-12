const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/App.vue');
let content = fs.readFileSync(filePath, 'utf8');

// Replace "第一步" with description
content = content.replace(/<p>第一步<\/p>/g, '<p>{{ wf.steps[0]?.description || \'开始执行\' }}</p>');

// Replace "第{{ idx + 2 }}步" with description
content = content.replace(/<p>第\{\{ idx \+ 2 \}步<\/p>/g, '<p>{{ step.description || \'步骤说明\' }}</p>');

fs.writeFileSync(filePath, content);
console.log('Done!');
