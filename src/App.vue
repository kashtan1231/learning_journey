<template>
  <div id="app" :class="{ 'scroll-hidden': isModalOpened }">
    <TheHeader />

    <div class="page">
      <div class="page__wrapper">
        <div class="text-and-button">
          <h1 class="text-and-button__title">
            Start your learning journey now
          </h1>

          <h3 class="text-and-button__description font-weight-600">
            Get a
            <span class="orange-word font-weight-800">Planet</span>
            <span class="font-weight-800">Learn</span>
            plan to rock
            <br />
            self-learning
          </h3>

          <BaseButton
            class="text-and-button__button"
            @click.native="openModal"
            text="Get my plan"
            buttonStyle="black"
          />
        </div>

        <div class="card">
          <div
            :class="['card__text-and-timer', { 'time-expired': isTimeExpired }]"
          >
            <div class="card__text">
              <h3 class="card__text-title font-weight-800">
                3-day trial for
                <span class="orange-word">$0.99</span>
              </h3>
              <h4 class="card__text-subtitle">{{ price }}</h4>
              <h5 v-if="!isTimeExpired" class="card__text-description">
                $39.99/week
              </h5>
            </div>

            <Countdown @timeExpired="isTimeExpired = true" :secondsTimer="30" />
          </div>

          <ul class="card__list desktop">
            <li>
              <h5>
                Exclusive access to
                <span class="orange-word font-weight-700">350+</span> learning
                programs
              </h5>
            </li>
            <li><h5>Personalized course plan</h5></li>
            <li><h5>Comfy learning schedule made by you</h5></li>
            <li>
              <h5>
                <span class="orange-word font-weight-700">24/7</span> tutor
                support in a secure chat
              </h5>
            </li>
            <li><h5>Lifetime access to materials</h5></li>
          </ul>

          <BaseButton
            class="card__button desktop"
            text="Safe & secure payment"
            buttonStyle="green-white"
            imgSrc="lock"
          />

          <p class="card__down-text desktop">
            {{ downText }}
          </p>
        </div>

        <ul class="card__list mobile">
          <li>
            <h5>
              Exclusive access to
              <span class="orange-word font-weight-700">350+</span> learning
              programs
            </h5>
          </li>
          <li><h5>Personalized course plan</h5></li>
          <li><h5>Comfy learning schedule made by you</h5></li>
          <li>
            <h5>
              <span class="orange-word font-weight-700">24/7</span> tutor
              support in a secure chat
            </h5>
          </li>
          <li><h5>Lifetime access to materials</h5></li>
        </ul>

        <BaseButton
          class="card__button mobile"
          text="Safe & secure payment"
          buttonStyle="green-white"
          imgSrc="lock"
        />

        <p class="card__down-text mobile">{{ downText }}</p>
      </div>
    </div>

    <Modal v-if="isModalOpened" @closeModal="closeModal" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TheHeader from '@/components/TheHeader.vue'
import BaseButton from '@/components/BaseButton.vue'
import Countdown from '@/components/Countdown.vue'
import Modal from '@/components/Modal.vue'

@Component({
  components: {
    TheHeader,
    BaseButton,
    Countdown,
    Modal,
  },
})
export default class App extends Vue {
  text = ''
  downText =
    "$0.99 charged today. If you don't cancel at least 24 hours before the end of the 3-day trial period, you will automatically be charged the full price of $19.99/Month . You can cancel your subscription at any time. By continuing, you indicate that you've read and agree to our Terms & Conditions, Privacy Policy , Money Back , and Subscription Terms."
  isModalOpened = false
  isTimeExpired = false

  get price(): string {
    return this.isTimeExpired ? 'Then $39.99/week' : 'Then $9.99'
  }

  openModal(): void {
    this.isModalOpened = true
  }
  closeModal(): void {
    this.isModalOpened = false
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: $gray $white;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
}

::-webkit-scrollbar {
  width: 5px;
  height: 4px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: $gray;
}

#app {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  font-family: $font-family-default;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0px;
    bottom: 0px;
    background-image: url(./assets/page-bg.png);
    background-size: contain;
    background-repeat: repeat;
    opacity: 0.04;
    z-index: -1;
  }
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 65px 40px;

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
    width: 100%;
    max-width: 972px;
  }

  .text-and-button {
    &__title {
      margin-bottom: 24px;
    }

    &__description {
      margin-bottom: 32px;
    }
  }

  .card {
    position: relative;
    padding: 24px;
    background-color: $white;
    border-radius: 24px;
    box-shadow: 0px 4px 4px rgba($black, 0.06), inset 0 0 0 1px $gray;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: -56px;
      width: 200px;
      height: 80px;
      background-image: url(./assets/asteroid.svg);
    }

    > :not(:last-child) {
      margin-bottom: 24px;
    }

    &__text-and-timer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__text {
      &-title {
        margin-bottom: 8px;
      }

      &-subtitle {
        margin-bottom: 2px;
      }

      &-description {
        color: $gray;
        text-decoration: line-through;
      }
    }

    &__list {
      list-style: none;

      li {
        display: flex;
        align-items: center;

        &::before {
          content: url(./assets/list-image.svg);
          height: 24px;
          width: 24px;
          margin-right: 10px;
        }

        &:not(:last-child) {
          margin-bottom: 16px;
        }
      }
    }

    &__button {
      max-width: 100%;
    }

    &__down-text {
      text-align: center;
    }
  }
}

.orange-word {
  color: $orange;
}

.scroll-hidden {
  overflow: hidden;
}

@media screen and (min-width: 764px) {
  .mobile {
    display: none !important;
  }
}

@media screen and (max-width: 763px) {
  .page {
    padding: 24px 16px;

    &__wrapper {
      grid-template-columns: 1fr;
    }

    .text-and-button__button {
      max-width: 100%;
    }

    .card {
      margin-bottom: 24px;
      padding: 12px 16px;
      border-radius: 12px;
      order: -1;

      &::before {
        display: none;
      }

      > :not(:last-child) {
        margin-bottom: 0;
      }

      &__list {
        margin-top: 32px;
      }

      &__button {
        margin-top: 24px;
      }

      &__down-text {
        margin-top: 24px;
      }

      .time-expired {
        height: calc(92px - 24px);
        justify-content: center;
        text-align: center;
      }
    }
  }

  .desktop {
    display: none !important;
  }
}
</style>
