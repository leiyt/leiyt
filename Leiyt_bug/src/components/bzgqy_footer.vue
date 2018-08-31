<template>
  <footer class="footer">
    <div v-if="getHotData.length>0"><img src="@/assets/bzgqy/bzgqy_dibu_title.png" alt="热门测算"></div>
  	<ul class="hot-box" v-if="getHotData.length>0">
      <li v-for="index in getHotData">
        <a :href="index.link">
          <img :src="index.img">
          <p>{{index.title}}</p>
        </a>
      </li>
    </ul>
    <div class="f-con-1" :style="bzgqy_store.targetOffsetTop_stu==false||bzgqy_store.targetOffsetTop_stu=='none'?'padding-bottom:0':''">
    	<div class="t-1">
    		<p class="co-552e0f  marBottom textCenter fs09 lineHeight">客服微信：xuntianyisuan&nbsp;&nbsp;&nbsp;&nbsp;电话：023-86866101</p> 
		    <p class="co-552e0f textCenter fs09">客服在线时间：周一至周五 10:00-18:00</p> 
    	</div>	
    	<div class="t-2">
			<p>Copyright © 2012-2017 xtwh.All rights reserved</p> 
		    <a href="http://www.miitbeian.gov.cn/">渝ICP备15011492号</a>		
    	</div>
    </div>
    <div class="f-con-2" :class="modelProp&&bzgqy_store.targetOffsetTop_stu=='long'?'botm-0':''">
      <!-- <div class="bzgqy-button" @click="clickFunc">立即测算</div> -->
      <div class="bzgqy-button" @click="clickFunc"></div>
    </div>
    <div class="f-con-2" :class="modelProp&&bzgqy_store.targetOffsetTop_stu==true&&modelProp.scrollTopRem>bzgqy_store.targetOffsetTop?'botm-0':''">
      <!-- <div class="bzgqy-button" @click="clickFunc">立即测算</div> -->
      <div class="bzgqy-button" @click="clickFunc"></div>
    </div>
    <div class="f-con-2" :class="modelProp&&bzgqy_store.targetOffsetTop_stu==false&&modelProp.scrollTopRem<bzgqy_store.targetOffsetTop?'botm-0':''">
	    <!-- <div class="bzgqy-button" @click="clickFunc">立即测算</div> -->
      <div class="bzgqy-button" @click="clickFunc"></div>
    </div>
  </footer>
</template>
<style lang='scss' scoped="">
	.footer{
    img{
      display:block;
    }
		.hot-box{
      // margin-top: 0.4rem;
      // display: table;
      // width: 100%;
      // text-align: center;
      margin: 0.4rem 0 0 0;
      border-bottom: 1px dashed #5E3442;
      display: block;
      width: 100%;
      >li{
        // height: auto;
        // width: 1.43rem;
        // box-sizing: border-box;
        // text-align: center;
        // margin: 0 0.15rem 0.25rem 0.15rem;
        // display: inline-table;
        height: auto;
        text-align: center;
        display: inline-table;
        width: 25%;
        padding: 0.2rem;
        box-sizing: border-box;
        >a{
          display: block;
          >p{
            color: #222B27;
            font-size: 0.26rem;
            margin-top: 0.15rem;
            font-weight: bold;
          }
        }
      }
    }
    .f-con-1{
			text-align: center;
			padding-bottom: 1rem;
			.t-1{
			    font-size: 0.26rem;
			    line-height: 0.42rem;
			    color: #5E3442;
			}
			.t-2{
		    font-size: 0.22rem;
		    line-height: 0.32rem;
		    padding-bottom: 0.3rem;
		    color: #821B41;
		    border-bottom: 1px solid rgba(225,225,225,0.3);
		    >a{
		    	color: #821B41;
		    }
      }
    }
    .f-con-2{
	    background: #B72C5D;
	    position: fixed;
	    bottom: -1.4rem;
      z-index:11;
	    left: 0;
	    width: 100%;
      transition: 0.3s all ease;
    	.bzgqy-button{
		    margin: 0.05rem 0.2rem;
    	}
    }
    .botm-0{
      bottom:0!important;
    }
		
	}
	
</style>

<script>
  import {mapState} from "vuex";
  export default {
    props:[ 'modelProp' ],
    data() {
      return {
        'getHotData':[]
          

      }
    },
    computed: {
      ...mapState(['bzgqy_store','footer_store']),
    },
    created() {

              // alert(window.innerWidth)
    },
    mounted() {

    },
    watch : {
        '$route' : {
            'handler' : function(){
              this.getHot()
            },
            'immediate': true ,
            'deep': true ,
        },
    },
    methods: {
      getHot(){
        let data ={
          gid:'1000005',
          type:this.footer_store.type,  //page1=1，page2=3，page3=2
          posId:this.$route.query.posId,
          qd:this.$route.query.qd||'wnl',
          userId:'', //http://localhost:8082/#/bzgqy/1?posid=123&qd=wno
          deviceId:'',
        }
        this.$api.post( '/Relationproduct/index' , data, res => {
          this.getHotData=res.data
        })
      },
      clickFunc(){
        this.footer_store.clickFunc()
      }
    }

  }
</script>
