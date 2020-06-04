<template>
  <div class="o-page webgl-page">
    <section class="head">
      <h1 class="head__title">{{ $prismic.asText(title) }}</h1>
    </section>
    <section class="projets-list">
      <DroneProjectPreview
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
import DroneProjectPreview from '~/components/drone/DroneProjectPreview'
import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
  name: 'drone-page',
  components: {
    DroneProjectPreview,
    SlicesBlock,
  },
  head() {
    const seo = this.tab.find(t => t.slice_type === 'seo');
    const image = seo.primary.seo_image;
    const keywords = seo.items.map(item => item.seo_keywords);
    if (!seo) return {};
    return {
      title: seo.primary.seo_title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: seo.primary.seo_description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: seo.primary.seo_description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: seo.items.length ? keywords.join(', ') : ''
        },
        { hid: 'og:image',
          property: 'og:image',
          content: image ? image.url : '' },
        { hid: 'og:image:width',
          property: 'og:image:width',
          content: image ? image.dimensions.width : '' },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: image ? image.dimensions.height : '',
        },
        /*{
         hid: 'og:image:type',
         property: 'og:image:type',
         content: image ? image.contentType : '',
         },
         {
         hid: 'og:image:type',
         property: 'og:image:type',
         content: image ? image.contentType : '',
         },*/
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.HOSTNAME + this.$route.fullPath
        }, // Add HOSTNAME in .env for full URL
        {
          hid: 'og:title',
          property: 'og:title',
          content: seo.primary.seo_title
        },
      ],
    };
  },
  async asyncData({ $prismic, params, error }) {
    try{
      const document = (await $prismic.api.getSingle('dronepage')).data;
      const projectsIds = document.projects.map(p => p.project.id);
      const projects = (await $prismic.api.getByIDs(projectsIds)).results;

      return {
        title: document.title,
        projects
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
