<template>
  <v-app>
      <navbar />
          
       <div class="text-center" v-if="loadingState">
              <v-progress-circular
                  indeterminate
                  color="primary"
              ></v-progress-circular>
      </div>
      <div class="course-content-div" v-if="!loadingState">
          <lecture-item v-for="lecture in syllabus" :key="lecture.activity_name" :lecture="lecture"/>
      </div>
      <v-alert
          v-if="!loadingState && !syllabus.length"            
          border="left"
          color="indigo"
          dark
          style="text-align: center"
          width="100%"
          > Empty Tutorial for now!
      </v-alert>
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
      this.syllabus = this.response.data.courses;
      this.loadingState = false;
      } 
      catch (error) {
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