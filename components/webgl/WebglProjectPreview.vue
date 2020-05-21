<template>
  <nuxt-link :to="link" class="project-preview">
    <h3 class="project-preview__title">{{ datas.uid }}</h3>
  </nuxt-link>
</template>

<script>
  export default {
    name: "WebglProject",
    props: {
      datas: {
        type: Object,
        required: true,

        title: {
          type: String,
          required: true,
        },

        slug: {
          type: String,
          required: true,
        },

        uid: {
          type: String,
          required: true,
        },
      }
    },
    computed: {
      link() {
        return `${this.$route.path}/${this.datas.slug}`;
      }
    },
  }
</script>

<style scoped>

</style>