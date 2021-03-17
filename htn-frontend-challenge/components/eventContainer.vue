<template>
  <!-- I bind the event name for connections to related events -->
  <v-col :id="event.name" cols="12">
    <v-hover v-slot="{hover}">
      <v-card :elevation="hover ? 12 : 2" class="transition-swing" :color="event.event_type">
        <!-- Display Event Name -->
        <v-card-title class="display-2">
          {{ event.name }}
        </v-card-title>
        <v-divider />

        <!-- Leave all panels open by default -->
        <v-expansion-panels :value="0">
          <v-expansion-panel>
            <!-- Info of the event, such as time, description, speakers, links, and event info -->
            <v-expansion-panel-header> {{ event.start_time }} to {{ event.end_time }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <h1 class="headline">
                Description
              </h1>
              <v-card-text class="body-1">
                {{ event.description }}
              </v-card-text>

              <!-- Do not display speakers if there are no speakers -->
              <h2 v-if="event.speakers.length>0" class="headline">
                Speakers:
              </h2>
              <v-row v-for="speaker in event.speakers" :key="speaker.name">
                <v-container>
                  <v-col cols="6">
                    <!-- Logic for speakers with profile pics and those who don't -->
                    <v-avatar v-if="speaker.profile_pic != null">
                      <v-img :src="speaker.profile_pic" :alt="speaker.name" />
                    </v-avatar>
                    <v-avatar v-else :color="event.event_type">
                      <span>{{ speaker.name[0] }}</span>
                    </v-avatar>
                  </v-col>
                  <v-col cols="6">
                    <p>{{ speaker.name }}</p>
                  </v-col>
                </v-container>
              </v-row>
              <!-- Clicking on a related event will send them to that event -->
              <v-chip v-for="related in events" :key="related" @click="$router.push('/#'+related)">
                {{ related }}
              </v-chip>
              <!-- Logic for display public link vs private link -->
              <v-card-actions>
                <!-- _blank opens a new tab -->
                <v-btn v-if="event.permission === 'private'" target="_blank" :href="event.private_url">
                  View Event Info
                </v-btn>
                <v-btn v-else target="_blank" :href="event.public_url">
                  Go to Event
                </v-btn>
                <v-divider />
              </v-card-actions>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-hover>
  </v-col>
</template>

<script>
export default {
  props: {
    // Event stores the current event
    event: {},
    // Stores related events
    events: { type: Array }
  },
  data: () => ({
  }),
  computed: {
    // Returns true or false depending on if they're logged in
    logIn () {
      return this.$store.state.auth.isLoggedIn
    }
  },
  methods: {
  }
}
</script>
