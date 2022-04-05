const { promisify } = require('util')
const figlet = promisify(require('figlet'))

const clear = require('clear')
const log = content => console.log(content)
const { clone } = require('./download.js')
const spawn = async (...args) => {
  const spawn = require('cross-spawn')
  return new Promise((resolve, reject) => {
    let proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}
const open = require('open')
module.exports = async name => {
  clear()
  // 欢迎界面
  const data = await figlet('KKB Welcome')
  log(data)
  log('创建项目' + name)
  // 克隆脚手架
  await clone('github:su37josephxia/vue-template', name)
  // 安装依赖,cwd指定当前 子进程工作目录
  await spawn('npm', ['install'], { cwd: `./${name}` })
  log((` 👌安装完成： To get Start: =========================== cd ${name} npm run serve ===========================`))
  // 打开浏览器
  open(`http://localhost:8080`)
  await spawn('npm', ['run', "serve"], { cwd: `./${name}` })
}
