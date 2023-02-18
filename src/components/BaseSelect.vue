<template>
  <div class="base-select">
    <label class="base-select__label">{{ label }}</label>
    <div
      :class="['base-select__field', { focused: isOptionsShown, error: error }]"
      @click="openOptions"
    >
      <p :class="['base-select__field-select', { 'option-selected': value }]">
        {{ value || 'Select' }}
      </p>

      <p v-if="error" class="base-select__field-error">{{ errorMessage }}</p>

      <img
        src="@/assets/select-arrow.svg"
        class="base-select__field-img"
        alt="select-arrow"
      />
    </div>

    <ul
      v-if="isOptionsShown"
      class="base-select__options"
      v-click-outside="closeOptions"
    >
      <li
        v-for="option in options"
        class="font-weight-400"
        @click="selectOption(option)"
        :key="option"
      >
        {{ option }}

        <svg
          v-if="value === option"
          class="base-select__options-selected-icon"
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.169604 7.61302L4.35316 12L15.7948 1.74062C16.0537 1.5084 16.0699 1.1165 15.8304 0.865435C15.5909 0.614365 15.1868 0.599073 14.9279 0.831295L4.42393 10.25L1.10731 6.77233C0.867842 6.52126 0.464086 6.50597 0.205181 6.73784C-0.053723 6.97006 -0.0698643 7.36196 0.169604 7.61302Z"
            fill="#6C727F"
          />
        </svg>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import vClickOutside from 'v-click-outside'

@Component
export default class BaseSelect extends Vue {
  @Prop({ default: '' }) value!: string
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) errorMessage!: string
  @Prop({ default: [] }) options!: Array<string>

  isOptionsShown = false
  error = false

  openOptions(): void {
    this.isOptionsShown = true
  }
  closeOptions(): void {
    this.isOptionsShown = false
    if (!this.value) this.error = true
  }
  selectOption(option: string): void {
    this.error = false
    this.$emit('input', option)
    this.isOptionsShown = false
  }

  created(): void {
    Vue.use(vClickOutside)
  }
}
</script>

<style lang="scss" scoped>
.base-select {
  position: relative;
  z-index: 0;

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
    padding: 16px;
    box-shadow: inset 0 0 0 1px $gray;
    border-radius: 8px;
    cursor: pointer;

    &:focus-within {
      box-shadow: inset 0 0 0 1px $green;
    }

    &-select {
      width: fit-content;
      line-height: 15px;
    }

    &-error {
      display: flex;
      align-items: center;
      margin-left: auto;
      color: $red;
    }

    &-img {
      margin-left: auto;
      user-select: none;
      pointer-events: none;
    }
  }

  &__options {
    position: absolute;
    top: 47px;
    left: 0;
    width: 100%;
    background-color: $white;
    border-radius: 8px;
    box-shadow: inset 0 0 0 1px $gray;
    list-style: none;
    overflow: auto;
    max-height: calc(32 * 7px);
    z-index: 1;

    li {
      display: flex;
      justify-content: space-between;
      padding: 8px 16px;
      color: $gray-dark;
      font-size: 12px;
      line-height: 15px;
      transition-duration: 0.2s;
      cursor: pointer;

      &:first-child {
        border-radius: 8px 8px 0 0;
      }

      &:last-child {
        border-radius: 0 0 8px 8px;
      }

      &:not(:last-child) {
        border-bottom: 1px solid $gray;
      }

      &:hover {
        background-color: $green;
        color: $white;

        .base-select__options-selected-icon path {
          fill: $white;
        }
      }
    }

    &-selected-icon path {
      transition-duration: 0.2s;
    }
  }
}

.error {
  box-shadow: inset 0 0 0 1px $red !important;
}

.focused {
  box-shadow: inset 0 0 0 1px $green;
}

.option-selected {
  color: $black;
}
</style>
