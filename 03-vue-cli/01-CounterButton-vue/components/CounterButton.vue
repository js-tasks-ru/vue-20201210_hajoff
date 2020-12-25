<template>
  <button type="button" @click="handleClick">{{ count }}</button>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  mounted() {
    if (!this.count){
      this.$emit("increment", 0)
    }
  },

  methods: {
    handleClick() {
      this.$emit("increment", this.count + 1)
    },
  },
};
</script>

<style></style>
