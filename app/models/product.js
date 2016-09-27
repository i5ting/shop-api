"use strict";

/**
 * Created by alfred on September 20th 2016, 2:04:35 pm.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

// - name 商品名称
// - sales_num 销量（分类列表-排序）
// - price价格￥15.00（分类列表-排序）
// - slides头图（数组）
// - category所属菜单（春）
// - type所属分类（年份：0~1年）
// - remark 备注（* 7 天无理由退货，15 天免费换货，满 150 元免运费。）
// - 创建时间
// - 更新时间
// - 是否显示
// - 是否首页
// - 是否头图
// - 是否推荐

var productSchema = new Schema(
  {
    "name": { // 商品名称
      type: String, 
      index: {
        unique: true
      }
    },
    "detail": { // 图文详情
      type: String, 
      index: true
    },
    "sales_num": { // 销量（分类列表-排序）
      type: Number, 
      default: 0 
    },
    "price": { // 价格￥15.00（分类列表-排序）
      type: Number, 
      default: 0 
    },
    "slides": [],// 头图（数组）
    "category": { // 所属菜单（春）
      type: String, 
      index: true
    },
    "type": { // 所属分类（年份：0~1年）
      type: String, 
      index: true
    },
    "remark": { // 备注
      type: String, 
      default: '（* 7 天无理由退货，15 天免费换货，满 150 元免运费。）' 
    },
    "created_at": { 
      type: Date, 
      default: Date.now 
    },
    "updated_at": { 
      type: Date, default: Date.now 
    },
    "is_delete": { // 是否显示
      type: Boolean, index: true 
    },
    "is_index": { // 是否首页
      type: Boolean, index: true 
    },
    "is_top_slide": { // 是否头图
      type: Boolean, index: true 
    },
    "recommend": { // 是否推荐
      type: Boolean, index: true 
    }
  }
);

var Product = mongoose.model('Product', productSchema);
var ProductDao = new MongooseDao(Product);
 
module.exports = ProductDao;