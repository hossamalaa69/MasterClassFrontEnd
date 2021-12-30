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
            let url = `/v1/signup/${payload.type}`
                axios
                .post(url, {
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
                    localStorage.setItem("imageUrl", "http://localhost:3000" + res.image);
                    resolve();
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    },
    // an action to handle user logging in
    loginUser({state}, payload) {
        return new Promise((resolve, reject) => {
            //send a post request with the user data to the database
            axios
                .post("/v1/signin", {
                    email: payload.email,
                    password: payload.password,
                })
                .then(response => {
                    console.log(response)
                    let res = response.data.data
                    localStorage.setItem("userToken", res.access_tokn);
                    localStorage.setItem("userBirthday", res.user.birthday);
                    localStorage.setItem("userEmail", res.user.email);
                    localStorage.setItem("name", res.user.name);
                    localStorage.setItem("username", res.user.user_name);
                    localStorage.setItem("userType", res.user.type);
                    localStorage.setItem("imageUrl", "http://localhost:3000" + res.user.image);
                    resolve(res.user.type);
                })
                .catch(error => {
                    let err = error.response.data
                    reject(err);
                });
        });
    },
    getUserData({ state }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .get('/v1/user', {
                headers: {
                    Authorization: `Bearer ${payload.userToken}`
                }
            })
                .then(response => {
                resolve(response.data.data)
                })
                .catch(error => {
                reject(error.response.data)
                })
        })
    },
    // update learner or instructor general info
    updateUserInfo({ state }, payload) {
        return new Promise((resolve, reject) => {
            const url = `/v1/user/${payload.userType}`
            const body =  {
                first_name : payload.first_name,
                last_name : payload.last_name, 
                user_name : payload.user_name,
                user_password : payload.user_password
            }
            const config =  {
                headers: {
                    Authorization: `Bearer ${payload.userToken}`
                },
            }
            axios
                .patch(url, body, config)
                .then(response => {
                resolve(response.data.data)
                })
                .catch(error => {
                reject(error.response.data)
                })
        })
    }
}

export default {
  state,
  mutations,
  actions
}