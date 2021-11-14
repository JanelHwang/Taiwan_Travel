//select city
const selectCity = document.querySelector('.dropdown-item');

function getAuthorizationHeader() {
//  填入自己 ID、KEY 開始
    let AppID = '0ce2de35acca43539901f04afbe3d23a';
    let AppKey = 'jSgx5wLwG5g6D6Rb4B-17MM3wPI';
//  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization, 'X-Date': GMTString }; 
}

//首頁-精選活動
function initActivity(category,count){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/${category}?$filter=Picture%2FPictureUrl1%20ne%20null&$top=${count}&$format=JSON`,{
    headers: getAuthorizationHeader()
 })
 .then(function(res){
     console.log(res.data);
    
    let str = '';
    res.data.forEach(function(item,index){
            str += `<div class="col-md-6 col-sm-12 col-12 mb-4">
                        <div class="card card-activity">
                            <img class="card-img-top" src="${res.data[index].Picture.PictureUrl1}">
                            <div class="card-body">
                                <h2 class="card-title">${res.data[index].Name}</h2>
                                <div class="d-flex justify-content-start align-items-end py-2">
                                    <div class="font-weight-bold pr-2">時間</div>
                                    <small>${res.data[index].StartTime.slice(0,10).replace(new RegExp('-', 'g'), '/')} - ${res.data[index].EndTime.slice(0,10).replace(new RegExp('-', 'g'), '/')}</small>                                    
                                </div>
                                <div class="d-flex justify-content-start align-items-end py-2">
                                    <div class="font-weight-bold pr-2">地點</div>
                                    <small>${res.data[index].Location}</small>                                    
                                </div>
                                <p>${res.data[index].Description}</p>
                                <div class="d-flex justify-content-end">
                                    <div class="button rounded-pill justify-content-end">活動詳情</div>
                                </div>
                            </div>
                        </div>                    
                    </div>`;
        })
    document.querySelector(`.${category}_section`).innerHTML = str ;
 
 })
 .catch((error)=>{
     console.log(error);
 })
}



//首頁-熱門景點、推薦美食、住宿飯店
function initLandmark(category,count){
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/${category}?$filter=Picture%2FPictureUrl1%20ne%20null&$top=${count}&$format=JSON`,{
    headers: getAuthorizationHeader()
 })
 .then(function(res){
     console.log(res.data);
    
    let str = '';
    res.data.forEach(function(item,index){
                str += `<div class="owl-item">
                            <div class="card card-target mx-auto">
                                <img src="${res.data[index].Picture.PictureUrl1}" alt="photo" class="card-img-top">
                                <div class="card-body">
                                    <h2 class="card-title">${res.data[index].Name}</h2>
                                    <div class="d-flex justify-content-start align-items-end">
                                        <img class="pr-2" src="images/map-lable.svg" style="width: auto; height: 20px;">
                                        <span>${res.data[index].Address.slice(0,6)}</span>                                    
                                    </div>
                                </div>
                            </div>
                        </div> `;
            
        })
        document.querySelector(`.${category}_section`).innerHTML = str ;
 
 })
 .catch((error)=>{
     console.log(error);
 })
}

initActivity('Activity',4);

