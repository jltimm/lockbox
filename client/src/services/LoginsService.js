import Api from '@/services/Api'

export default {
  /**
   * Fetches all logins
   */
  fetchLogins () {
    return Api().get('api/logins')
  },

  /**
   * Makes a post request to the server, and adds
   * a new login
   * @param {login} params The new login
   */
  addLogin (params) {
    return Api().post('api/login', params)
  },

  /**
   * Makes a put request to the server, and updates
   * the given login
   * @param {login} params The login to update
   */
  updateLogin (params) {
    return Api().put('api/login/' + params.id, params)
  },

  /**
   * Makes a get request to the server, and retrieves
   * the given login
   * @param {login} params The login to retrieve
   */
  getLogin (params) {
    return Api().get('api/login/' + params.id)
  },

  /**
   * Makes a delete request to the server, and then
   * deletes the given login
   * @param {String} id The ID of the login
   */
  deleteLogin (id) {
    return Api().delete('api/login/' + id)
  }
}
