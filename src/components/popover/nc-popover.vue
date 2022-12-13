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
  width: { type: String, default: '100%' },
  /** Классы поповера */
  classes: { type: String, default: '' },
  /** Отключить поповер */
  isDisabled: { type: Boolean, default: false },
  /** Тултип */
  isTooltip: { type: Boolean, default: false },
  /** Отключить дефолтное поведение */
  isDisableDefaultEvents: { type: Boolean, default: false },
});
/** Видимость */
const visible = ref(false);
/** Слежение за видимостью */
watch(visible, () => {
  if (visible.value) emit('open');
  else emit('close');
});
/** Клик по элементу */
const click = (e: MouseEvent | TouchEvent) => {
  const $t = e.target as HTMLElement;
  if ($t == $tri.value) return;
  if (visible.value) {
    close();
  } else {
    open();
  }
};
/** События */
const emit = defineEmits(['open', 'close']);
/** Открыть */
const open = () => {
  if (props.isDisabled) return;
  visible.value = true;
  window.addEventListener('resize', setSettings);
  window.addEventListener('scroll', setSettings);
  if (props.isDisableDefaultEvents) return;
  if (!props.isTooltip) window.addEventListener('click', blur);
};
/** Клик за элементом */
const blur = (e: MouseEvent) => {
  const $t = (props.isTooltip ? e.relatedTarget : e.target) as HTMLElement;
  if (
    !visible.value ||
    !$el.value ||
    $el.value == $t ||
    $el.value.contains($t) ||
    !$box.value ||
    $box.value == $t ||
    $box.value.contains($t)
  )
    return;
  close();
};
/** Установка параметров элементов */
const setSettings = () => {
  setElRect();
  setBoxRect();
  setTriRect();
};
/** Закрыть */
const close = () => {
  visible.value = false;
  window.removeEventListener('resize', setSettings);
  window.removeEventListener('scroll', setSettings);
  window.removeEventListener('click', blur);
};
/** Элемент для клика */
const $el = ref<HTMLElement>();
/** Параметры элемента для наведения */
const elRect = ref<DOMRect>();
/** Установить параметры элемента для наведения */
const setElRect = () => {
  elRect.value = $el.value?.getBoundingClientRect();
};
/** Коробка тултипа */
const $box = ref<HTMLElement>();
/** Параметры коробки тултипа */
const boxRect = ref<DOMRect>();
/** Установть параметры коробки тултипа */
const setBoxRect = () => {
  boxRect.value = $box.value?.getBoundingClientRect();
};
/** При создании компонента */
onMounted(() => {
  if (props.isDisableDefaultEvents) return;
  if (!props.isTooltip) $el.value?.addEventListener('click', click);
  else {
    $el.value?.addEventListener('mouseover', open);
    $el.value?.addEventListener('mouseout', blur);
    $el.value?.addEventListener('touchstart', click, { passive: true });
  }
});
/** Слежение за коробкой */
watch($box, () => {
  if (props.isTooltip) $box.value?.addEventListener('mouseout', blur);
});
/** Перед разрушением компонента */
onBeforeUnmount(() => {
  $el.value?.removeEventListener('click', click);
  $el.value?.removeEventListener('mouseover', open);
  $el.value?.removeEventListener('mouseout', blur);
  $el.value?.removeEventListener('touchstart', click);
  close();
});
/** Текущая позиция */
const position = computed(() => {
  if (!successPositions.value.length && elRect.value && triRect.value) {
    const t =
      elRect.value.top + elRect.value.height / 2 - triRect.value.height / 2 - 8;
    const b =
      window.innerHeight -
      (elRect.value.top +
        elRect.value.height / 2 +
        triRect.value.height / 2 +
        8);
    let l =
      elRect.value.left + elRect.value.width / 2 - triRect.value.width / 2 - 8;
    let r =
      window.innerWidth -
      (elRect.value.left +
        elRect.value.width / 2 +
        triRect.value.width / 2 +
        8);
    const obj = { t, b, l, r };
    const max = Math.max.apply(
      null,
      Object.values(obj).filter((el) => el <= 0)
    );
    const key = (Object.keys(obj) as ('t' | 'b' | 'l' | 'r')[]).find(
      (key) => obj[key] == max
    );
    if (key == 'r' || key == 'l') {
      if (obj.b > obj.t) return PopoverPositionEnum.Bottom;
      return PopoverPositionEnum.Top;
    } else {
      if (obj.r > obj.l) return PopoverPositionEnum.Right;
      return PopoverPositionEnum.Left;
    }
  }
  if (successPositions.value.includes(props.position)) return props.position;
  return successPositions.value[0];
});
/** Доступные позиции */
const successPositions = computed(() => {
  if (!elRect.value || !boxRect.value || !triRect.value) return [];
  const positions: PopoverPositionEnum[] = [];
  const isX =
    elRect.value.top + elRect.value.height / 2 - triRect.value.height / 2 - 8 >
      0 &&
    elRect.value.top + elRect.value.height / 2 + triRect.value.height / 2 + 8 <
      window.innerHeight;
  const isY =
    elRect.value.left + elRect.value.width / 2 - triRect.value.width / 2 - 8 >
      0 &&
    elRect.value.left + elRect.value.width / 2 + triRect.value.width / 2 + 8 <
      window.innerWidth;
  if (
    elRect.value.top - (boxRect.value.height + triRect.value.width / 2) > 0 &&
    isY
  )
    positions.push(PopoverPositionEnum.Top);
  if (
    elRect.value.right + boxRect.value.width + triRect.value.width / 2 <
      window.innerWidth &&
    isX
  )
    positions.push(PopoverPositionEnum.Right);
  if (
    elRect.value.bottom + boxRect.value.height + triRect.value.height / 2 <
      window.innerHeight &&
    isY
  )
    positions.push(PopoverPositionEnum.Bottom);
  if (
    elRect.value.left - (boxRect.value.width + triRect.value.width / 2) > 0 &&
    isX
  )
    positions.push(PopoverPositionEnum.Left);
  return positions;
});
watch(position, () => {
  setTimeout(setSettings);
});
/** Слити */
const style = computed(() => {
  if (!visible.value || !boxRect.value || !elRect.value || !triRect.value)
    return {};
  const style: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform?: string;
    width?: string;
  } = {};

  if (
    position.value == PopoverPositionEnum.Top ||
    position.value == PopoverPositionEnum.Bottom
  ) {
    style.left = `calc(${elRect.value.left}px + ${elRect.value.width}px / 2 - ${boxRect.value.width}px / 2)`;
    const t = getTranslate('X');
    if (t) style.transform = t;
  } else {
    style.top = `calc(${elRect.value.top}px + ${elRect.value.height}px / 2 - ${boxRect.value.height}px / 2)`;
    const t = getTranslate('Y');
    if (t) style.transform = t;
  }

  switch (position.value) {
    case PopoverPositionEnum.Top:
      style.bottom = `calc(100% - ${elRect.value.top}px)`;
      break;
    case PopoverPositionEnum.Bottom:
      style.top = `${elRect.value.bottom}px`;
      break;
    case PopoverPositionEnum.Left:
      style.right = `calc(100% - ${elRect.value.left}px)`;
      break;
    case PopoverPositionEnum.Right:
      style.left = `${elRect.value.right}px`;
      break;
  }

  return style;
});
/** Треугольник поповера */
const $tri = ref<HTMLElement>();
/** Параметры треугольника поповера */
const triRect = ref<DOMRect>();
/** Установть параметры коробки тултипа */
const setTriRect = () => {
  triRect.value = $tri.value?.getBoundingClientRect();
};
/** Возвращает стиль translate */
const getTranslate = (type: 'X' | 'Y') => {
  if (!boxRect.value || !triRect.value) return;
  const keySize = type == 'X' ? 'width' : 'height';
  const keySide = type == 'X' ? 'left' : 'top';
  const keyEndSide = type == 'X' ? 'right' : 'bottom';
  const keyWindowSize = type == 'X' ? 'innerWidth' : 'innerHeight';

  let ts: number;
  const start = boxRect.value[keySize] / 2 - triRect.value[keySize] / 2;
  if (triRect.value[keySide] - 8 < 0) ts = start - 8;
  else ts = start - triRect.value[keySide];
  if (ts > 0) return `translate${type}(${ts}px)`;

  let te: number;
  const end =
    triRect.value[keySide] +
    boxRect.value[keySize] / 2 +
    triRect.value[keySize] / 2;
  if (window[keyWindowSize] < triRect.value[keyEndSide] + 8)
    te = triRect.value[keyEndSide] - end + 8;
  else te = window[keyWindowSize] - end;
  if (te < 0) return `translate${type}(${te}px)`;
  return '';
};
/** Форматировать и вернуть ширину */
const getWidth = (width: string): string => {
  if (width.includes('%') && $el.value)
    return (
      ($el.value.offsetWidth / 100) * Number(width.replace('%', '')) + 'px'
    );
  return width;
};
/** Что можно использовать в родителе */
defineExpose({
  visible,
  open,
  close,
  setElRect,
  setBoxRect,
  setTriRect,
  setSettings,
});
</script>

