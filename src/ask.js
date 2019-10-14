const inquirer = require("inquirer");
const db = require("./db.js");

const ask = {
  markAsDone(list, index) {
    list[index].done = true;
    db.write(list);
    this.showAllTasks();
  },

  markAsUndone(list, index) {
    list[index].done = false;
    db.write(list);
    this.showAllTasks();
  },

  updateTitle(list, index) {
    inquirer
      .prompt({
        type: "input",
        name: "title",
        message: "请输入新的标题",
        default: list[index].title
      })
      .then(answer => {
        list[index].title = answer.title;
        db.write(list);
        this.showAllTasks();
      });
  },

  removeTask(list, index) {
    list.splice(index, 1);
    db.write(list);
    this.showAllTasks();
  },

  selectAction(list, index) {
    const actions = {
      showAllTasks: this.showAllTasks,
      markAsDone: this.markAsDone,
      markAsUndone: this.markAsUndone,
      updateTitle: this.updateTitle,
      removeTask: this.removeTask
    };

    inquirer
      .prompt({
        type: "list",
        name: "action",
        message: "请选择操作",
        choices: [
          { name: "<- 返回上一层", value: "showAllTasks" },
          { name: " √ 已完成", value: "markAsDone" },
          { name: " x 未完成", value: "markAsUndone" },
          { name: "   改标题", value: "updateTitle" },
          { name: "   删除", value: "removeTask" }
        ]
      })
      .then(answer => {
        // const action = actions[answer.action];
        // action && action(list, index);

        switch (answer.action) {
          case "showAllTasks":
            this.showAllTasks();
            break;
          case "markAsDone":
            this.markAsDone(list, index);
            break;
          case "markAsUndone":
            this.markAsUndone(list, index);
            break;
          case "updateTitle":
            this.updateTitle(list, index);
            break;
          case "removeTask":
            this.removeTask(list, index);
            break;
        }
      });
  },

  askForCreateTask(list) {
    inquirer
      .prompt({
        type: "input",
        name: "title",
        message: "请输入新任务标题"
      })
      .then(answer => {
        list.push({
          title: answer.title,
          done: false
        });
        db.write(list);
        this.showAllTasks();
      });
  },

  askForAction(list) {
    inquirer
      .prompt({
        type: "list",
        name: "index",
        message: "请选择你想操作的任务",
        choices: [
          { name: "退出", value: "-1" },
          ...list.map((task, index) => {
            return {
              name: `${task.done ? "[√]" : "[ ]"} ${index + 1} - ${task.title}`,
              value: index.toString()
            };
          }),
          { name: " + 创建新任务", value: -2 }
        ]
      })
      .then(answer => {
        const index = parseInt(answer.index);
        if (index >= 0) {
          this.selectAction(list, index);
        } else if (index === -2) {
          // 创建任务
          this.askForCreateTask(list);
        }
      });
  },

  async showAllTasks() {
    const list = await db.read();
    this.askForAction(list);
  }
};

module.exports = ask;
