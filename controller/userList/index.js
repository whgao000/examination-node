module.exports = function (app, connection) {
  // 登录接口
  app.post("/user/list", function (req, res) {
    let username = req.body.userName;
    let pageIndex = req.body.pageIndex;
    let pageSize = req.body.pageSize;
    if (!username) {
      connection.query(
        `select SQL_CALC_FOUND_ROWS * from jwttest_user LIMIT 
        ${pageIndex * pageSize},${pageSize};SELECT FOUND_ROWS() as total;`,
        function (err, results) {
          results[0].map(item => delete item.password)
          return res.send({
            status: 200,
            message: "ok",
            data: results,
          });
        }
      );
    } else {
      connection.query(
        `select SQL_CALC_FOUND_ROWS * from jwttest_user where username="${username}" LIMIT 
        ${pageIndex * pageSize},${pageSize};SELECT FOUND_ROWS() as total;`,
        function (err, results) {
          results[0].map(item => delete item.password)
          return res.send({
            status: 200,
            message: "ok",
            data: results,
          });
        }
      );
    }
  });
};
