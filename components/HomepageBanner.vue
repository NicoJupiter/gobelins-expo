<template>
    <section class="homepage-banner" :style="{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))' }">
<!--    <section class="homepage-banner" :style="{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(' + banner.image.url + ')' }">-->
      <!-- Template for page title. -->
      <!--<div class="banner-content container">
        <h2 class="banner-title">
          {{ $prismic.asText(banner.title) }}
        </h2>
        &lt;!&ndash; Template for page tagline. &ndash;&gt;
        <p class="banner-description">{{ $prismic.asText(banner.tagline) }}</p>
        <prismic-link class="banner-button" :field="banner.button_link">
          {{ $prismic.asText(banner.button_label) }}
        </prismic-link>
      </div>-->
    </section>
</template>

<script>
export default {
  props: ['banner'],
  name: 'homepage-banner',
}
</script>

<style lang="scss" scoped>
</style>
