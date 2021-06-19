/**
 * @file 脚手架模板业务
 * @module src/services/repos
 * @author 月落 <yueluo.yang@qq.com>
 */

const { BASE_PREFIX, DOWNLOAD_DEST } = require('../config/config');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
let { exec } = require('child_process');

exec = promisify(exec);

/**
* @description 下载模板仓库
* @param {string} repo - 仓库名称
* @returns {promise}
*/
const downCliRepo = async (repo) => {
  const browser_git_url = `${BASE_PREFIX}${repo}.git`;
  const download_dest = path.join(DOWNLOAD_DEST, repo);
  
  return new Promise(async (resolve, reject) => {
    try {
      if (!fs.existsSync(DOWNLOAD_DEST)) {
        await exec(`mkdir ${DOWNLOAD_DEST}`);
      }
      
      await exec(`git clone ${browser_git_url}`, { cwd: DOWNLOAD_DEST });
      await exec(`rm -rf ${download_dest}/.git`);

      resolve(download_dest);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  downCliRepo
}