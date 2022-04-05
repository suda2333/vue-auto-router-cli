const fs = require('fs')
//Handlebars provides the power necessary to let you build semantic templates effectively with no frustration
const handlebars = require('handlebars')
module.exports = async () => {
  // 获取页面列表
  console.log(1)
  const list = fs.readdirSync('./src/views')
    .filter(v => v !== 'Home.vue')
    .map(v => ({
      name: v.replace('.vue', '').toLowerCase(),
      file:v
    }))
  console.log(list)
  // 生成router文件
  compile({ list }, './src/router.js', './template/router.js.hbs')
  // 生成App菜单文件
  compile({ list }, './src/App.js', './template/App.js.hbs')
}

function compile(meta, filePath, templatePath) {
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString()
    const result = handlebars.compile(content)(meta)
    fs.writeFileSync(filePath, result)
  }
  console.log(`${filePath}创建成功`)
}