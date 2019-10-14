const program = require("commander");
const api = require("./src/api.js");

program
  .command("add")
  .description("add a task")
  .action((...args) => {
    const words = args.slice(0, -1).join(" ");
    api.add(words);
  });

if (process.argv.length === 2) {
  api.init();
}

program.parse(process.argv);
