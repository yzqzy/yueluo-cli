/**
 * @file 全局配置
 * @module src/config/config
 * @author 月落 <yueluo.yang@gmail.com>
 */

/**
 * @constant {string} VERSION - 版本号
 */
const { version: VERSION } = require('../../package.json')

/**
 * @constant {string} DOMAIN_CONFIG - 请求域名
 * @constant {string} ORG_CONFIG - 组织名称
 */
const DOMAIN_CONFIG = 'yw0525/yueluo-cli-templates'

/**
 * @constant {string} BASE_PREFIX - 请求前缀
 */
const BASE_PREFIX = `${DOMAIN_CONFIG}`

module.exports = {
  VERSION,
  BASE_PREFIX
}
