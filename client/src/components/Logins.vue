<template>
  <div class="logins">
    <h1>Logins</h1>
    This file will list all the usernames and passwords.
    <div v-for="login in logins" v-bind:key="login">
      <p>
        <span><b>{{ login.username }}</b></span><br />
        <span>{{ login.password }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import LoginsService from '@/services/LoginsService'
export default {
  name: 'logins',
  data () {
    return {
      logins: []
    }
  },
  mounted () {
    this.getLogins()
  },
  methods: {
    async getLogins () {
      const response = await LoginsService.fetchLogins()
      this.logins = response.data.logins
    }
  }
}
</script>
