<template>
  <div>
    <v-col cols="12" sm="8" md="6">
      <!-- Display this only if the user is logged in -->
      <h1 v-if="logIn" id="home" class="display-2">
        Welcome {{ userName() }}!
      </h1>
    </v-col>
    <!-- Search feature -->
    <v-text-field v-model="searchEvent">
      <v-icon slot="append">
        mdi-magnify
      </v-icon>
    </v-text-field>
    <v-row>
      <!-- Display all events -->
      <eventContainer
        v-for="item in filteredEvents"
        :key="item.name"
        :event="item"
        :events="relatedEvents(item,filteredEvents)"
        class="ma-3"
        justify="center"
      />
    </v-row>
  </div>
</template>
<script>

import { gql } from 'nuxt-graphql-request'

export default {
  name: 'Index',
  components: {
  },
  data: () => {
    return {
      // Variable for events
      events: [],
      // Variable for search
      searchEvent: ''
    }
  },
  computed: {
    // Returns true or false based on wether the user is logged in or not
    logIn () {
      return this.$store.state.auth.isLoggedIn
    },
    // Returns a new list of events based on reg ex search
    filteredEvents () {
      const filter = new RegExp(this.searchEvent, 'i')
      return this.events.filter(el => el.name.match(filter))
    }
  },
  // Get events on load
  mounted () {
    this.getEvents()
  },
  methods: {
    // Async because we are sending a request
    async getEvents () {
      // Query for getting events
      const query = gql`
        query {
          events {
            id
            name
            event_type
            permission
            start_time
            end_time
            description
            speakers {
              name
              profile_pic
            }
            public_url
            private_url
            related_events
          }
        }`
      const events = await this.$graphql.default.request(query)
      // Filter out private events if not logged in
      let nonSorted = []
      if (!this.$store.state.auth.isLoggedIn) {
        nonSorted = events.events.filter((el) => { return el.permission === 'public' })
      } else {
        nonSorted = events.events
      }
      // Sort events by date
      this.events = nonSorted.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1).map((e) => {
        // Convert unix date to a readable and user friendly date
        e.start_time = new Date(e.start_time)
        e.end_time = new Date(e.end_time)
        return e
      })
    },
    // Get user email
    userName () {
      return this.$store.state.auth.email
    },
    // Take all filtered events and convert id to event name
    relatedEvents (current, all) {
      const related = current.related_events
      const newrelated = []
      related.forEach(function (item, index) {
        if (all.some(ev => ev.id === item)) {
          newrelated.push(all.find((obj) => { return obj.id === item }).name)
        }
      })
      return newrelated
    }
  }
}
</script>
