import Vue from 'vue'
const path = process.env.VUE_APP_BASE_API
const actions = {
  login ({ commit }, credential) {
    commit('loginWait', true)
    return new Promise((resolve) => {
      Vue.http.post(path + 'login', credential)
        .then(response => response.json())
        .then((result) => {
          commit('login', result)
          resolve()
        })
        .catch(() => {
          commit('loginWait', false)
          commit('loginFailed')
        })
    })
  },
  logout ({ commit }) {
    // return new Promise((resolve) => {
    //   const path = auth.paths.logout || 'logout'
    //   Vue.http.post(getUrl(path))
    //     .then(response => response.json())
    //     .then(() => {
    //       commit('logout')
    //       resolve()
    //     })
    // })
  },
  getUser ({ commit }) {
    return new Promise((resolve) => {
      const path = auth.paths.getUser || 'user'
      Vue.http.get(getUrl(path))
        .then(response => response.json())
        .then((response) => {
          if ([
            400,
            401,
            403,
          ].includes(response.status)) {
            commit('logout')
          }
          resolve()
        })
    })
  },
  // refreshToken ({
  //   commit,
  // }, data) {
  //   const path = auth.paths.refreshToken || 'refresh-token'
  //   Vue.http.post(getUrl(path))
  //     .then(response => response.json())
  //     .then((result) => {
  //       commit('refreshToken', result)
  //     })
  // },
  // editUser ({ commit, dispatch }, data) {
  //   const path = auth.paths.editUser || 'user'
  //   Vue.http.post(getUrl(path), data)
  //     .then(response => {
  //       let result = response.body
  //       commit('editUser', result)
  //     }, (error) => {
  //       dispatch('openAlertBox', [
  //         'alertError',
  //         error.statusText,
  //       ], { root: true })
  //     })
  // },
  // editPassword ({
  //   commit,
  //   dispatch,
  // }, data) {
  //   const path = auth.paths.changePassword || 'password'
  //   Vue.http.post(getUrl(path), data)
  //     .then(response => {
  //       let result = response.body
  //       commit('editPassword', result)
  //     }, (error) => {
  //       dispatch('openAlertBox', [
  //         'alertError',
  //         error.statusText,
  //       ], { root: true })
  //     })
  // },
}

export default actions
