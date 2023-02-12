import { login as LoginApi } from '@/api/login'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { setTokenTime } from '@/utils/auth'
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
            setTokenTime()
            router.replace('/')
            resolve()
        })
          .catch((err) => {
          reject(err)
        })
      })
    },
    logout({ commit }) {
      commit('setToken', '')
      localStorage.clear()
      router.replace('/login')
    }
  }
}
