const router = require('koa-router')()
const userctrl = require('../controllers/users/UserController')

router
    // 用户模块
    .post('/api/user/login', userctrl.login)
    .get('/api/user/getUserInfo', userctrl.getUserInfo);

module.exports = router