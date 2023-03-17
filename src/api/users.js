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
    url: `/users/${uid}/state/${type}`,
    method: 'put'
  })
}

export const addUser = (data) => {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export const editUser = (data) => {
  console.log('edit')
  return request({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

export const deleteUser = (data) => {
  console.log('delete')
  return request({
    url: `users/${data.id}`,
    method: 'delete',
    data
  })
}
