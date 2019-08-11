<template>
  <div class="logins">
    <h1>Edit Login</h1>
      <div class="form">
        <div>
          <input type="text" name="username" placeholder="USERNAME" v-model="username">
        </div>
        <div>
          <input type="text" name="password" placeholder="PASSWORD" v-model="password">
        </div>
        <div>
          <button class="app_login_btn" @click="updateLogin">Update</button>
        </div>
      </div>
  </div>
</template>

<script>
import LoginsService from '@/services/LoginsService'
export default {
  name: 'EditLogin',
  props: ['loginToEdit'],
  data () {
    return {
      id: '',
      username: '',
      password: ''
    }
  },
  mounted () {
    this.getLogin()
  },
  methods: {
    async getLogin () {
      if (this.loginToEdit) {
        this.id = this.loginToEdit._id
        this.username = this.loginToEdit.username
        this.password = this.loginToEdit.password
      } else {
        this.id = this.$route.params.id
        const response = await LoginsService.getLogin({
          id: this.id
        })
        this.username = response.data.username
        this.password = response.data.password
      }
    },
    async updateLogin () {
      await LoginsService.updateLogin({
        id: this.$route.params.id,
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
.app_login_btn {
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
