import { agendaItemIcons, agendaItemTitles } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="newAgendaItem.icon" />
      </div>
      <div class="meetup-agenda__item-col">{{ newAgendaItem.startsAt }} - {{ newAgendaItem.endsAt }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{ newAgendaItem.title }}</h5>
        <p v-if="newAgendaItem.type === 'talk'">
          <span>Докладчик</span>
          <span class="meetup-agenda__dot">{{ newAgendaItem.speaker }}</span>
          <span class="meetup-agenda__lang">{{ newAgendaItem.language }}</span>
        </p>
        <p v-if="newAgendaItem.description">{{ newAgendaItem.description }} </p>
      </div>
    </div>`,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    newAgendaItem() {
      return {
        ...this.agendaItem,
        icon: `/assets/icons/icon-${ agendaItemIcons[this.agendaItem.type] || 'cal-sm' }.svg`,
        title: this.agendaItem.title || agendaItemTitles[this.agendaItem.type],
      };
    },
  },

};
