<template>
  <header class="site-header">
    <nuxt-link to="/" class="logo">Expo Gobelins</nuxt-link>
    <nav class="site-header__nav">
      <nuxt-link
          v-for="(menuLink, i) in $store.state.global.navbar"
          :key="i"
          class="site-header__link"
          :to="'/' + menuLink.link.uid"
      >
        {{ menuLink.label }}
      </nuxt-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'CustomHeader',
}
</script>

<style lang="scss">
  .site-header {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
  }
  .site-header__link {
    margin-right: 24px;
  }
</style>


