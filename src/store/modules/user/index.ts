import {DOLOGIN, SETUSERTOKEN, LOGOUT, DOLOGOUT, SETUSERINFO} from "./actions";
import {httpGet, httpPost} from "@/utils/http";
import {handelError} from '@/utils'

interface userForm {
    username: string,
    password: string
}

interface contextFormat {
    state: any,
    commit: any,

    [propName: string]: any
}

const user = {
    namespaced: true,
    state: {
        isLogin: false,  // 用户是否登陆
        userToken: '',   // 用户token
        user: ''         // 用户详细信息
    },
    mutations: {
        [SETUSERTOKEN](state: any, payload: any) {
            state.userToken = payload;
            state.isLogin = true;
        },
        [SETUSERINFO](state: any, payload: any) {
            state.user = payload;
        },
        [LOGOUT](state: any) {
            state.isLogin = false;
            state.userToken = "";
            state.user = '';
        }
    },
    actions: {
        //登录
        async [DOLOGIN](context: contextFormat, payload: userForm) {
            const result = await httpPost('api/login', payload);
            if (result?.data?.code === 0) {
                context.commit(SETUSERTOKEN, result?.data?.token);
                const userInfo = await httpGet('api/user', payload);
                if (userInfo?.data?.code === 0) {
                    context.commit(SETUSERINFO, userInfo?.data?.result);
                } else {
                    handelError(result?.data?.message);
                }
            } else {
                handelError(result?.data?.message);
            }
        },
        //登出
        async [DOLOGOUT](context: contextFormat, payload: userForm) {
            const result = await httpPost('api/logout');
            if (result?.data?.code === 0) {
                context.commit(LOGOUT)
            } else {
                handelError(result?.data?.message);
            }
        }
    },
    getters: {}
}

export default user