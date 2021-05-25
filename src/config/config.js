/**
 * @file 全局配置文件
 * @module src/config/config
 * @author 月落 <yueluo.yang@qq.com>
 */

/**
 * @constant {string} VERSION - 版本号
 */
const { version: VERSION } = require('../../package.json')

/**
 * @constant {object} COMMAND_CONFIG - 命令配置
 */
const COMMAND_CONFIG = {
  create: {
    alias: 'c',
    description: 'create a new webpack4 project.',
    examples: [
      'yueluo-cli create <project-name>'
    ]
  },
  '*': {
    alias: 't',
    description: 'command not found.',
    examples: []
  }
}

/**
 * @constant {string} DOMAIN_CONFIG - 请求域名配置
 */
const DOMAIN_CONFIG = {
  giteeDomain: 'https://gitee.com',
  giteeApiDomain: 'https://gitee.com/api/v5'
}

/**
 * @constant {string} GITTT_ORG_CONFIG - 码云组织名称
 */
const GITTT_ORG_CONFIG = 'moonfall-scaffold-formwork';

/**
 * @constant {string} DOWNLOAD_DEST - 模板下载地址
 *  darwin mac
 */
const DOWNLOAD_DEST = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.template`;

module.exports = {
  VERSION,
  COMMAND_CONFIG,
  DOMAIN_CONFIG,
  GITTT_ORG_CONFIG,
  DOWNLOAD_DEST
}