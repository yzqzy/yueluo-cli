/**
 * @file 脚手架入口文件
 * @module src/index
 * @author 月落 <yueluo.yang@qq.com>
 */

/**
 * @requires src/config/config 全局配置文件
 * @requires path 路径处理模块
 * @requires commander 命令行解决方案
 */
const { COMMAND_CONFIG, VERSION } = require('./config/config');
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