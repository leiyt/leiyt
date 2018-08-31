import TEMPLATE from './template.vue'
const PL_MESSAGE = ( $Glb , Vue ) => {
	// 小题提示插件，此方式不需要在组建内引用 t
	const PlMessageData = {
		'data':{
			'message' : {
	            'content':'',
	            'show':false,
	            'clear':null
	        }
		}
	}
	$Glb.PlMessage = function( c='' , s=1 ,fn){
	    PlMessageData.data.message.content = c ;
	    PlMessageData.data.message.show = true ;
	    clearTimeout( PlMessageData.data.message.clear ) ;
	    PlMessageData.data.message.clear = setTimeout(function(){
	        PlMessageData.data.message.show=false;
	        if(fn){
	            fn()
	        }
	    },s)
	}
	$Glb.PlMessageNone = function(){
		$Glb.PlMessage('',1)
	}
	let PlMessage = Vue.extend(TEMPLATE);
	let plmessage = new PlMessage(PlMessageData)
	plmessage.vm = plmessage.$mount();
	document.body.appendChild(plmessage.vm.$el);
	// 小题提示插件，此方式不需要在组建内引用 b
	// this.$Glb.PlMessage('内容',3000)
	// this.$Glb.PlMessageNone()
}
export default PL_MESSAGE