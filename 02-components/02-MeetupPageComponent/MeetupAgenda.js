import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <meetup-agenda-item v-for="agendaItem in agenda" :agendaItem="agendaItem" :key="agendaItem.id" />
    </div>`,

  components: {
    MeetupAgendaItem
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
};
