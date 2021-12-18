<template>
  <div class="nav-bar-div">
    <v-app-bar
      
      color="#FFFFFF" 
      elevation="4">
      <img
        id="logo-img"
        height="50"
        src="../assets/master_class.svg"
        alt="Logo" />
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
            <v-list-item row wrap align-center>
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
            <v-list-item row wrap align-center >
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

<style scoped>
.nav-bar-div{
  border-bottom: 3px solid #f5f7f8;
}
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
#logo-img:hover{
  opacity: 0.7;
}
</style>
