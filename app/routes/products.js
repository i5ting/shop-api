"use strict";

var router = koa_router()

// core controller
var $ = $controllers.products_controller;

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /products[/]        => product.list()
 *  GET    /products/new       => product.new()
 *  GET    /products/:id       => product.show()
 *  GET    /products/:id/edit  => product.edit()
 *  POST   /products[/]        => product.create()
 *  PATCH  /products/:id       => product.update()
 *  DELETE /products/:id       => product.destroy()
 *
 */

router.get('/new', $.new); 
 
router.get('/:id/edit', $.edit);

router.get('/', $.list);

router.post('/', $.create);

router.get('/:id', $.show);

router.patch('/:id', $.update);

router.delete('/:id', $.destroy);

// -- custom routes




module.exports = router;