<template>
  <div class="asset">
    <span :style="{ backgroundColor, transform: `translateX(${x})` }" class="asset__underlay" />
    <img
      ref="asset"
      v-if="isImage"
      v-lazy="{src: url}"
      :alt="alt"
      class="asset__asset"
    >
    <video
      ref="asset"
      v-else
      :src="url"
      muted
      loop
      autoplay
      playsinline
      class="asset__asset"
    />
  </div>
</template>
<script>
export default {
  props: {
    datas: {
      required: true,
      type: Object,
    },
    x: {
      required: false,
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      loaded: false,
      backgroundColor: '#E5F0FB',
      fields: {
        image: null,
        video: null,
      }
    };
  },
  computed: {
    isImage() {
      return !!this.datas.url.split('images.prismic.io')[1].length
    },
    url() {
      return this.datas.url;
    },
    alt() {
      return this.datas.alt;
    },
    preview() {
      if (!this.isImage) {
        return null;
      }
      return this.datas.preView.url;
    },
  },
  async mounted() {
    if (!process.browser) return ;
    this.$Lazyload.$on('loaded', (e) => this.open(e));
    if (!this.isImage) return;
    this.backgroundColor = await this.$color(this.preview);
  },
  methods: {
    open(e) {
      if (e.src === this.url) {
        this.loaded = true;
        if (!this.$refs.asset) return;
        this.backgroundColor = 'transparent';
      }
    },
  },
};
</script>
<style lang="scss">
  /* -------------------- Asset -------------------- */
  .asset {
    position: relative;
    line-height: 0;
    height: 100%;
  }

  .asset__asset {
    position: relative;
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: 2;
    text-indent: -10000px;

    &[lazy='shown'] {
      opacity: 1;
    }

    &[lazy='loaded'] {
      opacity: 0;
      animation: fadein 0.7s cubic-bezier(0.77, 0, 0.175, 1) forwards;
      @keyframes fadein {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }

  video.asset__asset{
    background: black;
  }

  /* -------------------- Underlay -------------------- */
  .asset__underlay{
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: transparentize($primary, 0.9);
    transition: background-color 0.7s cubic-bezier(0.77, 0, 0.175, 1);
  }

  /* -------------------- Video -------------------- */
  @supports (object-fit: cover) and (-ms-ime-align:auto) {
    video.asset__asset {
      height: auto;
    }
  }
</style>
