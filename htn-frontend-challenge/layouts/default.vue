<template>
  <v-app dark>
    <v-app-bar
      absolute
      color="#fcb69f"
      app
      src="https://www.brocksolutions.com/wp-content/uploads/2020/02/University-of-Waterloo.jpg"
    >
      <template #img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        />
      </template>

      <v-app-bar-nav-icon @click="drawer = true" />

      <v-app-bar-title>++ Hack The North 2021</v-app-bar-title>

      <v-spacer />

      <v-btn icon @click="toggleTheme">
        <v-icon>mdi-moon-waning-crescent</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="accent"
      temporary
    >
      <v-list dense nav>
        <div v-if="isloggedIn">
          <v-list-item v-for="item in items" :key="item.title" link :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-spacer />
        <v-list-item v-if="isloggedIn" link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else @click="login">
          <v-list-item-icon>
            <v-icon>
              mdi-login
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Login
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
      { title: 'Profile', icon: 'mdi-face-profile', route: '/Profile' },
      { title: 'Schedule', icon: 'mdi-calendar', route: '/Schedule' }
    ],
    drawer: false,
    loggedIn: '',
    email: ''
  }),
  computed: {
    isloggedIn () {
      return this.$store.state.auth.isLoggedIn
    }
  },
  methods: {
    toggleTheme (e) {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    logout (e) {
      this.drawer = !this.drawer
      this.$store.commit('auth/setLoggedIn', false)
      this.$router.push('/')
    },
    login (e) {
      this.drawer = !this.drawer
      this.$router.push('login')
    }
  }
}
</script>
