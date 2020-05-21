<template>
  <div class="o-page webgl-page">
    <section class="head">{{ $prismic.asText(title) }}</section>
    <section class="projets-list">
      <WebglProjectPreview
          v-for="(p, i) in projects"
          :key="i"
          :datas="p.project"
      />
    </section>
    <!-- Slices block component -->
<!--    <slices-block :slices="slices"/>-->
  </div>
</template>

<script>
// Imports for Prismic Slice components
import WebglProjectPreview from '~/components/webgl/WebglProjectPreview'
import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
  name: 'webgl-page',
  components: {
    WebglProjectPreview,
    SlicesBlock,
  },
  head () {
    return {
      title: 'Projets WebGL',
    }
  },
  async asyncData({ $prismic, params, error }) {
    try{
      const document = (await $prismic.api.getSingle('webglpage')).data;
      return {
        ...document,
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>
