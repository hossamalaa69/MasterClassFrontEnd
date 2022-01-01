<template>
  <v-app>
      <navbar />
      <div class="page-div">
        <div class="welcome-div">
            <p>Welcome back!</p>
        </div>
        <div class="text-center"  v-if="loadingState">
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
        </div>
        <div class="courses-div"  v-if="!loadingState">
            <course-card v-for="course in courses" :key="course.name" :course=course />
        </div>
        <v-alert
            v-if="!loadingState && !courses.length"            
            border="left"
            color="indigo"
            dark
            style="text-align: center"
            width="100%"
            > Empty Courses for now!
        </v-alert>
      </div>
  </v-app>
</template>

<script>
import CourseCard from "../../components/CourseCard.vue"
import Navbar from "../../components/Navbar.vue"

export default {
  name: 'BrowseCourses',
  components: {
    "navbar": Navbar,
    "course-card": CourseCard 
  },
  data () {
        return{
            response: {},
            courses: [],
            loadingState: true
        }
  },
    async mounted(){
        
        try{
            this.response = await this.$store.dispatch("getCourses", {
                userToken : localStorage.getItem('userToken'),
                limit : 1000,
                offset : 0
            });
            this.courses = this.response.data.courses;
            this.loadingState = false;
        } 
        catch (error) {
            this.loadingState = false
            console.log(error);
        }
    }
};
</script>

<style scoped lang="scss">

.page-div{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .welcome-div{
        height: 25vh;
        width: 100%;
        background-color: #ebf3ff;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
        p{
            margin-left: 7%;
            color: #000d6b;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2.7rem;
            letter-spacing: -0.1px;
            font-weight: 550;
            margin-bottom: 0px;
        }
    }
    .courses-div{
        padding-top: 2%;
        padding-left: 8%;
        padding-right: 8%;
        padding-bottom: 2%;
        width: 100%;
        //height: 65vh;
        background-color: #EEE;
        display: grid;
        grid-template-columns: 22% 22% 22% 22%;
        column-gap: 3%;
        @media (max-width: 900px) {
            grid-template-columns: repeat(3, 1fr);
            column-gap: 2%;
        }
        @media (max-width: 600px) {
            grid-template-columns: repeat(2, 1fr);
            column-gap: 2%;
        }
        
    }
}

</style>