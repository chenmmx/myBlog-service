// app.js
// 加载依赖
const koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const apiRouter = require('./router');
var cors = require('koa2-cors');

const app = new koa();
// 具体参数我们在后面进行解释
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/api') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:80'; 
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// 首页
const index = router.get('/', ctx => {
    ctx.response.body = 'hello world';
}).routes();

app.use(index);
app.use(bodyParser());
app.use(apiRouter.routes());

app.listen(3000);
