import Axios from '@/axios'
let context = '/cms'


/*
 **登录接口
 */
export const userLogin = data => {
    return Axios.post(context + '/user/login', data)
}
