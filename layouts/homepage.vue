<template>
  <div class="homepage">
    <Header />
    <nuxt />
    <footer-prismic/>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import FooterPrismic from '~/components/FooterPrismic.vue'

export default {
  components: {
    Header,
    FooterPrismic
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Multi Page Website',
    }
  },
  // Called before rendering the layout (even for error page)
  async middleware({ store, $prismic }) {
    await store.dispatch('fetchGlobal', $prismic)
  }
}
</script>
