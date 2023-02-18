<template>
  <div class="base-input" v-click-outside="checkInput">
    <label class="base-input__label">{{ label }}</label>
    <div :class="['base-input__field', { error: error }]">
      <input
        class="base-input__field-input font-weight-400"
        @input="onInput"
        @click="isInputClicked = true"
        :placeholder="placeholder"
        :type="type"
        :value="value"
      />

      <p v-if="error" class="base-input__field-error">{{ errorMessage }}</p>

      <img
        v-if="imgSrc"
        :src="require(`@/assets/${imgSrc}.svg`)"
        class="base-input__field-img"
        :alt="imgSrc"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import vClickOutside from 'v-click-outside'

@Component
export default class BaseInput extends Vue {
  @Prop({ default: 'text' }) type!: string
  @Prop({ default: '' }) placeholder!: string
  @Prop({ default: '' }) value!: string
  @Prop({ default: '' }) imgSrc!: string
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) errorMessage!: string
  @Prop({ default: 0 }) maxLength!: number
  @Prop({ default: false }) error!: boolean
  @Prop({ default: false }) isCardMask!: boolean

  cardRegex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/
  isInputClicked = false

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement

    if (this.maxLength && target.value.length > this.maxLength) {
      target.value = target.value.slice(0, this.maxLength)
    }

    if (this.isCardMask) {
      const maskedValue = target.value
        .replace(/[^0-9]/g, '')
        .match(this.cardRegex)
      target.value = maskedValue?.slice(1).filter(Boolean).join('  ') || ''
    }

    this.$emit('input', target.value)
  }
  checkInput(): void {
    if (this.isInputClicked) {
      this.$emit('checkInput')
      this.isInputClicked = false
    }
  }

  created(): void {
    Vue.use(vClickOutside)
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
      outline: none;
      border: none;
      color: $black;
      background: transparent;
      font-size: 12px;
      line-height: 15px;

      &::placeholder {
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 1px;
      }
    }

    &-error {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      margin-right: 8px;
      color: $red;
    }

    &-img {
      margin-left: auto;
      padding-right: 16px;
    }
  }
}

.error {
  box-shadow: inset 0 0 0 1px $red;

  &:focus-within {
    box-shadow: inset 0 0 0 1px $red;
  }
}
</style>
