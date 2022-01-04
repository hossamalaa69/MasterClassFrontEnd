<template>
  <v-app>
    <navbar />
    <div class="course-info-div">
      <div class="course-brief">
        <div class="course-brief-content">
          <p id="course-name-p">{{ course.name }}</p>
          <br />
          <div>
            <v-avatar size="50">
              <img
                width="50"
                height="50"
                :src="course.instructor_image"
                alt="Instructor Image"
              />
            </v-avatar>
            <a style="color: white; margin-left: 15px">{{
              course.instructor_user_name
            }}</a>
          </div>
          <br />
          <br>
          <!-- Add new lesson button -->
          <v-tooltip
            left
            color="#000D6B"
            v-if="course.instructor_user_name === currentUsername"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                color="#000D6B"
                right
                absolute
                @click="dialog = true"
                v-bind="attrs"
                v-on="on"
                ><v-icon color="#f8f8f8">mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Add Lesson</span>
          </v-tooltip>
          <!-- Add new lesson dialog -->
          <v-row justify="center">
            <v-dialog
              v-model="dialog"
              persistent
              transition="dialog-top-transition"
              max-width="600px"
            >
              <v-card>
                <v-toolbar dark color="#000D6B">
                  <v-toolbar-title>Add Lesson</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-icon @click="dialog = false"> mdi-close </v-icon>
                </v-toolbar>
                <v-card-title> </v-card-title>
                <v-card-text>
                  <v-form ref="form">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Lesson name*"
                          :rules="[required]"
                          maxlength="20"
                          counter
                          v-model="newLesson.name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          label="Lesson Description*"
                          :rules="[required]"
                          clearable
                          counter
                          rows="3"
                          maxlength="500"
                          hint="Tell us more about this lesson"
                          v-model="newLesson.description"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <template>
                      <div>
                        <v-file-input
                          :rules="[required]"
                          v-model="newLesson.document_data"
                          accept="application/pdf"
                          chips
                          multiple
                          label="Lesson PDFs*"
                        ></v-file-input>
                      </div>
                    </template>
                    <template>
                      <v-combobox
                        v-model="newLesson.link"
                        chips
                        clearable
                        :rules="[required, youtubeLink()]"
                        append-icon=""
                        label="Lesson Youtube Links*"
                        multiple
                        deletable-chips
                        hint="Press enter after each link"
                      >
                        <template v-slot:selection="{ attrs, item, selected }">
                          <v-chip
                            v-bind="attrs"
                            :input-value="selected"
                            close
                            @click:close="remove(item)"
                          >
                            <v-icon>mdi-youtube</v-icon>
                            {{ "  " + item }}
                          </v-chip>
                        </template>
                      </v-combobox>
                    </template>
                    <vue-link-preview
                      v-for="link in newLesson.link"
                      :key="link"
                      :url="link"
                    ></vue-link-preview>

                    <small>*indicates required field</small>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#000D6B" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn color="#000D6B" text @click="createLesson">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <button
            class="btn-open-course"
            @click="$router.push({ path: '/courses/content/' + course_id })"
          >
            Open Tutorial
          </button>
          <button
            class="btn-open-course"
            @click="$router.push({ path: '/courses/discussions/' + course_id })"
          >
            Open Discussion
          </button>
        </div>
      </div>
    </div>
    <div class="text-center" v-if="loadingState">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div class="bookmarks-div" v-if="!loadingState">
      <a @click="$vuetify.goTo('#about-div', { duration: 500 })">About</a>
      <a @click="$vuetify.goTo('#syllabus-div', { duration: 700 })">Syllabus</a>
    </div>
    <div id="about-div" v-if="!loadingState">
      <h4>About this course:</h4>
      <br />
      <pre>{{ course.about }}</pre>
    </div>
    <div id="syllabus-div" v-if="!loadingState">
      <h4>Syllabus - What you will learn from this course</h4>
      <br />
      <syllabus-item
        v-for="week in syllabus"
        :key="week.activity_name"
        :week="week"
      />
      <v-alert
        v-if="!loadingState && !syllabus.length"
        border="left"
        color="indigo"
        dark
        style="text-align: center"
        width="100%"
      >
        No syllabus yet in this course!
      </v-alert>
    </div>
  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import SyllabusItem from "../../components/SyllabusItem.vue";
