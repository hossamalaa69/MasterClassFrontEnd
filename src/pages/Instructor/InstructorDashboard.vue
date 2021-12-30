<template>
  <v-app>
      <navbar />
      Hello, Instructor
  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar.vue"

export default {
  name: 'InstructorDashboard',
  components: {
    "navbar": Navbar  
  },
  data () {
        return{
        }
  }
};
</script>

<style scoped lang="scss">


</style>