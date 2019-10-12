const program = require("commander");
const version = require("./package.json").version;
const api = require("./api.js");

function showVersion() {
  console.log(version);
}

program.option("-v, --version", "show the version", showVersion);

program
  .command("add")
  .description("add a task")
  .action((...args) => {
    const words = args.slice(0, -1).join(" ");
    api.add(words);
  });

program
  .command("remove")
  .description("remove a task")
  .action((...args) => {
    const words = args.slice(0, -1).join(" ");
    api.remove(words);
  });

program.parse(process.argv);
