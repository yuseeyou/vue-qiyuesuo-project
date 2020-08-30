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
        isLogin: JSON.parse(localStorage.getItem('isLogin') || 'false'),   // 用户是否登陆
        userToken: localStorage.getItem('userToken') || '',   // 用户token
        userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),   // 用户详细信息
    },
    mutations: {
        [SETUSERTOKEN](state: any, payload: any) {
            state.userToken = payload;
            state.isLogin = true;
        },
        [SETUSERINFO](state: any, payload: any) {
            state.userInfo = payload;
        },
        [LOGOUT](state: any) {
            state.isLogin = false;
            state.userToken = "";
            state.userInfo = {};
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
            return result
        },
        //登出
        async [DOLOGOUT](context: contextFormat, payload: userForm) {
            const result = await httpPost('api/logout');
            if (result?.data?.code === 0) {
                context.commit(LOGOUT);
            } else {
                handelError(result?.data?.message);
            }
            return result
        }
    }
}

//解决vuex刷新数据丢失问题
window.addEventListener("beforeunload", () => {
    localStorage.setItem("isLogin", JSON.stringify(user.state.isLogin));
    localStorage.setItem("userToken", user.state.userToken);
    localStorage.setItem("userInfo", JSON.stringify(user.state.userInfo));
})

export default user