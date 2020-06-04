<template>
  <div class="project-preview">
    <div :to="link" class="project-preview__container" draggable="false">
      <Asset :datas="data.image" />
      <h3 class="project-preview__title">{{ $prismic.asText(data.title) }}</h3>
    </div>
  </div>
</template>

<script>
  import Asset from '@/components/common/Asset';

  export default {
    name: "FestivalProjectPreview",
    components: {
      Asset,
    },
    props: {
      uid: {
        type: String,
        required: true,
      },
      data: {
        type: Object,
        required: true,

        title: {
          type: Array,
          required: true,
        },
      }
    },
    computed: {
      link() {
        return `${this.$route.path}/${this.uid}`;
      }
    },
  }
</script>

<style scoped>
  .project-preview {
    display: block;
  }
  .project-preview__container {
    height: 500px;
    margin: 0 55px;
    color: #fff;
  }
</style>