<template>
	<div style="position:absolute;width:100%;height:100%;opacity:0;top:0;left:0;" @click="F1">
        <!-- <group>
            <datetime v-model="datetimeProp.defaultdate" format="YYYY-MM-DD A" clear-text="切换至农历"></datetime>    
        </group> -->
    </div>
</template>

<style lang='scss'>
    .page-hlyc-1{
        .weui-cell{
            padding:0!important;
        }
        .vux-no-group-title{
            margin-top: 0!important;
        }
        .weui-cells:before{
            border-top:none!important;
            border-bottom:none!important
        }   
    }
</style>
<script>
    import { Group,Datetime } from 'vux'
    export default {
    	props:[ 'datetimeProp' ],
        components: {Group,Datetime},
        data () {
            return {
            }
        },
        computed:{
        },
        created () {
        },
        mounted () {

        },
        
        destroyed(){

        },
        watch : {
            
        },
        methods: {
        	F1(){
                window.localStorage.setItem('datetime_wnl_status', 'gCalendar');    // nCalendar 农历   gCalendar 公历
        		let that = this
        		this.$vux.datetime.show({
                    value: this.datetimeProp.defaultdate,
                    confirmText:'确认',
                    cancelText:'取消',
                    format:"YYYY-MM-DD A",
                    clearText:"切换至农历",
                    onClear(){
                    	setTimeout(function(){
                    		that.F2()
                    	},510)
                    },
                    onConfirm(val){
                    	that.datetimeProp.defaultdate = val
                    },
                    onHide () {
                        const _this = this
                    },
                    onShow () {
                        const _this = this
                    }
                })

        	},
        	F2(){
                window.localStorage.setItem('datetime_wnl_status', 'nCalendar');    // nCalendar 农历   gCalendar 公历
        		let that = this
        		this.$vux.datetime.show({
                    value: this.datetimeProp.defaultdate,
                    confirmText:'确认',
                    cancelText:'取消',
                    format:"YYYY-MM-DD A",
                    clearText:"切换至公历",
                    onClear(){
                    	setTimeout(function(){
                    		that.F1()
                    	},600)
                    },
                    onConfirm(val){
                    	that.datetimeProp.defaultdate = val
                    },
                    onHide () {
                        const _this = this
                    },
                    onShow () {
                        const _this = this
                    }
                })
        	},
            
            
        }
    }
</script>