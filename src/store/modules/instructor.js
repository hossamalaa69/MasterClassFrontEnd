import axios from 'axios'

const state = {}
const mutations = {}
const actions = {
    getInstructorCourses ({ state }, payload) {
        return new Promise((resolve, reject) => {
            const url = '/v1/instructor/courses'
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.userToken}`
                },
                params: {
                    user_name: payload.user_name,
                    limit: payload.limit,
                    offset: payload.offset
                }
            }

            axios.get(url, config)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    },
    createCourse ({ state }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    `/v1/create/course`,
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('userToken')}`
                        }
                    }
                )
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    },
    createLesson ({ state }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    `/v1/course/activity`,
                    payload,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                .then(response => {
                    resolve(response.data)
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