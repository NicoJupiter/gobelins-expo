<template>
  <div class="pan-area" ref="panArea">
    <slot />
  </div>
</template>

<script>
  let Panzoom;
  if (process.client) {
    Panzoom = require('panzoom')
  }

  export default {
    name: "PanArea",
    data() {
      return {
        instance: null,
      }
    },
    mounted() {
      if (process.server) return;
      this.instance = Panzoom(this.$refs.panArea, {
        maxZoom: 1,
        minZoom: 0.3,
        bounds: true,
        boundsPadding: 0.1
      });
      this.instance.on('panstart', () => this.$store.commit('SET_PANNING', true));
      this.instance.on('panend', () => {
        setTimeout(() => this.$store.commit('SET_PANNING', false), 500);
      });
    }
  }
</script>

<style scoped>
  .pan-area {
    position: absolute;
    width: 250%;
    height: 250vh;
  }
</style>