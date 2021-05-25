/**
 * @file 脚手架模板业务
 * @module src/services/repos
 * @author 月落 <yueluo.yang@qq.com>
 */

/**
 * @requires src/config/config 全局配置文件
 * @requires src/api/api API 接口列表
 * @requires fs - 文件读写模块
 */
const { GITTT_ORG_CONFIG, DOWNLOAD_DEST, DOMAIN_CONFIG } = require('../config/config');
const { getOrgRepos, getReopTags, getRepoTagSource, downGiteeRepo } = require('../api/api');
const cp = require('child_process');
const path = require('path');
const AdmZip = require('adm-zip');

/**
 * @description 获取 CLI 模板列表
 * @returns {array}
 */
const getCliRepos = async () => {
  try {
    const { data } = await getOrgRepos(GITTT_ORG_CONFIG);
    return data;
  } catch (error) {
    console.log('get cli repos list failed.', error);
    return [];
  }
}

/**
 * @description 获取 CLI 模板列表版本号
 * @param {string} repo - 仓库名称
 * @returns {array}
 */
const getCliRepoTags = async (repo) => {
  try {
    const { data } = await getReopTags(GITTT_ORG_CONFIG, repo);
    return data;
  } catch (error) {
    console.log('get cli repo tags list failed.', error);
    return [];
  }
}

/**
 * @description 下载 Gitee 执行版本仓库源码
 * @param {string} repo - 仓库名称
 * @param {string} tag - 版本号
 * @returns {promise}
 */
const downCliGiteeRepo = async (repo, tag) => {
  const browser_download_url = `${DOMAIN_CONFIG.giteeDomain}/${GITTT_ORG_CONFIG}/${repo}/repository/archive/${tag}`;

  console.log(browser_download_url);
  
  return new Promise((resolve, reject) => {
    const zipPath = path.join(DOWNLOAD_DEST, 'temp.zip');

    cp.exec( `curl -o ${zipPath} ${browser_download_url}`, (err) => {
      if (err) {
        return reject(err);
      }

      const zip = new AdmZip(zipPath)
      zip.extractAllTo(DOWNLOAD_DEST, true);

      resolve(path.join(DOWNLOAD_DEST, repo));
    });
  })
}

module.exports = {
  getCliRepos,
  getCliRepoTags,
  downCliGiteeRepo
}