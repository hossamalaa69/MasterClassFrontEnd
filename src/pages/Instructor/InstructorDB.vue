<template>
  <div>
      <navbar/>
      <v-container fluid class="container">
        <v-row>
            <div class="text-h2 pt-3 ml-2 heading">
                Welcome {{instructorName}} &nbsp;!
            </div>
        </v-row>
        <v-row>
            <div class="text-h4 pt-3 ml-3 heading">
                Your Courses
            </div>
        </v-row>

        <v-row>
            <div class="courses-div">
                <course-card v-for="course in courses" :key="course.id" :course=course />
            </div>
        </v-row>

        <v-row justify="center">
            <v-pagination
                v-model="pagination.page"
                :length="pagination.pages"
                @input="next"
            ></v-pagination>
        </v-row>

        <v-row justify="center">
            <v-col cols="8" md="4">
                <v-btn
                block
                color="#000D6B"
                type="submit"
                large
                class="white--text"
                >Add New Course
                </v-btn>
            </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue"
import courseCard from "../../components/CourseCard.vue"
export default {
    name : 'InstructorDashboard',
    components: {
        Navbar,
        courseCard
    },
    data() { 
        return {
            instructorName: '',
            instructorImageUrl: '',
            courses: [],
            pagination: {
                page: 1,
                pages: 0
            }
        }
    },
    async mounted() {
        // instructor data
        let token = localStorage.getItem('userToken');
        let response = await this.$store.dispatch('getUserData', {userToken: token});
        this.instructorName = response.user.name;
        this.instructorImageUrl = response.user.image;

        let user_name = localStorage.getItem('username')
        let payload = {
            user_name : user_name,
            userToken : token,
            limit: 4,
            offset: 0
        }
        response = await this.$store.dispatch('getInstructorCourses', payload);
        for (let i in response.courses) {
            this.courses.push({
                instructor_image: this.instructorImageUrl,
                name: response.courses[i].name,
                instructor_user_name: this.instructorName,
                id: response.courses[i].id
            })
        }
        this.pagination.pages = this.courses.length
    },
    methods: {
        async next (page) {
            let user_name = localStorage.getItem('username');
            let userToken = localStorage.getItem('userToken');
            let payload = {
                user_name : user_name,
                userToken : userToken,
                limit: 4,
                offset: (page-1)*4
            }
            let response = await this.$store.dispatch('getInstructorCourses', payload);
            this.courses = []
            for (let i in response.courses) {
                this.courses.push({
                    instructor_image: this.instructorImageUrl,
                    name: response.courses[i].name,
                    instructor_user_name: this.instructorName,
                    id: response.courses[i].id
                })
            }
        }
    }
}
</script>

<style scoped lang='scss'>
    .heading {
        margin-left: 7%;
        color: #000d6b;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2.7rem;
        letter-spacing: -0.1px;
        font-weight: 550;
        margin-bottom: 0px;
    }
    .container{
        background-color:#f8f8f8;
        height: 100%
    }
    .courses-div{
        /* padding-top: 2%;  */
        padding-left: 8%;
        padding-right: 8%;
        padding-bottom: 2%;
        width: 100%;
        /* height: 65vh; */
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
</style>