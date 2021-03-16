<template>
  <v-container fill-height class="login">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          <h1>Login</h1>

          <v-form class="align-items justify-content">
            <v-row align="center" justify="center">
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="form.email"
                  :rules="emailRules"
                  label="Email"
                  required
                />
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="form.password"
                  :rules="passwordRules"
                  type="password"
                  label="Password"
                  required
                />
              </v-col>
            </v-row>
            <v-btn @click="onLogin">
              Login
            </v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Login',
  components: {
  },
  data: () => ({
    form: {
      email: '',
      password: ''
    },
    passwordRules: [
      v => !!v || 'Password is required'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  methods: {
    onLogin (e) {
      if (this.form.email.length > 0 && this.form.password.length > 0) {
        this.$store.commit('auth/setEmail', this.form.email)
        this.$store.commit('auth/setLoggedIn', true)
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
  .login {
    height: 80vh;
  }

</style>
