<template>
    <div>
	</div>
</template>
<style scoped lang='scss'>
</style>
<script>
    // import share from '@/utils/share.js'
    export default {
        data () {
            return {
            }
        },
        created () {
            // this.isWnlCtr()
            // alert(JSON.stringify(this.$route.query))
        },
        mounted () {
            // 分享 
            // share(this.$api)
            
            // 解决翻页后 位置问题 t
            document.documentElement.scrollTop = 0
            setTimeout(()=>{
                window.scrollTo(0,0)
            },1000)
            // 解决翻页后 位置问题 b

            // 关闭 loading
            document.getElementById('loading-wrapper').style.display = 'none'
        },
        beforeDestroy(){
            this.$Glb.PlMessageNone()
        },
        destroyed(){
        },
        watch : {
            // 解决 route.push 不加载问题
            '$route':{
                'handler' : function(){
                    window.location.reload()
                },
                'deep': true ,
            }
        },
        methods: {
            // // 解决 万年历 按钮 只在首页显示问题 t
            // isWnlCtr(){
            //     const src = 'https://mobile.51wnl.com/utils/wnlHistory/wnlHistoryPro.js' ;
            //     if(window.location.pathname.indexOf('/index')>0){
            //         this.isWnl(src)
            //         let interVal = setInterval(function(){
            //             if(document.getElementsByClassName('wnl_history_btn')[0]){
            //                 let WnlHistoryBtn = document.getElementsByClassName('wnl_history_btn')[0] ;
            //                 if(WnlHistoryBtn){
            //                     WnlHistoryBtn.style.display='block'
            //                     WnlHistoryBtn.style.bottom='1rem'
            //                 }else{
            //                     // 解决 非首页进入 返回后 万年历 没有加入我的订单
            //                     if( entry=='destroyed' ){
            //                         window.location.reload()
            //                     }
            //                 }
            //                 clearInterval(interVal)
            //             }
            //         },50)
            //     }else{
            //         this.noWnl(src)
            //     }
            // },
            // // 解决 万年历 按钮 只在首页显示问题 b
            // isWnl(src){
            //     var channelsource = this.$route.query['qd'];
            //     var posidsource = this.$route.query['posId']||this.$route.query['posid']||'';
                
            //     if(channelsource == 'wnl' && posidsource){
            //         var srcwnljs = document.createElement('script');
            //         var first = document.body.firstChild;
            //         srcwnljs.src = src;
            //         window.re=document.body.insertBefore(srcwnljs,first);
            //     }else {
            //       // if(window.base.versions().isWnl){
            //       //   var srcwnljs = document.createElement('script');
            //       //   var first = document.body.firstChild;
            //       //   srcwnljs.src = src;
            //       //   window.re=document.body.insertBefore(srcwnljs,first);
            //       // }
            //     }
            // },
            // noWnl(src){
            //     let WnlHistoryBtn = document.getElementsByClassName('wnl_history_btn')[0]
            //     if(WnlHistoryBtn){
            //         WnlHistoryBtn.style.display='none'
            //     }
            //     var scripts = document.getElementsByTagName("script");
            //     for (var i = 0; i < scripts.length; i++) {
            //         if (scripts[i] && scripts[i].src && scripts[i].src.indexOf(src) != -1) {
            //             scripts[i].parentNode.removeChild(scripts[i]);
            //         }
            //     }
            // }


        }
        
    }
</script>