<template>
  <span class="nc-popover-el" ref="$el">
    <Teleport to="body">
      <Transition
        name="nc_popover"
        @enter="setSettings"
        @after-enter="setSettings"
      >
        <div
          v-if="visible"
          class="nc-popover"
          :class="[{ 'is-open': visible }, `is-${position}`, classes]"
          :style="[
            style,
            {
              '--nc-popover-b-sh-c': `rgba(${getColorByStatus(
                props.status
              )}, 0.5)`,
            },
          ]"
          ref="$box"
        >
          <div
            class="content py-1"
            :style="{
              width: getWidth(width),
              background: `rgb(${getColorByStatus(props.status)}`,
            }"
          >
            <slot name="content" />
          </div>
        </div>
      </Transition>
    </Teleport>
    <Transition name="nc_popover">
      <span
        v-if="visible"
        class="triangle"
        :class="[`is-${position}`]"
        :style="{
          borderTopColor: `rgb(${getColorByStatus(props.status)}`,
        }"
        ref="$tri"
      />
    </Transition>
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.nc_popover-enter-active,
.nc_popover-leave-active {
  z-index: 10000;
  transition-duration: var(--nc-popover-transition_duration);
  transition-timing-function: var(--nc-popover-transition_timing_function);
  transition-property: opacity;
}
.nc_popover-enter-from,
.nc_popover-leave-to {
  z-index: 10000;
  opacity: 0;
}
.nc-popover {
  position: fixed;
  min-height: fit-content;
  max-height: fit-content;
  width: fit-content;
  max-width: 100%;
  z-index: 10000;
  &.is-top {
    margin-bottom: var(--nc-popover-triangle-size);
  }
  &.is-bottom {
    margin-top: var(--nc-popover-triangle-size);
  }
  &.is-left {
    margin-right: var(--nc-popover-triangle-size);
  }
  &.is-right {
    margin-left: var(--nc-popover-triangle-size);
  }
  .content {
    min-width: calc(
      var(--nc-popover-triangle-size) * 2 + var(--nc-popover-content-br) * 2
    );
    min-height: calc(
      var(--nc-popover-triangle-size) * 2 + var(--nc-popover-content-br) * 2
    );
    max-width: 100%;
    overflow: hidden;
    max-width: 100%;
    background-color: rgb(var(--nc-c-bg-1));
    // border-radius: inherit;
    border-radius: var(--nc-popover-content-br);
  }
  &::before {
    content: '';
    box-shadow: var(--nc-popover-b-sh) var(--nc-popover-b-sh-c);
    filter: brightness(10%);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    // border-radius: inherit;
    border-radius: var(--nc-popover-content-br);
  }
}
.nc-popover-el {
  display: inline-flex;
  position: relative;
  .triangle {
    position: absolute;
    display: inline-flex;
    border: var(--nc-popover-triangle-size) solid transparent; /* Прозрачные границы */
    border-top: var(--nc-popover-triangle-size) solid rgb(var(--nc-popover-c)); /* Добавляем треугольник */
    z-index: 10001;
    opacity: 0;
    &.is-top,
    &.is-bottom {
      left: 50%;
    }
    &.is-left,
    &.is-right {
      top: 50%;
    }
    &.is-top {
      bottom: calc(100% - var(--nc-popover-triangle-size));
      transform: translateX(-50%) rotate(0);
    }
    &.is-bottom {
      top: calc(100% - var(--nc-popover-triangle-size));
      transform: translateX(-50%) rotate(180deg);
    }
    &.is-left {
      right: calc(100% - var(--nc-popover-triangle-size));
      transform: translateY(-50%) rotate(-90deg);
    }
    &.is-right {
      left: calc(100% - var(--nc-popover-triangle-size));
      transform: translateY(-50%) rotate(90deg);
    }
  }
}
</style>
