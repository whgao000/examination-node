let login = require('./login/login')
let userList = require('./userList/index')
let deleteUser = require('./deleteUser/index')
let addUser = require('./addUser/index')
let chapters = require('./chapters/index')
module.exports = function (app, connection) {
  login(app, connection)
  userList(app, connection)
  deleteUser(app, connection)
  addUser(app, connection)
  chapters(app, connection)
}