// Vuex store
export const state = () => ({
  // Store email address (default no email)
  email: null,
  // Store whether user is logged in (false is default)
  isLoggedIn: false
})

// Setters
export const mutations = {
  setEmail (state, email) {
    state.email = email
  },
  setLoggedIn (state, flag) {
    state.isLoggedIn = flag
  }
}

// Getters
export const getters = {
  getEmail (state) {
    return state.auth.email
  },
  getLoggedIn (state) {
    return state.auth.isLoggedIn
  }
}
