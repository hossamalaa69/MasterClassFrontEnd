<template>
  <v-app>
      <navbar />
      <div class="course-info-div">
        <div class="course-brief">
            <div class="course-brief-content">
                <p id="course-cat-p">AI Category</p>
                <p id="course-name-p">Natural Language Processing with Classification and Vector Spaces</p>
                <br/>
            </div>
            <div class="course-brief-university">
                <p id="offered-by-p">Offered By</p>
                <p id="univ-name-p">Stanford University</p>
            </div>    
        </div>    
      </div>
  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar.vue"

export default {
  name: 'CourseInfo',
  components: {
    "navbar": Navbar,
  },
  data: () => ({
  }),
};
</script>

<style scoped lang="scss">

.course-info-div{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .course-brief{
        height: 65vh;
        width: 100%;
        background-image: linear-gradient(90deg, #164d5b, #34abcc);
        display: grid;
        grid-template-columns: 55% 45%;
        padding-top: 3%;
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
        .course-brief-university{
            #offered-by-p{
                color: white;
                font-size: 0.9rem;
            }
            #univ-name-p{
                font-family: Arial,sans-serif;
                color: white;
                font-weight: 500;
                font-size: 2.0rem;
                line-height: 46px;
            }
        }
    }
}

</style>