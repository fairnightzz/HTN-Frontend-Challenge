export const state = () => ({
  email: null,
  isLoggedIn: false
})

export const mutations = {
  setEmail (state, email) {
    state.email = email
  },
  setLoggedIn (state, flag) {
    state.isLoggedIn = flag
  }
}

export const getters = {
  getEmail (state) {
    return state.auth.email
  },
  getLoggedIn (state) {
    return state.auth.isLoggedIn
  }
}
