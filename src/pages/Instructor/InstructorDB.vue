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

                <template>
        <v-row justify="center">
            <v-dialog
            v-model="dialog"
            persistent
            transition="dialog-bottom-transition"
            max-width="600px"
            >
            <v-card>
                <v-toolbar dark
                color="#000D6B"
                >
                <v-toolbar-title>New Course</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon @click="dialog=false" > mdi-close </v-icon>
                </v-toolbar>
                <v-card-title>
                </v-card-title>
                <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <template>
                            <v-image-input
                            v-model="newCourse.image"
                            :image-quality="1"
                            clearable
                            imageBackgroundColor="#000D6B"
                            overlayBackgroundColor="#000D6B"
                            overlayPadding="0px"
                            overlayBorderWidth="0px"
                            :fullHeight=true
                            :fullWidth=true
                            :imageWidth=320
                            :imageHeight=180
                            :image-format="'png'"
                            :uploadIconStyle="{color:'#000D6B'}"
                            :clearIconStyle="{color:'#FF5DA2'}"
                            :errorIconStyle="{color: 'red'}"
                            :flipHorizontallyIconStyle="{color:'#000D6B'}"
                            :flipVerticallyIconStyle="{color:'#000D6B'}"
                            :rotateClockwiseIconStyle="{color:'#000D6B'}"
                            :rotateCounterClockwiseIconStyle="{color:'#000D6B'}"
                            :successIconStyle="{color:'#99DDCC'}"
                            @file-info="onFileInfo"
                            />
                        </template>
                    </v-col>
                </v-row>
                <v-row>
                <v-col
                    cols="12"
                >
                    <v-text-field
                    label="Course name*"
                    required
                    maxlength="20"
                    counter
                    v-model="newCourse.name"
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                >
                    <v-textarea
                    label="Course Info*"
                    required
                    clearable
                    counter
                    rows="3"
                    maxlength="500"
                    hint="Tell us more about this course"
                    v-model="newCourse.about"
                    ></v-textarea>
                </v-col>
                </v-row>
                
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="#000D6B"
                    text
                    @click="dialog = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="#000D6B"
                    text
                    @click="createCourse"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-row>
        </template>
        <v-row justify="center">
            <v-col cols="8" md="4">
                <v-btn
                block
                color="#000D6B"
                type="submit"
                large
                class="white--text"
                @click="dialog = true;"
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
import VImageInput from 'vuetify-image-input/a-la-carte'
export default {
    name : 'InstructorDashboard',
    components: {
        Navbar,
        courseCard,
        VImageInput,
    },
    data() { 
        return {
            instructorName: '',
            instructorImageUrl: '',
            courses: [],
            pagination: {
                page: 1,
                pages: 0
            },
            dialog: false,
            newCourse: {
                name:'',
                about:'',
                image:''
            },
            image:'',
        }
    },
    async mounted() {
        await this.getDataFromApi()
    },
    methods: {
        onFileInfo(value) {
			this.fileInfo = value;
		},
        async createCourse(){
            try {
                await this.$store.dispatch('createCourse', this.newCourse);
                this.getDataFromApi();
                this.dialog = false;
            } catch (error) {
                console.log(error);
            }
        },
        async getDataFromApi(limit = 4, page = 1){
            // instructor data
            let token = localStorage.getItem('userToken');
            let response = await this.$store.dispatch('getUserData', {userToken: token});
            this.instructorName = response.user.name;
            this.instructorImageUrl = response.user.image;

            let user_name = localStorage.getItem('username')
            let payload = {
                user_name : user_name,
                userToken : token,
                limit: limit,
                offset: (page-1)*4
            }
            response = await this.$store.dispatch('getInstructorCourses', payload);
            this.pagination.pages = Math.ceil(response.total/response.limit)
            response = response.data
            this.courses = []
            for (let i in response.courses) {
                this.courses.push({
                    instructor_image: this.instructorImageUrl,
                    name: response.courses[i].name,
                    instructor_user_name: this.instructorName,
                    id: response.courses[i].id
                })
            }
            console.log(response);
        },
        async next (page) {
            this.getDataFromApi(4, page)
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