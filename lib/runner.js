const chalk = require('chalk');
const { startImage } = require('./docker');

exports.run = async lang => {
  const stream = startImage(lang.dockerImageName);

  const testCases = [];
  for (const [i, testCase] of testCases.entries()) {
    console.log(chalk.blueBright('Running test #') + chalk.blue(n.toString()));
  }
};
