<template>
    <div class="thread-card-div"> 
        <div class="user-info-div">
          <v-list-item style="flex: none">
            <v-list-item-avatar>
              <v-img
                class="elevation-6"
                alt="user-image"
                :src="reply.image"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title> {{reply.user_name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <p style="margin-left: 3%; margin-top: 15px;word-wrap: break-word;white-space: pre-line; font-size: 1.2rem"> 
            {{reply.body}}
        </p>
    </div>
</template>

<script>

export default {
  name: 'ReplyCard',
  components: {
  },
  data () {
        return{
        }
  },
  props: {
    reply: Object
  },
  mounted(){
    console.log("Current Reply")
    console.log(this.reply);
    if(this.reply.image.substring(0,4) != "http")
        this.reply.image = "http://localhost:3000" + this.reply.image
  }
};
</script>

<style scoped lang="scss">

.thread-card-div{
    width: 80%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid gray;
    margin-bottom: 10px;
}

</style>