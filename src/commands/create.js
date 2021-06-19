/**
 * @file 创建项目
 * @modules src/commands/create
 * @author 月落 <yueluo.yang@qq.com>
 */

const path = require('path');
const fs = require('fs');
const ncp = require('ncp').ncp;
const { render } = require('consolidate').ejs;
const Inquirer = require('inquirer');
const Metalsmith = require('metalsmith');

const { REOPS_CONFIG } = require('../config/reops');
const { waitFnWithLoading } = require('../lib/tools');
const { downCliRepo } = require('../services/reops');

module.exports = async (projectName) => {
  if (!Array.isArray(REOPS_CONFIG)) {
    console.log('the repos is not array');
    return;
  }

  const repos = REOPS_CONFIG.map(repo => repo.name);

  // 选择模板
  const { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'Choose a template to create your project.',
    choices: repos
  });

  // 下载模板到本地
  const dest = await waitFnWithLoading(downCliRepo, 'download teamplate source...')(repo);

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

          Object.assign(metadata, {
            name: projectName
          });

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
};