<template>
  <footer class="footer">
    <div v-if="axiosHotData.length>0" style="padding-top:0.3rem">
      <img src="../_img/xmxj_hot_tt.png" alt="热门测算">
    </div>
    <ul class="hot-box"  v-if="axiosHotData.length>0">
      <li v-for="(i,idx) in axiosHotData" :key="idx">
        <a :href="i.link">
          <img :src="i.img">
          <p>{{i.title}}</p>
        </a>
      </li>
    </ul>
    <div class="f-con-1" >
      <div class="t-1">
        <p class="textCenter p0"><span><i class="i_safe"></i>安全网络 请放心使用</span></p>
        <p class="textCenter lineHeight">
          <span class="s_kf">客服微信：<span class="yellow copy_wx" data-clipboard-text="9939860" @click="copyWecat">9939860</span></span>
         &nbsp;&nbsp;&nbsp;&nbsp;电话：<span><a class="yellow" tel="023-86866101">023-86866101</a></span>
        </p> 
        <!-- <p class="textCenter fs09">客服在线时间：周一至周五 10:00-18:00</p>  -->
      </div>  
      <div class="t-2">
        <p>Copyright © 2012-2018 xtwh.All rights reserved</p> 
        <a href="http://www.miitbeian.gov.cn/">渝ICP备15011492号</a>   
      </div>
    </div>
  </footer>
</template>
<script>
  import Clipboard from "clipboard"
  export default {
    props:['modelProp'],
    data() {
      return {
        'axiosHotData':[]
      }
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    watch : {
      'modelProp.gid':{
        'handler' : function(){
          this.axiosHot()
        },
        'deep': true ,
      }
    },
    methods: {
      // 请求底部关联产品接口
      axiosHot(){
        let data={
          gid:this.modelProp.gid,
          type:this.modelProp.type,//page1=1，page2=3，page3=2
          posId:this.$Glb.getAttribute().posId||this.modelProp.posId,
          qd:this.$Glb.getAttribute().qd||this.modelProp.qd,
          userId:'',
          deviceId:''
        }
        this.$api.post( '/v1/Relationproduct/index' , data, res => {
          this.axiosHotData=res.data
        })
      },
       //  复制微信
      copyWecat(){
        let _this = this;
        var clipboard = new Clipboard(".copy_wx");
        clipboard.on("success", e => {
          _this.$Glb.PlMessage("复制成功", 800, function() {
            window.location.href = "weixin://";
          });
          // 释放内存
          clipboard.destroy();
        });
        clipboard.on("error", e => {
          // 不支持复制
          _this.$Glb.PlMessage("该浏览器不支持一键复制,请长按手动复制", 800);
          // 释放内存
          clipboard.destroy();
        });
      },
    }

  }
</script>
<style lang='scss' scoped>
  .footer{
    background: #75693a;
    padding: 0 .1rem;
    img{
      display:block;
      width: 100%;
    }
    .hot-box{
      margin: 0.4rem 0 -0.2rem 0;
      // border-bottom: 1px dashed #5E3442;
      display: block;
      width: 100%;
      >li{
        height: auto;
        text-align: center;
        display: inline-table;
        width: 25%;
        padding: 0.2rem;
        box-sizing: border-box;
        >a{
          display: block;
          >p{
            color: #fff;
            font-size: 0.26rem;
            margin-top: 0.15rem;
            font-weight: bold;
          }
        }
      }
    }
    .f-con-1{
      text-align: center;
      padding:0.2rem 0 1rem 0;
      .t-1{
          font-size: 0.28rem;
          line-height: 0.42rem;
          color: #fff;
          .yellow{
            color:#ffd944;
            text-decoration: underline;
          }
          .p0{
            display: inline-block;
            span{
              display: flex;
              align-items: center;
            }
            .i_safe{
              display: inline-block;
              width: .23rem;
              height: .3rem;
              background: url(../_img/xmxj_icon_safe.png) no-repeat center/100% 100%;
              margin-right: .1rem;
            }
          }
          .s_kf{
            background: url(../_img/xmxj_icon_kefu.png) no-repeat left center/.27rem .28rem;
            padding-left: .4rem;
          }
      }
      .t-2{
        font-size: 0.24rem;
        line-height: 0.32rem;
        padding-bottom: 0.3rem;
        color: #8c8362;
        >a{
          color: #8c8362;
        }
      }
    }
    // .f-con-2{
    //   background: #B72C5D;
    //   position: fixed;
    //   bottom: -1.4rem;
    //   z-index:11;
    //   left: 0;
    //   width: 100%;
    //   transition: 0.3s all ease;
    //   .bzgqy-button{
    //     margin: 0.05rem 0.2rem;
    //   }
    // }
    .botm-0{
      bottom:0!important;
    }
  }
</style>
