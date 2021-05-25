/**
 * @file API 请求
 * @module src/api/api
 * @author 月落 <yueluo.yang@qq.com>
 */

/**
 * @requires src/config/config 全局配置文件
 * @requires axios - 网络请求模块
 */
const { DOMAIN_CONFIG } = require('../config/config');
const { default: axios } = require('axios');

/**
 * @description 获取码云公开仓库
 * @param {string} org - 组织名称
 * @returns {promise} 
 */
const getOrgRepos = (org) => {
  return axios.get(`${DOMAIN_CONFIG.giteeApiDomain}/orgs/${org}/repos?type=public`);
}

/**
 * @description 获取码云公开仓库版本号
 * @param {string} org - 组织名称
 * @param {string} repo - 仓库名称
 * @returns {promise} 
 */
const getReopTags = (org, repo) => {
  return axios.get(`${DOMAIN_CONFIG.giteeApiDomain}/repos/${org}/${repo}/tags`);
}

/**
 * @description 获取码云指定版本号公开仓库源码
 * @param {string} org - 组织名称
 * @param {string} repo - 仓库名称
 * @param {string} tag - 仓库版本号
 * @returns {promise}
 */
const getRepoTagSource = (org, repo, tag) => {
  return axios.get(`${DOMAIN_CONFIG.giteeApiDomain}/repos/${org}/${repo}/releases/tags/${tag}`);
}

module.exports = {
  getOrgRepos,
  getReopTags,
  getRepoTagSource
}