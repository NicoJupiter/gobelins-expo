<template>
  <nuxt-link :to="link" class="project-preview">
    <h3 class="project-preview__title">{{ $prismic.asText(data.title) }}</h3>
  </nuxt-link>
</template>

<script>
  export default {
    name: "WebglProject",
    props: {
      uid: {
        type: String,
        required: true,
      },
      data: {
        type: Object,
        required: true,

        title: {
          type: Array,
          required: true,
        },
      }
    },
    computed: {
      link() {
        return `${this.$route.path}/${this.uid}`;
      }
    },
  }
</script>

<style scoped>

</style>