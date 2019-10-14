const db = require("./db.js");
const ask = require("./ask.js");

module.exports.add = async title => {
  // 读文件
  const list = await db.read();

  // 添加内容
  list.push({ title: title, done: false });

  // 存储内容
  db.write(list);
};

module.exports.init = async () => {
  ask.showAllTasks();
};
