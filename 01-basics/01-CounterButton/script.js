import Vue from './vue.esm.browser.js';

export const app = new Vue({
	el: '#app',
  data() {
		return {
			number: 1,
		};
	},
  methods: {
    increment: function () {
      this.number += 1;
    },
  },
});
