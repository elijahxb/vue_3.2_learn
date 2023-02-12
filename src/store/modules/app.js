import { login as LoginApi } from '@/api/login'
import router from '@/router'
import { ElMessage } from 'element-plus'
export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        LoginApi(userInfo)
          .then((res) => {
          commit('setToken', res.token)
            ElMessage({
              message: '登陆成功',
              type: 'success'
            })
            router.replace('/')
            resolve()
        })
          .catch((err) => {
          reject(err)
        })
      })
    }
  }
}
