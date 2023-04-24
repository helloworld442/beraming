"use strict";


const User = require('../../models/User');
const Board = require('../../models/Board');
const output = {
    home : (req,res)=>{
        res.render("home/index")
    },
    room : (req,res)=>{
        res.render("home/room/index")
    },
    price : (req,res)=>{
        res.render("home/price/index")
    },
    map : (req,res)=>{
        res.render("home/map/index")
    },
    admin : (req,res)=>{
        res.render("home/admin/index")
    },
    bbs_board : (req,res)=>{
        res.render("home/bbs/board")
    },
    bbs_detail : (req,res)=>{
        res.render("home/bbs/detail")
    },
    bbs_write : (req,res)=>{
        res.render("home/bbs/write")
    },

}

const process = {
    login : async (req,res) => {
		const user = new User(req.body);
		const response = await user.login();
		return res.json(response)
    },
    bbs_board : async (req,res) => {
		const board = new Board(req.body);
		const response = await board.read();
		return res.json(response)
    },
    bbs_write : async (req,res) => {
        console.log(req.file)
		const board = new Board(req.body);
		const response = await board.create();
		return res.json(response)
    },
    bbs_detail : async (req,res) => {
		const board = new Board(req.body);
		const response = await board.readOnlyOne();
		return res.json(response)
    },
    bbs_view : async (req,res) => {
		const board = new Board(req.body);
		const response = await board.updateView();
		return res.json(response)
    },

    bbs_delete : async (req,res) => {
		const board = new Board(req.body);
		const response = await board.delete();
		return res.json(response)
    },
}

module.exports = {
    output,
    process,
}