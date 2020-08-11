import { get, post } from '@/utils/request'

export const getApi= (params) => get('/pur/get/pageInit', params)

export const postApi= (params) => post('/level3', params)

export const getLevel1= (params) => post('/level1', params)

export const getLevel2= (params) => post('/level2', params)

export const getLevel3= (params) => post('/level3', params)