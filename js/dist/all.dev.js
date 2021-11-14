"use strict";

//select city
var selectCity = document.querySelector('.dropdown-item');

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  var AppID = '0ce2de35acca43539901f04afbe3d23a';
  var AppKey = 'jSgx5wLwG5g6D6Rb4B-17MM3wPI'; //  填入自己 ID、KEY 結束

  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return {
    'Authorization': Authorization,
    'X-Date': GMTString
  };
} //首頁-精選活動


function initActivity(category, count) {
  axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/".concat(category, "?$filter=Picture%2FPictureUrl1%20ne%20null&$top=").concat(count, "&$format=JSON"), {
    headers: getAuthorizationHeader()
  }).then(function (res) {
    console.log(res.data);
    var str = '';
    res.data.forEach(function (item, index) {
      str += "<div class=\"col-md-6 col-sm-12 col-12 mb-4\">\n                        <div class=\"card card-activity\">\n                            <img class=\"card-img-top\" src=\"".concat(res.data[index].Picture.PictureUrl1, "\">\n                            <div class=\"card-body\">\n                                <h2 class=\"card-title\">").concat(res.data[index].Name, "</h2>\n                                <div class=\"d-flex justify-content-start align-items-end py-2\">\n                                    <div class=\"font-weight-bold pr-2\">\u6642\u9593</div>\n                                    <small>").concat(res.data[index].StartTime.slice(0, 10).replace(new RegExp('-', 'g'), '/'), " - ").concat(res.data[index].EndTime.slice(0, 10).replace(new RegExp('-', 'g'), '/'), "</small>                                    \n                                </div>\n                                <div class=\"d-flex justify-content-start align-items-end py-2\">\n                                    <div class=\"font-weight-bold pr-2\">\u5730\u9EDE</div>\n                                    <small>").concat(res.data[index].Location, "</small>                                    \n                                </div>\n                                <p>").concat(res.data[index].Description, "</p>\n                                <div class=\"d-flex justify-content-end\">\n                                    <div class=\"button rounded-pill justify-content-end\">\u6D3B\u52D5\u8A73\u60C5</div>\n                                </div>\n                            </div>\n                        </div>                    \n                    </div>");
    });
    document.querySelector(".".concat(category, "_section")).innerHTML = str;
  })["catch"](function (error) {
    console.log(error);
  });
} //首頁-熱門景點、推薦美食、住宿飯店


function initLandmark(category, count) {
  axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/".concat(category, "?$filter=Picture%2FPictureUrl1%20ne%20null&$top=").concat(count, "&$format=JSON"), {
    headers: getAuthorizationHeader()
  }).then(function (res) {
    console.log(res.data);
    var str = '';
    res.data.forEach(function (item, index) {
      str += "<div class=\"owl-item\">\n                            <div class=\"card card-target mx-auto\">\n                                <img src=\"".concat(res.data[index].Picture.PictureUrl1, "\" alt=\"photo\" class=\"card-img-top\">\n                                <div class=\"card-body\">\n                                    <h2 class=\"card-title\">").concat(res.data[index].Name, "</h2>\n                                    <div class=\"d-flex justify-content-start align-items-end\">\n                                        <img class=\"pr-2\" src=\"images/map-lable.svg\" style=\"width: auto; height: 20px;\">\n                                        <span>").concat(res.data[index].Address.slice(0, 6), "</span>                                    \n                                    </div>\n                                </div>\n                            </div>\n                        </div> ");
    });
    document.querySelector(".".concat(category, "_section")).innerHTML = str;
  })["catch"](function (error) {
    console.log(error);
  });
}

initActivity('Activity', 4);