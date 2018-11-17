const fse = require('fs-extra');
const program = require('commander');
const path = require('path');
const { writeTask } = require('./task');
const { getLangByAlias, getLangByFilename } = require('./lang');
const { die } = require('./util');

exports.cli = async () => {
  const packageJson = await fse.readJson(path.resolve(__dirname, '..', 'package.json'));

  program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version, '-v, --version');

  program
    .command('task <name>')
    .alias('t')
    .description('Download task.')
    .action(async name => {
      // TODO: Download task from CS
      const task = {
        name,
        testCases: {
          sample: [{ input: ['asdf', 3], output: 'asdfasdfasdf' }],
          custom: [],
          hidden: [],
        },
      };
      const taskPath = path.join(process.cwd(), task.name);
      writeTask(task, taskPath);
    });

  program
    .command('run <file>')
    .alias('r')
    .description('Run task test cases against file.')
    .option('-l, --language <name>', 'language to use to run the file')
    .action(async (file, opts) => {
      const lang = opts.language
        ? await getLangByAlias(opts.language)
        : await getLangByFilename(file);
      if (!lang) {
        die(
          opts.language
            ? `Language not found: ${opts.language}`
            : 'Could not infer language from file extension. ' +
                'Use `-l` to specify the language manually.',
        );
      }
      console.log(`RUN ${file}`, lang);
    });

  program
    .command('install <lang>')
    .alias('i')
    .description('Install or update language.')
    .action(lang => {
      console.log(`INSTALL ${lang}`);
    });

  program.on('command:*', function() {
    die(`Invalid command: ${program.args.join(' ')}\nSee --help for a list of available commands.`);
  });

  program.parse(process.argv);

  if (program.args.length === 0) {
    program.help();
  }
};
