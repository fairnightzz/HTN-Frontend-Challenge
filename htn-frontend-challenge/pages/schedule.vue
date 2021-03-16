<template>
  <div>
    <v-sheet
      tile
      height="54"
      class="d-flex"
    >
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="focus"
        :weekdays="weekdays"
        type="month"
        :events="events"
        @change="getEvents"
      />
    </v-sheet>
  </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
export default {
  name: 'Schedule',
  data: () => ({
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    focus: '2021-01-12'

  }),
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
      const temp = nonSorted.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1).map((e) => {
        e.start = e.start_time
        e.end = e.end_time

        return e
      })
      const newevents = []
      temp.forEach((e) => {
        const event = {
          start: new Date(e.start_time),
          end: new Date(e.end_time),
          color: e.event_type,
          name: e.name,
          timed: 1
        }
        newevents.push(event)
      })
      this.events = newevents
    },
    getEventColor (event) {
      return event.color
    }
  }
}
</script>
