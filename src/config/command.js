/**
 * @file 命令配置
 * @module src/config/command
 * @author 月落 <yueluo.yang@qq.com>
 */

const COMMAND_CONFIG = {
  create: {
    alias: 'c',
    description: 'create a project.',
    examples: [
      'yueluo-cli create <project-name>'
    ]
  },
  '*': {
    alias: 't',
    description: 'command not found.',
    examples: []
  }
};

module.exports = {
  COMMAND_CONFIG
};