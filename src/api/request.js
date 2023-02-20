import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from '@/utils/auth'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 统一带上鉴权字段
service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      if (diffTokenTime()) {
        store.dispatch('app/logout')
        return Promise.reject(new Error('token失效了'))
      }
    }
  config.headers.Authorization = localStorage.getItem('token')
  return config
  },
    (error) => {
  return Promise.reject(new Error(error))
  })

// 统一处理响应体
service.interceptors.response.use(
  (response) => {
  if (response.data.meta === undefined) {
    ElMessage.error(response.data)
    return Promise.reject(new Error(response.data))
  } else if (response.data.meta.code === 200 || response.data.meta.code === 201) {
    return response.data.data
  } else {
    const message = response.data.message
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
},
  (error) => {
    try {
      ElMessage.error(error.response.data.meta.message)
    } catch (e) {
      console.error('请求服务器异常：' + e)
    }
  }
  )
export default service
