/**
 * @file 工具函数
 * @module src/lib/tools
 * @author 月落 <yueluo.yang@qq.com>
 */

const ora = require('ora');

/**
 * @description 等待函数
 * @param {function} fn - 函数
 * @param {string} desc - loading 时文本
 * @returns {object} 函数执行结果
 */
const waitFnWithLoading = (fn, desc) => async (...agrs) => {
  const spinner = ora(desc);
  spinner.start();
  const reops = await fn(...agrs);
  spinner.succeed();
  return reops;
};

module.exports = {
  waitFnWithLoading
};