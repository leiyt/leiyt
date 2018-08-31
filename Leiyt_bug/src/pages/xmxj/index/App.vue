<template>
  <div id="app">
    <div class="model_xmxj_box">
      <div class="box_full page_xmxj_index">
        <!-- 广告 -->
        <div class="banner">
            <img src="../_img/xmxj_index_banner.jpg"/>   
        </div>

        <!-- 流式广告 -->
         <div class="marquee_a">
            <ul :style="'left:'+marquee_a.count+'px;'+(marquee_a.count==0?'':'transition: all 100.0s linear;')" ref="marquee_a">
              <li v-for="(i,index) in marquee_a.list" :key="index">
                {{i.place}}<span>{{i.name}}</span>刚刚购买了本产品
              </li>
            </ul>
            <ul :style="'left:'+(marquee_a.count+marquee_a.spacing)+'px;'+(marquee_a.count==0?'':'transition: all 100.0s linear;')">
              <li v-for="(i,index) in marquee_a.list" :key="index">
                {{i.place}}<span>{{i.name}}</span>刚刚购买了本产品
              </li>
            </ul>
          </div>

    
        <div class="container">
          <div class="content-wrapper">
            <div class="border-T"></div>

            <!--****主内容*****-->
            <div class="sec-wrapper">
                <div class="ds-info">
                  <img src="../_img/xmxj_ds.png" alt="大师">
                </div>
               
                <!-- 用户信息 -->
                <div class="user-info">
                  <div class="item">
                      <label>您的姓氏：</label>
                      <div class="input-box">
                        <input type="text" placeholder="请输入姓氏(汉字)" v-model="user_xin" maxlength="10"  @change="validXin(user_xin)">
                      </div>
                  </div>
                  <div class="item">
                      <label>您的名字：</label>
                     <div class="input-box">
                        <input type="text" placeholder="请输入名字(汉字)" v-model="user_ming" maxlength="10" @change="validMing(user_ming)">
                     </div>
                  </div>
                  <div  class="item gender">
                      <label>您的性别：</label>
                      <div class="input-box">
                          <input type="radio" id="man" :class="user_sex?'check':'checkNo'"  @click="user_sex=1">
                          <label class="text" for="man" style=" margin-right: .7rem;">男</label>

                          <input type="radio" id="woman" :class="user_sex?'checkNo':'check'"  @click="user_sex=0">
                          <label class="text" for="woman">女</label>
                      </div>
                  </div>
                  <div  class="item">
                      <label>出生日期：</label>
                      <div class="input-box" style="position:relative;overflow:hidden;" @click="calendarProp.selectCalendar=true">
                          <input class="ipt_date" disabled v-model="calendarProp.birthData" :style="calendarProp.birthData != '1990-01-01  '?'color:#2e2e2e':'color:#6d6c6c;-webkit-text-fill-color: #6d6c6c;'">
                          <!-- <input readonly="readonly" v-model="calendarProp.birthData"> -->
                          <img src="../_img/xmxj_icon_date.png" alt="日历图标" class="icon-clendar">
                      </div>
                  </div>
                  <div class="btn_cs1" @click="toUnlock"></div>
                  <div class="tip">
                    已有<span>{{axiosIndexData.num}}</span>人测算，<span>98%</span>以上都觉得对自己帮助很大
                  </div>
                </div>
                <!-- 用户信息完 -->

                <div class="xmxj_block">
                  <img src="../_img/xmxj_index_yw.png" alt="姓名详解" title="姓名详解">
                </div>

                <!-- 看看测过的人怎么说 -->
                <div class="xmxj_comment">
                  <div class="title">
                    <img src="../_img/xmxj_index_tt.png" alt="看看测过的人怎么说" title="看看测过的人怎么说">
                  </div>
                  <div class="marquee">
                    <ul :style="'top:'+marquee_b.count+'px;'+(marquee_b.count==0?'':'transition: all 50.0s linear;')" ref="marquee_b">
                      <li v-for="(i,idx) in marquee_b.list" :key="idx">
                        <h4>{{i.name}}<span>{{i.mobile}}</span><span class="fr">{{i.place}}</span></h4>
                        <p>{{i.content}}</p>
                      </li>
                    </ul>
                     <ul :style="'top:'+(marquee_b.count+marquee_b.spacing)+'px;'+(marquee_b.count==0?'':'transition: all 50.0s linear;')">
                      <li v-for="(i,idx) in marquee_b.list" :key="idx">
                        <h4>{{i.name}}<span>{{i.mobile}}</span><span class="fr">{{i.place}}</span></h4>
                        <p>{{i.content}}</p>
                      </li>
                    </ul>
                  </div>
                </div>

            </div>
            <!-- ****主内容完***** -->

            <div class="border-B"></div>

             <!-- 底部浮动按钮 -->
            <div class="button-flexd" v-if="scrollTopREM>12">
              <a class="btn" @click="toUnlock"></a>
            </div>

          </div>
        </div>
      </div>


        <!-- footer -->
        <Footer :modelProp="footerProp"></Footer>
        <!-- 日历插件-->
        <Mycalendar :calendarProp="calendarProp" v-show="calendarProp.selectCalendar"></Mycalendar>
        <!-- 首页浮动菜单 和 我的订单按钮 -->
        <PluFloatMenu :modelProp="floatmenuProp"></PluFloatMenu>
        <!-- 公共错误处理 t -->
        <PluErrHandle></PluErrHandle>
        <!-- 公共错误处理 b -->
    </div>
  </div>
