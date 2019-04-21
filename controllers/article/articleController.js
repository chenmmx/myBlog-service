const service = require('../mysql')
const uuid = require('node-uuid')
const moment = require('moment')

class ArticleController {

    // 文章
    // 获取文章列表
    async getArticleList(ctx, next) {
        let query = ctx.request.query
        let res = await service.findArticle(query.pageIndex, query.pageSize, query.condition)
        let list = await service.findAll('essayinfo')
        ctx.body = {
            status: 0,
            msg: '成功',
            result: res,
            total: list.length
        }
    }
    // 新增文章
    async addArticle(ctx, next) {
        let data = ctx.request.body
        let date = moment(new Date()).format('YYYY-MM-DD');
        console.log(date)
        let res = await service.addArticle(data.essayname, data.essaycontent, uuid.v4(), date)
        ctx.body = {
            status: 0,
            msg: '新增成功'
        }
    }
    // 删除文章
    async deleteArticle(ctx, next) {
        let data = ctx.request.body
        let res = await service.deleteArticle(data.essayId)
        ctx.body = {
            status: 0,
            msg: '成功'
        }
    }
    // 修改文章
    async editArticle(ctx, next) {
        let data = ctx.request.body
        console.log(data)
        let res = await service.editArticle(data.essayname, data.essaycontent, data.essayId)
        ctx.body = {
            status: 0,
            msg: '修改成功'
        }
    }
    // 获取文章信息
    async getArticleInfo(ctx, next) {
        let data = ctx.request.body
        let res = await service.getArticleInfo(data.essayId)
        ctx.body = {
            status: 0,
            result: res,
            msg: '成功'
        }
    }
}

module.exports = new ArticleController()