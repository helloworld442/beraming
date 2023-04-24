"use strict";
const express = require('express');
const router = express.Router();
const ctrl = require('./home.ctrl.js')


router.get('/',ctrl.output.home)
router.get('/room',ctrl.output.room)
router.get('/map',ctrl.output.map)
router.get('/price',ctrl.output.price)
router.get('/admin',ctrl.output.admin)
router.get('/bbs/board',ctrl.output.bbs_board)
router.get('/bbs/write',ctrl.output.bbs_write)
router.get('/bbs/detail',ctrl.output.bbs_detail)



router.post('/login',ctrl.process.login)
router.post('/bbs/board',ctrl.process.bbs_board)
router.post('/bbs/write',ctrl.process.bbs_write)
router.post('/bbs/detail',ctrl.process.bbs_detail)
router.post('/bbs/view',ctrl.process.bbs_view)
router.post('/bbs/delete',ctrl.process.bbs_delete)
module.exports = router;