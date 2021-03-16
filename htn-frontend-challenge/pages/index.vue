<template>
  <div>
    <v-col cols="12" sm="8" md="6">
      <h1 v-if="logIn" id="home" class="display-2">
        Welcome {{ userName() }}!
      </h1>
    </v-col>
    <v-text-field v-model="searchEvent">
      <v-icon slot="append">
        mdi-magnify
      </v-icon>
    </v-text-field>
    <v-row>
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
      loggedIn: '',
      email: '',
      events: [],
      searchEvent: ''
    }
  },
  computed: {
    logIn () {
      return this.$store.state.auth.isLoggedIn
    },
    filteredEvents () {
      const filter = new RegExp(this.searchEvent, 'i')
      return this.events.filter(el => el.name.match(filter))
    }
  },
  mounted () {
    this.getEvents()
  },
  methods: {
    async getEvents () {
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
      // filter out right here
      let nonSorted = []
      if (!this.$store.state.auth.isLoggedIn) {
        // eslint-disable-next-line prefer-regex-literals
        nonSorted = events.events.filter((el) => { return el.permission === 'public' })
      } else {
        nonSorted = events.events
      }
      this.events = nonSorted.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1).map((e) => {
        e.start_time = new Date(e.start_time)
        e.end_time = new Date(e.end_time)
        return e
      })
    },
    userName () {
      return this.$store.state.auth.email
    },
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
