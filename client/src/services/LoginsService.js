import Api from '@/services/Api'

export default {
  fetchLogins () {
    return Api().get('api/logins')
  },

  addLogin (params) {
    return Api().post('api/login', params)
  },

  updateLogin (params) {
    return Api().put('api/login/' + params.id, params)
  },

  getLogin (params) {
    return Api().get('api/login/' + params.id)
  },

  deleteLogin (id) {
    return Api().delete('api/login/' + id)
  }
}
