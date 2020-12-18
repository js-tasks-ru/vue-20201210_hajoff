import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

const getDateOnlyString = (date) => {
  const YYYY = date.getUTCFullYear();
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const DD = date.getUTCDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data() {
    return {
      originalMeetup: null,
      loading: false,
    };
  },

  async mounted() {
    // Требуется получить данные митапа с API
    this.loading = true;
    this.originalMeetup = await this.fetchData();
    this.loading = false;
  },

  computed: {
    meetup() {
      const meetup = { ...this.originalMeetup };
      const img = getMeetupCoverLink(meetup);
      meetup.cover = img ? { '--bg-url': `url(${img})` } : {};

      meetup.localDate = new Date(meetup.date).toLocaleString(
        navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
      });

      meetup.dateOnlyString = getDateOnlyString(new Date(meetup.date));

      if (!meetup.title) {
        meetup.title = agendaItemTitles[meetup.type];
      }

      return meetup;
    },

    meetupAgenda() {
      return this.originalMeetup
        ? this.originalMeetup.agenda.map((item) => ({
            ...item,
            icon: `/assets/icons/icon-${ agendaItemIcons[item.type] || 'cal-sm' }.svg`
            })
          )
        : [];
    },
  },

  methods: {
    fetchData() {
      return fetch(`${API_URL}/meetups/${MEETUP_ID}`).then((res) => res.json());
    },
  },
});
