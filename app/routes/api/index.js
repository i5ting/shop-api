var router = koa_router()
router.get('/', function (ctx, next) {
  ctx.body = 'this a /api response 2!';
});

module.exports = router;
