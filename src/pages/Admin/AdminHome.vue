<template>
  <v-app>
    <navbar />
    <div class="applicantProfile">
      <nav-bar-app />
      <v-container>
        <v-row no-gutters>
          <v-flex md9 lg11>
            <learners-table />
          </v-flex>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import LearnersTable from "../../components/LearnersTable.vue";
export default {
  name: "Home",
  components: {
    navbar: Navbar,
    learnersTable: LearnersTable,
  },
};
</script>



<style scoped>
.applicantProfile {
  background-color: #000D6B;
  height: 100%;
}
</style>