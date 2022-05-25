import api from '@/services/api'

export default {
  create (userData) {
    return api().post('/register', userData)
  },

  login(userData) {
    return api().post('/login', userData, {withCredentials: true})
  },

  getOne () {
    return api().get('/user', {withCredentials: true})
  },

  logout () {
    return api().post('/logout', {withCredentials: true})
  }
}
