<template>
  <div>
    <v-sheet
      tile
      height="54"
      class="d-flex"
    >
      <!-- Previous and Next Button for navigating calendar by month -->
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
    <!-- Display Calendar -->
    <!-- focus is the navigation -->
    <!-- Choose how calendar is formatted by weekdays and type month -->
    <!-- :events binds all events from graphql query -->
    <!-- @change for updating events -->
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
          }
        }`
      const events = await this.$graphql.default.request(query)
      let nonSorted = []
      nonSorted = events.events
      // Sort events in order
      const temp = nonSorted.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1).map((e) => {
        e.start = e.start_time
        e.end = e.end_time
        return e
      })
      const newevents = []
      // Set up events properly for calendar
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
    }
  }
}
</script>
