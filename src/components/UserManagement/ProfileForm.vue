<template>
<div>
  <v-sheet color="#2D46B9" rounded="lg">
    <v-form v-model="valid" @submit.prevent="onSubmit">
      <v-container>
        <v-row justify="center">
            <v-col cols="4" class="ml-2 mt-6 mb-6 mr-4" align="center">
                <v-row justify="center">
                    <v-avatar 
                    rounded="circle"
                    size="large">
                        <img :src="userInfo.imageUrl"> 
                    </v-avatar>
                </v-row>
            </v-col>
            <v-col cols="7" class="ma-6 pa-6">
                <v-row>
                    <v-text-field
                    background-color="white"
                    color="#F037A5"
                    rounded-md
                    outlined
                    label="Email"
                    dense
                    type="email"
                    v-model="userInfo.email"
                    :rules="[required('email'), checkEmail()]"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                    background-color="white"
                    color="#F037A5"
                    rounded-md
                    outlined
                    label="Firstname"
                    dense
                    type="text"
                    v-model="userInfo.firstname"
                    :rules="[required('firstname')]"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                    background-color="white"
                    color="#F037A5"
                    rounded-md
                    outlined
                    label="Lastname"
                    dense
                    type="text"
                    v-model="userInfo.lastname"
                    :rules="[required('lastname')]"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                    background-color="white"
                    color="#F037A5"
                    rounded-md
                    outlined
                    label="Username"
                    dense
                    type="text"
                    v-model="userInfo.username"
                    :rules="[required('username')]"
                    ></v-text-field>
                </v-row>
        <!-- form submission button -->
            <v-row>
                <v-spacer></v-spacer>
                <v-col cols="3">
                    <v-btn
                    block
                    color="#000D6B"
                    type="submit"
                    large
                    class="white--text"
                    :disabled="!valid"
                    >Update
                    </v-btn>
                </v-col>
            </v-row>
            </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-sheet>
  </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                firstname: '',
                lastname: '',
                username: '',
                userPassword: '',
                imageUrl: '',
            },
            valid: false,
            loadingState : false,
            required(propertyType) {
                return (v) =>
                (v && v.length > 0) || `Please enter Your ${propertyType}`;
            },
            checkEmail() {
                return (v) =>
                (v && /.+@.+\..+/.test(v)) || "Please enter a valid email address !";
            },
        }
    },
    async mounted() {
        let token = localStorage.getItem('userToken')
        let response = await this.$store.dispatch('getUserData', {userToken: token});
        console.log(response)
        let name = response.user.name;
        const firstlastname = name.split(" ");
        this.userInfo.firstname = firstlastname[0];
        this.userInfo.lastname = firstlastname[1];
        this.userInfo.username = response.user.user_name;
        this.userInfo.birthday = response.user.birthday;
        this.userInfo.email = response.user.email;
        this.userInfo.imageUrl = `http://localhost:3000/${response.user.image}`
    },
    methods: {
        async onSubmit() {
            this.errorMessage = ""
            try {
                this.loadingState = true;
                await this.$store.dispatch("updateUserInfo", 
                {
                    first_name : this.userInfo.firstname,
                    last_name : this.userInfo.lastname,
                    user_name : this.userInfo.username,
                    userType : localStorage.getItem('userType'),
                    userToken : localStorage.getItem('userToken')
                })
            } 
            catch (error) {
                this.loadingState = false;
                console.log("an error occured")
                if(error.status === "error") {
                this.errorMessage = error.errors.message
                }
                else {
                this.errorMessage = "Please try again later !"
                }
            }
        },
    },
};
</script>

<style scoped>
.loginTitle {
  text-align: center;
  font-size: 21px;
  padding-bottom: 10px;
}
</style>