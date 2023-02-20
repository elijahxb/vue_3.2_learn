import request from '@/api/request'
export const getUsers = (params) => {
  return request({
    url: '/users',
    params
    }
  )
}

export const changeUserState = (uid, type) => {
  return request({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}
