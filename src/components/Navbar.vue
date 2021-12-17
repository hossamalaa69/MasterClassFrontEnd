<template>
  <div>
    <v-app-bar
      app
      color="#FFFFFF" 
      fixed
      elevation="3">
      <img
        id="logo-img"
        width="140" height="80"
        src="../assets/master_class.svg"
        alt="John" />
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            v-bind="attrs"
            v-on="on"
            icon id="user-img">
          <v-avatar size="35">
            <img
              src="../assets/profile.png"
              alt="John">
          </v-avatar>
          </v-btn>           
        </template>
        <v-list width="300">
          <v-list-item-group>
            <v-list-item row wrap align-center :to="viewPath">
              <v-flex md3>
                <v-avatar size="35">
                <img
                  width="35" height="35"
                  src="../assets/profile.png"
                  alt="John">
                </v-avatar>
              </v-flex>
                <v-flex md9> 
                <span>View Profile</span>
              </v-flex>
            </v-list-item>
            
            <v-list-item row wrap align-center>
              <v-flex md3>
                <v-icon class="icons_menu">mdi-wrench</v-icon>
              </v-flex>
              <v-flex md9>
                <span class="spans-menu">Edit Profile</span>
              </v-flex>  
            </v-list-item>
            <v-list-item row wrap align-center v-on:click="logout">
              <v-flex md3>
                <v-icon class="icons_menu">mdi-export</v-icon>
              </v-flex>
              <v-flex md9>  
                <span class="spans-menu">Logout</span>
              </v-flex>  
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style>
a{
    text-decoration: none;
    color: black;
}
.spans-menu{
  color: black;
}
#user-img{
  margin: 5px;
}
#logo-img{
  margin-left: 3%;
  cursor: pointer;
}
</style>
