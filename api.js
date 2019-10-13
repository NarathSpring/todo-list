const db = require("./db.js");

module.exports.add = async title => {
  // 读文件
  const list = await db.read();
  console.log(list[0]);
  // 添加内容
  list.push({ title: title, done: false, id: list.length + 1 });
  // 存储内容
  db.write(list);
};

module.exports.remove = async title => {
  console.log(title);
  // 读所有读任务
  const list = await db.read();
  // 找到选中读任务
  console.log(JSON.stringify(list));
  // 删除当前选中的任务
};

module.exports.show = async id => {
  const list = await db.read();
  console.log(list[id]);
};
