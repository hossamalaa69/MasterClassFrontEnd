<template>
  <v-app>
    <nav-bar-app />
    <div class="applicantProfile">
      <v-container>
        <v-row no-gutters>
          <v-flex md9 lg11>
            <learners-table-app />
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
    'nav-bar-app': Navbar,
    'learners-table-app': LearnersTable,
  },
};
</script>



<style scoped>
.applicantProfile {
  background-color: #000D6B;
  height: 100%;
}
</style>