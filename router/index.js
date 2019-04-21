const router = require('koa-router')()
const userctrl = require('../controllers/users/UserController')
const commentctrl = require('../controllers/comments/CommentController')
const articlectrl = require('../controllers/article/articleController')

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
    // 评论模块
    .get('/api/comment/getListByPage', commentctrl.getCommentList)
    .post('/api/comment/delete', commentctrl.deleteComment)
    // 文章模块
    .get('/api/article/getListByPage', articlectrl.getArticleList)
    .post('/api/article/add', articlectrl.addArticle)
    .post('/api/article/edit', articlectrl.editArticle)
    .post('/api/article/delete', articlectrl.deleteArticle)
    .post('/api/article/getInfo', articlectrl.getArticleInfo)

module.exports = router