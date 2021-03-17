<template>
  <v-row justify="center" align="center" class="justify-items ma-5">
    <v-card>
      <!-- Display User Info from query (htn backend challenge) -->
      <v-card-title>User Info</v-card-title>
      <v-list>
        <v-list-item>
          Name: {{ user.name }}
        </v-list-item>
        <v-list-item>
          Email: {{ user.email }}
        </v-list-item>
        <v-list-item>
          Company: {{ user.company }}
        </v-list-item>
        <v-list-item>
          Phone: {{ user.phone }}
        </v-list-item>
      </v-list>
      <v-list>
        <!-- Display User Skills from query (htn backend challenge) -->
        <v-list-item class="font--bold">
          Skills
        </v-list-item>
        <v-list-item v-for="skill in user.skills" :key="skill">
          {{ skill.name }}: {{ skill.rating }}
        </v-list-item>
      </v-list>
    </v-card>
  </v-row>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
export default {
  name: 'Profile',
  data: () => {
    return {
      // Variable for store user data
      user: {}
    }
  },
  // Gets user data the moment profile page is loaded
  mounted () {
    this.getUser()
  },
  methods: {
    // Sets the user variable to values found received in query
    async getUser () {
      const query = gql`
        query {
          user (email: "bairddixon@frolix.com") {
            name
            email
            company
            phone
            skills {
              name
              rating
            }
          }
        }`
      // SecondClient is my backend link
      const user = await this.$graphql.secondClient.request(query)
      this.user = user.user
    }
  }
}
</script>
