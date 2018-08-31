import Vue from 'vue';
import Vuex from 'vuex';

import bzgqy_store from './bzgqy_store.js';
import footer_store from './footer_store.js';

Vue.use( Vuex );

const state = {
	bzgqy_store,
	footer_store,
};

const mutations = {
    SET_TAGLIST_OFSET( state , value ){
		state.bzgqy_store.targetOffsetTop = value[0] ;	
		state.bzgqy_store.targetOffsetTop_stu = value[1] ;	
    },
    FOOTER_CONFIG_M( state , value ){
        state.footer_store['type'] = value['type'] ;    
		state.footer_store['clickFunc'] = value['footerClick'] ;	
    }
    
}
const actions = {
    FOOTER_CONFIG(context,vArr){
        context.commit('SET_TAGLIST_OFSET',vArr[ 0 ]);
        context.commit('FOOTER_CONFIG_M',vArr[ 1 ]);
    },
}
// this.$store.dispatch('FOOTER_CONFIG',[[11.4,true],{'page':1}])
// this.$store.commit("SET_TAGLIST_OFSET",[11.4,true]);
export default new Vuex.Store({
    state,
    mutations,
    actions,
})
