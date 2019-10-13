const fs = require("fs");
const path = require("path");
const listPath = path.join(__dirname, ".todo-list");

const db = {
  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(listPath, { flag: "a+" }, (error, content) => {
        if (error) return reject(error);
        let list;
        try {
          list = JSON.parse(content.toString());
        } catch (catchError) {
          list = [];
        }
        resolve(list);
      });
    });
  },

  write(list) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list);
      fs.writeFile(listPath, string, error => {
        if (error) return reject(error);
        resolve();
      });
    });
  },

  remove(title) {
    // return new Promise((resolve, reject) => {
    //   fs.readFile(listPath, (error, content) => {
    //     if (error) return reject(error);
    //     let list;
    //     try {
    //       list = JSON.parse(content.toString());
    //     } catch (catchError) {
    //       list = [];
    //     }
    //     resolve(list);
    //   });
    // });
  }
};

module.exports = db;
