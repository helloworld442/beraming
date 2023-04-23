"use strict";
const BoardStorage = require("./BoardStorage")
class Board {
    constructor(body) {
        this.body = body;
    }

    async create() {
        const client = this.body;
        try {
            const response = BoardStorage.setBoardinfo(client);
            return response
        } catch(err) {
            return {success : false, msg : "업로드 중 에러가 발생했습니다."}
        }
    }

    async read() {
        try {
            const response = BoardStorage.getBoardinfo();
            return response
        } catch(err) {
            return {success : false, msg : "불러오는 중에 에러가 발생했습니다."}
        }
    }
    
    async readOnlyOne() {
        
        const client = this.body;
        
        try {
            const response = BoardStorage.getOneBoardinfo(client.id);
            return response
        } catch(err) {
            return {success : false, msg : "불러오는 중에 에러가 발생했습니다."}
        }
    }

    async updateView() {
        
        const client = this.body
        try {
            const response = BoardStorage.updateBoardView(client.id);
            return response
        } catch(err) {
            return {success : false, msg : "에러가 발생했습니다."}
        }
    }
    
}

module.exports = Board;