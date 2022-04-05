#!/usr/bin/env node
// 指定解释器
const program = require('commander')
program.version(require('../package.json').version)
// 初始化——下载模板、安装依赖、打开浏览器
program.command('init <name>')
  .description('init project')
  .action(require('../lib/init.js'))
// 生成约定路由文件：router， app
program.command('refresh')
  .description('refresh routers...')
  .action(require('../lib/refresh'))
// 自动刷新路由文件
program.command('serve')
  .description('serve')
  .action(require('../lib/serve'))

program.parse(process.argv)