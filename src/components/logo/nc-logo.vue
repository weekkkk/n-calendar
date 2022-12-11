<!-- @format -->

<script lang="ts" setup>
/** Свойства */
const props = defineProps({
  /** Проигрывать анимацию */
  play: { type: Boolean, default: false },
  /** Бесконечна ли анимация */
  loop: { type: Boolean, default: false },
});
</script>

<template>
  <div class="nc-logo" :class="{ 'is-play': play, 'is-loop': loop }">
    <span />
    <span />
    <span />
    <span />
    <span class="text">
      <slot />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.nc-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: var(--nc-logo-size);
  min-height: var(--nc-logo-size);
  border-radius: 16%;
  overflow: hidden;
  span:nth-child(1),
  span:nth-child(3) {
    width: 16%;
    height: 100%;
  }
  span:nth-child(1) {
    right: 0;
  }
  span:nth-child(3) {
    left: 0;
  }
  span:nth-child(2),
  span:nth-child(4) {
    height: 16%;
    width: 100%;
  }
  span:nth-child(2) {
    bottom: 0;
  }
  span:nth-child(4) {
    top: 0;
  }
  span:nth-child(1) {
    background-color: var(--nc-logo-l1);
    z-index: 4;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      height: 16%;
      width: 100%;
      background-color: inherit;
      background-color: var(--nc-logo-l4);
    }
  }
  span:nth-child(2) {
    background-color: var(--nc-logo-l2);
    z-index: 3;
  }
  span:nth-child(3) {
    background-color: var(--nc-logo-l3);
    z-index: 2;
  }
  span:nth-child(4) {
    background-color: var(--nc-logo-l4);
    z-index: 1;
  }
  span {
    position: absolute;
    &.text {
      font-size: calc(var(--nc-logo-size) * 0.4);
      line-height: 1;
      font-weight: 600;
    }
  }
  @keyframes line {
    50% {
      scale: 0.75;
    }
    to {
      rotate: 360deg;
    }
  }
  @keyframes text {
    to {
      rotate: 360deg;
    }
  }
  &.is-play {
    animation-name: line;
    animation-duration: var(--nc-logo-td);
    animation-timing-function: var(--nc-logo-ttf);
    span.text {
      animation-name: text;
      animation-duration: calc(var(--nc-logo-td) / 2);
      animation-timing-function: var(--nc-logo-ttf);
    }
    &.is-loop {
      animation-iteration-count: infinite;
      span.text {
        animation-iteration-count: infinite;
      }
    }
  }
}
</style>
