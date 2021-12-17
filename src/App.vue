<template>
  <v-app>
     {{helloMsg}}
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    helloMsg: "Hello MasterClass"
  }),
};
</script>
