<template>
  <div class="login">
    <v-container fluid fill-height>
      <v-spacer></v-spacer>
      <v-col cols="12" md="5">
        <login-form />
      </v-col>
      <v-spacer></v-spacer>
    </v-container>
  </div>
</template>

<script>
import LoginForm from "../../components/UserManagement/LoginForm.vue";
export default {
  name: "Login",
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login {
  background-color: #1E3163;
}
</style>