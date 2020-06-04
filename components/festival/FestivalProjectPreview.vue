<template>
  <div :to="link" class="project-preview" draggable="false">
    <h3 class="project-preview__title">{{ $prismic.asText(data.title) }}</h3>
    <Asset :datas="data.image" />
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
    mounted() {
      console.log(this.data.image);
    }
  }
</script>

<style scoped>
  .project-preview {
    display: block;
    width: 100%;
    height: 500px;
    margin: 0 auto;
    background-color: #fff;
  }
</style>