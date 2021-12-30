<template>
  <div class="nav-bar-div">
    <v-app-bar
      
      color="#FFFFFF" 
      elevation="4">
      <img
        @click="routeToHome"
        id="logo-img"
        height="40"
        src=""
        alt="Logo" />
      <v-spacer></v-spacer>
      <v-menu offset-y v-if="userToken">
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            v-bind="attrs"
            v-on="on"
            icon id="user-img">
          <v-avatar size="40">
            <img
              :src="imageUrl"
              alt="User image">
          </v-avatar>
          </v-btn>           
        </template>
        <v-list width="300">
          <v-list-item-group>
            <!-- view Profile -->
            <v-list-item row wrap align-center @click="$router.push('/profile')">
              <v-flex md3>
                <v-avatar size="35">
                <img
                  width="35" height="35"
                  :src="imageUrl"
                  alt="User image">
                </v-avatar>
              </v-flex>
              <v-flex md9> 
                <span>View Profile</span>
              </v-flex>
            </v-list-item>
            <!-- logout -->
            <v-list-item row wrap align-center 
            @click="logout">
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
      <v-btn 
      v-else
      color="#1E3163"
      class="white--text"
      to="/login">
        Login
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userToken: '',
      imageUrl: ''
    }
  },
  computed: {
  },
  methods: {
    logout: function(){
        localStorage.removeItem("userToken");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userImageUrl");
        localStorage.removeItem("userBirthday");
        localStorage.removeItem("username");
        localStorage.removeItem("name");
        localStorage.removeItem("userType");
        localStorage.removeItem("imageUrl");
        
        localStorage.clear();
        this.$router.push({path: '/login'})
    },
    routeToHome: function(){
      console.log("Routing User to");
      if (localStorage.getItem("userToken") !== null) {
          console.log("Logged User");
          const userType = localStorage.getItem("userType");
          if(userType == "learner")
              this.$router.push({path: '/courses'});  
          else if(userType == "instructor")
              this.$router.push({path: '/instructordashboard'})
          else  
              this.$router.push({path: '/admin'})
      }else{
          console.log("Unlogged User");
          this.$router.push({path: '/'})
      }
    }
  },
  mounted() {
    this.userToken = localStorage.getItem("userToken");
    this.imageUrl = localStorage.getItem("imageUrl");
  }
};
</script>

<style scoped>

.nav-bar-div{
  z-index: 5000;
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
  content:url("../assets/master_class_minified.svg");
  border-radius: 50%;
  background-color: #F8F8F8;
}
#logo-img:hover{
  opacity: 0.7;
}
@media only screen and (min-width: 768px) {
  #logo-img{
    margin-left: 3%;
    cursor: pointer;
    content:url("../assets/master_class.svg");
    border-radius: 0;
    background-color: transparent;
  }
}
</style>
