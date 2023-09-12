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
  <div class="flex flex-col text-center py-3 px-6 mx-auto">
    <div class="font-bold" :class="{ 'text-red-500': isFull }">
      {{ stateClass }}
    </div>
    <div class="mt-3">{{ classInfo.className }}</div>
    <div class="mt-3 font-bold">{{ classInfo.date }}</div>
    <div class="mt-3 text-blue-400">
      {{ classInfo.description }}
    </div>
  </div>
</template>
