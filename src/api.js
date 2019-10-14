const db = require("./db.js");
const ask = require("./ask.js");

module.exports.clear = async () => {
  db.write();
};

module.exports.init = () => {
  ask.showAllTasks();
};
