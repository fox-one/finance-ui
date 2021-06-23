const compiler = require('vue-template-compiler');

module.exports = {
  process(content) {
    const { render } = compiler.compile(content, {
      attrs: {
        functional: false,
      },
    });

    return `module.exports = { render: ${render} }`;
  },
};