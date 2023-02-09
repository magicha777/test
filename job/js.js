const input = document.querySelector("input");
const btn = document.querySelector("button");
var temperature =document.querySelector(".temperature");
var picture=document.querySelector(".pic");

//实现汉字转换为utf8格式编码
function urlencode (str) {
    str = (str + '').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28');
};

/* 轮播图 */
window.onload = function()
{

// 获取大盒子的内容 为content的第一个元素 也就是ul中的内容
var content = this.document.getElementsByClassName("content")[0];

// 获取ul中的li
var li = content.getElementsByTagName("li");

// 函数传入两个参数，(i,j)
function fun(i, j)
{//转换图片函数，就是把透明度改了一下        
    li[i].style.opacity=1;
    li[j].style.opacity=0;

    // 改变图标颜色
    li[i + 3].style.backgroundColor = "#ffffff";
    li[j + 3].style.backgroundColor = "#00000000";
}

// 默认情况下轮播图为第一张
fun(0, 1);
var i = 0;
function auto()
{
    i ++;
    if(i >= 3)
    {
        i = 0;
        fun(0, 2);
    }
    else
    {
        // 递归
        fun(i, i - 1);
    } 
}
// 变化的时间
timer = this.setInterval(auto, 2000);

// 鼠标在轮播图上， 轮播图停止播放
content.onmouseover = function () 
{ 
    clearInterval(timer);
}

content.onmouseout = function () 
{ 
    //鼠标划出，继续轮播
    timer = setInterval(auto, 2000); //调用定时器
}
var j = 0;
for(; j < 3; j++)
{
    //点击小图标也可以转换图片
    li[j + 3].index = j;
    // 当点击小图标进行的函数
    li[j + 3].onclick = function()
    {
        fun(this.index, i)
        i = this.index;
    }
}

/* 初始默认查找北京 */
find("北京");

}


/* 鼠标事件 */
 btn.addEventListener('click', () => { 
    let  city = input.value;
    input.value = '';
   find(city);
});


function find(city) {
  citycode=urlencode(city); 
  $(".scity").html("当前城市: " +city); 

  url1="http://apis.juhe.cn/simpleWeather/query?city="+citycode+"&key=23fa1db9f3a473e0efcd55ea738771e7";  
  
  $.ajax({
    url: url1,
    async: false,//改为同步方式
    type: "POST",
    data: "jsonp",
    contentType : 'application/json;charset=UTF-8',
    success: function (data) {
      var result=data.result;
      var future=result.future;
      console.log(result);
      /* 当前 */
$(".weather").html("天气  "+result.realtime.info);
var pic;
switch (result.realtime.info) {
  case "晴":
    pic="images/symbol/qing.svg";
    break;
  case "多云":
    pic="images/symbol/duoyun.svg"
    break;
  case "阴":
      pic="images/symbol/yin.svg"
    break;
  case "雨夹雪":
      pic="images/symbol/yujiaxue.svg"
      break;
  case "雾":
        pic="images/symbol/wu.svg"
      break;
  case "小雨":
        pic="images/symbol/xiaoyu.svg"
      break;
  case "小雪":
        pic="images/symbol/zhongxue.svg"
      break;
  default:
    pic="images/symbol/dayu.svg"
    break;
};
picture.src =pic;

$(".temperature").html("温度  "+result.realtime.temperature+"度");
$(".humidity").html("湿度"+result.realtime.humidity+"%");
$(".direct").html("风向"+result.realtime.direct);
$(".power").html("风力"+result.realtime.power);
$(".aqi").html("空气质量指数"+result.realtime.aqi);

/* 未来 */
for(i=0;i<=4;i++)
{
  $(".day"+i).html(future[i].date+":    天气："+future[i].weather+"    温度："+future[i].temperature);
}
      

    }
});


/* 生活指数 */
 url2="http://apis.juhe.cn/simpleWeather/life?city="+citycode+"&key=23fa1db9f3a473e0efcd55ea738771e7";  
$.ajax({
  url: url2,
  async: false,
  type: "POST",
  data: "jsonp",
  contentType : 'application/json;charset=UTF-8',
  success: function (data) {
    console.log(data);
    var life=data.result.life;
    $(".shushidu").html(life.shushidu.des);
    $(".chuanyi").html(life.chuanyi.des);
    $(".yundong").html(life.yundong.des);
    $(".ziwaixian").html( life.ziwaixian.des);

    

  }
});
  
}

    

  