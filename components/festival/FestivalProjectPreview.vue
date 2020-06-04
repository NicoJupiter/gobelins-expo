<template>
  <nuxt-link :to="link" class="project-preview">
    <h3 class="project-preview__title">{{ $prismic.asText(data.title) }}</h3>
  </nuxt-link>
</template>

<script>
  export default {
    name: "FestivalProjectPreview",
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
  .project-preview {
    display: block;
    width: 400px;
    height: 300px;
    background-color: #fff;
  }
</style>