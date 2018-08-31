<template>
	<div class="footer">
		<!-- 热门测算 -->
		<div class="hot-test_img" v-if="getHotData.length > 0"><!-- <img src="../assets/lsy_img/lsy_title_rmce.png" alt="热门测算"/> --></div>
		<div class="hot-test box-flex">
			<div class="item-test" v-for="(item,index) in getHotData" :key="index">
				<a :href="item.link">
					<img :src="item.img" />
				</a>
				<p class="test-name">{{item.title}}</p>
			</div>
		</div>
		<!-- 底部备案信息 -->
		<div class="copyright">
			<p class="light-color">客服QQ: <span>1025314454</span>电话：<span>023-88756857</span></p>
			<p class="light-color">客服在线时间: 周一至周五 9:30-18:30</p>
			<p>copyright @ 2012-2018 xtwh.ALL rights reserved</p>
			<p>渝ICP备 15011492 号</p>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			getHotData: []
		}
	},
	mounted() {
		this.getHot();
	},
	methods:{
		// 获取热门测算
		getHot(){
			let data ={
				gid:'1000005',//产品id(1000001:八字精批  1000002:一生财运 1000003:十年大运  1000004:八字合婚 1000005:八字感情运 1000006:来生运)
				type:3,//页面区分(1为首页 2为结果页 3为全部)
				posId:'123',//渠道位置标识(从入口url拼接参数获取)
				qd:'wnl',//渠道标识(从入口url拼接参数获取 例：https://cs.52dd.cn/bzgqy/index?userId=[WNLUSERID]&deviceId=[OPENUDID]&qd=wnl&posId=123)
				userId:'', //用户id
				deviceId:'',//设备id
			};
			this.$api.post( '/Relationproduct/index' , data, res => {
				this.getHotData=res.data
			});
		}
	}
};
</script>

<style lang='scss'>
.hot-test_img {
	margin: 0.24rem 0 0.3rem;
	height: 0.36rem;
	background-image: url('../assets/lsy_img/lsy_title_rmce.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.hot-test {
  margin: 0 0.18rem;
  overflow: hidden;
  .item-test { 
    height: auto;
    width: 25%;
    box-sizing: border-box;
    text-align: center;
    float: left;
    padding-bottom: 0.25rem;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    img {
      width: 80%;
      height: auto;
    }
    p.test-name {
      font-size: 0.25rem;
      color: #CEC3C1;
      text-align: center;
      letter-spacing:2px;
      width: 100%;
      margin-top: 0.1rem;
    }
  }
}
.copyright{
	margin-bottom: 1rem;
	font-size: 0.28rem;
	color: #676d7b;
	text-align: center;
	line-height: 0.45rem;
	p.light-color{
		color: #949aa6;
	}
}
</style>
