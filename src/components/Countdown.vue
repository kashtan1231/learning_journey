<template>
  <div
    v-if="timeLeft >= 0"
    :class="['countdown', { 'little-time-shadow': littleTime }]"
  >
    <div :class="['fake-border', { 'little-time-border': littleTime }]"></div>
    <div class="countdown__time-line" :style="timeLineWidth"></div>
    <h3 class="countdown__time font-wight-600">{{ formattedTime }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Countdown extends Vue {
  @Prop({ default: 0 }) secondsTimer!: number

  timeLeft = this.secondsTimer
  get formattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60)
    const seconds = this.timeLeft % 60

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  get timeLineWidth(): string {
    return `width: ${(this.timeLeft / this.secondsTimer) * 100}%`
  }

  get littleTime(): boolean {
    return this.timeLeft <= 10 && this.timeLeft >= 0
  }

  synchronizeStateAndStorege(): void {
    const storageTimer = sessionStorage.getItem('timeLeft')
    if (storageTimer !== null) {
      this.timeLeft = +storageTimer
    }
  }

  startCountdown(): void {
    const timeInterval = setInterval(() => {
      if (this.timeLeft <= -1) {
        clearInterval(timeInterval)
        return
      }

      this.timeLeft--
      sessionStorage.setItem('timeLeft', this.timeLeft.toString())
    }, 1000)
  }

  mounted(): void {
    this.synchronizeStateAndStorege()
    this.startCountdown()
  }
}
</script>

<style lang="scss" scoped>
.countdown {
  position: relative;
  display: flex;
  justify-content: center;
  width: 160px;
  height: fit-content;
  padding: 13px;
  background-color: $black;
  border-radius: 12px;
  overflow: hidden;
  z-index: 0;
  transition-duration: 1s;

  &__time {
    color: $white;
  }

  &__time-line {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: $green;
    border-radius: 12px;
    z-index: -1;
    transition-duration: 0.5s;
  }
}

.fake-border {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  transition-duration: 1s;
}

.little-time-border {
  box-shadow: inset 0 0 0 2px $red;
}

.little-time-shadow {
  box-shadow: 0 0 4px 0 $red;
}
</style>
