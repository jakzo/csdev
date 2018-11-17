const { exec, spawn } = require('child_process');
const chalk = require('chalk');

exports.exec = cmd =>
  new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) reject(err);
      else resolve({ stdout, stderr });
    });
  });

exports.spawn = (cmd, args, options) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, options);
  });

exports.die = msg => {
  console.error(chalk.red('Error: ') + msg);
  process.exit(1);
};
