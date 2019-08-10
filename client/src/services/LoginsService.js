import Api from '@/services/Api'

export default {
  fetchLogins () {
    return Api().get('logins')
  },

  addLogin (params) {
    return Api().post('logins', params)
  }

}
