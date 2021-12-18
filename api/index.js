/*
 * @Author: your name
 * @Date: 2021-06-28 11:36:37
 * @LastEditTime: 2021-06-30 14:01:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \answer\api\index.js
 */
import fly from "../utils/instance";
export default {
  // 登录获取登录token
  wx_mini_login(params) {
    return fly({
      url: `wx_mini_login`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getUserInfo(params) {
    return fly({
      url: `getUserInfo`,
      method: "get",
      params,
      isThree: false,
    });
  },
  ckeckToken(params) {
    return fly({
      url: `checkToken`,
      method: "post",
      params,
      isThree: false,
    });
  },
  wxlogin(params) {
    return fly({
      url: `wxlogin`,
      method: "post",
      params,
      isThree: false,
    });
  },
  // 充值明细
  getUserRecharge(params) {
    return fly({
      url: `getUserRecharge`,
      method: "get",
      params,
      isThree: false,
    });
  },
  // 客流评估
  shopCount(params) {
    return fly({
      url: `shopCount`,
      method: "post",
      params,
      isThree: false,
    });
  },  // 门店列表
  getShop(params) {
    return fly({
      url: `getShop`,
      method: "get",
      params,
      isThree: false,
    });
  },
  getShopDetails(params) {
    return fly({
      url: `getShopDetails`,
      method: "get",
      params,
      isThree: false,
    });
  },
  makeOrderUseCoupon(params) {
    return fly({
      url: `makeOrderUseCoupon`,
      method: "post",
      params,
      isThree: false,
    });
  },
  cancelOrder(params) {
    return fly({
      url: `cancelOrder`,
      method: "post",
      params,
      isThree: false,
    });
  },
  // 上传完成
  add_order(params) {
    return fly({
      url: `add_order`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getProduct(params) {
    return fly({
      url: `getProduct`,
      method: "get",
      params,
      isThree: false,
    });
  },
  getUserCoupon(params) {
    return fly({
      url: `getUserCoupon`,
      method: "get",
      params,
      isThree: false, //=======================
    });
  },
  shopRechargeOrder(params) {
    return fly({
      url: `shopRechargeOrder`,
      method: "post",
      params,
      isThree: false, //=======================
    });
  },
  makeOrder(params) {
    return fly({
      url: `makeOrder`,
      method: "post",
      params,
      isThree: false, //=======================
    });
  },
  // 企业动态
  getNews(params) {
    return fly({
      url: `getNews`,
      method: "get",
      params,
      isThree: false, //=======================
    });
  },
  // 动态详情
  getNewsDetails(params) {
    return fly({
      url: `getNewsDetails`,
      method: "get",
      params,
      isThree: false, //=======================
    });
  },
  // vipdui兑换
  exchangeVip(params) {
    return fly({
      url: `exchangeVip`,
      method: "post",
      params,
      isThree: false, //=======================
    });
  },
  // 兑换优惠券
  exchangeCoupon(params) {
    return fly({
      url: `exchangeCoupon`,
      method: "post",
      params,
      isThree: false, //=======================
    });
  },
  //   项目
  getClass(params) {
    return fly({
      url: `getClass`,
      method: "get",
      params,
      isThree: false,
    });
  },
  //   立即支付（消费订单）
  payCarOrder(params) {
    return fly({
      url: `payCarOrder`,
      method: "post",
      params,
      isThree: true, //=======================
    });
  },

  //   充值

  rechargeOrder(params) {
    return fly({
      url: `rechargeOrder`,
      method: "post",
      params,
      isThree: false,
    });
  },
  //   充值查询

  queryRechargeOrder(params) {
    return fly({
      url: `queryRechargeOrder`,
      method: "post",
      params,
      isThree: false,
    });
  },
  //   上传文件
  upImage(params) {
    return fly({
      url: `upImage`,
      method: "post",
      params,
      isThree: false,
    });
  },
  get_order(params) {
    return fly({
      url: `queryorder`,
      method: "post",
      params,
      isThree: false,
    });
  },
  // 获取舞蹈室 /getRoom
  getRoom(params) {
    return fly({
      url: `getRoom`,
      method: "get",
      params,
      isThree: false,
    });
  },
  // 轮播图 /getBanner
  getBanner(params) {
    return fly({
      url: `getBanner`,
      method: "get",
      params,
      isThree: false,
    });
  },
  // 活动列表 /getActivity
  getActivity(params) {
    return fly({
      url: `getActivity`,
      method: "get",
      params,
      isThree: false,
    });
  },
  // 活动详情 /getActivityDetails
  getActivityDetails(params) {
    return fly({
      url: `getActivityDetails`,
      method: "get",
      params,
      isThree: false,
    });
  },

  // 微信支付会员费 /payVipOrder

  payVipOrder(params) {
    return fly({
      url: `payVipOrder`,
      method: "post",
      params,
      isThree: false,
    });
  },

  // 支付舞蹈室费用 /payRoomOrder
  payRoomOrder(params) {
    return fly({
      url: `payRoomOrder`,
      method: "post",
      params,
      isThree: false,
    });
  },
  // 舞蹈室详情
  getRoomDetails(params) {
    return fly({
      url: `getRoomDetails`,
      method: "get",
      params,
      isThree: false,
    });
  },
  queryQueueRoom(params) {
    return fly({
      url: `queryQueueRoom`,
      method: "post",
      params,
      isThree: false,
    });
  },
  // 修改车辆
  editCar(params) {
    return fly({
      url: `editCar`,
      method: "post",
      params,
      isThree: false,
    });
  },
  addCar(params) {
    return fly({
      url: `addCar`,
      method: "post",
      params,
      isThree: false,
    });
  },
  // 获取车辆列表
  getUserCar(params) {
    return fly({
      url: `getUserCar`,
      method: "get",
      params,
      isThree: false,
    });
  },
  // 修改用户信息
  editUserInfo(params) {
    return fly({
      url: `editUserInfo`,
      method: "post",
      params,
      isThree: false,
    });
  },
  // 会员权益
  getVipDesc(params) {
    return fly({
      url: `getVipDesc`,
      method: "get",
      params,
      isThree: false,
    });
  },
  getVip(params) {
    return fly({
      url: `getVip`,
      method: "get",
      params,
      isThree: false,
    });
  },
  getUserRank(params) {
    return fly({
      url: `getUserRank`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getUserOrder(params) {
    return fly({
      url: `getUserOrder`,
      method: "get",
      params,
      isThree: false,
    });
  },
  getUserOrderLog(params) {
    return fly({
      url: `getUserOrderLog`,
      method: "get",
      params,
      isThree: false,
    });
  },
  queryOrder(params) {
    return fly({
      url: `queryOrder`,
      method: "post",
      params,
      isThree: false,
    });
  },
  nextPayRoomOrder(params) {
    return fly({
      url: `nextPayRoomOrder`,
      method: "post",
      params,
      isThree: false,
    });
  },
  userVisit(params) {
    return fly({
      url: `userVisit`,
      method: "post",
      params,
      isThree: true,
    });
  },
  catVoteList(params) {
    return fly({
      url: `catVoteList`,
      method: "post",
      params,
      isThree: false,
    });
  },
  get_vote_rule(params) {
    return fly({
      url: `get_vote_rule`,
      method: "get",
      params,
      isThree: false,
    });
  },
  join_vote(params) {
    return fly({
      url: `join_vote`,
      method: "post",
      params,
      isThree: false,
    });
  },


  
};
