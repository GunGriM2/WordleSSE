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

  getAll () {
    return api().get('/users')
  },

  updateStatistics(data) {
    return api().patch('/statistics', data,{withCredentials: true})
  },

  logout () {
    return api().post('/logout', {withCredentials: true})
  }
}
