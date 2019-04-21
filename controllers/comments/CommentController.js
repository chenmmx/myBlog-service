const service = require('../mysql')
const uuid = require('node-uuid')

class CommentController {

    // 评论
    // 获取评论列表
    async getCommentList(ctx, next) {
        let query = ctx.request.query
        let res = await service.findComment(query.pageIndex, query.pageSize)
        let list = await service.findAll('commentinfo')
        ctx.body = {
            status: 0,
            msg: '成功',
            result: res,
            total: list.length
        }
    }
    // 删除用户
    async deleteComment(ctx, next) {
        let data = ctx.request.body
        let res = await service.deleteComment(data.commentId)
        ctx.body = {
            status: 0,
            msg: '成功'
        }
    }
}

module.exports = new CommentController()