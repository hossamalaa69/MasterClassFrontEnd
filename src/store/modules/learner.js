import axios from 'axios'

const state = {}
const mutations = {}
const actions = {
    getCourses({ state }, payload) {
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
    addThread({ state }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/v1/thread',
            {
              comment: {
                  body: payload.body,
                  course_id: payload.course_id
              }
            },
            {
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
    addReply({ state }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/v1/thread',
            {
              comment: {
                  body: payload.body,
                  course_id: payload.course_id,
                  parent_id: payload.parent_id
              }
            },
            {
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
    getThreads({ state }, payload) {
        return new Promise((resolve, reject) => {
            axios.get('/v1/threads',
            {
                headers: {
                  Authorization: `Bearer ${payload.userToken}`
                },
                params: {
                    course_id: payload.course_id
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
    getReplies({ state }, payload) {
        return new Promise((resolve, reject) => {
            axios.get('/v1/thread/comment',
            {
                headers: {
                  Authorization: `Bearer ${payload.userToken}`
                },
                params: {
                    thread_id: payload.thread_id
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
    getSyllabus({ state }, payload) {
        return new Promise((resolve, reject) => {
            axios.get('/v1/course/activities?limit=10000',
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