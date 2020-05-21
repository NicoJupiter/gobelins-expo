<template>
  <section>
    <h1 class="homepage__title">{{ $prismic.asText(title) }}</h1>
    <p class="homepage__desc">{{ $prismic.asText(description) }}</p>

    <!-- Banner component -->
<!--    <homepage-banner :banner="banner"/>-->
    <!-- Slices block component -->
<!--    <slices-block :slices="slices"/>-->
  </section>
</template>

<script>
// Imports for all components
import HomepageBanner from '~/components/HomepageBanner.vue'
import SlicesBlock from '~/components/SlicesBlock.vue'
import TextSlice from '~/components/slices/TextSlice.vue'

export default {
  name: 'Home',
  layout: 'homepage',
  components: {
    HomepageBanner,
    SlicesBlock,
    TextSlice,
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Multi Page Website',
    }
  },
  async asyncData({ $prismic, error }) {
    try{
      // Query to get the home page content
      const { title, description } = (await $prismic.api.getSingle('homepage')).data;

      return {
        title,
        description,
        // Page content
        // banner: homepage.homepage_banner[0],
        // Set slices as variable
        // slices: homepage.page_content
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="sass" scoped>
  .homepage__title
    text-align: center
    margin: 320px auto
</style>
