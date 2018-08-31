
<template>
  
  <div class="my-order-button">
      <a class="my-order" href="/order/listbrowser">我的订单</a>
  </div>

</template>
<script>
    export default {
        data () {
            return {

            }
        },
        created () {
          // alert(this.$Glb.urlquery('a'))
          // alert(JSON.stringify(this.$route.query))



          
          // 我的订单按钮(判断在万年历的情况下)
          if(window.location.pathname.indexOf('/wnl/')>=0||window.location.search.indexOf('qd=wnl')>=0){

            // 判断 首页 
            window.location.pathname.indexOf('/index')>=0
            // 创建 万年历 引入 代码 t
            this.isWnl()
            // 创建 万年历 引入 代码 b
            var srcwnljs = document.createElement('script');
              var first = document.body.firstChild;
              srcwnljs.src = 'https://mobile.51wnl.com/utils/wnlHistory/wnlHistoryPro.js';
              window.re=document.body.insertBefore(srcwnljs,first);
          }else{
            // document.getElementsByClassName('my-order-button')[0].style.display = 'block';
          }


          alert(this.message.show)




          // 判断首页   

          function isIndex(){

            if( window.location.pathname.slice(-1) == '/' ){
              

              
            }




          }






        },
        mounted () {
        },
        methods: {
          // 创建 万年历 引入 代码 t
          isWnl(){
            window.GetIOSVersion = function () {
                if (window.MSStream) {
                    return false;
                }
                var match = (window.navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
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
            }
            window.getAndroidVersion = function () {
                window.ua = ua.toLowerCase();
                var match = ua.match(/android\s([0-9\.]*)/);
                return match ? parseFloat(match[1]) : false;
            }
          }
          // 创建 万年历 引入 代码 b
           
        },
        watch : {
        },
    }
</script>
<style scoped lang='scss'>
    body>.my-order-button{
      display: none;
      position: fixed;
      padding: 0 0.26rem;
      bottom: 1.05rem;
      right: 0.25rem;
      text-align: center;
      border-radius: 0.4rem;
      height: 0.6rem;
      line-height: 0.6rem;
      background: rgba(0, 0, 0, 0.3);
      color: #FFFFFF;
      font-size: 0.32rem;
      z-index: 11;
      overflow: hidden;
    }
    body>.my-order-button>.my-order{
        display: inline-block;
    }
</style>


