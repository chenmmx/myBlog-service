const router = require('koa-router')()
const userctrl = require('../controllers/users/UserController')

router
    // 用户模块
    .post('/api/user/login', userctrl.login)

    // 账号模块
    // 获取账号列表
    .get('/api/account/getAccountList', userctrl.getAccountList)
    .post('/api/account/addAccount', userctrl.addAccount)
    .post('/api/account/editAccount', userctrl.editAccount)
    .post('/api/account/deleteAccount', userctrl.deleteAccount)
    .post('/api/account/getInfo', userctrl.getAccountInfo)
    //用户模块
    .get('/api/user/getListByPage', userctrl.getUserList)
    .post('/api/user/delete', userctrl.deleteUser)
    .post('/api/user/getInfo', userctrl.getUserInfo)
    .post('/api/user/edit', userctrl.editUser)

module.exports = router