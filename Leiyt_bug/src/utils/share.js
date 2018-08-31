
var shareHead = null ;
var sharePath = window.location.pathname;
var shareOrigin = window.location.origin;
var shareQuery = '?qd=' + window.localStorage.Root_QD + '&posId=' + window.localStorage.Root_POSID

// const bzgqyShareHead = {
//   'title' : '情感大解析，把握命中好姻缘！',
//   'desc' : '从八字里找到你的好姻缘，少走弯路早幸福！',
//   'img' : 'https://ykdstatic.52dd.cn/index/img/share/bzgqy_share_title.jpg',
// }

// switch(sharePath)
// {
//   case '/bzgqy/index':
//     shareHead = bzgqyShareHead;
//     shareHead.url = shareOrigin + '/bzgqy/index'+ shareQuery
//     break;
//   case '/bzgqy/unlock':
//     shareHead = bzgqyShareHead;
//     shareHead.url = shareOrigin + '/bzgqy/index'+ shareQuery
//     break;
//   case '/bzgqy/detail':
//     shareHead = bzgqyShareHead;
//     shareHead.url = shareOrigin + '/bzgqy/index'+ shareQuery
//     break;
//   default:
//     shareHead = {
//       'title' : '',
//       'desc' : '',
//       'img' : ''
//     }
// }
// shareHead = bzgqyShareHead;
// shareHead.url = shareOrigin + '/bzgqy/index'+ shareQuery


function weChatShare(res){
  if (res.code == 1) {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.data.appId, // 必填，公众号的唯一标识
      timestamp: res.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
      signature: res.data.signature, // 必填，签名，见附录1
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
      // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
      wx.onMenuShareAppMessage({
        title: shareHead['wechat']['title'],
        desc: shareHead['wechat']['desc'],
        link: shareHead['wechat']['url'],
        imgUrl: shareHead['wechat']['img'],
        success: function (res) {
            // alert('分享成功')
        },
        cancel: function (res) {
            //$.toast('已取消');
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
      });
      //分享到朋友圈
      wx.onMenuShareTimeline({
        title: shareHead['wechat']['title'],
        desc: shareHead['wechat']['desc'],
        link: shareHead['wechat']['url'],
        imgUrl: shareHead['wechat']['img'],
        img_width: "50",
        img_height: "50",
        success: function (res) {
        },
        cancel: function (res) {
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
      });
    })
    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.log("分享失败");
    });
  }
}

function wnlShare(){
  window.appCallback_share = function() {
    try {
      if (window.ylwindow) {
        ylwindow.reportHasShare(true);
        location.href = 'protocol://share:' + encodeURI(JSON.stringify(textObj1));
      } else {
        // 万年历分享点击后会执行到这里
        location.href = 'protocol://share#' + encodeURI(JSON.stringify(textObj));
      }
    } catch (e) {}
    return 1;
  }
  window.ylappCallback_back = function() {
    if (isExist !== null) {
      return 0;
    }
    location.href = 'protocol://exit';
    if (window.ylwindow){
      ylwindow.reportHasBack(true);
    }
    return 1;
  }
  window.textObj = {
    title: shareHead['wnl']['title'],
    text: shareHead['wnl']['desc'],
    image: '0',
    imageURL: shareHead['wnl']['img'],
    url: shareHead['wnl']['url'],
    pureText: shareHead['wnl']['desc'],
    prefix: ''
  };
  window.textObj1 = {
    title: shareHead['wnl']['title'],
    text: shareHead['wnl']['desc'],
    image: '0',
    imageURL: shareHead['wnl']['img'],
    targetUrl: shareHead['wnl']['url'],
    perfix: ''
  };
  // 动态引入
  // var head = document.getElementsByTagName('head')[0];
  // var script = document.createElement('script');
  // script.type = 'text/javascript';
  // script.src = 'a.js';
  // head.appendChild(script);


  // wnlui.wxShare({//微信二次分享，注：目前只在微信pc端有效
  //   title: shareHead['title'],
  //   text: shareHead['desc'],
  //   imgUrl: shareHead['img'],
  //   imageUrl: shareHead['img'],
  //   url: location.href
  // });
}

function share($axios,config){
  shareHead = config;
  if(window.navigator.userAgent.match(/micromessenger/i)){
    //微信分享
    $axios.get( '/Share/index' , {url:window.location.href}, res => {
        weChatShare( res )
    })
  }else{
    wnlShare()
  }
}

export default share
















