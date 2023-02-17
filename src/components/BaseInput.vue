<template>
  <div class="base-input">
    <label class="base-input__label">{{ label }}</label>
    <div :class="['base-input__field', { error: error }]">
      <input
        class="base-input__field-input"
        :placeholder="placeholder"
        :type="type"
        :value="value"
        @input="onInput"
      />

      <p class="base-input__field-error">{{ errorMessage }}</p>

      <img
        :src="require(`@/assets/${imgSrc}.svg`)"
        class="base-input__field-img"
        :alt="imgSrc"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class InputComponent extends Vue {
  @Prop({ default: 'text' }) type!: string
  @Prop({ default: '' }) placeholder!: string
  @Prop({ default: '' }) value!: string
  @Prop({ default: '' }) imgSrc!: string
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) errorMessage!: string
  @Prop({ default: false }) error!: boolean
  @Prop({ default: false }) isCardMask!: boolean

  cardRegex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement

    if (this.isCardMask) {
      const maskedValue = target.value
        .replace(/[^0-9]/g, '')
        .match(this.cardRegex)
      target.value = maskedValue?.slice(1).filter(Boolean).join('  ') || ''
    }

    this.$emit('input', target.value)
  }
}
</script>

<style lang="scss" scoped>
.base-input {
  position: relative;

  &__label {
    position: absolute;
    top: -7px;
    left: 16px;
    padding: 0 5px;
    color: $black;
    border-radius: 30px;
    background-color: $white;
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
  }

  &__field {
    display: flex;
    width: 100%;
    box-shadow: inset 0 0 0 1px $gray;
    border-radius: 8px;

    &:focus-within {
      box-shadow: inset 0 0 0 1px $green;
    }

    &-input {
      width: 100%;
      padding: 16px;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      outline: none;
      border: none;
      background: transparent;
    }

    &-error {
      color: $red;
    }

    &-img {
      padding-right: 16px;
    }
  }
}

.error {
  box-shadow: inset 0 0 0 1px $red;
}
</style>
