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
  name: 'BrowseCourses',
  components: {
    "navbar": Navbar,
    "lecture-item": LectureItem
  },
  data: () => ({
  }),
};
</script>

<style scoped lang="scss">

.course-content-div{
    display: flex;
    flex-direction: column;
}
</style>