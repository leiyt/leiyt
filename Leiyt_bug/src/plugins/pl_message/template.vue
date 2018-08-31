<template>
    <div class="message_layer" v-if="message.show">
	    <div class="message_box">
	        <span>{{message.content}}</span>
	    </div>
	</div>
</template>
<style scoped lang='scss'>
    // 弹窗提示
    .message_layer{
      position: fixed;
      width: 100%;
      height: 100%;
      line-height: 100%;
      display: table;
      background: rgba(1,1,1,0.1);
      z-index: 999;
      top: 0;
      left: 0;
      >.message_box{
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        padding: 1rem;
        >span{
          padding: 0.15rem 0.4rem;
          background: rgba(1, 1, 1, 0.8);
          color: white;
          border-radius: 3px;
          font-size: 0.31rem;
          display: table;
          margin: 0 auto;
          line-height: 0.4rem;
        }
      }
    }
</style>
<script>
    export default {
        data () {
            return {
            }
        },
        created () {
        },
        mounted () {
        },
        watch : {
        },
        methods: {
           
        }
    }
</script>


