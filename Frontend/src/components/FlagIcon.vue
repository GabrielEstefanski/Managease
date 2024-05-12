<template>
    <img :src="flagUrl" alt="flag" class="flag-icon">
  </template>
  
  <script>
  export default {
    props: {
      country: {
        type: String,
        required: true
      }
    },
    computed: {
      flagUrl() {
        return `https://flagicons.lipis.dev/assets/flag-icon-${this.country.toLowerCase()}.svg`;
      }
    }
  };
  </script>
  
  <style scoped>
  .flag-icon {
    width: 1.5em;
    height: auto;
  }
  </style>
  