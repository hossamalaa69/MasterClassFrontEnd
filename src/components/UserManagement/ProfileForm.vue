<template>
<div>
  <v-sheet color="#F8F8F8" rounded="lg">
    <v-form v-model="valid" @submit.prevent="onSubmit">
      <v-container>
        <v-row justify="center">
            <v-col cols="11" md='4' class="ml-2 mt-6 mb-6 mr-4" align="center">
                <v-row justify="center">
                    <v-img
                    :src="userInfo.imageUrl"
                    class="mt-6"
                    rounded="circle"
                    size="large"
                    width="200px"
                    height="200px"
                    contain
                    >
                    </v-img>
                </v-row>
            </v-col>
            <v-divider vertical class="invisible"></v-divider>
            <v-col cols="11" md="7" class="ma-6 pa-6">
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
                    readonly
                    disabled
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
                    disabled
                    :rules="[required('username')]"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                    background-color="white"
                    color="#F037A5"
                    rounded-md
                    outlined
                    label="Birth Date"
                    dense
                    type="text"
                    v-model="userInfo.birthday"
                    disabled
                    readonly
                    ></v-text-field>
                </v-row>
            
            <v-divider/>
            <v-row class="mt-3">
                <p>
                    <strong>
                        <div class="text">
                            Please enter your password to update your data
                        </div>
                    </strong>
                </p>
            </v-row>
            <v-row>
                <v-text-field
                background-color="white"
                color="#F037A5"
                rounded-md
                outlined
                label="Password"
                dense
                type="password"
                v-model="userInfo.userPassword"
                :rules="[required('password'), checkLength('password', 8)]"
                ></v-text-field>
            </v-row>
            <!-- alert to show any errors returning from back server -->
            <v-row justify="center">
                <v-col cols = "10">
                    <v-alert 
                    id="backerr-alert" 
                    v-if="errorMessage"
                    dense
                    type="error">
                        {{ errorMessage }}
                    </v-alert>
                </v-col>
            </v-row>
            <!-- alert to show that an update was successful -->
            <v-row justify="center">
                <v-col cols = "10">
                    <v-alert 
                    id="backerr-alert" 
                    v-if="successfulRequest"
                    dense
                    type="success">
                        Your data was sucessfully updated !
                    </v-alert>
                </v-col>
            </v-row>
        <!-- form submission button -->
            <v-row justify="center" justify-md="end">
                <!-- <v-spacer></v-spacer> -->
                <v-col cols="8" md="4">
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
                email: '',
                firstname: '',
                lastname: '',
                username: '',
                userPassword: '',
                imageUrl: '',
            },
            valid: false,
            loadingState : false,
            successfulRequest : false,
            errorMessage : '',
            required(propertyType) {
                return (v) =>
                (v && v.length > 0) || `Please enter Your ${propertyType}`;
            },
            checkEmail() {
                return (v) =>
                (v && /.+@.+\..+/.test(v)) || "Please enter a valid email address !";
            },
            checkLength(propertyType, minLength) {
                return (v) =>
                (v && v.length >= minLength) ||
                `${propertyType} must be longer than ${minLength} characters`;
            },
        }
    },
    async mounted() {
        let token = localStorage.getItem('userToken')
        let response = await this.$store.dispatch('getUserData', {userToken: token});
        let name = response.user.name;
        const firstlastname = name.split(" ");
        this.userInfo.firstname = firstlastname[0];
        this.userInfo.lastname = firstlastname[1];
        this.userInfo.username = response.user.user_name;

        const dob = new Date(response.user.birthday)
        this.userInfo.birthday =  `${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}`

        this.userInfo.email = response.user.email;
        this.userInfo.imageUrl = `http://localhost:3000/${response.user.image}`
    },
    methods: {
        async onSubmit() {
            this.errorMessage = ""
            this.successfulRequest = false
            try {
                this.loadingState = true;
                await this.$store.dispatch("updateUserInfo", 
                {
                    first_name : this.userInfo.firstname,
                    last_name : this.userInfo.lastname,
                    user_name : this.userInfo.username,
                    user_password: this.userInfo.userPassword,
                    userType : localStorage.getItem('userType'),
                    userToken : localStorage.getItem('userToken')
                })
                this.successfulRequest = true
            } 
            catch (error) {
                this.loadingState = false;
                if(error.status === "error" || error.status == 401) {
                this.errorMessage = error.errors[0].message
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
.text {
    color: blue;
}

.invisible {
    visibility: hidden;
}

@media only screen and (min-width: 960px) {
  .invisible{
    visibility: visible;
  }
}
</style>