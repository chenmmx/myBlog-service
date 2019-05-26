const service = require('../mysql')
const uuid = require('node-uuid')
const IoRedis = require('ioredis')
const redis = new IoRedis(6379, '127.0.0.1')

// redis.get('hello', function(err, result) {
//   console.log(JSON.parse(result))
// })

// let dataList = {
//     data: []
// }
// redis.set('comments', JSON.stringify(dataList))

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

    // 向管理员端发送评论信息
    async sendMessage(ctx, next) {
        let data = ctx.request.body
        data.messageId = uuid.v4()
        redis.get('comments', function (err, result) {
            let dataArr = {}
            if (JSON.parse(result).data.length === 0) {
                dataArr = {
                    data: [data]
                }
            } else {
                let arr = JSON.parse(result).data
                arr.unshift(data)
                dataArr = {
                    data: arr
                }
            }
            redis.set('comments', JSON.stringify(dataArr))
        })
        ctx.body = {
            status: 0,
            msg: '成功'
        }
    }

    // 获取评论消息列表
    async getMessage(ctx, next) {
        let result = await redis.get('comments', function (err, result) {

            var promise = new Promise(function (resolve, reject) {
                if (resolve) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
            return promise
        })
        ctx.body = {
            status: 0,
            msg: '成功',
            result: JSON.parse(result)
        }
    }
    // 清除所有未读消息
    async clearAll(ctx, next) {
        let dataList = {
            data: []
        }
        redis.set('comments', JSON.stringify(dataList))
        ctx.body = {
            status: 0,
            msg: '成功'
        }
    }

    // 管理员评论列表点击
    async readMessage(ctx, next) {
        let data = ctx.request.body
        let result = await redis.get('comments', function (err, result) {

            var promise = new Promise(function (resolve, reject) {
                if (resolve) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
            return promise
        })
        let messageList = JSON.parse(result).data
        messageList = messageList.filter(item => {
            return item.messageId !== data.messageId
        })
        redis.set('comments', JSON.stringify({
            data: messageList
        }))
        ctx.body = {
            status: 0,
            msg: '成功'
        }
    }
}

module.exports = new CommentController()