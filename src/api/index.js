import Axios from '@/axios'

Axios.defaults.withCredentials = true;
Axios.defaults.baseURL = '/example'
/*
 **登录接口
 */
export const userLogin = data => {
    return Axios.post('https://easy-mock.com/mock/5f5b32bd9ff3095b55ad86bc/example/user/login', data)
}
/*
 *目录菜单查询
 */
export const catalogQuery = data => {
    return Axios.post('https://easy-mock.com/mock/5f5b32bd9ff3095b55ad86bc/example/catalog/queryTree', data)
}

/*
 **合同下载
 */
export const queryDistributorInfoList = data => {
    return Axios.post('https://easy-mock.com/mock/5f5b32bd9ff3095b55ad86bc/example/catalog/queryTree', data)
}