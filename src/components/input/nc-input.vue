<!-- @format -->

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

/** Свойства */
const props = defineProps({
  /** Значение */
  modelValue: { type: String, default: '' },
  /** Заполнитель */
  placeholder: { type: String, default: '' },
  /** Только для чтения */
  readonly: { type: Boolean, default: false },
});
/** События */
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <span class="nc-input fw-medium fs-p lh-regular">
    <input
      class="px-3 py-1"
      type="text"
      :placeholder="placeholder"
      :readonly="readonly"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span class="border" />
  </span>
</template>

<style lang="scss" scoped>
.nc-input {
  display: inline-flex;
  position: relative;
  .border {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    border-style: var(--nc-input-bs);
    border-width: var(--nc-input-bw);
    border-color: var(--nc-input-bc);
  }
  input {
    border: none;
    outline: none;
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;
    background: none;
    z-index: 1;
    &::placeholder {
      color: rgb(var(--nc-c-secondary));
    }
  }
  &.focus .border,
  input:focus ~ .border {
    border-color: var(--nc-input-focus-bc);
  }
}
</style>
