<template>
  <section>
    <!-- Slices block component -->
<!--    <slices-block :slices="slices"/>-->
  </section>
</template>

<script>
// Imports for Prismic Slice components
import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
  name: 'page',
  components: {
    SlicesBlock
  },
  head () {
    return {
      title: 'Ppp',
    }
  },
  async asyncData({ $prismic, params, error }) {
    try{
      const document = (await $prismic.api.getSingle('dronepage')).data;
      return {
        // Set slices as variable
        title: document.title
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>
