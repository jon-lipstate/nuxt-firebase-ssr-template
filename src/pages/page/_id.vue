<template>
  <div>
    <h1>DYNAMIC PAGE</h1>
    <v-btn color="secondary" to="/">Home</v-btn>
    <v-btn color="primary" to="/page">Static</v-btn>
    <v-container>
      asyncData: $axios call to find user's IP address: {{ ip }}
    </v-container>
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
