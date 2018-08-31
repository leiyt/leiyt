

import PL_MESSAGE from './pl_message/index.js'
// import PL_MYORDER from './pl_myorder/index.js'
import GLB_VALID from './glb_valid'
import GLB_SCROLL from './glb_scroll'
import Pl_ERRHANDLE from './pl_errhandle'
import Pl_FLOATMENU from './pl_floatmenu'
import GLB_FUNC from './glb_function'






import api from '../api/index.js'
import Router from 'vue-router'


const plugins = ( Vue , App )=> {
	Vue.use(Router)
	var router = new Router({mode:'history'})  // history是为了去掉 .html #/ 问题
		// 解决翻页后 位置问题 t
		router.afterEach((to,from,next) => {
		    window.scrollTo(0,0);
		});
		// 解决翻页后 位置问题 b
	const MyPlugins = {
	    install: function(Vue){
	        const $Glb = (Vue.prototype['$Glb'] = {});

	        // 验证
	        GLB_VALID( $Glb , Vue );

	        // 滚动
	        GLB_SCROLL( $Glb , Vue );

	        // 全局零散方法
	        GLB_FUNC( $Glb , Vue );




	        // 消息提示
	        PL_MESSAGE( $Glb , Vue );

	        // 我的订单按钮
	        // PL_MYORDER( $Glb , Vue );


	        // 全局错误处理及公共组建
	        Vue.component('PluErrHandle',Pl_ERRHANDLE)


	        // 首页悬浮菜单
	        Vue.component('PluFloatMenu',Pl_FLOATMENU)


	    }
	}
	Vue.use(MyPlugins)


	Vue.prototype.$api = api
	
	Vue.config.productionTip = false


	new Vue({
	  el: '#app',
	  router,
	  template: '<App/>',
	  components: { App }
	})

}


export default plugins


