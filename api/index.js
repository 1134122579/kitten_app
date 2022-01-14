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
  edit_cat(params) {
    return fly({
      url: `edit_cat`,
      method: "post",
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
  getFollowDynamic(params) {
    return fly({
      url: `getFollowDynamic`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getHotClass(params) {
    return fly({
      url: `getHotClass`,
      method: "get",
      params,
      isThree: false,
    });
  },
  getUserCollect(params) {
    return fly({
      url: `getUserCollect`,
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
  //   证书查询
  queryCertOrder(params) {
    return fly({
      url: `queryCertOrder`,
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
  JoinCatVote(params) {
    return fly({
      url: `JoinCatVote`,
      method: "post",
      params,
      isThree: false,
    });
  },
  get_match(params) {
    return fly({
      url: `get_match`,
      method: "post",
      params,
      isThree: false,
    });
  },
  get_match_details(params) {
    return fly({
      url: `get_match_details`,
      method: "post",
      params,
      isThree: false,
    });
  },
  joinMatch(params) {
    return fly({
      url: `joinMatch`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getUserCatList(params) {
    return fly({
      url: `getUserCatList`,
      method: "post",
      params,
      isThree: false,
    });
  },
  addFollow(params) {
    return fly({
      url: `addFollow`,
      method: "post",
      params,
      isThree: false,
    });
  },
  cancelComment(params) {
    return fly({
      url: `cancelComment`,
      method: "post",
      params,
      isThree: false,
    });
  },
  onzanLike(params) {
    return fly({
      url: `zan_cat`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getHotLable(params) {
    return fly({
      url: `getHotLable`,
      method: "get",
      params,
      isThree: false,
    });
  },
  getFollow(params) {
    return fly({
      url: `getFollow`,
      method: "post",
      params,
      isThree: false,
    });
  },
  cancelCollect(params) {
    return fly({
      url: `cancelCollect`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getMyfans(params) {
    return fly({
      url: `getMyfans`,
      method: "post",
      params,
      isThree: false,
    });
  },
  cacheFollow(params) {
    return fly({
      url: `cacheFollow`,
      method: "post",
      params,
      isThree: false,
    });
  },
  addFollow(params) {
    return fly({
      url: `addFollow`,
      method: "post",
      params,
      isThree: false,
    });
  },
  addDynamic(params) {
    return fly({
      url: `addDynamic`,
      method: "post",
      params,
      isThree: false,
    });
  },
  add_cat(params) {
    return fly({
      url: `add_cat`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getCatdetails(params) {
    return fly({
      url: `getCatdetails`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getCatClass(params) {
    return fly({
      url: `getCatClass`,
      method: "get",
      params,
      isThree: false,
    });
  },
  payCertOrder(params) {
    return fly({
      url: `payCertOrder`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getSelectCatList(params) {
    return fly({
      url: `getSelectCatList`,
      method: "get",
      params,
      isThree: false,
    });
  },
  getCatList(params) {
    return fly({
      url: `getCatList`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getDynamic(params) {
    return fly({
      url: `getDynamic`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getDynamicDetails(params) {
    return fly({
      url: `getDynamicDetails`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getComment(params) {
    return fly({
      url: `getComment`,
      method: "post",
      params,
      isThree: false,
    });
  },
  addComment(params) {
    return fly({
      url: `addComment`,
      method: "post",
      params,
      isThree: false,
    });
  },
  addCollect(params) {
    return fly({
      url: `addCollect`,
      method: "post",
      params,
      isThree: false,
    });
  },
  replyComment(params) {
    return fly({
      url: `replyComment`,
      method: "post",
      params,
      isThree: false,
    });
  },
  zanComment(params) {
    return fly({
      url: `zanComment`,
      method: "post",
      params,
      isThree: false,
    });
  },
  zanDynamic(params) {
    return fly({
      url: `zanDynamic`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getMatchImg(params) {
    return fly({
      url: `getMatchImg`,
      method: "post",
      params,
      isThree: false,
    });
  },
  matchGroup(params) {
    return fly({
      url: `matchGroup`,
      method: "get",
      params,
      isThree: false,
    });
  },
  payMatchOrder(params) {
    return fly({
      url: `payMatchOrder`,
      method: "post",
      params,
      isThree: false,
    });
  },
  queryMatchOrder(params) {
    return fly({
      url: `queryMatchOrder`,
      method: "post",
      params,
      isThree: false,
    });
  },
  
};
