/**
 * @file 创建项目
 * @modules src/commands/create
 * @author 月落 <yueluo.yang@gmail.com>
 */

const Inquirer = require('inquirer')

const { REOPS_CONFIG } = require('../config/reops')
const { waitFnWithLoading } = require('../lib/tools')
const { downCliRepo } = require('../services/reops')

module.exports = async projectName => {
  if (!Array.isArray(REOPS_CONFIG)) {
    console.log('the repos is not array')
    return
  }

  const repos = REOPS_CONFIG.map(repo => repo.name)

  // 选择模板
  const { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'Choose a template to create your project.',
    choices: repos
  })

  // 下载模板到本地
  await waitFnWithLoading(downCliRepo, 'download teamplate...')(
    repo,
    projectName
  )

  console.log('success.')
}
