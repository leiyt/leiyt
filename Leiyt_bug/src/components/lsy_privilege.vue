<template>
	<div class="privilege">
		<!-- 专属特权 -->
		<div class="privilege-vip">
            <div class="privilege-title">恭喜你成为吉命文化VIP会员，你将获得以下福利：</div>
            <div class="content">
                <div class="left"><span class="img-box"></span></div>
                <ul class="right">
                    <li><span>预约大师一对一咨询机会</span></li>
                    <li><span>免费每日运势推荐</span></li>
                    <li><span>大师指点风水疑问</span></li>
                    <li><span>更多福利......</span></li>
                </ul>
            </div>
            <div class="wecht">
                <div class="left">客服微信：<span>xuntianyisuan</span></div>
                <div class="right copy-wecat" @click="copyWecat"><span class="img-box"></span></div>
            </div>
        </div>
	</div>
</template>
<style lang='scss'>
.privilege{
    border-radius: 5px;
    background-color: #FFEFDE;
    margin-top: 0.2rem;
    min-height: 1.4rem;
    .privilege-vip{
        padding: 0.1rem 0.1rem 0.25rem;
        .privilege-title{
            font-size: 0.3rem;
            text-align: center;
            padding: 0.1rem 0;
            color: #AD3D00;
        }
        .content{
            padding: 0.25rem;
            border: 1px solid #C4C3C3;
            background-color: #fff;
            display: flex;
            display: -webkit-flex;
            .left{
                width: 0.8rem;
                .img-box{
                    display: block;
                    width: 0.6rem;
                    height: 1.6rem;
                    margin: 0 auto;
                    background-image: url('../assets/lsy_img/lsy_jiesuo_zstq.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
            }
            .right{
                flex: 1;
                padding-left: 0.3rem;
                font-size: 0.3rem;
                line-height: 0.4rem;
                color: #2E2E2E;
                li{
                    position: relative;
                    text-indent: 0.2rem;
                }
                li::after{
                    content: '';
                    display: block;
                    width: 2px;
                    height: 0.25rem;
                    position: absolute;
                    left: 0;
                    top: 0.1rem;
                    background-color: #2E2E2E;
                }
            }
        }
        .wecht{
            display: flex;
            display: -webkit-flex;
            font-size: 0.3rem;
            align-items: center;
            padding: 0.15rem 0;
            height: 0.75rem;
            .left{
                flex: 3;
            }
            .right{
                flex: 2;
                height: 0.75rem;
                .img-box{
                    display: block;
                    width: 3.32rem;
                    height: 0.75rem;
                    background-image: url('../assets/lsy_img/lsy_jieguo_btn_fzwx.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    margin: 0 auto;
                }
            }
        }
    }
}
</style>

<script>
import Clipboard from 'clipboard'
export default {
	data(){
		return {
			wechatNo: '',
		}
	},
	mounted() {
		
	},
	methods:{
		copyWecat(){
            var clipboard = new Clipboard('.copy-wecat');
            clipboard.on('success', e => {
                // this.$emit('copyWechat', this.tipsTxt, this.isShowTips, this.iscomment);//向父组件传递状态
                this.showMessage('复制成功',800,function(){
                    window.location.href="weixin://"
                })
                // 释放内存
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                // 不支持复制
                this.showMessage('该浏览器不支持一键复制,请长按手动复制',800)
                // 释放内存
                clipboard.destroy()
            })
        },
	}
};
</script>

