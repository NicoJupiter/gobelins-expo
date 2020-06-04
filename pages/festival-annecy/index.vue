<template>
  <div class="o-page webgl-page">
    <section class="head">
      <h1 class="head__title">{{ $prismic.asText(title) }}</h1>
    </section>
    <section class="projets-list">
      <VueHorizontalList :items="projects" :options="options">
        <template v-slot:default="{item}">
          <FestivalProjectPreview
              :uid="item.uid"
              :data="item.data"
          />
        </template>
      </VueHorizontalList>
    </section>
    <!-- Slices block component -->
<!--    <slices-block :slices="slices"/>-->
  </div>
</template>

<script>
import VueHorizontalList from 'vue-horizontal-list';

// Imports for Prismic Slice components
import FestivalProjectPreview from '~/components/festival/FestivalProjectPreview'
import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
  name: 'festival-page',
  components: {
    FestivalProjectPreview,
    SlicesBlock,
    VueHorizontalList,
  },
  head () {
    return {
      title: 'Festival Annecy',
    }
  },
  async asyncData({ $prismic, params, error }) {
    try{
      const document = (await $prismic.api.getSingle('annecy-festival')).data;
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
  data() {
    return {
      options: {
        item: {
          // css class to inject into each individual item
          class: '',
          // padding between each item
          padding: 12
        },
        list: {
          // css class for the parent of item
          class: '',
          // maximum width of the list it can extend to before switching to windowed mode, basically think of the bootstrap container max-width
          // windowed is used to toggle between full-screen mode and container mode
          windowed: 1200,
          // padding of the list, if container < windowed what is the left-right padding of the list
          // during full-screen mode the padding will added to left & right to centralise the item
          padding: 24
        },
        responsive: [
          // responsive breakpoints to calculate how many items to show in the list at each width interval
          // it will always fall back to these:
          {end: 576, size: 1},
          {start: 576, end: 768, size: 2},
          {start: 768, end: 992, size: 3},
          {start: 992, end: 1200, size: 4},
          {start: 1200, size: 5}
        ],
        navigation: {
          // when to show navigation
          start: 992,
          color: '#000'
        }
      },
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
