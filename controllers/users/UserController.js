class UserController {
    async login(ctx, next) {
        ctx.body = {
            status: 0,
            token: '123',
            msg: '登录成功'
        }
    }
    async getUserInfo(ctx, next) {
        ctx.body = {
            status: 0,
            msg: '成功',
            data: {
                name: 'chenmmx',
                age: 22
            }
        }
    }
}

module.exports = new UserController()