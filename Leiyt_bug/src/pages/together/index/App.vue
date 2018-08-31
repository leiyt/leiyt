<template>
    <div class="model_together_box throughbar" style="background: #f3f3f3;">
        <div class="box_full page_together_index">
            <div class="banner">
                <Swiper v-if="sliderItems.length > 0" :autoPlay='true' :showIndicator='true' interval="5000" duration="200">
                    <Slide @click="goTest(index)" v-for="(item,index) in sliderItems" :key="index">
                        <img :src="item.icon" alt="">
                    </Slide>
                </Swiper>
            </div>
            <!-- 算命街 -->
            <div class="top_title">
                <img src="../_img/together_title_box1.png" alt="算命街">
            </div>
            <div class="product_items">
                <div class="double_items">
                    <a :class="{big_item:item.main == 2}" :href="item.link+'&posId='+posId+'&qd='+qd" v-for="(item,index) in fortune" :key="index">
                        <div class="img-box"><img :src="item.icon" alt=""></div>
                        <p class="product_des">{{item.title}}</p>
                    </a>
                </div>
            </div>
            <!-- 开运吉物 -->
            <div class="top_title">
                <img src="../_img/together_title_box2.png" alt="开运吉物">
            </div>
            <ul class="goods_items">
                <li v-for="(item,index) in goodsList" :key="index">
                    <a :href="item.link+'&userId='+userId+'&deviceId='+deviceId+'&qd='+qd" class="goods_img">
                        <img :src="item.icon" alt="">
                        <span class="goods_des">{{item.subtitle}}</span>
                    </a>
                    <p class="goods_title">{{item.title}}</p>
                </li>
            </ul>
        </div>

        <!-- 我的订单按钮-->
        <div class="my_order" v-if="!isWnl">
            <a :href="'http://cs.52dd.cn/dist/index.html'+'?userId='+userId">我的订单</a>
        </div>

        <!--  @touchmove.prevent方法解决移动端有遮罩时阻止滚动，遮罩关闭恢复滚动 -->
        <!-- 拨打电话 -->
        <div class="mask" v-show="showFlags.type == 'tel'" @touchmove.prevent @click="cancle">
            <div class="mask_box">
                <div class="mask_title">是否确认，拨打电话至：</div>
                <div class="mask_content">023-88756857</div>
                <div class="mask_btn">
                    <span class="btn_cancle" @click="cancle">取消</span>
                    <span class="btn_sure">
                        <a href="tel:023-88756857">确认</a>
                    </span>
                </div>
                <i class="icon_cancle" @click="cancle"></i>
            </div>
        </div>

        <!-- 复制微信 -->
        <div class="mask" v-show="showFlags.type == 'wechat'" @touchmove.prevent @click="cancle">
            <div class="mask_box">
                <div class="mask_title">微信号已复制，是否打开微信？</div>
                <div class="mask_content"></div>
                <div class="mask_btn">
                    <span class="btn_cancle" @click="cancle">取消</span>
                    <span class="btn_sure copy-wecat" @click="copyWecat" data-clipboard-text="9939860">确认</span>
                </div>
                <i class="icon_cancle" @click="cancle"></i>
            </div>
        </div>

        <Footer @showChild="getChildData"></Footer>
        <!-- 公共错误处理 t -->
        <PluErrHandle></PluErrHandle>

    </div>
</template>

<script>
import Footer from "../components/footer";
import Swiper from "../components/swiper";
import Slide from "../components/slide";
import share from '@/utils/share.js'

