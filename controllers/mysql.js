const mysql = require('mysql')
const config = require('./config')

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'blog'
});

const query = function (sql, values) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

// 查询admin表
let findAdmin = function () { 
    let _req = `SELECT * from admininfo`
    return query(_req)
 }

// 新增账号
 let addAdmin = function(username, password, accountId) {
     let _req = `INSERT INTO admininfo VALUES ('${username}', '${password}', '${accountId}')`
     return query(_req)
 }

//  修改账号
 let editAdmin = function(username, password, accountId) {
    let _req = `UPDATE admininfo SET username = '${username}', password = '${password}' WHERE accountId = '${accountId}' `
    return query(_req)
}

// 获取账号信息
let getAdminInfo = function(accountId) {
    let _req = `SELECT * from admininfo WHERE accountId = '${accountId}'`
    return query(_req)
}

// 删除账号
let deleteAdmin = function (accountId) { 
    let _req = `DELETE from admininfo WHERE accountId =  '${accountId}'`
    return query(_req)
 }

 // 用户

//  查询所有
 let findAll = function(table) {
    let _req = `SELECT * from ${table}`
    return query(_req)
 }

// 查询用户表
let findUser = function (pageIndex, pageSize, condition) {
    let _req = `SELECT * from userinfo WHERE username LIKE '${condition}%' ORDER BY regTime LIMIT ${(pageIndex - 1) * pageSize}, ${pageSize}`
    return query(_req)
 }

//  获取用户信息
 let getUserInfo = function(userId) {
     let _req = `SELECT * from userinfo WHERE userID = '${userId}'`
     return query(_req)
 }

 // 删除用户
let deleteUser = function (userId) { 
    let _req = `DELETE from userinfo WHERE userID = '${userId}'`
    return query(_req)
 }

 //  修改用户
 let editUser = function(username, password, userId) {
    let _req = `UPDATE userinfo SET username = '${username}', password = '${password}' WHERE userID = '${userId}' `
    return query(_req)
}
 module.exports = {
     findAdmin,
     addAdmin,
     editAdmin,
     getAdminInfo,
     deleteAdmin,
     findUser,
     findAll,
     getUserInfo,
     deleteUser,
     editUser
 }