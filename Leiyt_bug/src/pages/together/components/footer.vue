<template>
		<div class="footer">
			<!-- 底部备案信息 -->
			<div class="copyright">
				<p class="footer_top">
					<span class="icon"></span><span>安全网络 放心使用</span>
				</p>
				<p class="concat_way">
					<span class="icon"></span>
					微信：
					<span class="wechat copy-wecat" @click="showCopyWechat" data-clipboard-text="9939860">9939860</span>
					电话：
					<span v-show="!isWeixinBrowser" @click="showTelMask">023-88756857</span>
					<span v-show="isWeixinBrowser"><a href="tel:023-88756857">023-88756857</a></span>
				</p>
				<p class="color_gray">Copyright @ 2012-2018 xtwh.ALL rights reserved</p>
				<p class="color_gray">渝ICP备 15011492 号</p>
			</div>
		</div>
</template>

<script>
import Clipboard from "clipboard";//引入复制组件
export default {
	// props: [
	// 	"showFlag"
	// ],
	data() {
		return {
			// showFlag:''
		};
	},
	computed: {
		// 是否微信环境
        isWeixinBrowser(){
            var ua = navigator.userAgent.toLowerCase();
            return (/micromessenger/.test(ua)) ? true : false ;
        }
	},
	mounted() {
		
	},
	methods: {
		// 打开电话号码
		showTelMask(){
			console.log("打开电话弹窗");
			let data = {
				showFlag: "tel"
			}
			this.$emit('showChild',data);
		},
		// 打开微信复制
		showCopyWechat(){
			console.log("打开微信复制");
			let _this =this;
            var clipboard = new Clipboard(".copy-wecat");
            clipboard.on("success", e => {
                _this.$Glb.PlMessage("复制成功", 800, function(){
                    let data = {
						showFlag: "wechat"
					}
					if(!_this.isWeixinBrowser){
						_this.$emit('showChild',data);
					}
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
};
</script>

<style lang='scss'>

.copyright {
	padding: 0.2rem 0;
	font-size: 0.26rem;
	color: #676d7b;
	text-align: center;
	p>span{
		display: inline-block;
		vertical-align: middle;
	}
	p.footer_top{
		color: #048018;
		line-height: 0.32rem;
		span.icon{
			width: 0.28rem;
			height: 0.32rem;
			background: url('../_img/together_icon_security.png')no-repeat center 100%/cover;
			margin-right: 0.1rem;
		}
	}
	p.concat_way{
		padding: 0.2rem 0;
		color: #7c7c7c;
		span{
			color: #de5f00;
			margin-right: 0.12rem;
			text-decoration: underline;
			a{
				color: #de5f00;
			}
		}
		span.icon{
			width: 0.34rem;
			height: 0.36rem;
			background: url('../_img/together_icon_customer_service.png')no-repeat center 100%/cover;
		}
	}
	p.color_gray {
		// color: #949aa6;
		color: rgba(124, 124, 124, 0.4);
		line-height: 0.3rem;
	}
}

</style>
