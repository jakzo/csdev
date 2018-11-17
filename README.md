# CSDev

_Local dev environment for CodeSignal._

## Installation

First make sure you have Node.js and [Docker](https://docs.docker.com/install/#supported-platforms) installed then run:

```sh
npm i -g csdev
```

## Downloading tasks

This command will download the tests into a new folder with the task's name in the current directory.

```sh
csdev task NAME
```

`NAME` can be the task's function name, the challenge ID (the random characters in the URL of a challenge) or a task ID.

## Running

To run a file against the tests, use:

```sh
csdev run my_file.cpp
```

It will run the file against the tests using the version of the language on CodeSignal. The language used is based on the extension of the file. If the language is not installed, it will prompt you to install it.

The tests used will be those in the nearest ancestor directory with a `csdev.json` file.

Docker must be running to use this command.

## Installing a language

```sh
csdev install go
```

This will install the specified language with the same version as the one on CodeSignal. It will _not_ be installed globally and will not interfere with any versions of the language already installed.

Docker must be running to use this command.
