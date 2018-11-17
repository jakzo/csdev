# Langs

Language definitions go here.

When you create a new folder in this directory `csdev` will automatically add it to the list of supported languages.

Language directories contain a few special files:

- `lang.json` Properties of the language (see below).
- `Dockerfile` The Dockerfile for the container the code will run inside. Use this to set up the environment for the language. You do not need to use `CMD`, that will be automatically added.
- `files` Directory containing files used to run tests against the user's code. When `csdev run` is used, all files in this directory will be copied into the Docker container. All instances of `INJECTED_USER_CODE` inside files in this directory will be replaced with the user's code.
- `transform.sh` _(optional)_ Shell script which receives the user code from STDIN and outputs it to STDOUT with any necessary transformations applied. For example, Python might use this to indent each line before it is injected into the test scaffholding.
- `compile.sh` _(optional)_ Shell script which compiles the test scaffholding.
- `run.sh` Shell script which receives a single test from STDIN, runs it on the user code, then outputs the results to STDOUT. Test case inputs and outputs are received as JSON strings (see below).

## Fields in `lang.json`

- `name` Human-readable name of the language.
- `aliases` Array of strings users can use in the CLI tool to refer to the language.
- `extensions` _(optional)_ Array of file extensions which will map to this language (used for auto-detecting which language to run a file as). Ideally unique across all languages, but not required to be unique.
- `timeLimit` _(optional)_ The default time limit of the language on CodeSignal in milliseconds. Default value is `4000`.

## Test Case Inputs/Outputs

Test cases are passed as JSON strings. Inputs are arrays of arguments. For example, a challenge with the following call signature:

```cpp
std::string repeatStr(std::string str, int n);
```

Might receive this on STDIN:

```
["Hello,\nworld!",2]
```

And it would output this to STDOUT:

```
"Hello,\nworld!Hello,\nworld!"
```

Inputs and outputs must be valid JSON and end with a single newline character.
