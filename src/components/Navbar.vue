<template>
  <div class="nav-bar-div">
    <v-app-bar
      
      color="#FFFFFF" 
      elevation="4">
      <img
        @click="$router.push('/')"
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
          <v-avatar size="40" color="#000d6b">
            <img
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              alt="John">
          </v-avatar>
          </v-btn>           
        </template>
        <v-list width="300">
          <v-list-item-group>
            <!-- view Profile -->
            <v-list-item row wrap align-center @click="$router.push('/profile')">
              <v-flex md3>
                <v-avatar size="35" color="#000d6b">
                <img
                  width="35" height="35"
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  alt="John">
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
      userToken: ''
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
        localStorage.clear();
        this.$router.push({path: '/login'})
    },
  },
  mounted() {
    this.userToken = localStorage.getItem("userToken");
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
