<template>
  <div>
    <h1>DYNAMIC PAGE</h1>
    <v-btn to="/">Home</v-btn>
    <v-btn to="/page">Page</v-btn>
    <div>{{ ip }}</div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const ip = await $axios.$get('https://icanhazip.com');
    return { ip };
  }
};
</script>

<style></style>
