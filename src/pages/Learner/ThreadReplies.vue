<template>
  <v-app>
      <navbar />
      <div class="discussion-grid"> 
        <div class="tip-new-thread-div"> 
          <v-card
            class="mx-auto"
            width="100%">
            <v-textarea
                v-model="threadInput"
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
                <v-list-item-avatar>
                  <v-img
                    class="elevation-6"
                    alt="user-image"
                    :src="userImageUrl"
                  ></v-img>
                </v-list-item-avatar>
                <v-row
                  align="center"
                  justify="end">
                  <v-icon class="mr-1 icon-send"  @click="AddReply">
                    mdi-message-plus
                  </v-icon>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </div>    
        <div class="text-center" v-if="loadingState">
              <v-progress-circular
                  indeterminate
                  color="primary"
              ></v-progress-circular>
        </div>
        <div class="course-disc-div"  v-if="!loadingState"> 
          <h4> {{parent_body}} </h4>
          <reply-view v-for="reply in replies" :key="reply.id" :reply="reply" />    
          <v-alert
              v-if="!loadingState && !replies.length"            
              border="left"
              color="indigo"
              dark
              style="text-align: center"
              width="100%"
              > No replies yet in this thread!
          </v-alert>
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
            thread_id: this.$route.params.thread_id,
            course_id: this.$route.params.course_id,
            response: {},
            replies: [],
            loadingState: true,
            threadInput: '',
            userImageUrl: '',
            parent_body: ''
        }
  },
  methods: {
    async AddReply(){
      if(this.threadInput != ''){
        this.loadingState = false;
        try{
            this.response = await this.$store.dispatch("addReply", {
                userToken : localStorage.getItem('userToken'),
                body : this.threadInput,
                course_id : this.course_id,
                parent_id: this.thread_id
            });
            const res = this.response.data.comment;
            const thread_new = {
              id: res.id,
              course_id: res.course_id,
              body: this.threadInput,
              image: this.userImageUrl,
              user_name: localStorage.getItem('username')
            }
            this.replies.unshift(thread_new);         
            this.threadInput = "";
        } 
        catch (error) {
            this.loadingState = false
            console.log(error);
        }
      }
    }
  },
  async mounted(){
      this.userImageUrl = localStorage.getItem("imageUrl")
      try{
          this.response = await this.$store.dispatch("getReplies", {
              userToken : localStorage.getItem('userToken'),
              thread_id : this.thread_id
          });
          this.replies = this.response.data.comments;
          this.replies.reverse();
          this.parent_body = this.replies[0].parent_body;
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