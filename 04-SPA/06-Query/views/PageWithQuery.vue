<template>
  <div class="container">
    <meetups-view
      :view.sync="view"
      :date.sync="date"
      :participation.sync="participation"
      :search.sync="search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',
  components: {
    MeetupsView,
  },

  data() {
    return {
      defaultQuery: {
        view: 'list',
        date: 'all',
        participation: 'all',
        search: '',
      },
    };
  },

  computed: {
    view: {
      get() {
        return this.getParam('view');
      },
      set(value) {
        this.setParam('view', value);
      },
    },
    date: {
      get() {
        return this.getParam('date');
      },
      set(value) {
        this.setParam('date', value);
      },
    },
    participation: {
      get() {
        return this.getParam('participation');
      },
      set(value) {
        this.setParam('participation', value);
      },
    },
    search: {
      get() {
        return this.getParam('search');
      },
      set(value) {
        this.setParam('search', value);
      },
    },
  },
  methods: {
    getParam(name) {
      return this.$route.query[name] || this.defaultQuery[name];
    },
    setParam(name, value) {
      if (value === this[name]) {
        return;
      }
      let query = { ...this.$route.query };
      delete query[name];
      if (value != this.defaultQuery[name]) {
        query[name] = value;
      }
      this.$router.push({ query });
    },
  },
};
</script>

<style scoped></style>
