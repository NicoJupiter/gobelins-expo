<template>
  <div class="home-page">
    <CustomHeader />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import CustomHeader from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    CustomHeader,
    Footer
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

<style>
  .home-page {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>