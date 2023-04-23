"use strict";
const UserStorage = require("./UserStorage")
class User {
    constructor(body) {
        this.body = body;
    }

    async login () {
        const client = this.body;
        try {
            const {id,pw,idx} = await UserStorage.getUserinfo(client.id)
            if (id == client.id && pw == client.pw) {
                return {success : true,msg : "로그인에 성공하셨습니다." , idx : idx};
            } else {
                return {success : false , msg : "비밀번호가 틀렸습니다."}
            }
        } catch(err) {
            return {success : false, msg : "해당 아이디가 존재하지 않습니다."}
        }
    }
}

module.exports = User;