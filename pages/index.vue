<template>
  <section>
    <!--
    <client-only placeholder="loading...">
      <Scene />
    </client-only>
    -->
    <h1 class="homepage__title">{{ $prismic.asText(title) }}</h1>
    <p class="homepage__desc">{{ $prismic.asText(description) }}</p>

    <div class="project-container">
      <n-link
          v-for="(p, i) in projects"
          :key="i"
          :to="p.slug"
          class="project"
      >
        <div>
          <h3>{{ $prismic.asText(p.data.title) }}</h3>
          <Asset v-if="p.data.main_image && p.data.main_image.url" :datas="p.data.main_image" />
        </div>
      </n-link>
    </div>

    <!-- Banner component -->
    <!--    <homepage-banner :banner="banner"/>-->
    <!-- Slices block component -->
    <!--    <slices-block :slices="slices"/>-->
  </section>
</template>

<script>
  // Imports for all components
  import HomepageBanner from '~/components/HomepageBanner';
  import SlicesBlock from '~/components/SlicesBlock';
  import TextSlice from '~/components/slices/TextSlice';
  import Scene from '~/components/Scene';
  import Asset from '~/components/common/Asset';
  import { PAGES_SLUG } from "../constantes";

  export default {
    name: 'Home',
    layout: 'homepage',
    components: {
      HomepageBanner,
      SlicesBlock,
      TextSlice,
      Scene,
      Asset,
    },
    head() {
      const seo = this.tab.find(t => t.slice_type === 'seo');
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
    async asyncData({ $prismic, error }) {
      try {
        // Query to get the home page content
        const { title, description, body1 } = (await $prismic.api.getSingle('homepage')).data;

        const dronesDocs = (await $prismic.api.getSingle('webglpage')).data;
        const webglDocs = (await $prismic.api.getSingle('dronepage')).data;
        const projectsIds = [...dronesDocs.projects, ...webglDocs.projects].map(p => p.project.id);
        let projects = (await $prismic.api.getByIDs(projectsIds)).results;

        console.log(projects);
        projects = projects.map(p => ({
          ...p,
          slug: `${PAGES_SLUG[p.type]}/${p.uid}`,
        }));

        return {
          title,
          description,
          tab: body1,
          projects,
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

<style lang="scss" scoped>
  .homepage__title {
    text-align: center;
    margin: 320px auto;
    user-select: none;
    pointer-events: none;
  }
</style>
