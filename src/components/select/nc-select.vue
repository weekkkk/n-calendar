<!-- @format -->

<script lang="ts" setup>
import ncPopover from '@/components/popover/nc-popover.vue';
import ncInput from '@/components/input/nc-input.vue';
import ncOption from '@/components/option/nc-option.vue';
import { OptionModel } from '@/components//option/models';
import { PopoverPositionEnum } from '@/components/popover/enums';
import { StatusEnum } from '@/enums';
import type { PropType } from 'vue';
import { ref } from 'vue';

/** Свойства */
const props = defineProps({
  /** Значение */
  modelValue: {
    type: Object as PropType<OptionModel | undefined>,
    default: undefined,
  },
  /** Значение записанное в инпут */
  value: { type: String, default: '' },
  /** Заполнитель */
  placeholder: { type: String, default: '' },
  /** Уникальное имя */
  name: { type: String, default: 'nc-select' },
  /** Опции */
  options: { type: Array as PropType<OptionModel[]>, default: [] },
});
/** События */
const emit = defineEmits(['update:modelValue']);
/** Инпут */
const focus = ref(false);
</script>

<template>
  <nc-popover
    classes="nc-select-options"
    :position="PopoverPositionEnum.Bottom"
    @open="focus = true"
    @close="focus = false"
    :width="272"
  >
    <nc-input
      class="w-100"
      :class="{ focus: focus }"
      :placeholder="placeholder"
      readonly
      :model-value="value || modelValue?.Value"
    />
    <template #content>
      <ul class="f options fd-col">
        <slot />
        <nc-option
          class="px-3 py-2 fw-medium fs-p lh-regular"
          v-for="option in options"
          :key="option.Id"
          :model-value="modelValue?.Value"
          @update:model-value="
            emit(
              'update:modelValue',
              OptionModel.getOptionByKey(options, $event)
            )
          "
          :value="option.Value"
          :name="name"
        >
          <slot :option="option" />
        </nc-option>
      </ul>
    </template>
  </nc-popover>
</template>

<style lang="scss">
.nc-select-options {
  .options {
    max-height: calc(40px * 4);
    height: 100%;
    overflow: auto;
    .nc-option {
      margin-right: -16px;
    }
  }
}
</style>
