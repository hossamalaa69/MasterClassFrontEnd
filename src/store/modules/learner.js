import axios from 'axios'

const state = {}
const mutations = {}
const actions = {
    getCourses({ state }, payload) {
        //console.log("Get courses API Payload");
        //console.log(payload);
        return new Promise((resolve, reject) => {
            axios.get('/v1/courses?limit=1000&offset=0', {
                headers: {
                  Authorization: `Bearer ${payload.userToken}`
                }
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data);
            })
        })
    },
    getCourse({ state }, payload) {
        console.log("Get course API Payload");
        console.log(payload);
        return new Promise((resolve, reject) => {
            axios.get('/v1/course',
            {
                headers: {
                  Authorization: `Bearer ${payload.userToken}`
                },
                params: {
                    id: payload.id
                }
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data);
            })
        })
    },
}

export default {
  state,
  mutations,
  actions
}