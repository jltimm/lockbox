<template>
  <div class="container">
    <section>
      <h1 v-if="isAdd" class="title">Add Login</h1>
      <h1 v-else class="title">Edit Login</h1>
      <b-field label="Website">
        <b-input placeholder="WEBSITE" v-model="website"></b-input>
      </b-field>
      <b-field label="Username">
        <b-input placeholder="USERNAME" v-model="username"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input type="password" password-reveal placeholder="PASSWORD" v-model="password"></b-input>
      </b-field>
      <div>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
            <ul v-for="(error, idx) in errors" v-bind:key="idx">{{ error }}</ul>
          </p>
      </div>
      <b-button type="is-primary" @click="updateLogin">Update</b-button>
    </section>
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
      password: '',
      isAdd: false
    }
  },
  mounted () {
    console.log(this.$route.path)
    if (this.$route.path === '/logins/new') {
      this.isAdd = true
    }
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
.form_input {
  width: 500px;
  align-items: center;
}
.container {
  max-width: 500px;
}
</style>
