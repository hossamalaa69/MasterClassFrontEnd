<template>
  <div class="signup">
    <navbar/>
    <v-container fluid>
      <v-row justify="center">
        <v-spacer></v-spacer>
          <v-col cols="12" md="5">
            <signup-form />
          </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SignupForm from "../../components/UserManagement/SignUpForm.vue";
import Navbar from "../../components/Navbar.vue"

export default {
  name: "SignUp",
  components: {
    SignupForm,
    Navbar
  },
};
</script>

<style>
.signup {
  background-color: #1E3163;
}
</style>