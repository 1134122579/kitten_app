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
      loading: false,
      isThree: false,
    });
  },
  getUserInfo(params) {
    return fly({
      url: `getUserInfo`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  ckeckToken(params) {
    return fly({
      url: `checkToken`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  delCat(params) {
    return fly({
      url: `delCat`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  
  
  getSelectMathCity(params) {
    return fly({
      url: `getSelectMathCity`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getSelectMathDate(params) {
    return fly({
      url: `getSelectMathDate`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getSelectMathCompetition(params) {
    return fly({
      url: `getSelectMathCompetition`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getSelectMathGroup(params) {
    return fly({
      url: `getSelectMathGroup`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  wxlogin(params) {
    return fly({
      url: `wxlogin`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getMatchScore(params) {
    return fly({
      url: `getMatchScore`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getUserRecharge(params) {
    return fly({
      url: `getUserRecharge`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  edit_cat(params) {
    return fly({
      url: `edit_cat`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  shopCount(params) {
    return fly({
      url: `shopCount`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  }, // 门店列表
  getShop(params) {
    return fly({
      url: `getShop`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },

  getShopDetails(params) {
    return fly({
      url: `getShopDetails`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  makeOrderUseCoupon(params) {
    return fly({
      url: `makeOrderUseCoupon`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getAboutDynamic(params) {
    return fly({
      url: `getAboutDynamic`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  cancelOrder(params) {
    return fly({
      url: `cancelOrder`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getFollowDynamic(params) {
    return fly({
      url: `getFollowDynamic`,
      method: "post",
      params,
      loading: true,
      isThree: false,
    });
  },
  getHotClass(params) {
    return fly({
      url: `getHotClass`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getAboutCatHome(params) {
    return fly({
      url: `getAboutCatHome`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getUserCollect(params) {
    return fly({
      url: `getUserCollect`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  add_order(params) {
    return fly({
      url: `add_order`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getProduct(params) {
    return fly({
      url: `getProduct`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getUserCoupon(params) {
    return fly({
      url: `getUserCoupon`,
      method: "get",
      params,
      loading: false,
      isThree: false, //=======================
    });
  },
  shopRechargeOrder(params) {
    return fly({
      url: `shopRechargeOrder`,
      method: "post",
      params,
      loading: false,
      isThree: false, //=======================
    });
  },
  makeOrder(params) {
    return fly({
      url: `makeOrder`,
      method: "post",
      params,
      loading: false,
      isThree: false, //=======================
    });
  },
  getNews(params) {
    return fly({
      url: `getNews`,
      method: "get",
      params,
      loading: false,
      isThree: false, //=======================
    });
  },
  getNewsDetails(params) {
    return fly({
      url: `getNewsDetails`,
      method: "get",
      params,
      loading: false,
      isThree: false, //=======================
    });
  },
  exchangeVip(params) {
    return fly({
      url: `exchangeVip`,
      method: "post",
      params,
      loading: false,
      isThree: false, //=======================
    });
  },
  exchangeCoupon(params) {
    return fly({
      url: `exchangeCoupon`,
      method: "post",
      params,
      loading: false,
      isThree: false, //=======================
    });
  },
  getClass(params) {
    return fly({
      url: `getClass`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  payCarOrder(params) {
    return fly({
      url: `payCarOrder`,
      method: "post",
      params,
      loading: false,
      isThree: true, //=======================
    });
  },
  rechargeOrder(params) {
    return fly({
      url: `rechargeOrder`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  queryCertOrder(params) {
    return fly({
      url: `queryCertOrder`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  upImage(params) {
    return fly({
      url: `upImage`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  get_order(params) {
    return fly({
      url: `queryorder`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getRoom(params) {
    return fly({
      url: `getRoom`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getBanner(params) {
    return fly({
      url: `getBanner`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getActivity(params) {
    return fly({
      url: `getActivity`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getActivityDetails(params) {
    return fly({
      url: `getActivityDetails`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },


  payVipOrder(params) {
    return fly({
      url: `payVipOrder`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },

  payRoomOrder(params) {
    return fly({
      url: `payRoomOrder`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getRoomDetails(params) {
    return fly({
      url: `getRoomDetails`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  queryQueueRoom(params) {
    return fly({
      url: `queryQueueRoom`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  editCar(params) {
    return fly({
      url: `editCar`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  addCar(params) {
    return fly({
      url: `addCar`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getUserCar(params) {
    return fly({
      url: `getUserCar`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  editUserInfo(params) {
    return fly({
      url: `editUserInfo`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getVipDesc(params) {
    return fly({
      url: `getVipDesc`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getVip(params) {
    return fly({
      url: `getVip`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getUserRank(params) {
    return fly({
      url: `getUserRank`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getUserOrder(params) {
    return fly({
      url: `getUserOrder`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getUserOrderLog(params) {
    return fly({
      url: `getUserOrderLog`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  queryOrder(params) {
    return fly({
      url: `queryOrder`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  nextPayRoomOrder(params) {
    return fly({
      url: `nextPayRoomOrder`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  userVisit(params) {
    return fly({
      url: `userVisit`,
      method: "post",
      params,
      loading: false,
      isThree: true,
    });
  },
  catVoteList(params) {
    return fly({
      url: `catVoteList`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  get_vote_rule(params) {
    return fly({
      url: `get_vote_rule`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  join_vote(params) {
    return fly({
      url: `join_vote`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  JoinCatVote(params) {
    return fly({
      url: `JoinCatVote`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  get_match(params) {
    return fly({
      url: `get_match`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  get_match_details(params) {
    return fly({
      url: `get_match_details`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  joinMatch(params) {
    return fly({
      url: `joinMatch`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getUserCatList(params) {
    return fly({
      url: `getUserCatList`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  addFollow(params) {
    return fly({
      url: `addFollow`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  cancelComment(params) {
    return fly({
      url: `cancelComment`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  onzanLike(params) {
    return fly({
      url: `zan_cat`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getHotLable(params) {
    return fly({
      url: `getHotLable`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getFollow(params) {
    return fly({
      url: `getFollow`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  cancelCollect(params) {
    return fly({
      url: `cancelCollect`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getMyfans(params) {
    return fly({
      url: `getMyfans`,
      method: "post",
      params,
      loading: true,
      isThree: false,
    });
  },
  cacheFollow(params) {
    return fly({
      url: `cacheFollow`,
      method: "post",
      params,
      loading: true,
      isThree: false,
    });
  },
  addFollow(params) {
    return fly({
      url: `addFollow`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  addDynamic(params) {
    return fly({
      url: `addDynamic`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  add_cat(params) {
    return fly({
      url: `add_cat`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getCatdetails(params) {
    return fly({
      url: `getCatdetails`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getCatClass(params) {
    return fly({
      url: `getCatClass`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  payCertOrder(params) {
    return fly({
      url: `payCertOrder`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getSelectCatList(params) {
    return fly({
      url: `getSelectCatList`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getCatList(params) {
    return fly({
      url: `getCatList`,
      method: "post",
      params,
      loading: true,
      isThree: false,
    });
  },
  getDynamic(params) {
    return fly({
      url: `getDynamic`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getDynamicDetails(params) {
    return fly({
      url: `getDynamicDetails`,
      method: "post",
      params,
      loading: true,
      isThree: false,
    });
  },
  getPzDetial(params) {
    return fly({
      url: `getPzDetial`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  getComment(params) {
    return fly({
      url: `getComment`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  addComment(params) {
    return fly({
      url: `addComment`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  addCollect(params) {
    return fly({
      url: `addCollect`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  replyComment(params) {
    return fly({
      url: `replyComment`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  zanComment(params) {
    return fly({
      url: `zanComment`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  zanDynamic(params) {
    return fly({
      url: `zanDynamic`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getMatchImg(params) {
    return fly({
      url: `getMatchImg`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  matchGroup(params) {
    return fly({
      url: `matchGroup`,
      method: "get",
      params,
      loading: false,
      isThree: false,
    });
  },
  payMatchOrder(params) {
    return fly({
      url: `payMatchOrder`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  queryMatchOrder(params) {
    return fly({
      url: `queryMatchOrder`,
      method: "post",
      params,
      loading: false,
      isThree: false,
    });
  },
  getUserMatchOrder(params) {
    return fly({
      url: `getUserMatchOrder`,
      method: "post",
      params,
      loading: true,
      isThree: false,
    });
  },
          
cancelOrder(params) {
    return fly({
      url: `cancelOrder`,
      method: "post",
      params,
      loading: true,
      isThree: false,
    });
  },
  delDynamic(params) {
    return fly({
      url: `delDynamic`,
      method: "post",
      params,
      loading: true,
      isThree: false,
    });
  },
  getOrderCopyInfo(params) {
    return fly({
      url: `getOrderCopyInfo`,
      method: "post",
      params,
      loading: true,
      isThree: false,
    });
  },
};
