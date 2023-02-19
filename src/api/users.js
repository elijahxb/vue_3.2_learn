import request from '@/api/request'
export const getUsers = (params) => {
  return request({
    url: '/users',
    params
    }
  )
}
