import request from './request'
import { sha256 } from 'js-sha256'
import { Base64 } from 'js-base64'

const ts = timestamp()

function timestamp() {
  return Date.parse(new Date().toString())
}

export const login = (data) => {
  return request({
    url: '/login?ts=' + ts,
    method: 'POST',
    data: { username: data.username, password: sha256(Base64.encode(data.password + ts)) }
  })
}
