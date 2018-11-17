const fse = require('fs-extra');
const path = require('path');

exports.writeTask = async (task, taskPath) => {
  if (await fse.pathExists(taskPath)) {
    console.error(`Task path already exists: ${taskPath}`);
    process.exit(1);
  }

  await fse.mkdirp(taskPath);
  let caseNum = 0;
  const testContents =
    [...Object.entries(task.testCases)]
      .map(([type, cases]) => {
        const casesStr = cases
          .map(testCase => {
            caseNum += 1;
            const input = JSON.stringify(testCase.input);
            const output = JSON.stringify(testCase.output);
            return `\n\n${caseNum}\n${input}\n${output}`;
          })
          .join('');
        return `=== ${type} ===${casesStr}`;
      })
      .join('\n\n') + '\n';
  await fse.writeFile(path.join(taskPath, 'test_cases.txt'), testContents);
};
