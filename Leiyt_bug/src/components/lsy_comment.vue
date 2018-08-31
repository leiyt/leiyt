<template>
	<div class="comment">
		<!-- 评论 -->
		<div class="comment-title">
            <img src="../assets/lsy_img/lsy_jieguo_title_fbpl.png" />
        </div>
        <div class="container-comment">
            <p class="comment-star" id="commentStar" title="1">
                <span class="selected" @click="selectSatr(1)">
                    <i class="nohigh"></i>
                    准
                </span>
                <span @click="selectSatr(2)">
                    <i class="nohigh"></i>
                    一般
                </span>
                <span @click="selectSatr(3)">
                    <i class="nohigh"></i>
                    不准
                </span>
            </p>
            <textarea class="comment-txt" style="border-top:1px solid a9a9a8;" type="text" maxlength="100" placeholder="输入你对本次结果的评论或者建议" v-model="commentTxt"></textarea>
            <div class="comment-input">
                <input type="text" style="border-top:1px solid a9a9a8;" placeholder="请输入手机号" v-model="commentTel" maxlength="11" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)"
                    onblur="this.v();">
            </div>
            <p class="tel-text">填写正确手机号，以便及时解决您的疑问</p>
            <div class="comment-sub" @click="commentComit">
                <!-- <img src="__STATIC__/img/jiesuo_btn_tjpl.png" /> -->
            </div>
        </div>
	</div>
</template>
<style lang='scss'>
/* 评论样式 B  */
.comment{
    .comment-title{
        height: 0.4rem;
        padding: 0.2rem 0;
    }
    .container-comment{
        border-radius: 5px;
        margin: 0;
        width: auto;
        background: #F7EFDE;
        padding: 0.2rem 0.1rem;
        .comment-star{
            height: 0.7rem;
            width: 100%;
            box-sizing: border-box;
            -webkiot-box-sizing: border-box;
            padding: 0 0.9rem;
            display: flex;
            display: -webkit-flex;
            text-align: center;
            span {
                flex: 1;
                position: relative;
                display: inline-block;
                cursor: pointer;    
                font-size: 0.3rem;
                /* 默认星星样式 */
                i{
                    display: inline-block;
                    width: 0.36rem;
                    height: 0.34rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: url(https://ykdstatic.dd668.cn/index/js/jieguo_icon_star_n.png) no-repeat;
                    background-size: 100% auto;
                }
            }
            /* 选中星星样式 */
            span.selected i {
                background: url(https://ykdstatic.dd668.cn/index/js/jieguo_icon_star_s.png)no-repeat;
                background-size: 100% auto;
            }
        }
        .comment-txt{
            resize: none;
            border: 1px solid #a9a9a9;
            background: #F4F0E7;
            height: 2rem;
            width: 93%;	
            color: #565656;
            font-weight: 500;
            padding: 0.2rem;
        }
        .comment-sub{
            width: 100%;
            height: 0.8rem;
            background-image: url('../assets/lsy_img/lsy_jiesguo_btn_djpl.png');
            background-repeat: no-repeat;
            background-size: 5.78rem 0.8rem;
            background-position: center center;
        }
        .tel-text{
            color: #980203;
            text-align: center;
            font-size: 0.26rem;
            line-height: 0.6rem;
        }
        .comment-input{
            width: 99%;
            height: 0.6rem;
            position: relative;
            margin-top: 0.12rem;
            input{
                height: 0.6rem;
                line-height: 0.6rem;
                position: absolute;
                left: 0;
                top: 0;
                border: 1px solid #a9a9a9;
                background: #F4F0E7;
                text-indent: 0.6rem;
                width: 100%;
            }
        }
        .comment-input::before{
            content: '';
            display: inline-block;
            width: 0.22rem;
            height: 0.3rem;
            background: url(../assets/lsy_img/lsy_jieguo_icon_phone.png) no-repeat;
            background-size:100% 100%;
            position: absolute;
            left: 0.2rem;
            top: 0.16rem;
            z-index: 1;
        }
    }
}
.comment-txt,.comment-input,.comment-txt::-webkit-input-placeholder,.comment-input::-webkit-input-placeholder {
    font-size: 0.3rem;
}   
/* 评论样式 E  */
</style>

<script>
var reg=/^[1][0-9]{10}$/;

export default {
    props: {
        //子组件接收父组件传递的值

    },
	data(){
		return {
            isShowTips: false,
            tipsTxt: '',
            starVal: 1,
            commentTxt: '',
            commentTel: '',
            iscomment: false
		}
	},
	mounted() {
		
	},
	methods:{
        // 评分选择星星
		selectSatr(val){
            this.starVal = val;
            $('#commentStar span').on('click', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
            })
        },
        // 提交评论
        commentComit(){
            // 必填检测
            if(this.commentTxt == ''){
                this.tipsTxt = "请填写评论内容";
                this.isShowTips = true;
                this.$emit('comment', this.tipsTxt, this.isShowTips);//向父组件传递状态
                console.log('请填写评论内容');
                return false;
            }
            if(this.commentTel == ''){
                this.tipsTxt = "请填写手机号码";
                this.isShowTips = true;
                this.$emit('comment', this.tipsTxt, this.isShowTips);//向父组件传递状态
                console.log('请填写手机号码');
                return false;
            }
            // 手机号正则验证
            if(!reg.test(this.commentTel)){
                this.tipsTxt = "请填写正确的手机号";
                this.isShowTips = true;
                this.$emit('comment', this.tipsTxt, this.isShowTips);//向父组件传递状态
                console.log('请填写正确的手机号码');
                return false;
            }
            
            // 提交评论
            let data ={
                starVal: this.starVal,
                commentTxt: this.commentTxt,
                commentTel: this.commentTxt,
            }
            this.$api.post( ' ' , data, res => {
                if(res.code == 0){
                    this.tipsTxt = "评论成功！";
                    this.isShowTips = true;
                    this.iscomment = true;
                    this.$emit('testComment', this.tipsTxt, this.isShowTips, this.iscomment);//向父组件传递状态
                }else{
                    this.tipsTxt = "评论失败！"+res.msg;
                    this.isShowTips = true;
                    this.iscomment = false;
                    this.$emit('testComment', this.tipsTxt, this.isShowTips, this.iscomment);//向父组件传递状态
                }
            })
        }
	}
};
</script>

