/**
 * @file 模板相关配置
 * @module src/config/template
 * @author 月落 <yueluo.yang@gmail.com>
 */

const REPOS = [
  'electron-react-starter',
  'nuxt3-ssr-starter',
  'vite-vue3-starter',
  'vite-vue3-components-starter',
  'nest-server-starter'
]

/**
 * @constant {object} TEMPLATES - 模板地址
 */
const REOPS_CONFIG = REPOS.map(repo => ({
  name: repo
}))

module.exports = {
  REOPS_CONFIG
}
