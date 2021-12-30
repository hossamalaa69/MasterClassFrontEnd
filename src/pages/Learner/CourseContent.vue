<template>
  <v-app>
      <navbar />
      <div class="course-content-div">
          <lecture-item v-for="lecture in syllabus" :key="lecture.activity_name" :lecture="lecture"/>
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
            course_id: this.$route.params.course_id,
            syllabus: {},
            response: {},
            loadingState: true
        }
  },
  async mounted(){
      try{
          this.response = await this.$store.dispatch("getSyllabus", {
          userToken : localStorage.getItem('userToken'),
          id: this.course_id
      });
      //console.log(this.response.data);
      this.syllabus = this.response.data.courses;
      console.log("Get Content response");
      console.log(this.syllabus);
      this.loadingState = false;
      } 
      catch (error) {
          console.log("an error occured in get syllabus")
          this.loadingState = false
          console.log(error);
      }
      this.loadingState = false;
  }

};
</script>

<style scoped lang="scss">

.course-content-div{
    display: flex;
    flex-direction: column;
}
</style>