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
  head() {
    const seo = this.tab.find(t => t.slice_type === 'seo');
    const keywords = seo.items.map(item => item.seo_keywords);
    if (!seo) return {};
    return {
      title: seo.primary.seo_title,
      meta: [
        { hid: 'description',
          name: 'description',
          content: seo.primary.seo_description },
        { hid: 'og:description',
          name: 'og:description',
          content: seo.primary.seo_description },
        { hid: 'keywords',
          name: 'keywords',
          content: seo.items.length ? keywords.join(', ') : '' },
        /*
        { hid: 'og:image',
          property: 'og:image',
          content: this.datas.fields.seo.fields.image ? this.datas.fields.seo.fields.image.fields.file.url : '' },
        { hid: 'og:image:width',
          property: 'og:image:width',
          content: this.datas.fields.seo.fields.image ? this.datas.fields.seo.fields.image.fields.file.details.image.width : '' },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: this.datas.fields.seo.fields.image ? this.datas.fields.seo.fields.image.fields.file.details.image.height : '',
        },
        {
          hid: 'og:image:type',
          property: 'og:image:type',
          content: this.datas.fields.seo.fields.image ? this.datas.fields.seo.fields.image.fields.file.contentType : '',
        },
        {
          hid: 'og:image:type',
          property: 'og:image:type',
          content: this.datas.fields.seo.fields.image ? this.datas.fields.seo.fields.image.fields.file.contentType : '',
        },
        */
        { hid: 'og:url',
          property: 'og:url',
          content: process.env.HOSTNAME + this.$route.fullPath }, // Add HOSTNAME in .env for full URL
        { hid: 'og:title',
          property: 'og:title',
          content: seo.primary.seo_title },
      ],
    };
  },
  async asyncData({ $prismic, error }) {
    try{
      // Query to get the home page content
      const { title, description, body1 } = (await $prismic.api.getSingle('homepage')).data;

      return {
        title,
        description,
        tab: body1
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
