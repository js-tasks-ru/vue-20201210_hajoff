/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

const MS_IN_DAY = 1000 * 60 * 60 * 24;

const getDaysInMonth = (year, month) => {
  const date1 = new Date(year, month, 1);
  const date2 = new Date(year, month + 1, 1);
  return Math.round((date2 - date1) / MS_IN_DAY);
};

const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const getLastDayOfMonth = (year, month) => new Date(year, month, getDaysInMonth(year, month)).getDay();

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="setMonth(-1)"></button>
          <div>{{ currentMonthName }} {{currentYear}}</div>
          <button class="rangepicker__selector-control-right" @click="setMonth(1)"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div class="rangepicker__cell" :class="{rangepicker__cell_inactive : !item.active}" v-for="item of daysOnView">
          {{item.number}}
          <a class="rangepicker__event" v-if="item.meetupsInDay && item.meetupsInDay.length > 0 " v-for="meetup in item.meetupsInDay">{{meetup.title}}</a>
        </div>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(),
    };
  },

  computed: {
    currentMonth() { return this.date.getMonth() },
    currentMonthName() { return this.date.toLocaleString('default', { month: 'long' })},
    currentYear() { return this.date.getFullYear() },
    firstDayOfMonth() { return getFirstDayOfMonth(this.currentYear, this.currentMonth) },
    daysOnCurrentMonth() { return getDaysInMonth(this.currentYear, this.currentMonth)} ,
    countPrevMonthDaysOnView() { return this.firstDayOfMonth - 1} ,
    countNextMonthDaysOnView() { return 7 - getLastDayOfMonth(this.currentYear, this.currentMonth)} ,
    countPrevMonthDays() { return getDaysInMonth(this.currentYear, this.currentMonth-1)} ,

    daysOnView() {
      const daysOnView = [];
      if (this.firstDayOfMonth > 1) {
        for (let i = this.countPrevMonthDaysOnView; i > 0; i--) {
          daysOnView.push({
            number: this.countPrevMonthDays + 1 - i,
          });
        }
      } else if (this.firstDayOfMonth === 0) {
        for (let i = 6; i > 0; i--) {
          daysOnView.push({
            number: this.countPrevMonthDays + 1 - i,
          });
        }
      }

      for (let i = 1; i <= this.daysOnCurrentMonth; i++) {
        daysOnView.push({
          number: i,
          active: true,
          meetupsInDay: this.meetups.filter(
            item => new Date(item.date).setHours(0, 0, 0, 0) === new Date(this.currentYear, this.currentMonth, i).getTime()
          ),
        });
      }

      if (this.countNextMonthDaysOnView !== 7) {
        for (let i = 1; i <= this.countNextMonthDaysOnView; i++) {
          daysOnView.push({
            number: i,
          });
        }
      }

      return daysOnView;
    },
  },

  methods: {
    setMonth(count) {
      const monthFromFirstDay = new Date(this.date.setDate(1))
      this.date = new Date(monthFromFirstDay.setMonth(this.date.getMonth() + count));
    },
  },
};
