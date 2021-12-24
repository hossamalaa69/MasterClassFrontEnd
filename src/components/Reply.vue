<template>
    <div class="thread-card-div"> 
        <div class="user-info-div">
          <v-list-item style="flex: none">
            <v-list-item-avatar color="#000d6b">
              <v-img
                class="elevation-6"
                alt="user-image"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Blonde&facialHairType=Blank&clotheType=Hoodie&clotheColor=Black&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=White"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Mahmoud Amr</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <p style="margin-left: 3%; margin-top: 15px"> 
          Ah, I see my mistake. I was not correctly specifying the 'shape' parameter in the call to tf.reshape. This mistake is not caught by the two tests in one_hot_matrix_test.
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