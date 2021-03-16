<template>
  <v-row justify="center" align="center" class="justify-items ma-5">
    <v-card>
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
      user: {}
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
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
      const user = await this.$graphql.secondClient.request(query)
      this.user = user.user
      console.log(this.user)
    }
  }
}
</script>
