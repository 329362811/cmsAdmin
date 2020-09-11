/**
 * ajax 模块，可以将 axios 替换成 $.ajax 等
 */
import Vue from 'vue'
import store from '@/store/index'
import router from '@/router/index'
import {
    Message
} from 'element-ui'
Vue.component(Message.name, Message)
import axios from 'axios'
const Axios = axios.create({
    timeout: 30000,
    headers: {
        'content-type': "application/json;charset=UTF-8",
    }
})

// 全局的http request 处理
Axios.interceptors.request.use(config => {
    if (store.state.token) {
        config.headers.common['cmstoken'] = store.state.token
    }
    // 请求参数添加时间戳防止缓存
    if (config.method === 'get') {
        config.params = {
            // _t: Date.now(),
            ...config.params
        }
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 全局的http response 处理
Axios.interceptors.response.use(
    response => {
        let json = response.data
        if (response.headers.cmstoken) {
            store.commit('set_token', response.headers.cmstoken)
        }
        if (typeof json !== 'object') {
            Promise.reject(new Error({
                code: 1,
                msg: 'JSON格式',
                data: ''
            }))
        }
        if (json.succeeded) {
            store.commit('get_currentTime', json.dateTime)
            return json.result
        } else {
            if (json.errorCode == 'token.expire') {
                Vue.prototype.$message.error(json.errorMessage)
                let clearToken = setTimeout(() => {
                    clearTimeout(clearToken)
                    sessionStorage.clear()
                    store.commit('del_token')
                    store.commit('del_roleCodes')
                    router.replace('/login')
                }, 2000);
            } else {
                Vue.prototype.$message.error(json.errorMessage)
                return Promise.reject(error)
            }
        }
    },
    error => {
        Vue.prototype.$message.error(error.message)
        return Promise.reject(error)
    }
)

export default Axios