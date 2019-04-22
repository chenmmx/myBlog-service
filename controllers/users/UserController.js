const service = require('../mysql')
const uuid = require('node-uuid')

class UserController {
    async login(ctx, next) {
        let data = ctx.request.body
        let res = await service.checkLogin(data.username, data.password)
        if(res.length === 0) {
            ctx.body = {
                status: -1,
                // data: res,
                msg: '用户名错误'
            }
        }else {
            if(res[0].password == data.password) {
                ctx.body = {
                    status: 0,
                    token: '12g4dg3dfadsf4354354645a',
                    msg: '登陆成功'
                } 
            }else {
                ctx.body = {
                    status: -1,
                    // data: res,
                    msg: '密码错误'
                }  
            }
        }

    }
    // 获取管理员账号列表
    async getAccountList(ctx, next) {
        let res = await service.findAdmin()
        ctx.body = {
            status: 0,
            msg: '成功',
            result: res
        }
    }
    // 新增管理员账号
    async addAccount(ctx, next) {
        let data = ctx.request.body
        let res = await service.addAdmin(data.username, data.password, uuid.v4())
        ctx.body = {
            status: 0,
            msg: '新增成功'
        }
    }
    // 修改管理员账号
    async editAccount(ctx, next) {
        let data = ctx.request.body
        let res = await service.editAdmin(data.username, data.password, data.accountId)
        ctx.body = {
            status: 0,
            msg: '修改成功'
        }
    }
    // 获取账号信息
    async getAccountInfo(ctx, next) {
        let data = ctx.request.body
        let res = await service.getAdminInfo(data.accountId)
        ctx.body = {
            status: 0,
            result: res,
            msg: '成功'
        }
    }
    // 删除账号
    async deleteAccount(ctx, next) {
        let data = ctx.request.body
        let res = await service.deleteAdmin(data.accountId)
        ctx.body = {
            status: 0,
            msg: '成功'
        }
    }

    // 用户
    // 获取管理员账号列表
    async getUserList(ctx, next) {
        let query = ctx.request.query
        let res = await service.findUser(query.pageIndex, query.pageSize, query.condition)
        let list = await service.findAll('userinfo')
        ctx.body = {
            status: 0,
            msg: '成功',
            result: res,
            total: list.length
        }
    }
    // 删除用户
    async deleteUser(ctx, next) {
        let data = ctx.request.body
        let res = await service.deleteUser(data.userId)
        ctx.body = {
            status: 0,
            msg: '成功'
        }
    }
    // 修改用户信息
    async editUser(ctx, next) {
        let data = ctx.request.body
        let res = await service.editUser(data.username, data.password, data.userId)
        ctx.body = {
            status: 0,
            msg: '修改成功'
        }
    }
    // 获取账号信息
    async getUserInfo(ctx, next) {
        let data = ctx.request.body
        let res = await service.getUserInfo(data.userId)
        ctx.body = {
            status: 0,
            result: res,
            msg: '成功'
        }
    }
}

module.exports = new UserController()