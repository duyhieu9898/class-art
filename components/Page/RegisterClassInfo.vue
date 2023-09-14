<script lang="ts" setup>
import { IClass } from '~/utils/types'

const props = defineProps({
  classInfo: {
    type: Object as PropType<IClass>,
    required: true,
  },
})

const isFull = computed(() => {
  return props.classInfo.studentRegister >= props.classInfo.studentTotal
})

const stateClass = computed(() => {
  if (props.classInfo.studentRegister >= props.classInfo.studentTotal) {
    return 'Full'
  }
  return `${props.classInfo.studentRegister} / ${props.classInfo.studentTotal}`
})
</script>
<template>
  <div class="flex flex-col text-center py-3 px-6 mx-auto flex-1">
    <div
      class="font-bold"
      :class="[isFull ? 'text-red-500' : 'text-violet-500']"
    >
      {{ stateClass }}
    </div>
    <div class="mt-3">Lịch khai giảng lớp {{ classInfo.className }}</div>
    <div class="mt-3 font-bold">{{ classInfo.date }}</div>
    <div class="mt-3 text-blue-400 whitespace-pre-wrap">
      {{ classInfo.description }}
    </div>
    <div v-show="!isFull" class="max-w-[300px] mx-auto mt-2">
      <Button :href="classInfo.linkRegister" target="blank">Đăng ký</Button>
    </div>
  </div>
</template>
