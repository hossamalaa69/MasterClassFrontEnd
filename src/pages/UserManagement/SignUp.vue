<template>
  <div class="signup">
    <v-container fluid fill-height>
      <v-spacer></v-spacer>
      <v-col cols="12" md="5">
        <signup-form />
      </v-col>
      <v-spacer></v-spacer>
    </v-container>
  </div>
</template>

<script>
import SignupForm from "../../components/UserManagement/SignUpForm.vue";

export default {
  name: "SignUp",
  components: {
    SignupForm,
  },
};
</script>

<style>
.signup {
  background-color: #F8F8F8;
}
</style>