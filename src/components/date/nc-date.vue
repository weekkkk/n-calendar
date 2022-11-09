<!-- @format -->
<script lang="ts" setup>
/** Свойства */
const props = defineProps({
  /** Значение */
  value: { type: Date, default: new Date() },
  /** Активность */
  active: { type: Boolean, default: false },
  /** Вторичность */
  secondary: { type: Boolean, default: false },
});
</script>

<template>
  <span
    class="nc-date c-text f ai-c jc-c"
    :class="{ 'a-50': secondary || active, 'bg-brand': active }"
  >
    <span>
      {{ value.getDate() }}
    </span>
  </span>
</template>

<style lang="scss">
.nc-date {
  position: relative;
  padding-top: 100%;
  border-radius: 50%;
  // overflow: hidden;
  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
