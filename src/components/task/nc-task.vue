<!-- @format -->

<script lang="ts" setup>
import { computed, ref } from 'vue';

/** Свойства */
const props = defineProps({
  /** Час старта */
  s: { type: Number, default: 2.25 },
  /** Час конца */
  e: { type: Number, default: 5.05 },
});
/** Элемент */
const $el = ref<HTMLElement>();
/** Высота 1 часа */
const h = computed(() => 100 / 24);
/** Стили */
const style = computed(() => {
  return {
    top: `${props.s * h.value}%`,
    height: `${(props.e - props.s) * h.value}%`,
  };
});
</script>

<template>
  <div class="nc-task" ref="$el" :style="style"></div>
</template>

<style lang="scss" scoped>
.nc-task {
  position: absolute;
  width: 90%;
  opacity: 0.75;
  z-index: 5;
  background-color: aquamarine;
}
</style>
