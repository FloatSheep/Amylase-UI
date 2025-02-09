<script lang="ts" setup>
import type { CSSProperties, Ref } from 'vue'
import type { Observable } from 'rxjs'
import { filter, fromEvent, map, switchMap, takeUntil } from 'rxjs'
import { fromEvent as fromEventRef, useSubscription } from '@vueuse/rxjs'
import Flatten from '@flatten-js/core'
import { getDefaultLightTheme } from '@/theme'

interface SliderProps {
  modelValue?: number
  disabled?: boolean
  width?: CSSProperties['width']
  trackHeight?: number
  trackColor?: CSSProperties['background']
  thumbColor?: CSSProperties['background']
  step?: number
  min?: number
  max?: number
}

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: undefined,
  min: 0,
  max: 100,
  step: 1,
  width: '120px',
  trackHeight: 4,
  trackColor: getDefaultLightTheme().stroke.accessibleNeutral,
  thumbColor: 'rgb(0, 95, 184)',
})

const emits = defineEmits<{
  (e: 'update:modelValue', v: number): void
}>()

/** slider 容器 DOM，用于计算滑块在组件中的相对位置 */
const containerRef = ref<HTMLElement | null>(null)
/** 滑块 DOM，用于计算滑块在组件中的相对位置 */
const thumbRef = ref<HTMLElement | null>(null)
/** 头部定位 DOM，用于计算组件旋转角度和滑动矢量在容器水平中轴线的投影距离 */
const headRef = ref<HTMLElement | null>(null)
/** 尾部定位 DOM，用于计算组件旋转角度和滑动矢量在容器水平中轴线的投影距离 */
const tailRef = ref<HTMLElement | null>(null)

const { width: containerW } = useElementSize(containerRef)
const { width: thumbW } = useElementSize(thumbRef)
/** 容器长度减去滑块长度后的实际可用滑动长度 */
const slideLength = computed(() => containerW.value - thumbW.value)

/** 非受控状态下的内部缓存值 */
const internalBind = ref(0)

/** 内部双绑值 */
const bindValue = computed({
  get: () => (props.modelValue === undefined ? internalBind.value : props.modelValue),
  set: (v) => {
    if (props.modelValue === undefined) {
      internalBind.value = v
      return
    }
    emits('update:modelValue', v)
  },
})

/** 区间值的总大小 */
const range = computed(() => Math.abs(props.max - props.min))
/** 当前值占区间的比 */
const ratio = computed(() => (bindValue.value - props.min) / range.value)

/** 将定位元素转换为矢量 */
const getHorizontalCentralAxis = (a: HTMLElement, b: HTMLElement) => {
  const shapeA = a.getBoundingClientRect()
  const shapeB = b.getBoundingClientRect()
  return Flatten.vector(Flatten.point(shapeA.x, shapeA.y), Flatten.point(shapeB.x, shapeB.y))
}

/** 获取投影长度，处理一下矢量长度为 0 时的特殊情况 */
const getProjectionLength = (v1: Flatten.Vector, v2: Flatten.Vector) => {
  try {
    const angle = Math.cos(v1.angleTo(v2))
    const directionalCoefficient = angle / Math.abs(angle)
    return v1.projectionOn(v2).length * directionalCoefficient
  }
  catch {
    return 0
  }
}

/** 取区间值 */
const clamp = (min: number, max: number, value: number) => {
  return Math.max(min, Math.min(max, value))
}

const pointerdown = fromEventRef(
  thumbRef as Ref<HTMLElement>,
  'pointerdown',
) as Observable<PointerEvent>
const pointermove = fromEvent<PointerEvent>(window, 'pointermove')
const pointerup = fromEvent(window, 'pointerup')

/** 基于双定位点获取移动投影量实现的滑动距离计算过程，可以适应任意角度的平面旋转 */
const slideObservable = pointerdown.pipe(
  filter(() => !props.disabled),
  map(({ x: startX, y: startY }) => Flatten.point(startX, startY)),
  switchMap((start) => {
    const startValue = bindValue.value
    return pointermove.pipe(
      takeUntil(pointerup),
      map(({ x, y }) => {
        if (!headRef.value || !tailRef.value)
          return { moveLen: 0, startValue }
        const axisVector = getHorizontalCentralAxis(headRef.value, tailRef.value)
        const moveVector = Flatten.vector(start, Flatten.point(x, y))
        const moveLen = getProjectionLength(moveVector, axisVector)
        return { moveLen, startValue }
      }),
    )
  }),
)

useSubscription(
  slideObservable.subscribe(({ startValue, moveLen }) => {
    // 先算出移动距离占可滑动长度的比
    const lenRatio = moveLen / slideLength.value
    // 再根据区间长度和上下限计算应该得到的数值
    const result = clamp(props.min, props.max, startValue + lenRatio * range.value)
    bindValue.value = Math.floor(result / props.step) * props.step
  }),
)
</script>

<template>
  <div
    ref="containerRef"
    class="win-slider"
    v-bind="$attrs"
    :class="{ disabled }"
    :style="{
      '--thumb-bg': `${props.thumbColor}`,
      '--thumb-white': `${getDefaultLightTheme().fill.ctrlInputActive}`,
      '--thumb-white-border': `#d1d1d1`,
      '--track-bg': `${trackColor}`,
      '--slider-width': `${containerW}px`,
      '--slider-track-height': `${trackHeight / 2}px`,
      width,
    }"
  >
    <!-- 头部定位元素 -->
    <div ref="headRef" class="positioning-element positioning-element__head" />
    <!-- 尾部定位元素 -->
    <div ref="tailRef" class="positioning-element positioning-element__tail" />
    <!-- 滑块元素 -->
    <div
      ref="thumbRef"
      class="thumb"
      :style="{ transform: `translate(${ratio * slideLength - thumbW / 2}px, 0)` }"
    />
    <!-- 轨道应该基于容器元素本身来实现，滑块相对于容器元素进行定位  -->
    <div class="track" :style="{ height: `${trackHeight}px`, background: 'var(--track-bg)' }" />
  </div>
</template>

<style lang="scss" scoped>
.win-slider {
  --thumb-cursor: pointer;
  --thumb-radius: 4px;

  width: v-bind(width);
  height: 24px;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;

  &.disabled {
    --thumb-cursor: not-allowed;
    --thumb-bg: #bdbdbd !important;
    --track-bg: #bdbdbd !important;
  }

  .track {
    position: relative;
    transform: translateY(calc(50% - var(--slider-track-height)));
    z-index: 1;
    border: solid 1px transparent;
    border-radius: 4px;
  }

  .thumb {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0;
    background: var(--thumb-white);
    border-radius: 50%;
    user-select: none;
    cursor: var(--thumb-cursor);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--thumb-white-border);
  }

  .thumb::before {
    content: '';
    width: 12px; // 小圆的宽度
    height: 12px; // 小圆的高度
    background: var(--thumb-bg); // 小圆的背景颜色
    border-radius: 50%; // 小圆的圆角
    position: absolute;
  }

  .thumb:not(.disabled) {
    &:hover {
      --thumb-radius: 5px;
    }
    &:active {
      --thumb-radius: 3px;
    }
  }

  // 定位元素没有宽高（即其左上角坐标就是点的坐标，以便滑块计算滑动距离）
  .positioning-element {
    width: 0;
    height: 0;
    top: 50%;
    position: absolute;
  }

  .positioning-element__head {
    left: 0;
  }

  .positioning-element__tail {
    left: 100%;
  }
}
</style>
