<template>
  <v-app>
    <browse-courses />
  </v-app>
</template>

<script>
import BrowseCourses from "../src/pages/Learner/BrowseCourses.vue"

export default {
  name: 'App',
  components: {
    "browse-courses": BrowseCourses
  },
  data: () => ({
  }),
};
</script>
