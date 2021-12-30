import axios from 'axios'

const state = {}
const mutations = {}
const actions = {
    getInstructorCourses({state}, payload) {
        return new Promise((resolve, reject) => {
            const url = '/v1/instructor/courses'
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.userToken}`
                },
                params: {
                    user_name : payload.user_name
                }
            }

            axios.get(url, config)
                .then(response => {
                resolve(response.data.data)
                })
                .catch(error => {
                reject(error.response.data)
                })
        })
    },
}

export default {
  state,
  mutations,
  actions
}