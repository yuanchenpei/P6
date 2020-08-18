import {get, post, put, del} from '@/utils/request'


// 登录
export const login = (params) => post('/user/login/', params)
//init
export const initAdmin = (params) => get('/user/login/', params)

//获取分类列表
export const getLevel = (params) => post('/yuqing/param', params)
//获取舆情
export const overView = (params) => post('/yuqing/overview', params)
//获取微博舆情
export const weibo = (params) => post('/yuqing/weibo', params)

//获取舆情数据列表
export const getQueryList = (params) => get('/yuqing/query_list_zl/', params)
//添加舆情数据
export const addQuery = (params) => post('/yuqing/query_list_zl/', params)
//更新舆情数据列表项
export const updateQuery = (params) => put('/yuqing/query_list_zl/', params)
//删除舆情数据列表项
export const deleteQuery = (params) => del('/yuqing/query_list_zl/', params)


//获取微博舆情数据列表
export const weiBoGetQueryList = (params) => get('/yuqing/query_list_wb/', params)
//添加微博舆情数据
export const weiBoAddQuery = (params) => post('/yuqing/query_list_wb/', params)
//更新微博舆情数据列表项
export const weiBoUpdateQuery = (params) => put('/yuqing/query_list_wb/', params)
//删除微博舆情数据列表项
export const weiBoDeleteQuery = (params) => del('/yuqing/query_list_wb/', params)

//舆情文件列表
export const getFileList = (params) => post('/yuqing/fileList/', params)
//上传舆情文件
export const upLoadFile = (params) => post('/yuqing/upload_zl/', params)
//删除舆情文件
export const deleteFile = (params) => post('/yuqing/delOne/', params)
//删除舆情文件
export const downLoadFile = (params) => post('/yuqing/download/', params,{
     responseType: "blob",
     headers: {
     "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;application/vnd.ms-excel"
}})

//上传微博文件
export const upLoadWeboFile = (params) => post('/yuqing/upload_wb/', params)