const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join("/")} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(":")}`;
};
// 获取年月
const getDate = (date) => {
  date = Number(date);
  var day2 = date ? new Date(date) : new Date();
  day2.setTime(day2.getTime());
  var s2 =
    day2.getFullYear() +
    "-" +
    (day2.getMonth() + 1) +
    "-" +
    (day2.getDate() > 10 ? day2.getDate() : "0" + day2.getDate());
  var s1 = day2.getFullYear() + "-" + (day2.getMonth() + 1);
  return date ? s2 : s1;
};
const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

function getDay(num, str) {
  var today = new Date();
  var nowTime = today.getTime();
  var ms = 24 * 3600 * 1000 * num;
  today.setTime(parseInt(nowTime + ms));
  var oYear = today.getFullYear();
  var oMoth = (today.getMonth() + 1).toString();
  if (oMoth.length <= 1) oMoth = "0" + oMoth;
  var oDay = today.getDate().toString();
  if (oDay.length <= 1) oDay = "0" + oDay;
  return oYear + str + oMoth + str + oDay;
}
// 格式化日期
function formatDate(date) {
  date= date.toString().length<=10?Number(date)*1000:Number(date)
  date = new Date(date);
  let myyear = date.getFullYear();
  let mymonth = date.getMonth() + 1;
  let myweekday = date.getDate();
  mymonth < 10 ? (mymonth = "0" + mymonth) : mymonth;
  myweekday < 10 ? (myweekday = "0" + myweekday) : myweekday;
  return `${myyear}-${mymonth}-${myweekday}`;
}
// 获取当前月的天数
function mGetDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var d = new Date(year, month, 0);
  return d.getDate();
}
// 获取周几
function getWeek(dateString) {
  var dateArray = dateString.split("-");
  let date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
  return "周" + "日一二三四五六".charAt(date.getDay());
}
// 获取本周的日期
function getWeekDay() {
  let dateString = formatDate(new Date()); //当天的日期，例如2020-2-28
  let presentDate = new Date(dateString);
  let today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;
  return Array.from(new Array(7), function (val, index) {
    return formatDate(
      new Date(
        presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000
      )
    );
  });
}
// 获取当前月的所有日期
function getNowM(item) {
  let now = item ? new Date(item) : new Date();
  let current_month_num = mGetDate();
  let newdate = new Date(getDate(new Date())).getTime();
  let current_month = [];
  for (let i = 1; i <= current_month_num; i++) {
    let day = now.setDate(i);
    if (day >= newdate) {
      let everyDay = formatDate(day);
      current_month.push(everyDay);
    }
  }
  return current_month;
}

module.exports = {
  formatTime,
  getDate,
  getWeekDay,
  mGetDate,
  formatDate,
  getDay,
  getWeek,
  getNowM,
};
