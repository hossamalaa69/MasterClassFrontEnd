<template>
  <div class="login">
    <navbar/>
    <v-container fluid>
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-col cols="12" md="5">
          <login-form />
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
    </v-container>
  </div>
</template>

<script>
import LoginForm from "../../components/UserManagement/LoginForm.vue";
import Navbar from "../../components/Navbar.vue"

export default {
  name: "Login",
  components: {
    LoginForm,
    Navbar
  },
};
</script>

<style scoped>
.login {
  background-color: #1E3163;
  min-height: 100%;
  height: 100%;
}
</style>