<template>
  <div class="profile">
    <v-container fluid fill-height>
      <v-col>
        <profile-form />
      </v-col>
    </v-container>
  </div>
</template>

<script>
import ProfileForm from '../../components/UserManagement/ProfileForm.vue'
export default {
    name: 'Profile',
    components: {
        ProfileForm
    }
}
</script>

<style>
.profile {
    background-color: #1E3163;
    height: 100%
}
</style>