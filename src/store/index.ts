import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu/index';
import user from './modules/user/index';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        menu,
        user
    }
})
