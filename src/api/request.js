import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 统一带上鉴权字段
service.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
  },
    (error) => {
  return Promise.reject(new Error(error))
  })

// 统一处理响应体
service.interceptors.response.use(
  (response) => {
  const { data, code } = response.data
  if (code === 200 || code === 201) {
    ElMessage({
      message: response.data.message,
      type: 'success'
    })
    return data
  } else {
    const message = response.data.message
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
},
  (error) => {
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error(error.response.message))
  }
  )
export default service
