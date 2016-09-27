"use strict";

var router = koa_router()

// var res_api       = require('res.api');
var $ = $controllers.products_controller;

// route define
router.get('/', $middlewares.check_api_token, $.api.list);

router.post('/', $middlewares.check_api_token, $.api.create);

router.get('/:product_id', $middlewares.check_api_token, $.api.show);

router.patch('/:product_id', $middlewares.check_api_token, $.api.update);

router.delete('/:product_id', $middlewares.check_api_token, $.api.delete);


// 设置头图
router.post('/set_top_slide/:product_id/:is_top_slide', $middlewares.check_api_token, $.api.set_top_slide);

// 设置首页
router.post('/set_index/:product_id/:is_index', $middlewares.check_api_token, $.api.set_index);

// 设置推荐
router.post('/set_recommend/:product_id/:recommend', $middlewares.check_api_token, $.api.set_recommend);


module.exports = router;
