<template>
  <v-app>
      <navbar />
      Hello, Discussions
  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar.vue"

export default {
  name: 'CourseDiscussion',
  components: {
    "navbar": Navbar
  },
  data () {
        return{
            course_id: this.$route.params.course_id
        }
  }
};
</script>

<style scoped lang="scss">

</style>