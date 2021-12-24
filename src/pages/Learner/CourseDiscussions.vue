<template>
  <v-app>
      <navbar />
      <div class="discussion-grid"> 
        
        <div class="tip-new-thread-div"> 
            
          <v-card
              class="mx-auto"
              width="100%"
              outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    Quick Tips
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    Have Any Questions ?
                  </v-list-item-title>
                <p>
                  <br/>
                  You can first check old questions threads and their replies.
                  <br/>
                  <br/>
                  Didn't find your question? Just start a new one! and you'll find someone who will help you.
                </p>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <br/>
          <br/>
          <v-card
            class="mx-auto"
            width="100%">
            <v-textarea
                style="padding: 10px"
                full-width
                color="teal">
                <template v-slot:label >
                  <div>
                    Enter Your Question Here!
                  </div>
                </template>
            </v-textarea>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="#000d6b">
                  <v-img
                    class="elevation-6"
                    alt="user-image"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Hossam Alaa</v-list-item-title>
                </v-list-item-content>

                <v-row
                  align="center"
                  justify="end"
                >
                  <v-icon class="mr-1 icon-send">
                    mdi-message-plus
                  </v-icon>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        
        
        </div>    
        <div class="course-disc-div"> 
          <h4> Discussion Forums </h4>
        
          <thread-view v-for="index in 7" :key="index" />
        </div>  
      </div>
  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar.vue"
import Thread from "../../components/Thread.vue"

export default {
  name: 'CourseDiscussion',
  components: {
    "navbar": Navbar,
    "thread-view": Thread
  },
  data () {
        return{
            course_id: this.$route.params.course_id
        }
  }
};
</script>

<style scoped lang="scss">

.discussion-grid{
  margin-top: 30px;
  padding-left: 5%;
  padding-right: 5%;
  display: grid;
  grid-template-columns: 25% 70%;
  column-gap: 5%;

  .tip-new-thread-div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .icon-send{
      cursor: pointer;
      &:hover{
        opacity: 0.8;
        transform: scale(1.1);
      }
    }
  }


  .course-disc-div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    h4{
      color: rgb(31, 31, 31);
      font-size: 1.75rem;
      line-height: 2.25rem;
      font-family: Arial, sans-serif;
      font-weight: 600;
      letter-spacing: -0.1px;
      margin-bottom: 40px;
    }
  }
}
</style>