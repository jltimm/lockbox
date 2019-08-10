import Api from '@/services/Api'

export default {
  fetchPasswords () {
    return Api().get('passwords')
  }
}