import LinkPreview from "@ashwamegh/vue-link-preview";

export default {
  name: "CourseInfo",
  components: {
    navbar: Navbar,
    "syllabus-item": SyllabusItem,
    "vue-link-preview": LinkPreview,
  },
  data() {
    return {
      course_id: this.$route.params.course_id,
      course: {},
      syllabus: {},
      response: {},
      loadingState: true,
      dialog: false,
      newLesson: {
        name: null,
        description: null,
        link: [],
        document_data: [],
      },
      currentUsername: localStorage.getItem("username"),
    };
  },
  async mounted() {
    try {
      this.getDataFromApi()
    } catch (error) {
      this.loadingState = false;
      console.log(error);
    }
  },
  methods: {
    remove(item) {
      this.newLesson.link.splice(this.newLesson.link.indexOf(item), 1);
      this.newLesson.link = [...this.newLesson.link];
    },
    required(value) {
      if (value instanceof Array && value.length == 0) {
        return "Required.";
      }
      return !!value || "Required.";
    },
    youtubeLink() {
      return (v) =>
      {
        if (v instanceof Array) {
          let valid = true
          v.forEach(val => {
            valid &&=  (val && /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)&?/.test(val));
          });
          return valid || "Please enter a valid youtube link!"
        }
        return (v && /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)&?/.test(v)) || "Please enter a valid youtube link!";
      }
    },
    async createLesson() {
      try {
        if (!this.$refs.form.validate()) return
        const formData = new FormData();
        this.newLesson.link.forEach((link) => {
          if (link.indexOf("=") != -1) {
            formData.append("link[]","https://www.youtube.com/embed/" + link.split("=")[1]);
          } else {
            formData.append("link[]","https://www.youtube.com/embed/" + link.split("/").slice(-1)[0]);
          }
        });
        for (const key in this.newLesson) {
            if (key == 'link') continue
            if (key == "document_data") {
                for (let i = 0; i < this.newLesson[key].length; i++) {
                formData.append(key + "[]", this.newLesson[key][i]);
                }
            } else formData.append(key, this.newLesson[key]);
        }
        formData.append("course_id", this.course_id);
        await this.$store.dispatch("createLesson", formData);
        this.getDataFromApi();
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    }, async getDataFromApi(){
        this.response = await this.$store.dispatch("getCourse", {
            userToken: localStorage.getItem("userToken"),
            id: this.course_id,
        });
        this.course = this.response.data;
        this.course.instructor_image =
            process.env.VUE_APP_BACKEND_ROUTE + this.course.instructor_image;
        try {
            this.response = await this.$store.dispatch("getSyllabus", {
                userToken: localStorage.getItem("userToken"),
                id: this.course_id,
            });
            this.syllabus = this.response.data.courses;
            this.loadingState = false;
        } catch (error) {
            this.loadingState = false;
            console.log(error);
        }
        this.loadingState = false;
    }
  },
};
</script>

<style scoped lang="scss">
.course-info-div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .course-brief {
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
    .course-brief-content {
      #course-cat-p {
        color: white;
        font-size: 0.9rem;
      }
      #course-name-p {
        font-family: Arial, sans-serif;
        color: white;
        font-weight: 700;
        font-size: 2.2rem;
        line-height: 46px;
      }
    }
    .btn-open-course {
      background-color: #f65b66;
      color: #ffffff;
      margin-right: 20px;
      font-size: 1.1rem;
      border-radius: 3px;
      height: 50px;
      margin-top: 20px;
      padding: 10px 20px 10px 20px;
      &:hover {
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

.bookmarks-div {
  padding: 10px 4% 10px 4%;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  a {
    text-decoration: none;
    color: #000;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}

#about-div {
  padding: 35px 20% 50px 4%;
  h4 {
    font-size: 24px;
    line-height: 30px;
    font-weight: 400;
  }
  pre {
    white-space: pre-line;
    font-family: Arial, Helvetica, sans-serif;
  }
  border-bottom: 1px solid #eee;
}
#syllabus-div {
  padding: 15px 4% 15px 4%;
  h4 {
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