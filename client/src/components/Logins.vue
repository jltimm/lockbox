<template>
  <div class="logins">
    <h1>Logins</h1>
    <div v-if="logins.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewLogin' }" class="">Add Login</router-link>
      </div>
      <table>
        <tr>
          <td>Username</td>
          <td width="550">Password</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="(login, idx) in logins" v-bind:key="idx">
          <td>{{ login.username }}</td>
          <td>{{ login.password }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditLogin', params: { id: login._id, loginToEdit: login } }">Edit</router-link> |
            <a href="#" @click="deleteLogin(login._id, idx)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no logins.. please add one.<br /><br />
      <router-link v-bind:to="{ name: 'NewLogin' }" class="add_login_link">Add Login</router-link>
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
    },
    async deleteLogin (id, idx) {
      await LoginsService.deleteLogin(id)
      this.logins.splice(idx, 1)
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_login_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
