<template>
  <div>
    <v-skeleton-loader
      v-if="firstLoad"
      :loading="loadingState"
      type="table"
    ></v-skeleton-loader>
    <v-data-table
      v-show="!firstLoad"
      :headers="headers"
      :items="learners"
      :options.sync="options"
      :server-items-length="totalCount"
      :loading="loadingState"
      :footer-props="{ 'items-per-page-options': [2, 10, 15] }"
      class="elevation-1"
    >
    <!-- Avatar  -->
      <template v-slot:[`item.avatar`]="{ item }">
        <initials-avatar :item="item"></initials-avatar>
      </template>
      <template
        v-for="header in headers.filter((header) =>
          header.hasOwnProperty('formatter')
        )"
        v-slot:[`item.${header.value}`]="{ header, value }"
      >
        {{ header.formatter(value) }}
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ formName }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogPromote" max-width="550px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to promote this learner?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closePromote"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="updateItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-container>
          <v-row>
            <v-flex md3>
            </v-flex>
            <v-flex md6>
              <v-icon class="mr-2" @click="editItem(item)">
                mdi-account-arrow-up
              </v-icon>
            </v-flex>
          </v-row>
        </v-container>
      </template>
      <v-spacer></v-spacer>
      <template v-slot:no-data>
        <v-btn @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>

    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <v-btn color="pink" text @click="snackbar = false"> Close </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import InitialsAvatar from "./InitialsAvatar.vue";
export default {
  components: {
    "initials-avatar": InitialsAvatar,
  },
  data: () => ({
    formName: "Learners",
    dialogPromote: false,
    loadingState: true,
    snackbar: false,
    headers: [
      { text: "", sortable: false, value: "avatar", width: "10%" },
      { text: "First Name", sortable: true, value: "first_name" },
      { text: "Last Name", sortable: true, value: "last_name" },
      { text: "Registered At", sortable: true, value: "created_at" , formatter: (value) => {
        return new Date(value).toLocaleString();
      }},
      { text: "Date of Birth", sortable: true, value: "birthday", formatter: (value) => {
        return new Date(value).toLocaleString();
      }},
      { text: "Actions", value: "actions", sortable: false, width: "10%" },
    ],
    learners: [],
    totalCount: 10,
    firstLoad: true,
    editedIndex: -1,
    dialog: false,
    snackbarText: "",
    editedItem: {
      first_name: "",
    },
    defaultItem: {
      first_name: "",
    },
    options: {},
  }),
  created() {
    this.initialize();
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    dialogPromote(val) {
      val || this.closePromote();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    initialize() {
      this.getDataFromApi();
    },
    editItem(item) {
      this.editedIndex = this.learners.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogPromote = true;
    },
    async updateItemConfirm() {
      try {
        this.loadingState = true;
        await this.$store.dispatch("adminPromoteLearner", {
          // userToken: localStorage.getItem("userToken"),
          userToken: `eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NCwicm9sZSI6IiM8QWRtaW46MHgwMDAwNTU3OGYyZDE1MjQ4PiIsImV4cCI6MTY0MDI2NDkyM30.nwPwN_6G21J-H4bbF8XOaBisBLwGU7JYqNjkPCdVdFg`,
          ...this.editedItem,
        });
        await this.getDataFromApi();
        this.loadingState = false;
        this.snackbarText = "Recruiter was accepted successfully.";
        this.closePromote();
      } catch (error) {
        this.loadingState = false;
        this.closePromote();
        this.snackbar = true;
        this.snackbarText = "failed to accept recruiter, try again later";
      }
    },
    closePromote() {
      this.dialogPromote = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    pagination() {
      this.getDataFromApi();
    },
    async getDataFromApi() {
      this.loadingState = true;
      this.errorMessage = "";
      try {
        this.options.page = this.options.page ? this.options.page : 1;
        this.options.itemsPerPage = this.options.itemsPerPage
          ? this.options.itemsPerPage
          : 10;
        this.response = await this.$store.dispatch("adminGetAllLearners", {
          // userToken: localStorage.getItem("userToken"),
          userToken: `eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NCwicm9sZSI6IiM8QWRtaW46MHgwMDAwNTU3OGYyZDE1MjQ4PiIsImV4cCI6MTY0MDI2NDkyM30.nwPwN_6G21J-H4bbF8XOaBisBLwGU7JYqNjkPCdVdFg`,
          limit: this.firstLoad ? 10 : this.options.itemsPerPage,
          offset: (this.options.page - 1) * this.options.itemsPerPage,
        });
        this.items = this.response.data;
        this.loadingState = false;
        this.learners = this.items.learners;
        this.totalCount = this.response.data.count;
        this.firstLoad = false;
      } catch (error) {
        console.log("an error occured");
        this.loadingState = false;
        this.errorMessage = error.errors.message;
      }
    },
  },
};
</script>