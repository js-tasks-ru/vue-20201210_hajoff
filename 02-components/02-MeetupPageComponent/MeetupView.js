import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
      <meetup-cover :link="cloneMeetup.imgLink" :title="cloneMeetup.title"/>
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <meetup-description :description="cloneMeetup.description"/>
            <h3>Программа</h3>
            <meetup-agenda :agenda="cloneMeetup.agenda || []" />
          </div>
          <div class="meetup__aside">
            <meetup-info :organizer="meetup.organizer || ''" :place="meetup.place || ''" :date="meetup.formatedDate || new Date()"  />
          </div>
        </div>
      </div>
    </div>`,

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    cloneMeetup() {
      return { 
        ...this.meetup,
        imgLink: getMeetupCoverLink(this.meetup),
        formatedDate: new Date(this.meetup.date),
      };
    },
  },

};
