<template>
    <v-sheet color="#2D46B9" rounded >
        <v-form v-model="formData.valid" @submit.prevent="onSubmit">
            <v-container>
                <v-row justify="center">
                    <!-- image -->
                <v-row justify="center" justify-md="center">
                <v-col cols="12">
                    <v-row justify="center">
                    </v-row>
                    <v-row justify="center" class="mt-6">
                        <v-img
                            src="../../assets/signup.png"
                            max-width="50%"
                        ></v-img>
                    </v-row>
                </v-col>
                </v-row>
                    <!-- login info -->
                <v-row justify="center" class="mt-3">
                    <div style="color:white">
                        <strong> Signup info </strong>
                    </div>
                </v-row>
                    <!-- email -->
                    <v-col cols="11">
                        <v-text-field
                        rounded-md
                        outlined
                        color="#F037A5"
                        background-color="white"
                        label="Email"
                        dense
                        type="email"
                        v-model="formData.email"
                        :rules="[required('email'), checkEmail()]"
                        ></v-text-field>
                    </v-col>
                    <!-- username -->
                    <v-col cols="11">
                        <v-text-field
                        rounded-md
                        outlined
                        color="#F037A5"
                        background-color="white"
                        label="Username"
                        dense
                        type="text"
                        v-model="formData.username"
                        :rules="[required('username')]"
                        ></v-text-field>
                    </v-col>
                    <!-- password -->
                    <v-col cols="11">
                        <v-text-field
                        rounded-md
                        outlined
                        color="#F037A5"
                        background-color="white"
                        label="Password"
                        dense
                        type="password"
                        v-model="formData.password"
                        maxlength="30"
                        counter="30"
                        :rules=passwordRules
                        ></v-text-field>
                    </v-col>
                    <!-- password confirmation -->
                    <v-col cols="11">
                        <v-text-field
                        rounded-md
                        outlined
                        color="#F037A5"
                        background-color="white"
                        label="Confirm password"
                        dense
                        type="password"
                        v-model="formData.passwordConfirmation"
                        maxlength="30"
                        counter="30"
                        :rules=confirmPasswordRules
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-divider/>
                <!-- title -->
                <v-row justify="center">
                    <div style="color:white">
                        <strong> Personal info </strong>
                    </div>
                </v-row>
                <!-- first & last names -->
                <v-row class="mt-2">
                    <v-spacer/>
                    <v-col cols="6">
                        <v-text-field
                        class="ml-5"
                        rounded-md
                        outlined
                        color="#F037A5"
                        background-color="white"
                        label="Firstname"
                        dense
                        type="text"
                        v-model="formData.firstname"
                        :rules="[required('firstname')]"
                        ></v-text-field>
                    </v-col>
                    <v-spacer/>
                    <v-col cols="6">
                        <v-text-field
                        class="mr-5"
                        rounded-md
                        outlined
                        color="#F037A5"
                        background-color="white"
                        label="Lastname"
                        dense
                        type="text"
                        v-model="formData.lastname"
                        :rules="[required('lastname')]"
                        ></v-text-field>
                    </v-col>
                    <v-spacer/>
                </v-row>
                <!-- date of birth -->
                <v-row justify="center">
                    <v-col cols="11" class="pa-2">
                        <v-menu
                        v-model="dateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            color="#F037A5"
                            background-color="white"
                            v-model="formData.birthday"
                            label="Birth date"
                            readonly
                            rounded-md
                            outlined
                            dense
                            :rules="[required('birth date')]"
                            v-bind="attrs"
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="formData.birthday"
                            @input="dateMenu = false"
                        ></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <!-- user type -->
                <v-row justify="center" justify-md="center">
                <v-radio-group v-model="formData.type" row>
                    <template v-slot:label> 
                        <strong class="white--text">Join us as ?</strong> 
                    </template>
                    <v-radio value="learner" color="#F8F8F8">
                    <template v-slot:label>
                        <strong class="white--text">A learner</strong>
                    </template>
                    </v-radio>
                    <v-radio value="instructor" color="#F8F8F8">
                    <template v-slot:label>
                        <strong class="white--text">An instructor</strong>
                    </template>
                    </v-radio>
                </v-radio-group>
                </v-row>
                <!--hint about joining -->
                <v-row justify="center" class="mt-0">
                    <v-col cols="8" class="pb-5">
                        <p class="white--text text-center" v-if="formData.type=='learner'">
                            Join us as a learner today and master your classes on MasterClass !
                        </p>
                        <p class="white--text text-center" v-if="formData.type=='instructor'">
                            Join our great community of instructors on MasterClass and help students master their classes !
                        </p>
                    </v-col>
                </v-row>
                <!-- alert to show any errors returning from back server -->
                <v-row justify="center">
                <v-col cols = "10">
                    <v-alert 
                    id="backerr-alert" 
                    v-if="errorMessage"
                    dense
                    type="error"
                    >
                        {{ errorMessage }}
                    </v-alert>
                </v-col>
                </v-row>
                <!-- submit button -->
                <v-row justify="center">
                <v-col cols="10">
                    <v-btn
                    block
                    color="#000D6B"
                    type="submit"
                    large
                    class="white--text"
                    :disabled="!formData.valid"
                    >submit
                    </v-btn>
                </v-col>
                </v-row>
                <v-row justify="center" justify-md="center" class="mb-2">
                <div style="color:#000D6B"><strong>Already a MasterClass member ?</strong></div>
                <router-link
                    :to="{
                    path: '/login',
                    query: { redirect: this.$route.query.redirect },
                    }"
                    class="white--text"
                    >Log in
                </router-link>
                </v-row>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script>
export default {
    name: 'signupform',
    data() {
        return {
            formData : {
                valid: false,
                type: "learner",
                email: '',
                password: '',
                passwordConfirmation: '',
                firstname : '',
                lastname : '',
                username : '',
                birthday : ''
            },
            dateMenu: false,
            loadingState: false,
            errorMessage: '',
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
            passwordRules: [
                (value) => !!value || 'Please enter Your password.',
                (value) => (value && value.length >= 8) || 'minimum 8 characters',
            ],
            confirmPasswordRules: [
                (value) => !!value || 'Please enter the confirm password',
                (value) =>
                value === this.formData.password || 'The password confirmation does not match.',
            ]
        }
    },
    methods: {
        async onSubmit() {
        console.log("on submit function")
        this.loadingState = true;
        this.errorMessage = "";
        try {
            await this.$store.dispatch("registerUser", this.formData)
            this.loadingState = false;
        } 
        catch (error) {
            console.log("an error occured")
            this.loadingState = false
            if(error.status === "error") {
            this.errorMessage = error.errors[0].message
            }
            else {
            this.errorMessage = "Please try again later !"
            }
        }
        },
    },
}
</script>

<style>

</style>