</template>

<script>
import Footer from "../components/footer.vue";
import Mycalendar from '@/components/_my_calendar.vue'
import Addorder from '@/utils/addorder.js'
import share from '@/utils/share.js'

export default {
  name: "app",
  components: {
    Mycalendar,
    Footer
  },
  data() {
    return {
      floatmenuProp: {//浮动按钮相关
        isshow: 0,
        homelink: ""
      },
      'myOrderBtn':false,
        'footerProp': {
          'type':1,
          'gid':'',
      },
      user_xin: window.localStorage.XMXJ_USER_XIN || "",
      user_ming: window.localStorage.XMXJ_USER_MING || "",
      user_sex: window.localStorage.XMXJ_USER_SEX == 0 ? 0 : 1,
      user_name:this.user_xin+this.user_ming,
      calendarProp: {
        selectCalendar: false,
        birthData: window.localStorage.XMXJ_USER_BIRTHDATA || "1990-01-01  ", //此处空格不能删
        newBirthData: "",
        nopoint: 1
      },
      marquee_a: {
        count: 0,
        spacing: 0,
        interval: null,
        list: []
      },
      marquee_b: {
        count: 0,
        spacing: 0,
        interval: null,
        list: []
      },
      'axiosIndexData':{},
      scrollTopREM: 0
    };
  },
  computed: {},
  created() {
      this.axiosIndex();
      // 浮动提交按钮
      this.$Glb.scroll((tpx, trem, ftsz)=>{
        this.scrollTopREM = trem
      })
      // 保存 qd 和 posId 
      this.saveRoot();
  },
  mounted() {
    // 分享
     var shareArr = window.location.pathname.split('/'),sgareUrl;
      if(shareArr.length==4){
        sgareUrl = `${window.location.origin}/xmxj/wnl/index.html?qd=${window.localStorage.XMXJ_ROOT_QD}&posId=${window.localStorage.XMXJ_ROOT_POSID}`;
      }else{
        sgareUrl = `${window.location.origin}/xmxj/index.html?qd=${window.localStorage.XMXJ_ROOT_QD}&posId=${window.localStorage.XMXJ_ROOT_POSID}`;
      }
      share(this.$api,{
        'wnl':{
          'title' : '姓名详解，福祸揭露',
          'desc' : '我在万年历看【姓名运】，分享给你，你也过来亮个名号',
          'img' : 'https://ykdstatic.52dd.cn/index/img/share/xmxj_xj_share.jpg',
          'url' : sgareUrl
        },
        'wechat':{
          'title' : '姓名详解，福祸揭露',
          'desc' : '完整剖析姓名给你带来的福祸',
          'img' : 'https://ykdstatic.52dd.cn/index/img/share/xmxj_xj_share.jpg',
          'url' : sgareUrl
        }
      })
  },

  destroyed() {},
  watch: {},
  methods: {
      // 保存 qd 和 posId
      saveRoot(){
        window.localStorage.XMXJ_ROOT_QD = this.$Glb.getAttribute().qd || '';
        window.localStorage.XMXJ_ROOT_POSID = this.$Glb.getAttribute().posId || '';
      },
      // 保存用户输入信息
      saveUserData(){
        window.localStorage.XMXJ_USER_XIN= this.user_xin;
        window.localStorage.XMXJ_USER_MING= this.user_ming;
        window.localStorage.XMXJ_USER_SEX = this.user_sex;
        window.localStorage.XMXJ_USER_BIRTHDATA = this.calendarProp.birthData;
      },
      //请求首页接口
      axiosIndex(){
        this.$api.post('/v1/Namecheck/index',{
          'qd':this.$Glb.getAttribute().qd,
          'posid':this.$Glb.getAttribute().posId
        },res=>{
          this.axiosIndexData=res.data;
          this.footerProp.gid = res.data.gid;
          // 跑马灯
          this.scroMarquee()
          // console.log("首页接口："+this.axiosIndexData);
        });
      },
      // 跑马灯
      scroMarquee() {
        const startM = (cif,sMS)=>{
          const sT = (s)=>{
            setTimeout(()=>{
              if(cif.count == 0){
                cif.count = cif.count - cif.spacing
                sT(sMS)
              }else{
                cif.count = 0
                sT(100)
              }
            },s)
          }
          sT(100)
        }
        // 100007
        this.$api.post('/v1/ordermsg/index', {'gid':this.axiosIndexData.gid }, res => {
          this.marquee_a.list = res.data.msg;
          this.marquee_b.list = res.data.comment;
          this.$nextTick(function(){
            this.floatmenuProp.isshow = res.data.isshow;
            this.floatmenuProp.homelink = res.data.homelink;
            
            this.marquee_a.spacing = this.$refs.marquee_a.scrollWidth + 20
            this.marquee_a.interval = startM(this.marquee_a,100000)

            this.marquee_b.spacing = this.$refs.marquee_b.scrollHeight + 20
            this.marquee_b.interval = startM(this.marquee_b,50000)
          })
        })
      },
      //验证姓氏
      validXin(val){
        if( val === '' ){
            this.$Glb.PlMessage('姓氏不能为空',800)
            return false
        }
        if(val.length > 10){
            this.$Glb.PlMessage('姓氏长度超过了限制',800)
            return false
        }
        if(!(/^[\u0391-\uFFE5]{1,10}$/.test(val))){
            this.$Glb.PlMessage('姓氏必须为汉字',800)
            return false
        }
        return true  
      },
      //验证名字
      validMing(val){
         if( val === '' ){
            this.$Glb.PlMessage('名字不能为空',800)
            return false
        }
        if(val.length > 10){
            this.$Glb.PlMessage('名字长度超过了限制',800)
            return false
        }
        if(!(/^[\u0391-\uFFE5]{1,10}$/.test(val))){
            this.$Glb.PlMessage('名字必须为汉字',800)
            return false
        }
        return true
      },
      //请求详情
      toUnlock(){
        if(this.validXin(this.user_xin)&&this.user_ming(this.user_ming)&&this.$Glb.validTime(this.calendarProp.birthData)){
          // 保存用户输入信息
          this.saveUserData();
          // 下单接口
          Addorder.call(this,{
            'name':this.user_name,
            'birthday':this.$Glb.formatTime(this.calendarProp.birthData).newBirthData,
            'sex':this.user_sex,
            'goodsid':this.footerProp.gid,
            'cid':this.axiosIndexData.channel,
            'posid':this.axiosIndexData.posid,
            'nopoint':this.$Glb.formatTime(this.calendarProp.birthData).nopoint,
            'sucHref':'unlock.html',
          },function(res){})
        }else{
          let scrollTopPx=document.documentElement.scrollTop||document.body.scrollTop
          if(scrollTopPx>520){
            window.scrollTo(0,0);
          }
        }
      }
  }
};
</script>
<style lang='scss'>
@import "@/style/_base.scss";
@import "../_style/_base.scss";
@import "./index.scss";
</style>
