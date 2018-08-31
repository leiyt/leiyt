/*
 * 自定义基础功能函数
 * 通过base调用
 * 创建:2017.10.18
 *
 */
var base = {
    uniqueId:"",


    GetIOSVersion() {
        if (window.MSStream) {
            return false;
        }
        var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
            version;
        if (match !== undefined && match !== null) {
            version = [
                parseInt(match[1], 10),
                parseInt(match[2] || 0, 10),
                parseInt(match[3] || 0, 10)
            ];
            return version.join('.');
        }
        return false;
    },

    getAndroidVersion() {
        ua = ua.toLowerCase();
        var match = ua.match(/android\s([0-9\.]*)/);
        return match ? parseFloat(match[1]) : false;
    },

    //如果为单数，在前面加个0,比如02
    doubleNum(data) {
        var result = 0;
        if(data < 10) {
            result = "0" + data;
        }else {
            result = data;
        }
        return result;
    },

    //判断是否是闰年,是闰年result = true
    isRunYear(data) {
        var result = false;
        if(!isNaN(data)) {
            if(data/100%1 === 0){
                if(data/400%1 === 0) {
                    result = true;
                }else {
                    result = false;
                }
            }else {
                if(data/4%1 === 0) {
                    result = true;
                }else {
                    result = false;
                }
            }
        }else {
            console.log("参数不是数字");
        }
        return result;
    },

    //获取当前时间
    getCurrentTime() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = data.getDate();
    },

    //判断是否万年历来源
    versions() {
        var u = navigator.userAgent;
        return { //移动终端浏览器版本信息
            isWnl: u.indexOf('wnl') > -1 || u.indexOf('WNL') > -1 //是否web应该程序，没有头部与底部
        };
    }
};


//添加一个全局函数
// $(function () {
//     if(base.versions().isWnl) {
//         setTimeout(function () {
//             location.href = 'protocol://getuserinfo#userinfocallback';
//         }, 0);
//     }
// });
//客户端回调全局函数
function userinfocallback(result) {
    var uniqueId = '';//用户设备当前标识
    var uniqueUserid = '';//用户ID
    var originalString = Base64.decode(result);   //base64解密
    var originalAllObj = JSON.parse(originalString);
    if (!originalAllObj.native_score) {
        return false;
    }
    var native_score = originalAllObj.native_score;
    if(native_score.deviceId){
        uniqueId = native_score.deviceId;//设备标识，重装会变
    }
    if(native_score.userId){
        uniqueUserid = native_score.userId;
    }
    base.uniqueId = uniqueId;
    base.uniqueUserid = uniqueUserid;
};

//阻止滑动穿透
window.onload = function(){
    //阻止滑动穿透
    if(document.getElementsByClassName("through").length != 0) {
        document.getElementsByClassName("through")[0].addEventListener("touchmove",function () {
            event.preventDefault();
            event.stopPropagation();
        });
        document.getElementsByClassName("through")[1].addEventListener("touchmove",function () {
            event.preventDefault();
            event.stopPropagation();
        });
    }
};

export default base


