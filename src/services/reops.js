/**
 * @file 脚手架模板业务
 * @module src/services/repos
 * @author 月落 <yueluo.yang@gmail.com>
 */

const { BASE_PREFIX } = require('../config/config')
const { promisify } = require('util')

let { exec } = require('child_process')

exec = promisify(exec)

/**
 * @description 下载模板仓库
 * @param {string} repo - 仓库名称
 * @param {string} projectName - 项目名称
 * @returns {promise}
 */
const downCliRepo = async (repo, projectName) => {
  await exec(`npx degit ${BASE_PREFIX}/${repo} ${projectName}`)
}

module.exports = {
  downCliRepo
}
