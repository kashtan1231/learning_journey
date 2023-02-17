<template>
  <div class="modal" @click.self="closeModal">
    <div class="content">
      <h4 class="content__title font-weight-800">Payment method</h4>

      <BaseButton
        class="content__button"
        text="BUY NOW"
        buttonStyle="orange"
        imgSrc="paypal-logo"
      />

      <BaseButton
        class="content__button"
        text="PAY"
        buttonStyle="black-white"
        imgSrc="google-logo"
      />

      <p class="content__or">OR</p>

      <BaseInput
        v-model="card"
        class="content__card"
        :isCardMask="true"
        :error="checkFields"
        label="Card number"
        placeholder="••••  ••••  ••••  ••••"
        imgSrc="card-icon"
        errorMessage="Invalid number"
      />

      <BaseButton
        class="content__submit"
        text="Submit"
        :isDisabled="!checkFields"
      />

      <h5 @click="closeModal" class="content__close">Close</h5>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'

@Component({
  components: { BaseButton, BaseInput },
})
export default class Modal extends Vue {
  card = ''
  errors = {
    card: false,
  }

  get checkFields(): boolean {
    return this.card.length === 16 + 2 * 3
  }

  closeModal(): void {
    this.$emit('closeModal')
  }

  // @Watch("card")
  // watchCard() {}
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba($black, 0.2);
  z-index: 100;

  .content {
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 24px 16px;
    background-color: $white;
    border-radius: 12px;
    box-shadow: 0px 0px 0px 4px rgba($black, 0.05);

    &__title {
      text-align: center;
      margin-bottom: 24px;
    }

    &__button {
      max-width: 100%;
      margin-bottom: 16px;
    }

    &__or {
      display: flex;
      margin-bottom: 16px;
      align-items: center;

      &::before {
        content: '';
        height: 2px;
        width: 100%;
        margin-right: 8px;
        background-color: $gray;
      }

      &::after {
        content: '';
        height: 2px;
        width: 100%;
        margin-left: 8px;
        background-color: $gray;
      }
    }

    &__card {
      margin-bottom: 32px;
    }

    &__submit {
      margin-bottom: 16px;
      align-self: center;
    }

    &__close {
      align-self: center;
      width: fit-content;
      padding: 4px 16px;
      color: $gray-dark;
      cursor: pointer;
    }
  }
}
</style>
