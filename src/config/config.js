/**
 * @file 全局配置
 * @module src/config/config
 * @author 月落 <yueluo.yang@qq.com>
 */

/**
 * @constant {string} VERSION - 版本号
 */
const { version: VERSION } = require('../../package.json');

/**
 * @constant {string} DOMAIN_CONFIG - 请求域名
 * @constant {string} ORG_CONFIG - 组织名称
 */
const DOMAIN_CONFIG = 'https://git.yueluo.club/';
const ORG_CONFIG = 'templates/';

/**
 * @constant {string} BASE_PREFIX - 请求前缀
 */
const BASE_PREFIX = `${DOMAIN_CONFIG}${ORG_CONFIG}`;

/**
 * @constant {string} DOWNLOAD_DEST - 模板本地存储地址
 *  darwin mac
 */
const DOWNLOAD_DEST = 
 `${ process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE'] }${ process.platform === 'darwin' ? '/.template' : '\\.template' }`;

module.exports = {
  VERSION,
  BASE_PREFIX,
  DOWNLOAD_DEST,
};