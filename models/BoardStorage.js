'use strict';

const db = require('../config/db.conn')
class BoardStorage {
 

    static getBoardinfo() {
        return new Promise((resolve,reject) => {
            const query = "SELECT * FROM info_board";
            db.query(query,(err,data)=>{
                if(err) reject({success : false , msg : `${err}`});
                resolve({success : true, data : data})
            })
        })
    }


    static getOneBoardinfo(id) {
        return new Promise((resolve,reject) => {
            const query = "SELECT * FROM info_board WHERE id = ?";
            db.query(query,[id],(err,data)=>{
                if(err) reject({success : false , msg : `${err}`});
                resolve({success : true, data : data[0]})
            })
        })
    }


    static setBoardinfo(body) {
        return new Promise((resolve,reject) => {
            const query = "INSERT INTO info_board (idx, writer, wdate, title, pw, content, view) VALUES (?, ?, ?, ?, ?, ?, ?)"
            db.query(query, [body.idx, body.name, body.wdate, body.title, body.pw, body.content, 0] , (err,data)=>{
                if(err) reject({success : false , msg : `${err}`});
                resolve({success : true, msg : '정상적으로 업로드 되었습니다.'})
            })
        })
    }

    static updateBoardView(id) {
        return new Promise((resolve,reject) => {
            const query = "UPDATE info_board SET view = view + 1 WHERE id = ?"
            db.query(query,[id],(err,data)=>{
                if(err) reject({success : false , msg : `${err}`});
                resolve({success : true})
            })
        })
    }

    static deleteBoardinfo(id) {
        return new Promise((resolve,reject) => {
            const query = "DELETE FROM info_board WHERE id = ?"
            db.query(query,[id],(err,data)=>{
                if(err) reject({success : false , msg : `${err}`});
                resolve({success : true, msg : "성공적으로 게시물이 삭제됬습니다."})
            })
        })
    }
    
}

module.exports = BoardStorage;