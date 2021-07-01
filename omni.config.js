'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  type: 'component-vue', // 项目类型，请勿任意变动 (project type, please don't modify)

  dev: {
    port: 6200, // 开发服务端口号 (dev-server port)
    // host: 'dev.domain.com', // 开发服务端host (dev-server host)
    serverType: 'storybook' // 开发服务类型 (dev-server type)
  },

  build: {
    // 构建完成后是否自动发布 (auto release project after build success)
    autoRelease: false,

    // 输入路径 (the build source directory)
    // 务必使用绝对路径 (must be a absolute path)
    srcDir: path.resolve('src'),

    // 输出路径 (the directory for compiled project)
    // 务必使用绝对路径 (must be a absolute path)
    outDir: path.resolve('lib'),

    // es6 module输出路径 (es6 module compiled directory)
    // 务必使用绝对路径 (must be a absolute path)
    esmDir: path.resolve('es'),

    reserve: {
      assets: [
        path.resolve(__dirname, 'src/assets')
      ] // 构建结果保留其他资源的路径 (reserve other asset paths)
    },

    preflight: {
      typescript: true, // 构建时是否处理ts或tsx文件 (whether or not process the ts or tsx files)
      test: true, // 构建时是否进行单元测试 (whether or not process unit-test)
      eslint: true, // 构建时是否进行eslint检测 (whether or not process eslint checking)
      prettier: true, // 构建时是否进行prettier检测 (whether or not process prettier checking)
      stylelint: true // 构建时是否进行stylelint检测 (whether or not process stylelint checking)
    }
  },

  release: {
    // 发布之前是否自动构建项目 (auto build project before release process)
    autoBuild: false,

    // 发布到npm仓库时，根据当前版本号自动设置 tag (auto set tag according to the current version)
    autoTag: true,

    // 发布的git仓库地址 (project git repo url)
    git: 'git@github.com:fox-one/finance-ui.git',

    // 发布的npm仓库地址 (npm depository url)
    npm: '',

    preflight: {
      test: true, // 发布前是否进行单元测试 (whether or not process unit-test)
      eslint: true, // 发布前是否进行eslint检测 (whether or not process eslint checking)
      prettier: true, // 发布前是否进行prettier检测 (whether or not process prettier checking)
      stylelint: true, // 发布前是否进行stylelint检测 (whether or not process stylelint checking)
      commitlint: true, // 发布前是否进行commitlint检测 (whether or not process commitlint checking)
      branch: 'master' // 发布前进行分支检测，设置为空字符串则不会检测 (only can release in this branch, set empty string to ignore this check)
    }
  },

  template: {
    // 生成模板的根路径 (the root directory for generate template)
    // 务必使用绝对路径 (must be a absolute path)
    root: path.resolve('src'),

    // 是否创建ts文件 (whether or not generate typescript)
    typescript: true,

    // 是否创建单元测试文件 (whether or not generate unit test frame)
    test: true,

    // 样式文件类型 (stylesheet type)
    stylesheet: 'scss',

    // 是否生成README.md (whether or not generate README.md)
    readme: true
  },

  plugins: [
    {
      name: 'github-action-npm',
      stage: 'release',
      handler: function (config, options) {
        const filePath = path.resolve(
          __dirname,
          './.github/workflows/cicd-npm.yml'
        );
        if (!fs.existsSync(filePath))
          return Promise.resolve();
        return new Promise(resolve => {
          const tag = options.tag;
          fs.readFile(filePath, function (
            err,
            data
          ) {
            if (err) throw err;
            const newData = data
              .toString()
              .replace(
                /tag:(\s\S)*\w*('|"){1}/g,
                `tag: '${tag}'`
              );
            fs.writeFileSync(
              filePath,
              newData,
              'utf-8'
            );
            resolve();
          });
        });
      }
    }
  ]
};
