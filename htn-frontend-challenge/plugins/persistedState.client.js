import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

// Persistent state concept
export default ({ store, req, isDev }) => {
  createPersistedState({
    key: 'vuex',
    storage: {
      // Take items from cookies
      getItem: key => process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie || '')[key],
      // Set items from cookies
      setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: !isDev }),
      // Remove items from cookies
      removeItem: key => Cookies.remove(key)
    }
  })(store)
}
