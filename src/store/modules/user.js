import axios from 'axios'

const state = {}
const mutations = {}
const actions = {
    //an action to take user data on registering
    registerUser({ state }, payload) {
        // console.log("registering user, sending the following");
        // console.log(payload);
        return new Promise((resolve, reject) => {
            //send a post request with the user data to the database
            if(payload.type == "learner") {
                axios
                .post("/v1/signup/learner", {
                    email: payload.email,
                    password: payload.password,
                    password_confirmation: payload.passwordConfirmation,
                    first_name : payload.firstname,
                    last_name : payload.lastname,
                    user_name : payload.username,
                    birthday: payload.birthday

                })
                .then(response => {
                    let res = response.data
                    localStorage.setItem("userToken", res.data.access_tokn);
                    localStorage.setItem("userBirthday", res.data.user.birthday);
                    localStorage.setItem("userEmail", res.data.user.email);
                    localStorage.setItem("name", res.data.user.name);
                    localStorage.setItem("userImageUrl", res.data.user.image);
                    localStorage.setItem("username", res.data.user.user_name);
                    resolve();
                })
                .catch(error => {
                    console.log(error.response)
                    reject(error.response.data);
                });
            }
            else {
                axios
                .post("/v1/signup/instructor", {
                    email: payload.email,
                    password: payload.password,
                    password_confirmation: payload.passwordConfirmation,
                    first_name : payload.firstname,
                    last_name : payload.lastname,
                    user_name : payload.username,
                    birthday: payload.birthday

                })
                .then(response => {
                    let res = response.data
                    localStorage.setItem("userToken", res.data.access_tokn);
                    localStorage.setItem("userBirthday", res.data.user.birthday);
                    localStorage.setItem("userEmail", res.data.user.email);
                    localStorage.setItem("name", res.data.user.name);
                    localStorage.setItem("userImageUrl", res.data.user.image);
                    localStorage.setItem("username", res.data.user.user_name);
                    resolve();
                })
                .catch(error => {
                    console.log(error)
                    reject(error.response.data);
                });
            }

        });
    },
}

export default {
  state,
  mutations,
  actions
}