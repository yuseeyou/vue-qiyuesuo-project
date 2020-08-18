import {CHANGEMENUSTATE} from './actions';

const menu = {
    namespaced: true,
    state: {
        isOpenMenu: true
    },
    mutations: {
        [CHANGEMENUSTATE](state: any): void {
            state.isOpenMenu = !state.isOpenMenu;
        }
    }
}

export default menu