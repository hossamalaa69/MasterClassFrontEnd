import axios from 'axios'
const state = {}
const mutations = {}
const actions = {
  adminGetAllLearners ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/v1/user/learner`, {
          headers: {
            Authorization: `Bearer ${payload.userToken}`
          },
          params: {
            limit: payload.limit,
            offset: payload.offset
          }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(payload.userToken);
          reject(error.response.data)
        })
    })
  },
  adminPromoteLearner ({ state }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `/v1/admin/promote`,
          {
            user_name: payload.user_name
          },
          {
            headers: {
              Authorization: `Bearer ${payload.userToken}`
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