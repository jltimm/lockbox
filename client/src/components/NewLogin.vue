<template>
  <div class="logins">
    <h1>New Login</h1>
      <div class="form">
        <div>
          <input type="text" name="username" placeholder="USERNAME" v-model="username">
        </div>
        <div>
          <input type="text" name="password" placeholder="PASSWORD" v-model="password">
        </div>
        <div>
          <button class="app_post_btn" @click="addLogin">Add</button>
        </div>
      </div>
  </div>
</template>

<script>
import LoginsService from '@/services/LoginsService'
export default {
  name: 'NewLogin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    /**
     * Adds a new login, and then redirects to the Logins component
     */
    async addLogin () {
      await LoginsService.addLogin({
        username: this.username,
        password: this.password
      })
      this.$router.push({ name: 'Logins' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
