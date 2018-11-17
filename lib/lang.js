const path = require('path');
const fse = require('fs-extra');
const t = require('io-ts');
const { reporter } = require('io-ts-reporters');

let langs = null;
let langsByAlias = null;
let langsByExt = null;

const manifestRequired = t.type({
  name: t.string,
  aliases: t.array(t.string),
});
const manifestOptional = t.partial({
  extensions: t.array(t.string),
  timeLimit: t.number,
});
const manifestSchema = t.intersection([manifestRequired, manifestOptional]);

exports.getLangs = async () => {
  if (!langs) await readLangs();
  return langs;
};

exports.getLangByAlias = async alias => {
  if (!langsByAlias) await readLangs();
  return langsByAlias[alias];
};

exports.getLangByExt = async ext => {
  if (!langsByExt) await readLangs();
  return langsByExt[ext];
};

exports.getLangByFilename = async filename => {
  const ext = path.extname(filename);
  return await exports.getLangByExt(ext);
};

const readLangs = async () => {
  langs = [];
  langsByAlias = {};
  langsByExt = {};

  const langsDir = path.resolve(__dirname, '..', 'langs');
  for (const dir of await fse.readdir(langsDir, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const langDir = path.join(langsDir, dir.name);
    const manifest = await fse.readJson(path.join(langDir, 'lang.json'));
    const errors = reporter(manifestSchema.decode(manifest));
    if (errors.length > 0) {
      const errorList = errors.map(err => `\n- ${err}`).join('');
      die(`Invalid manifest at ${path.join(langDir, 'lang.json')}:${errorList}`);
    }
    const { name, aliases, extensions = [], timeLimit = 4000 } = manifest;

    const lang = {
      name,
      aliases,
      extensions,
      timeLimit,
      dockerImageName: `csdev-${dir.name}`,
    };
    langs.push(lang);
    for (const alias of aliases) {
      langsByAlias[alias] = lang;
    }
    for (const ext of extensions) {
      langsByExt[ext] = lang;
    }
  }
};
