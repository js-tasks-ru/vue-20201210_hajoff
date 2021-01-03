<template>
  <footer class="footer">
    <div>
      {{ copyright }}
      <a :href="link" target="_blank">{{ title }}</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      title: 'Vue.js Course',
      link: 'https://learn.javascript.ru/courses/vue',
      copyright: `© ${ new Date().getFullYear() }. learn.javascript.ru`,
    };
  },
};
</script>

<style scoped>
.footer {
  padding: 100px 0 60px;
  text-align: center;
}
