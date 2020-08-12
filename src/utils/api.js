import { get, post } from '@/utils/request'


// 登录
export const login= (params) => post('/user/login/', params)
//init
export const initAdmin= (params) => get('/user/login/', params)

//获取分类列表
export const getLevel= (params) => post('/yuqing/param', params)
//获取舆情
export const overView= (params) => post('/yuqing/overview', params)
//获取微博舆情
export const weibo= (params) => post('/yuqing/weibo', params)

