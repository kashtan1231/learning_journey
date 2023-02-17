<template functional>
  <header class="header">
    <div class="header__wrapper">
      <img
        src="@/assets/planet-learn-logo.svg"
        class="header__logo"
        alt="planet-learn-logo"
      />

      <h3 class="header__planet-word font-weight-700">Planet</h3>
      <h3 class="font-weight-700">Learn</h3>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 40px;

  &__wrapper {
    display: flex;
    align-items: center;
    max-width: 1270px;
    width: 100%;
  }

  &__logo {
    height: 40px;
    width: 40px;
    margin-right: 8px;
  }

  &__planet-word {
    color: $orange;
  }
}
</style>
