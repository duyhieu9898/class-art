<script lang="ts" setup>
import { IClass } from '~/utils/types'
import { formatterNumber } from '~/utils/helper'

defineProps({
  classInfo: {
    type: Object as PropType<IClass>,
    required: true,
  },
})
</script>
<template>
  <div
    class="py-8 w-[100%] md:w-[50%] flex justify-center flex-col text-center px-4"
  >
    <div class="text-lg md:text-xl">Lớp {{ classInfo.className }}</div>
    <div class="text-2xl md:text-4xl text-blue-500 font-bold mt-3">
      {{ formatterNumber.format(classInfo.price) }}
    </div>
    <img src="/images/class1.jpg" class="CENy8b mt-4" />
    <div class="text-sm mt-3">
      Thông tin về khóa
      <span class="capitalize">{{ classInfo.className }}</span>
    </div>
    <Button
      type="primary"
      class="mt-3 w-full mx-auto"
      to="/basic-casual-game-class"
      >Chi tiết</Button
    >
  </div>
</template>
