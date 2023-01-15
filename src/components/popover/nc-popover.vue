<!-- @format -->

<script lang="ts" setup>
import { StatusEnum } from '@/enums';
import type { PropType } from 'vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { PopoverPositionEnum } from './enums';
import { getColorByStatus } from '@/methods';
/** Свойства */
const props = defineProps({
  ref: { type: String },
  /** Позиция поповера */
  position: {
    type: String as PropType<PopoverPositionEnum>,
    default: PopoverPositionEnum.Top,
  },
  /** Статус поповера */
  status: {
    type: Number as PropType<StatusEnum>,
    default: StatusEnum.Default,
  },
  /** Ширина поповера */
  width: { type: Number, default: 100 },
  /** Классы поповера */
  classes: { type: String, default: '' },
});

/** Видимость */
const visible = ref(false);
/** Прошла анимация */
const after = ref(false);

const p = ref(props.position);

/** Элемент */
const $el = ref<HTMLElement>();
const $cont = ref<HTMLElement>();
/** Возвращает позицию */
const style = computed(() => {
  let l: number = 0,
    t: number = 0;

  if (!eR.value || !cR.value) return {};

  switch (p.value) {
    case PopoverPositionEnum.Top:
      t = eR.value.top - cR.value.height - 8;
      break;
    case PopoverPositionEnum.Bottom:
      t = eR.value.bottom + 8;
      break;
    case PopoverPositionEnum.Left:
      l = eR.value.left - cR.value.width - 8;
      break;
    case PopoverPositionEnum.Right:
      l = eR.value.right + 8;
      break;
  }

  if (
    p.value == PopoverPositionEnum.Left ||
    p.value == PopoverPositionEnum.Right
  )
    t = eR.value.top + eR.value.height / 2 - cR.value.height / 2;

  if (
    p.value == PopoverPositionEnum.Top ||
    p.value == PopoverPositionEnum.Bottom
  )
    l = eR.value.left + eR.value.width / 2 - cR.value.width / 2;

  if (t < 0) t = 0;

  if (t + cR.value.height > window.innerHeight)
    t = window.innerHeight - cR.value.height;

  if (l < 0) l = 0;

  if (l + cR.value.width > window.innerWidth)
    l = window.innerWidth - cR.value.width;

  return { left: l + 'px', top: t + 'px' };
});

const eR = ref<DOMRect>();
const cR = ref<DOMRect>();

const onAfter = (el: HTMLElement) => {
  cR.value = el?.getBoundingClientRect();
  eR.value = $el.value?.getBoundingClientRect();
  after.value = true;
};

const onLeave = () => {
  console.log('onLeave');
  cR.value = undefined;
  eR.value = undefined;
  after.value = false;
};

const open = () => {
  console.log('open');
  visible.value = true;
  window.addEventListener('click', blur);
};

const blur = (e: MouseEvent) => {
  const t = e.target as HTMLElement;
  if (
    !$cont.value ||
    !$el.value ||
    t == $cont.value ||
    $cont.value.contains(t) ||
    $el.value == t ||
    $el.value.contains(t)
  )
    return;
  close();
};

const close = () => {
  visible.value = false;
  window.removeEventListener('click', blur);
};
</script>

<template>
  <div class="nc-popover-el" ref="$el" @click="visible ? close() : open()">
    <Teleport to="body">
      <Transition
        name="nc_popover"
        @after-enter="onAfter"
        @after-leave="onLeave"
      >
        <!-- @enter-cancelled="onAfter"
        @leave-cancelled="onLeave" -->
        <div
          v-if="visible"
          class="nc-popover"
          ref="$cont"
          :class="[classes, { 'is-open': visible && after }]"
          :style="[
            style,
            {
              '--nc-popover-b-sh-c': `rgba(${getColorByStatus(
                props.status
              )}, 0.5)`,
              width: `${width}px`,
              backgroundColor: `rgb(${getColorByStatus(props.status)}`,
            },
          ]"
        >
          <slot name="content" />
        </div>
      </Transition>
    </Teleport>
    <slot />
  </div>
</template>

<style lang="scss">
.nc-popover-el {
  display: inline-flex;
}

.nc-popover {
  border-radius: var(--nc-popover-content-br);
  box-shadow: var(--nc-popover-b-sh) var(--nc-popover-b-sh-c);
  position: fixed;
  overflow: hidden;
  z-index: 1000;
  transition: var(--nc-popover-transition);
  opacity: 0;
  transition-property: opacity;
  &.is-open {
    opacity: 1;
  }
}

.nc_popover-enter-active,
.nc_popover-leave-active {
  z-index: 10000;
  transition: var(--nc-popover-transition);
  transition-property: opacity;
}
.nc_popover-enter-from,
.nc_popover-leave-to {
  z-index: 10000;
  opacity: 0 !important;
}
</style>
