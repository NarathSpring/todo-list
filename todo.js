const program = require("commander");
const api = require("./src/api.js");
const version = require("./package.json").version;

program.option("-v, --version", "show the version").version(version);

program
  .command("clear")
  .description("clear all the task")
  .action((...args) => {
    api.clear();
  });

if (process.argv.length === 2) {
  api.init();
}

program.parse(process.argv);
