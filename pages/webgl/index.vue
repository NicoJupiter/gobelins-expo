<template>
  <div class="o-page webgl-page">
    <section class="head">
      <h1 class="head__title">{{ $prismic.asText(title) }}</h1>
    </section>
    <section class="projets-list">
      <WebglProjectPreview
          v-for="(p, i) in projects"
          :key="i"
          :uid="p.uid"
          :data="p.data"
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
      const projectsIds = document.projects.map(p => p.project.id);
      const projects = (await $prismic.api.getByIDs(projectsIds)).results;

      return {
        title: document.title,
        tab: document.body1,
        projects,
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="scss" scoped>
  .head__title {
    margin: 320px auto;
    text-align: center;
  }
</style>
