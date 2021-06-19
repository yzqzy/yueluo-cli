/**
 * @file 脚手架入口文件
 * @module src/index
 * @author 月落 <yueluo.yang@qq.com>
 */

const { VERSION } = require('./config/config');
const { COMMAND_CONFIG } = require('./config/command');
const path = require('path');
const { program } = require('commander');

// 初始化命令
Reflect.ownKeys(COMMAND_CONFIG).forEach(command => {
  const _command = COMMAND_CONFIG[command];

  program.command(command)
    .alias(_command.alias)
    .description(_command.description)
    .action(() => {
      if (command === '*') {
        console.log(_command.description);
        return;
      }
      require(path.resolve(__dirname, 'commands', command))(...process.argv.slice(3));
    });
});

// 处理命令行命令
program.version(VERSION).parse(process.argv);