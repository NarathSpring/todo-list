const db = require("./db.js");

module.exports.add = async title => {
  // 读文件
  const list = await db.read();
  console.log(typeof list);
  // 添加内容
  list.push({ title: title, done: false });
  // 存储内容
  db.write(list);
};

module.exports.remove = a => {
  console.log(a);
};
