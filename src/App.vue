<template>
  <v-app>
    <navbar />
    {{helloMsg}}
  </v-app>
</template>

<script>
import Navbar from "../src/components/Navbar.vue"

export default {
  name: 'App',
  components: {
    "navbar": Navbar
  },
  data: () => ({
    helloMsg: "Hello MasterClass"
  }),
};
</script>
