const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/App.vue');
let content = fs.readFileSync(filePath, 'utf8');

// Replace description with desc
content = content.replace(/wf.steps\[0\]?.description/g, 'wf.steps[0]?.desc');
content = content.replace(/step.description/g, 'step.desc');

fs.writeFileSync(filePath, content);
console.log('Done!');
