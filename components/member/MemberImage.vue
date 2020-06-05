<template>
  <div class="image-parent">
    <svg width="300" height="260" viewBox="0 0 300 260" v-bind:class="{ 'is-animated' : isAnimated }">
      <path id="curve" fill="transparent" d="M30,130a120,120 0 1,0 240,0a120,120 0 1,0 -240,0"/>
      <text :fill="color" style="transform:translate3d(0,0,0);">
        <textPath startOffset="0" style="transform:translate3d(0,0,0);" xlink:href="#curve" id="text-path">{{ text }}</textPath>
      </text>
    </svg>
    <div v-if="image" class="circle">
      <img :src="image"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      text: String,
      image: String,
      isAnimated: Boolean,
      radius: Number,
      color: String
    },
    name: 'member-image',
  }
</script>

<style lang="scss" scoped>
  .image-parent {
    position: relative;

    text {
      font-size: 35px;
    }

    .is-animated {
      animation: rotating 3s linear infinite;
    }

    .circle {
      background: #FFF12D;
      position: absolute;
      top: 40px;
      left: 60px;
      width : 180px;
      height: 180px;
      border-radius: 50%;
      z-index: -1;

      img {
        position: absolute;
        left: calc(50% - 75px);
        top: calc(50% - 75px);
        width: 150px;
      }
    }

    textPath::selection {
      background: none;
    }
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
