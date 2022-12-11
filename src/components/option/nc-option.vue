<!-- @format -->

<script lang="ts" setup>
import { ref } from 'vue';
import ncButton from '@/components/button/nc-button.vue';

/** Свойства */
const props = defineProps({
  /** Значение группы */
  modelValue: { type: String, default: '' },
  /** Значение */
  value: { type: String, default: '' },
  /** Имя группы */
  name: { type: String, default: 'nc-option-group' },
});
/** События */
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <label class="nc-option">
    <input
      type="radio"
      :name="name"
      :value="value"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <div class="background" />
    <span>
      <slot />
    </span>
  </label>
</template>

<style lang="scss" scoped>
.nc-option {
  cursor: pointer;
  position: relative;
  display: flex;
  width: 100%;
  input {
    display: none;
    &:checked + .background {
      --nc-c-alpha: 0.6;
      background-color: rgb(var(--nc-c-secondary), var(--nc-c-alpha));
    }
  }
  > span {
    position: relative;
    z-index: 2;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
  }
  .background {
    z-index: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  &:hover .background {
    --nc-c-alpha: 0.2;
    background-color: rgb(var(--nc-c-secondary), var(--nc-c-alpha));
  }
  &:active .background {
    --nc-c-alpha: 0.4;
    background-color: rgb(var(--nc-c-secondary), var(--nc-c-alpha));
  }
}
</style>
