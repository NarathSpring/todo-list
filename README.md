# 命令

- node todo - 进入程序

- node todo clear - 清除所有任务

# bug

- _创建新任务_ 和 _更新标题_ 之后，showAllTasks 函数会进入 if 语句内(list.length === 0)，但是实际上文件里已经写入了内容（应该已解决）

```javascript
// 原来的代码
db.write(list);
this.showAllTasks();

// 更改后
await db.write(list);
this.showAllTasks();
```

函数调用顺序是正确的，但是可能异步写入的时候，实际写入在`showAllTasks`之后，在`db.write`之前加上`await`，以保证写入完成之后再进入下面的`showAllTasks`
