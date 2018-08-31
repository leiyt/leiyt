import TEMPLATE from './template.vue'
const PL_MYORDER = ( $Glb , Vue ) => {





	const PlMessageData = {
		'data':{
			'message' : {
	            'content':'',
	            'show':true,
	            'clear':null
	        }
		}
	}
	// $Glb.PlMessage = function( c='' , s=1 ,fn){
	//     PlMessageData.data.message.content = c ;
	//     PlMessageData.data.message.show = true ;
	//     clearTimeout( PlMessageData.data.message.clear ) ;
	//     PlMessageData.data.message.clear = setTimeout(function(){
	//         PlMessageData.data.message.show=false;
	//         if(fn){
	//             fn()
	//         }
	//     },s)
	// }
	// $Glb.PlMessageNone = function(){
	// 	$Glb.PlMessage('',1)
	// }


	let PlMessage = Vue.extend(TEMPLATE);
	let plmessage = new PlMessage(PlMessageData)
	plmessage.vm = plmessage.$mount();
	document.body.appendChild(plmessage.vm.$el);
	
}
export default PL_MYORDER