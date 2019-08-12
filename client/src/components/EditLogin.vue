<template>
  <div class="logins">
    <h1>Edit Login</h1>
      <div class="form">
        <div>
          <input type="text" name="website" placeholder="WEBSITE" v-model="website">
        </div>
        <div>
          <input type="text" name="username" placeholder="USERNAME" v-model="username">
        </div>
        <div>
          <input type="text" name="password" placeholder="PASSWORD" v-model="password">
        </div>
        <div>
          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul v-for="(error, idx) in errors" v-bind:key="idx">{{ error }}</ul>
          </p>
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
      errors: [],
      id: '',
      website: '',
      username: '',
      password: ''
    }
  },
  mounted () {
    this.getLogin()
  },
  methods: {
    /**
     * Populates id, username, and password. If the edit button is clicked
     * then grab the data from the loginToEdit button, but if the route is navigated
     * to directly then grab it from the server
     */
    async getLogin () {
      if (this.loginToEdit) {
        this.id = this.loginToEdit._id
        this.website = this.loginToEdit.website
        this.username = this.loginToEdit.username
        this.password = this.loginToEdit.password
      } else {
        this.id = this.$route.params.id
        const response = await LoginsService.getLogin({
          id: this.id
        })
        this.website = response.data.website
        this.username = response.data.username
        this.password = response.data.password
      }
    },
    /**
     * Updates the login, and redirects back to the Logins component
     */
    async updateLogin () {
      if (this.hasEmptyValues()) {
        this.addErrors()
        return
      } else if (this.hasChanges()) {
        await LoginsService.updateLogin({
          id: this.id,
          website: this.website,
          username: this.username,
          password: this.password
        })
      }
      this.$router.push({ name: 'Logins' })
    },
    hasChanges () {
      return this.website !== this.loginToEdit.website || this.username !== this.loginToEdit.username || this.password !== this.loginToEdit.password
    },
    hasEmptyValues () {
      return !this.website || !this.username || !this.password
    },
    addErrors () {
      this.errors = []
      if (!this.website) {
        this.errors.push('Website required')
      }
      if (!this.username) {
        this.errors.push('Username required')
      }
      if (!this.password) {
        this.errors.push('Passsord required')
      }
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
