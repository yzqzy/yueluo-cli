/**
 * @file 创建项目
 * @modules src/commands/create
 * @author 月落 <yueluo.yang@qq.com>
 */

/**
 * @requires path 路径处理模块
 * @requires fs - 文件处理模块
 * @requires ncp - 文件夹复制
 * @requires consolidate - 模板引擎库
 * @requires inquirer - 命令行美化工具
 * @requires metalsmith - 静态站点生成器
 */
const path = require('path');
const fs = require('fs');
const ncp = require('ncp').ncp;
const { render } = require('consolidate').ejs;
const Inquirer = require('inquirer');
const Metalsmith = require('metalsmith');

/**
 * @requires src/lib/tools - 工具函数
 * @requires src/service/repos - 脚手架模板业务
 * @requires src/config/config - 全局配置文件
 */
const { waitFnWithLoading } = require('../lib/tools');
const { getCliRepos, getCliRepoTags, downCliGiteeRepo } = require('../services/repos');

module.exports = async (projectName) => {
  let repos = await waitFnWithLoading(getCliRepos, 'request templates...')();

  if (!Array.isArray(repos)) {
    console.log('the repos is not array');
    return;
  }

  repos = repos.map(repo => repo.name);

  // 选择模板
  const { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'Choose a template to create your project.',
    choices: repos
  });

  let tags = await waitFnWithLoading(getCliRepoTags, 'request template tags...')(repo);

  
  if (!Array.isArray(tags)) {
    console.log('the tags is not array');
    return;
  }

  tags = tags.map(tag => tag.name);

  // 选择模板版本号
  const { tag } = await Inquirer.prompt({
    name: 'tag',
    type: 'list',
    message: 'Choose a template tag to create your project',
    choices: tags
  });

  // 下载模板到本地
  const dest = await waitFnWithLoading(downCliGiteeRepo, 'download teamplate source...')(repo, tag);

  // 判断是否存在文件
  const questionDest = path.join(dest, 'question.json');
  const isQuestionFileExist = fs.existsSync(questionDest);

  if (!isQuestionFileExist) {
    // 简单模板、直接复制目录
    await ncp(dest, path.resolve(projectName));
  } else {
    // 复杂模板
    await new Promise((resolve, reject) => {
      Metalsmith(__dirname)
        .source(dest)
        .destination(path.resolve(projectName))
        .use(async (files, metal, done) => {
          const questions = require(questionDest);
          const answer = await Inquirer.prompt(questions);

          const metadata = metal.metadata();
          Object.assign(metadata, answer);
          delete files['question.json'];

          done();
        })
        .use((files, metal, done) => {
          const metadata = metal.metadata();

          Reflect.ownKeys(files).forEach(async file => {
            if (file.includes('js') || file.includes('json')) {
              const regex = /<%=(.*?)%>/g;
              
              let content = files[file].contents.toString();

              if (regex.test(content)) {
                content = await render(content, metadata);
                files[file].contents = Buffer.from(content);
              }
            }
          });

          done();
        })
        .build(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        })
    });
  }

  console.log('success!');
}