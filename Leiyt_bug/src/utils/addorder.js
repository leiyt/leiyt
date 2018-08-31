// 下单接口
// import Addorder from '@/utils/addorder.js'
// {
//     'name' : this.form.name ,
//     'birthday' : this.calendarProp.newBirthData ,
//     'sex' : this.radioModel ,
//     'goodsid':this.getIndexData.gid,
//     'cid':this.getIndexData.channel,
//     'posid':this.getIndexData.posid,
//     'nopoint':this.calendarProp.nopoint,
//     'sucHref':'/bzgqy/unlock',
// }
import Base from './base.js'
export default function( req , calback ){
    const postData = {
        'name' :req['name'],
        'birthday' :req['birthday'],
        'sex' :req['sex'],
        'goodsid' :req['goodsid'],
        'cid' :req['cid'],
        'posid' :req['posid'],
        'nopoint' :req['nopoint'],
    };
    if(Base.versions().isWnl || (postData.cid == 150000 && postData.posid) ){
        postData.uniqueid = Base.uniqueId;
        postData.uniqueuserid = Base.uniqueUserid;
        postData.parter = "wnl";
        //组装同步订单参数 引入万年历js 获取
        window.ua = window.navigator.userAgent;
        var appVersion = /[a-zA-Z]/.test(ua.split(' ').pop()) ? '1.0.0' : ua.split(' ').pop();
        var sysVersion = Base.GetIOSVersion() || Base.getAndroidVersion();
        var browser = {
            isAndroid() {
                return ua.match(/Android/i) ? true : false;
            },
            isIOS() {
                return ua.match(/iPhone|iPad|iPod/i) ? true : false;
            },
            isWx() {
                return ua.match(/micromessenger/i) ? true : false;
            },
            isWp() {
                return ua.toLowerCase().indexOf('windows phone') > -1;
            },
            isWnl() {
                return ua.toLowerCase().indexOf('wnl') > -1;
            },
            getIOSVersion() {
                if (window.MSStream) {
                    return false;
                }
                var match = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
                    version;
                if (match !== undefined && match !== null) {
                    version = [
                        parseInt(match[1], 10),
                        parseInt(match[2], 10),
                        parseInt(match[3] || 0, 10)
                    ];
                    return parseFloat(version.join('.'));
                }
                return false;
            }
        };
        postData.userID = window.userId;// 用户编号
        postData.posID = window.posId;// 用户编号
        postData.deviceID = window.deviceId;// 设备编号
        if(browser.isIOS()){
            postData.clientType = 'ios';// 设备类型 必填  android,ios
        }else {
            postData.clientType = 'android';// 设备类型 必填  android,ios
        }
    }
    this.$api.post( '/v1/order/addorder' , postData, res => {
        if(res.code === 1){
            if(window.localStorage.ordercode){
                let oArr = window.localStorage.ordercode.split(',');
                    oArr.push( res.data.ordercode )
                    window.localStorage.ordercode = oArr
            }else{
                window.localStorage.ordercode = res.data.ordercode;
            }
            window.localStorage.newordercode = res.data.ordercode;

            // 这样的做法是为了带上万年历那边的参数
            let query = this.$route.query;
                query.ordercode = res.data.ordercode;
            this.$router.push({
                path:req['sucHref'],
                query
            })
            // window.location.reload()
            // window.location.href = req['sucHref'] + (this.$Glb.urlquery('asd')||)
            // window.location.href = req['sucHref'] + '?ordercode=' + res.data.ordercode
            // window.location.href = `${req['sucHref']}?ordercode=${res.data.ordercode}&posid=${}`

        }else{
            let scrollTopPx = document.documentElement.scrollTop||document.body.scrollTop
            if(scrollTopPx>520){
                window.scrollTo(0, 200);
            }
            this.$Glb.PlMessage(res.msg,1500)
        }
        calback(res)
    })
}