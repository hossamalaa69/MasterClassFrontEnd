<template>
  <v-app>
      <navbar />
      <div class="discussion-grid"> 
        <div class="tip-new-thread-div"> 
          <v-card
            class="mx-auto"
            width="100%">
            <v-textarea
                style="padding: 10px"
                full-width
                color="teal">
                <template v-slot:label >
                  <div>
                    Enter Your Reply Here!
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
          <h4> Non graded cell runs with error </h4>
          <reply-view v-for="index in 3" :key="index" />
        </div>  
      </div>
  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar.vue"
import Reply from "../../components/Reply.vue"

export default {
  name: 'ThreadReplies',
  components: {
    "navbar": Navbar,
    "reply-view": Reply
  },
  data () {
        return{
            thread_id: this.$route.params.thread_id
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
  @media (max-width: 900px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      row-gap: 40px;
  }
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
      color: #0062e4;
      font-size: 1.5rem;
      line-height: 2.0rem;
      font-family: Arial, sans-serif;
      font-weight: 600;
      letter-spacing: -0.1px;
      margin-bottom: 40px;
    }
  }
}
</style>