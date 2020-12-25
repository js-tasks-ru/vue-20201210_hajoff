import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `
    <div>
      <div v-if="loading">Loading...</div>
      <meetup-view v-else :meetup="originalMeetup" />
    </div>
  `,

  components: {
    MeetupView,
  },

  data() {
    return {
      originalMeetup: {},
      loading: false,
    };
  },

  async mounted() {
    this.loading = true;
    this.originalMeetup = await fetchMeetup(MEETUP_ID);
    this.loading = false;
  },

  // methods: {

  // }
};
