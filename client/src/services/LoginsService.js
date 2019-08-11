import Api from '@/services/Api'

export default {
  fetchLogins () {
    return Api().get('logins')
  },

  addLogin (params) {
    return Api().post('logins', params)
  },

  updateLogin (params) {
    return Api().put('logins/' + params.id, params)
  },

  getLogin (params) {
    return Api().get('login/' + params.id)
  }
}
