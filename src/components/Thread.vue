<template>
    <div class="thread-card-div"> 
        <h4 v-on:click="openReplies"> 
          {{thread.body}}
        </h4>

        <div class="reply-div">
          <v-btn
                v-on:click="openReplies"
                class="btn-reply-trans">
                <v-icon left>
                  mdi-message-text
                </v-icon>
                Reply
          </v-btn>
          <v-list-item style="flex: none">
            <v-list-item-avatar>
              <v-img
                class="elevation-6"
                alt="user-image"
                :src="thread.image"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{thread.user_name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
    </div>
</template>

<script>

export default {
  name: 'ThreadCard',
  components: {
  },
  data : () => ({
  }),
  methods: {
    openReplies: function () {
      this.$router.push({path: '/courses/discussions/replies/'  + this.thread.course_id + '/' + this.thread.id}); 
    }
  },
  props: {
      thread: Object
  },
  mounted(){
    if(this.thread.image.substring(0,4) != "http")
        this.thread.image = "http://localhost:3000" + this.thread.image;
  }
};

//-- src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Blonde&facialHairType=Blank&clotheType=Hoodie&clotheColor=Black&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=White"

</script>

<style scoped lang="scss">

.thread-card-div{
    width: 80%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid gray;
    margin-bottom: 20px;
    h4{
        color: #0062e4;
        font-size: 1.25rem;
        line-height: 1.75rem;
        word-wrap: break-word;
        white-space: pre-line;
        font-family: "Source Sans Pro", Arial, sans-serif;
        font-weight: 600;
        letter-spacing: -0.1px;
        margin-bottom: 20px;
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
    }
    .reply-div{
      margin-bottom: 10px;
      height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .btn-reply-trans{
        background-color: transparent;
        color:  #0062e4;
        box-shadow: none;
      }
    }
    
}

</style>

