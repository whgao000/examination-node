const getTime = () => {
  let date = new Date();
  let YY = date.getFullYear() + "-";
  let MM =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hh =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  let mm =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return YY + MM + DD + " " + hh + mm + ss;
};
module.exports = function (app, connection) {
  // 获取章节列表
  app.post("/chaptersList", function (req, res) {
    let grade = req.body.grade;
    connection.query(
      `select * from Chapters where grade='${grade}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 添加章节
  app.post("/addChapter", function (req, res) {
    let grade = req.body.grade;
    let name = req.body.name;
    connection.query(
      `INSERT INTO Chapters(create_time,grade,name) VALUES('${getTime()}','${grade}','${name}');`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 编辑章节名称
  app.post("/editChapterName", function (req, res) {
    let id = req.body.id;
    let name = req.body.name;
    connection.query(
      `update Chapters set name='${name}' where id='${id}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 获取章节下的题目
  app.post("/queryChapterQuestions", function (req, res) {
    let zjid = req.body.zjid;
    connection.query(
      `select * from zjtm where zjid='${zjid}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 编辑单个题目
  app.post("/editQuestion", function (req, res) {
    let tmid = req.body.tmid;
    let analysis = req.body.analysis;
    let answer = req.body.answer;
    let options = req.body.options;
    let title = req.body.title;
    let type = req.body.type;
    connection.query(
      `update zjtm set analysis='${analysis}',answer='${answer}',type='${type}',options='${options}',title='${title}' where tmid='${tmid}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 删除单个题目
  app.post("/deleteQuestion", function (req, res) {
    let tmid = req.body.tmid;
    connection.query(
      `DELETE FROM zjtm  where tmid='${tmid}'`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 删除单个章节及章节下的题目
  app.post("/deleteChapterAndQuestion", function (req, res) {
    let id = req.body.id;
    connection.query(
      `DELETE FROM Chapters  where id='${id}';DELETE FROM zjtm  where zjid='${id}';`,
      function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });

  // 同一章节批量导入题目
  app.post("/addQuestions", function (req, res) {
    let sql = '';
    req.body.map(item => {
      let zjid = item.zjid;
      let analysis = item.analysis;
      let answer = item.answer;
      let options = item.option;
      let title = item.title;
      let type = item.type;
      let create_time = getTime();
      sql += `INSERT INTO zjtm SET zjid='${zjid}',analysis='${analysis}',answer='${answer}',options='${options}',title='${title}',type='${type}',create_time='${create_time}';`
    })
    connection.query(sql ,function (err, results) {
        return res.send({
          status: 200,
          message: "ok",
          data: results
        });
      }
    );
  });
};
