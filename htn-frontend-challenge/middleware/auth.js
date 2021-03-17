export default function ({ store, route, redirect }) {
  // If you are not logged in and its not the main page, then it is a protected route. Redirect to login.
  if (store.state.auth.isLoggedIn !== true) {
    if (route.name !== 'login' && route.name !== 'index') {
      return redirect('/login')
    }
  // If you are logged in and you go to the login page, there's no need to stay on login
  } else if (route.name === 'login') {
    return redirect('/')
  }
}
