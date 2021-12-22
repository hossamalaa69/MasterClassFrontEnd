<template>
  <v-app>
      <navbar />
      <div class="course-content-div">
          <lecture-item v-for="index in 4" :key="index" />
      </div>

  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar.vue"
import LectureItem from "../../components/LectureItem.vue"

export default {
  name: 'CourseContent',
  components: {
    "navbar": Navbar,
    "lecture-item": LectureItem
  },
  data () {
        return{
            course_id: this.$route.params.course_id
        }
  }
};
</script>

<style scoped lang="scss">

.course-content-div{
    display: flex;
    flex-direction: column;
}
</style>