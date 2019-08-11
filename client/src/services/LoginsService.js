import Api from '@/services/Api'

export default {
  fetchLogins () {
    return Api().get('logins')
  },

  addLogin (params) {
    return Api().post('login', params)
  },

  updateLogin (params) {
    return Api().put('login/' + params.id, params)
  },

  getLogin (params) {
    return Api().get('login/' + params.id)
  },

  deleteLogin (id) {
    return Api().delete('login/' + id)
  }
}
