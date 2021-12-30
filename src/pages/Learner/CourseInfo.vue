<template>
  <v-app>
        <navbar />
        <div class="course-info-div">
            <div class="course-brief">
                <div class="course-brief-content">
                    <p id="course-name-p">{{course.name}}</p>
                    <br/>
                    <div>
                        <v-avatar size="50">
                            <img
                                width="50" height="50"
                                :src="course.instructor_image"
                                alt="Instructor Image">
                        </v-avatar>
                        <a style="color:white; margin-left: 15px">{{course.instructor_user_name}}</a>
                    </div>
                    <br/>
                    <button class="btn-open-course" @click="$router.push({path: '/courses/content/' + course_id })">
                        Open Turorial
                    </button>    
                    <button class="btn-open-course" @click="$router.push({path: '/courses/discussions/' + course_id })">
                        Open Discussion
                    </button>
                </div>
            </div>    
        </div>
        <div class="bookmarks-div"> 
            <a @click="$vuetify.goTo('#about-div', {duration:500})">About</a>
            <a @click="$vuetify.goTo('#syllabus-div', {duration: 700})">Syllabus</a>
        </div>
        <div id="about-div">
            <h4>About this course:</h4> 
            <br/>   
            <pre>{{course.about}}</pre>
        </div>    
        
        <div id="syllabus-div">
            <h4>
                Syllabus - What you will learn from this course
            </h4>
            <br/>
            <syllabus-item v-for="index in 4" :key="index" />      
        </div>    
  </v-app>
</template>

<script>

import Navbar from "../../components/Navbar.vue"
import SyllabusItem from "../../components/SyllabusItem.vue"

export default {
  name: 'CourseInfo',
  components: {
    "navbar": Navbar,
    "syllabus-item": SyllabusItem
  },
  data () {
        return{
            course_id: this.$route.params.course_id,
            course: {},
            response: {},
            loadingState: true
        }
  },
    async mounted(){
        console.log("Mounted Course page");
        try{
            this.response = await this.$store.dispatch("getCourse", {
                userToken : localStorage.getItem('userToken'),
                id: this.course_id
            });
            //console.log(this.response.data);
            this.course = this.response.data;
            this.course.instructor_image = "http://localhost:3000" + this.course.instructor_image;
            console.log("Get Course response");
            console.log(this.course);
            this.loadingState = false;
        } 
        catch (error) {
            console.log("an error occured")
            this.loadingState = false
            console.log(error);
        }
    }

};
</script>

<style scoped lang="scss">

.course-info-div{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .course-brief{
        //height: 65vh;
        width: 100%;
        background-image: linear-gradient(90deg, #164d5b, #34abcc);
        display: grid;
        grid-template-columns: 80% 20%;
        column-gap: 3%;
        padding-top: 3%;
        padding-bottom: 3%;
        padding-left: 4%;
        padding-right: 4%;
        .course-brief-content{
            #course-cat-p{
                color: white;
                font-size: 0.9rem;                
            }
            #course-name-p{
                font-family: Arial,sans-serif;
                color: white;
                font-weight: 700;
                font-size: 2.2rem;
                line-height: 46px;                
            }
        }
        .btn-open-course{
            background-color: #F65B66;
            color: #FFFFFF;
            margin-right: 20px;
            font-size: 1.1rem;
            border-radius: 3px;
            height: 50px;
            padding: 10px 20px 10px 20px;
            &:hover{
                transform: scale(1.01);
                opacity: 0.9;
            }
        }
        @media (max-width: 1100px) {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            row-gap: 10vh;
            //height: auto;
        }
    }
}

.bookmarks-div{
    padding: 10px 4% 10px 4%;
    border-bottom: 1px solid #EEE;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    a{
        text-decoration: none;
        color: #000;
        font-weight: 500;
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
    }
}

#about-div{
    
    padding: 15px 20% 15px 4%;
    h4{
        font-size: 24px;
        line-height: 30px;
        font-weight: 400;
    }
    pre{
        white-space: pre-line;
        font-family: Arial, Helvetica, sans-serif;
    }
    border-bottom: 1px solid #EEE;
    
}
#syllabus-div{
    padding: 15px 4% 15px 4%;
    h4{
        text-align: center;
        font-size: 24px;
        line-height: 30px;
        font-weight: 400;
    }
}

html {
  scroll-behavior: smooth;
}

</style>