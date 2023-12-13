export function getDate() {
  let date = new Date();
  let year = date.getFullYear();    //  返回的是年份
  let month = date.getMonth() + 1;  //  返回的月份上个月的月份，记得+1才是当月
  let dates = date.getDate();       //  返回的是几号
  let hours = date.getHours();       //获取当前小时数(0-23)
  let minutes = date.getMinutes();     //获取当前分钟数(0-59)
  let seconds = date.getSeconds();
  let day = date.getDay();          //  周一返回的是1，周六是6，但是周日是0
  let arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",];
  return `${year}${month}${dates}${hours}${minutes}${seconds}`;
  // return `${dates}${hours}${minutes}${seconds}`;
}

export function timestampToTime(e) {
  let date = new Date(e);
  let year = date.getFullYear();    //  返回的是年份
  let month = date.getMonth() + 1;  //  返回的月份上个月的月份，记得+1才是当月
  let dates = date.getDate();       //  返回的是几号
  let hours = date.getHours();       //获取当前小时数(0-23)
  let minutes = date.getMinutes();     //获取当前分钟数(0-59)
  if(String(minutes).length == 1){
    minutes = '0'+ minutes
  }
  let seconds = date.getSeconds();
  let day = date.getDay();          //  周一返回的是1，周六是6，但是周日是0
  let arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",];
  return `${year}-${month}-${dates} ${hours}:${minutes}`;
}
export function timestampToTime2(e) {
  let date = new Date(e);
  let year = date.getFullYear();    //  返回的是年份
  let month = date.getMonth() + 1;  //  返回的月份上个月的月份，记得+1才是当月
  let dates = date.getDate();       //  返回的是几号
  let hours = date.getHours();       //获取当前小时数(0-23)
  let minutes = date.getMinutes();     //获取当前分钟数(0-59)
  let seconds = date.getSeconds();
  let day = date.getDay();          //  周一返回的是1，周六是6，但是周日是0
  let arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",];
  return `${year}${month}${dates}${hours}${minutes}`;
}

export function millisecondToSEcond(time) {
  time = Number(time)
  let h = parseInt(time / 60 / 60 % 24)
  h = h < 10 ? '0' + h : h
  let m = parseInt(time / 60 % 60)
  m = m < 10 ? '0' + m : m
  let s = parseInt(time % 60)
  s = s < 10 ? '0' + s : s
  return `${m}:${s}`
}
