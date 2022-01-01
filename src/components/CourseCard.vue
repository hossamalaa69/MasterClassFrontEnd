<template>
  <div class="card-container" @click="handleCourseClick">
      <div class="div-float">
            <img
                :src="course.instructor_image"
                style = "width: 100%; max-width: 100%; height: 100%; max-height: 100%"
            />
       </div>
      <div class="course-card-div">
          <img
                :src="course.image"
                style = "width: 100%; max-width: 100%; height: 100%; max-height: 100%;"
          />
          <div class="course-info-div">
              <p id="course-name">{{course.name}}</p>
              <p id="instr-name">{{course.instructor_user_name}}</p>
          </div>
      </div>
    </div>    
</template>

<script>

export default {
  name: 'CourseCard',
  components: {
  },
  data () {
        return{
        }
  },
  props: {
        course: Object
  },
  watch: { 
        $props:{
            immediate: true,
            deep: true,
            handler() { // watch it
                if (this.course.image.indexOf(process.env.VUE_APP_BACKEND_ROUTE) == -1)
                    this.course.image = process.env.VUE_APP_BACKEND_ROUTE + this.course.image;
                if (this.course.instructor_image.indexOf(process.env.VUE_APP_BACKEND_ROUTE) == -1)
                    this.course.instructor_image = process.env.VUE_APP_BACKEND_ROUTE + this.course.instructor_image;
            }
        }
  },
  methods: {
      handleCourseClick: function(){
        this.$router.push({path: '/courses/info/'+this.course.id});
      }
  }
};
</script>

<style scoped lang="scss">
.card-container{
    .div-float{
        position: relative;
        top: 42%;
        left: 8%;
        height: 50px;
        width: 50px;
        background-color: white;
        border: 1px solid #AAA;
        border-radius: 3px;
        padding: 3px;
        z-index: 5;
    }
    .course-card-div{
        //width: 20%;
        height: 380px;
        background-color: white;
        transition: box-shadow 0.2s;
        cursor: pointer;
        border-radius: 4px;
        display: grid;
        grid-template-rows: 42% 58%;
        &:hover{
            transform: scale(1.01);
            box-shadow: 0 0 20px rgba(10,10,10,0.5); 
        }
        .course-info-div{
            padding-top: 50px;
            padding-left: 7%;
            padding-right: 7%;
            #course-name{
                font-size: 1.2rem;
                line-height: 1.75rem;
                font-family: Source Sans Pro,Arial,sans-serif;
                font-weight: 600;
                color: #000d6b;
                margin-bottom: 5px;
                @media (max-width: 1000px) {
                    font-size: 1rem;
                }
            }
            #instr-name{
                margin-top: 0;
                color: #666;
                letter-spacing: 0;
                font-size: 1rem;
                line-height: 1.5rem;
                font-family: Source Sans Pro,Arial,sans-serif;
                font-weight: 500;
                @media (max-width: 1000px) {
                    font-size: 0.8rem;
                }
            }
        }
    }
}

</style>