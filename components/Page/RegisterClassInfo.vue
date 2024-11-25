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
</script>
<template>
  <div class="flex flex-col text-center py-3 px-6 mx-auto flex-1">
    <div class="mt-3 font-medium uppercase">Lịch học cố định</div>
    <div class="uppercase font-extrabold tracking-widest text-lg mt-3">
      Thứ 3 - Thứ 5
    </div>
    <div
      class="flex justify-between font-bold max-w-[500px] w-full mx-auto mt-4"
    >
      <div>Thứ 3: 19h300 đến 21h00</div>
      <div>Thứ 5: 19h300 đến 21h00</div>
    </div>
    <div v-show="!isFull" class="max-w-[300px] mx-auto mt-6">
      <Button :href="classInfo.linkRegister" target="blank">Đăng ký</Button>
    </div>
  </div>
</template>
