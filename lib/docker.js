const path = require('path');
const Docker = require('dockerode');
const { exec } = require('./util');

exports.isInstalled = async () => {
  try {
    const { stdout } = await exec('docker -v');
    return stdout.length > 2;
  } catch (err) {
    return false;
  }
};

exports.buildImage = langPath => {
  const docker = new Docker();
  docker.buildImage({ context: langPath, src: [path.join(langPath, 'Dockerfile')] });
};

exports.startImage = imageName => {};
