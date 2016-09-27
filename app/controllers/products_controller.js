"use strict";

/**
 * Created by Moajs on September 20th 2016, 2:22:55 pm.
 */

var Product = $models.product;


exports.list = (ctx, next) => {
  console.log(ctx.method + ' /products => list, query: ' + JSON.stringify(ctx.query));

  return Product.getAllAsync().then(( products)=>{
    return ctx.render('products/index', {
      products : products
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.new = (ctx, next) => {
  console.log(ctx.method + ' /products/new => new, query: ' + JSON.stringify(ctx.query));

  return ctx.render('products/new', {
    product : {
      "_action" : "new"
    }
  })
};

exports.show = (ctx, next) => {
  console.log(ctx.method + ' /products/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
  var id = ctx.params.id;

  return Product.getByIdAsync(id).then( product => {
    console.log(product);
    return ctx.render('detail', {
      product : product
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.edit = (ctx, next) => {
  console.log(ctx.method + ' /products/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  var id = ctx.params.id;

  return Product.getByIdAsync(id).then( product => {
    console.log(product);
    product._action = 'edit';

    return ctx.render('products/edit', {
      product : product
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.create = (ctx, next) => {
  console.log(ctx.method + ' /products => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  return Product.createAsync({name: ctx.request.body.name,detail: ctx.request.body.detail,sales_num: ctx.request.body.sales_num,price: ctx.request.body.price,slides: ctx.request.body.slides,category: ctx.request.body.category,type: ctx.request.body.type,remark: ctx.request.body.remark,created_at: ctx.request.body.created_at,updated_at: ctx.request.body.updated_at,is_delete: ctx.request.body.is_delete,is_index: ctx.request.body.is_index,is_top_slide: ctx.request.body.is_top_slide,recommend: ctx.request.body.recommend}).then( product => {
    console.log(product);
    return ctx.render('products/show', {
      product : product
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.update = (ctx, next) => {
  console.log(ctx.method + ' /products/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

    var id = ctx.params.id;

    return Product.updateById(id,{name: ctx.request.body.name,detail: ctx.request.body.detail,sales_num: ctx.request.body.sales_num,price: ctx.request.body.price,slides: ctx.request.body.slides,category: ctx.request.body.category,type: ctx.request.body.type,remark: ctx.request.body.remark,created_at: ctx.request.body.created_at,updated_at: ctx.request.body.updated_at,is_delete: ctx.request.body.is_delete,is_index: ctx.request.body.is_index,is_top_slide: ctx.request.body.is_top_slide,recommend: ctx.request.body.recommend}).then( product => {
      console.log(product);

      return ctx.body = ({
        data:{
          redirect : '/products/' + id
        },
        status:{
          code : 0,
          msg  : 'delete success!'
        }
      });
    });
};

exports.destroy = (ctx, next) => {
  console.log(ctx.method + ' /products/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
  var id = ctx.params.id;
  return Product.deleteByIdAsync(id).then( () =>{
    return ctx.body= ({
      data:{},
      status:{
        code : 0,
        msg  : 'delete success!'
      }
    });
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

// -- custom

// -- custom api
exports.api = {
  list: (ctx, next) => {
    let api_user_id = ctx.api_user.id;

    return Product.queryAsync({}).then((products) => {
      // return ctx.api({
//         products : products
//       })
      return ctx.body = {
        "total": products.length,
        "rows": products
      }
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  show: (ctx, next) => {
    let api_user_id = ctx.api_user.id;
    var id = ctx.params.product_id;

    return Product.getByIdAsync(id).then((product)=>{
      return ctx.api({
        product : product
      });
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  create: (ctx, next) => {
    let api_user_id = ctx.api_user.id;

    return Product.createAsync({name: ctx.request.body.name,detail: ctx.request.body.detail,sales_num: ctx.request.body.sales_num,price: ctx.request.body.price,slides: ctx.request.body.slides,category: ctx.request.body.category,type: ctx.request.body.type,remark: ctx.request.body.remark,created_at: ctx.request.body.created_at,updated_at: ctx.request.body.updated_at,is_delete: ctx.request.body.is_delete,is_index: ctx.request.body.is_index,is_top_slide: ctx.request.body.is_top_slide,recommend: ctx.request.body.recommend}).then(product=> {
      return ctx.body = ({
        product : product
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });

  },
  update: (ctx, next) => {
    let api_user_id = ctx.api_user.id;
    var id = ctx.params.product_id;
    return Product.updateByIdAsync(id, {name: ctx.request.body.name,detail: ctx.request.body.detail,sales_num: ctx.request.body.sales_num,price: ctx.request.body.price,slides: ctx.request.body.slides,category: ctx.request.body.category,type: ctx.request.body.type,remark: ctx.request.body.remark,created_at: ctx.request.body.created_at,updated_at: ctx.request.body.updated_at,is_delete: ctx.request.body.is_delete,is_index: ctx.request.body.is_index,is_top_slide: ctx.request.body.is_top_slide,recommend: ctx.request.body.recommend}).then(product=> {
      return ctx.api({
        product : product,
        redirect : '/products/' + id
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  // 设置首页
  set_index: (ctx, next) => {
    let api_user_id = ctx.api_user.id;
    var id = ctx.params.product_id;
    console.log('is_index=' + ctx.params.is_index)
    var is_index = ctx.params.is_index == 0? true : false;
    
    console.log({is_index: is_index})
    
    return Product.updateByIdAsync(id, {is_index: is_index}).then(product=> {
      console.dir(product)
      return ctx.api({
        product : product,
        redirect : '/products/' + id
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  // 设置头图
  set_top_slide: (ctx, next) => {
    let api_user_id = ctx.api_user.id;
    var id = ctx.params.product_id;
    var is_top_slide = ctx.params.is_top_slide == 0? true : false;
    
    return Product.updateByIdAsync(id, {is_top_slide: is_top_slide}).then(product=> {
      return ctx.api({
        product : product,
        redirect : '/products/' + id
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  // 设置推荐
  set_recommend: (ctx, next) => {
    let api_user_id = ctx.api_user.id;
    var id = ctx.params.product_id;
    var recommend = ctx.params.recommend == 0? true : false;
    
    return Product.updateByIdAsync(id, {recommend: recommend}).then(product=> {
      return ctx.api({
        product : product,
        redirect : '/products/' + id
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  
  
  delete: (ctx, next) => {
    let api_user_id = ctx.api_user.id;
    var id = ctx.params.product_id;

    return Product.deleteByIdAsync(id).then(function(){
      return ctx.api({id: id})
    }).catch((err)=>{
      return ctx.api_error(err);
    }); 
  }
}
