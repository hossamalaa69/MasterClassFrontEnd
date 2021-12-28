<template>
  <v-app>
    <nav-bar-app />
      <!-- <h1 id="title">There is always a way<br> to learn more</h1> -->
      <div class="tablet"></div>
      <v-btn id="sign-up" to="/signup" color="#000D6B">
        Get Started
      </v-btn>
      <!-- <v-img class="wave" src="../../assets/wave.svg"></v-img> -->
  </v-app>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
export default {
  name: "Home",
  components: {
    "nav-bar-app": Navbar,
  },
  data: () => ({}),
};
</script>

<style scoped lang="scss">


#sign-up{
  position: absolute;
  top: 80vh;
  left: 10vw;
  width: 80vw;
  z-index: 4;
  color: #F8F8F8;
}

#title {
  z-index: 3;
  position: relative;
  font-size: 5vw;
}

.wave {
  margin: 0px 0px;
  // background-image: url("../../assets/wave.svg");
  position: absolute;
  bottom: 0px;
  right: 0px;
  min-height: 50vh;
  width: 100vw;
  z-index: 5;
}

.tablet {
  margin: 0px 0px;
  background-image: url("../../assets/landing.svg");
  position: absolute;
  top: 8vh;
  left: 0px;
  min-height: 100vh;
  width: 100vw;
  z-index: 1;
}

.container {
  height: 500vh;
  z-index: 2;
}

@media only screen and (min-width: 768px) {
  .tablet {
    background-image: url("../../assets/landing-large.svg");
    top: 8vh;
  }

  #sign-up{
  position: absolute;
  top: 40vh;
  left: 5vw;
  width: 20vw;
  z-index: 4;
  font-size: 2vh;
}
}
</style>