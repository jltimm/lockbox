<template>
  <div class="passwords">
    <h1>Passwords</h1>
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
import PasswordsService from '@/services/PasswordsService'
export default {
  name: 'passwords',
  data () {
    return {
      logins: []
    }
  },
  mounted () {
    this.getPasswords()
  },
  methods: {
    async getPasswords () {
      const response = await PasswordsService.fetchPasswords()
      this.logins = response.data
    }
  }
}
</script>