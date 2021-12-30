<template>
  <div class="profile">
    <navbar />
    <v-container fluid fill-height>
      <v-col>
        <profile-form />
      </v-col>
    </v-container>
  </div>
</template>

<script>
import ProfileForm from '../../components/UserManagement/ProfileForm.vue'
import Navbar from "../../components/Navbar.vue"

export default {
    name: 'Profile',
    components: {
        ProfileForm,
        Navbar
    }
}
</script>

<style>
.profile {
    background-color: #1E3163;
}
</style>