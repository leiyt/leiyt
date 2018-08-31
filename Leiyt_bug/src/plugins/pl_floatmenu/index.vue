<template>
    
    <!-- <div class="floatmenu-box" v-if="modelProp.show"> -->
    <div class="floatmenu-box">
        <div class="my-order-button" v-if="orderbtn==false">
            <a class="my-order" href="/order/listbrowser">我的订单</a>
        </div>
        <!-- <a  @click="toHome" class="home-index-btn">更多测试</a> -->
        <a v-if="modelProp.isshow == 1" @click="toHome" class="home-index-btn">更多测试</a>
    </div>
    
</template>
<style scoped lang='scss'>
    .my-order-button{
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
        >.my-order{
            display: inline-block;
        }
    }
    .home-index-btn{
        position: absolute;
        top: 0.25rem;
        right: 0.2rem;
        width: 1.4rem;
        height: 0.5rem;
        line-height: 0.5rem;
        background: rgba(1,1,1,0.5);
        color: white;
        font-size: 0.26rem;
        text-align: center;
        border-radius: 4px;
    }
</style>
<script>
    export default {
        props:[ 'modelProp' ],
        data () {
            return {
                'orderbtn':false
            }
        },
        created () {
            this.orderbtn = window.ISWNL;
            // this.homelink = modelProp.homelink+
            // this.$router.push({path:this.modelProp.homelink,query:this.$route.query})
        },
        mounted () {
           
        },
        beforeDestroy(){
        },
        destroyed(){
        },
        watch : {
        },
        methods: {
            toHome(){
                // this.$router.push({path:this.modelProp.homelink,query:this.$route.query})
                window.location.href = `${this.modelProp.homelink}${window.location.search}`
            }
        }
        
    }
</script>


