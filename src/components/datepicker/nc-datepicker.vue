<script lang="ts" setup>
import ncPopover from '@/components/popover/nc-popover.vue';
import ncInput from '@/components/input/nc-input.vue';
import ncButton from '@/components/button/nc-button.vue';
import { PopoverPositionEnum } from '@/components/popover/enums';
import type { PropType } from 'vue';
import { ref } from 'vue';
import { StatusEnum } from '@/enums';
import { getStatusByDate } from '@/methods';
/** Свойства */
const props = defineProps({
  /** Значение */
  modelValue: {
    type: Object as PropType<Date | undefined>,
    default: undefined,
  },
  /** Значение записанное в инпут */
  value: { type: String, default: '' },
  /** Заполнитель */
  placeholder: { type: String, default: '' },
  /** Уникальное имя */
  name: { type: String, default: 'nc-select' },
});
/** События */
const emit = defineEmits(['update:modelValue']);
/** Инпут */
const focus = ref(false);
</script>

<template>
  <nc-popover
    classes="nc-datepicker"
    :position="PopoverPositionEnum.Bottom"
    @open="focus = true"
    @close="focus = false"
    width="fit-content"
  >
    <nc-input
      class="w-100"
      :class="{ focus: focus }"
      :placeholder="placeholder"
      readonly
      :model-value="value || modelValue?.toString()"
    />
    <template #content>
      <ul class="dates g-3 p-3">
        <slot />
        <nc-button
          class="date br-3"
          :status="getStatusByDate(date, modelValue)"
          :border="getStatusByDate(date, modelValue) == StatusEnum.Base"
          v-for="date in modelValue?.getMonthDates()"
          :key="date.toString()"
          @click="emit('update:modelValue', date)"
        >
          {{ date.getDate() }}
        </nc-button>
      </ul>
    </template>
  </nc-popover>
</template>

<style lang="scss" scoped>
.nc-datepicker {
  .dates {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    .date {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
