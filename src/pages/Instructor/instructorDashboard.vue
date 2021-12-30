<template>
  <div>
      <navbar/>
      <v-container fluid>
        <v-row>
            <div class="text-h2 pt-3 pl-2 heading">
                Welcome {{instructorName}} &nbsp;!
            </div>
        </v-row>
        <v-row>
            <div class="text-h4 pt-3 pl-3 heading">
                Your Courses
            </div>
        </v-row>
        <v-row class="ml-6">
            <course-card 
            v-for="course in courses" :key="course.id"

            >
            </course-card>
        </v-row>
      </v-container>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue"
import courseCard from "../../components/CourseCard.vue"

export default {
    name : 'instructorDashboard',
    components: {
        Navbar,
        courseCard
    },
    data() { 
        return {
            instructorName: '',
            courses: []
        }
    },
    async mounted() {
        // let response = await this.$store.dispatch('getUserData', {userToken: token});
        this.instructorName = localStorage.getItem('name');
        let user_name = localStorage.getItem('username');
        let userToken = localStorage.getItem('userToken');
        let payload = {
            user_name : user_name,
            userToken : userToken
        }
        let response = await this.$store.dispatch('getInstructorCourses', payload);
        this.courses = response.courses;
        console.log(this.courses)
    }

}
</script>

<style scoped>
    .heading{
        margin-left: 7%;
        color: #000d6b;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2.7rem;
        letter-spacing: -0.1px;
        font-weight: 550;
        margin-bottom: 0px;
    }
</style>