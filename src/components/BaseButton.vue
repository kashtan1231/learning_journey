<template>
  <button :class="['base-button', buttonStyle]" :disabled="isDisabled">
    <img
      v-if="imgSrc"
      :src="require(`@/assets/${imgSrc}.svg`)"
      :alt="imgSrc"
      class="base-button__icon"
    />

    <h5 class="base-button__text font-weight-700">{{ text }}</h5>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseButton extends Vue {
  @Prop({ default: 'black' }) buttonStyle!: string
  @Prop({ default: '' }) text!: string
  @Prop({ default: '' }) imgSrc!: string
  @Prop({ default: false }) isDisabled!: boolean
}
</script>

<style lang="scss" scoped>
.base-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 40px;
  min-height: 56px;
  width: 100%;
  max-width: 300px;
  background: $black;
  border-radius: 12px;
  border: none;
  color: $white;
  transition-duration: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: $green;
    color: $white;
  }

  &:disabled {
    background-color: $gray;
    color: $white;
    cursor: default;
  }

  &__icon {
    margin-right: 8px;
  }
}

.green-white {
  background-color: $white;
  color: $green;
  box-shadow: inset 0 0 0 1px $gray;

  &:hover {
    background-color: $white;
    color: $green;
    box-shadow: inset 0 0 0 1px $orange;
  }
}

.black-white {
  background-color: $white;
  color: $black;
  box-shadow: inset 0 0 0 1px $gray;

  &:hover {
    background-color: $black;
    color: $white;
    box-shadow: unset;
  }
}

.orange {
  background-color: $orange-medium;
  color: $black;

  &:hover {
    background-color: $orange-light;
    color: $black;
  }
}
</style>
