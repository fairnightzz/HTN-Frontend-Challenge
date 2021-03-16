export default function ({ store, route, redirect }) {
  if (store.state.auth.isLoggedIn !== true) {
    if (route.name !== 'login' && route.name !== 'index') {
      return redirect('/login')
    }
  } else if (route.name === 'login') {
    return redirect('/')
  }
}