export default {
    name: "app",
    components: {
        Footer,
        Swiper,
        Slide
    },
    data() {
        return {
        showFlags: {
            show: 'false',
            type: ''
        },
        userId: this.$Glb.getAttribute().qd == "wnl"?"[WNLUSERID]":localStorage.USERID,//用户id
        deviceId: this.$Glb.getAttribute().qd == "wnl"?"[OPENUDID]":localStorage.USERID,//用户id
        qd: this.$Glb.getAttribute().qd?this.$Glb.getAttribute().qd : '52dd',//渠道
        posId: this.$Glb.getAttribute().posId?this.$Glb.getAttribute().posId : '123',
        togetherData: {},
        banner: {},
        fortune: {},
        goodsList: {},
        sliderItems:[]
        };
    },
    computed: {
        isWnl() {
        // return Base.versions().isWnl
        if (this.$Glb.getAttribute().qd == "wnl") {
            return true;
        } else {
            return false;
        }
        }
    },
    watch: {
        'showFlags.show':{
        'handler' : function(){
            // 解决PC有遮罩时阻止滚动，遮罩关闭恢复滚动
            // if(this.showFlags.show == 'true'){
            //     this.stop();
            // }else{
            //     this.move();
            // }
        },
        'deep': true 
      }
    },
    created() {
        this.saveRoot()
    },
    mounted() {
        // 分享
        let shareUrl = `${window.location.origin}/together/index.html?qd=${window.localStorage.TOGETHER_ROOT_QD}&posId=${window.localStorage.TOGETHER_ROOT_POSID}`;
        share(this.$api,{
            'wnl':{
            'title' : '分享一个神奇的测算平台，测过都说好',
            'desc' : '婚恋、事业、财运、运势...你需要的，在这里都可以解答',
            'img' : 'https://ykdstatic.52dd.cn/index/img/share/together_share_title.jpg',
            'url' : shareUrl
            },

            'wechat':{
            'title' : '分享一个神奇的测算平台，测过都说好！',
            'desc' : '婚恋、事业、财运、运势...你需要的，在这里都可以解答',
            'img' : 'https://ykdstatic.52dd.cn/index/img/share/together_share_title.jpg',
            'url' : shareUrl
            }
        });
        //判断缓存是否有用户id，没有则重新生成
        if(localStorage.USERID && localStorage.USERID !=''){
            this.userId = this.$Glb.getAttribute().qd == "wnl"?"[WNLUSERID]":localStorage.USERID
        }else{
            // 生成userId
            let timeStr = +new Date();
            let userIdStr = 'To'+timeStr+Math.floor(Math.random()*99);
            localStorage.USERID = userIdStr;
            this.userId = this.$Glb.getAttribute().qd == "wnl"?"[WNLUSERID]":localStorage.USERID
        };
        this.getTogether();
    },
    beforeDestroy() {},
    destroyed() {},
    methods: {
        // 获取测试结果
        getTogether() {
            let param = {
                qd: this.qd,
                posId: this.posId,
                userId: this.userId,
                deviceId: this.deviceId
            }
            this.$api.post("v1/Home/config", param, res => {
                if (res.code === 1) {
                    this.togetherData = res.data;
                    this.sliderItems = res.data.config1;
                    this.fortune = res.data.config2;
                    this.goodsList = res.data.config3;
                }else {
                    this.$Glb.PlMessage(res.msg, 800);
                }
            });
        },
        // 保存 qd 和 posId
        saveRoot(){
            window.localStorage.TOGETHER_ROOT_QD = this.$Glb.getAttribute().qd || '52dd';
            window.localStorage.TOGETHER_ROOT_POSID = this.$Glb.getAttribute().posId || '123';
        },
        // 接收子组件传递过来的值
        getChildData(data) {
            this.showFlags.type = data.showFlag; //改变了父组件的值
            this.showFlags.show = 'true'; //改变了父组件的值
        },
        // 弹窗取消按钮
        cancle() {
            this.showFlags.show = 'false';
            this.showFlags.type = '';
        },
        // 跳转微信确认按钮
        copyWecat() {
        window.location.href = "weixin://";
        },
        // 点击当前slider
        goTest(i){
            if(this.$Glb.getAttribute().qd == 'wnl'){
                // 万年历渠道userid写死
                window.location.href = this.sliderItems[i].link +'&userId=[WNLUSERID]&deviceId=[OPENUDID]';
            }else{
                //非万年历渠道userid取本地的
                window.location.href = this.sliderItems[i].link +'&posId='+this.posId+'&qd='+this.qd;
            }
        },
        /***禁止滑动***/
        stop(){
            var mo=function(e){e.preventDefault();};
            document.body.style.overflow='hidden';
            document.addEventListener("touchmove",mo,false);//禁止页面滑动
        },
        /***取消滑动限制***/
        move(){
            var mo=function(e){e.preventDefault();};
            document.body.style.overflow='scroll';//出现滚动条
            document.removeEventListener("touchmove",mo,false);
        }
    }
};
</script>
<style lang='scss'>
@import "@/style/_base.scss";
@import "./index.scss";
</style>



