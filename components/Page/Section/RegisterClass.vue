<script lang="ts" setup>
import { useAppStore } from '~/stores/app'
const { fetchData } = useAppStore()
fetchData()
</script>
<template>
  <div class="mt-8 max-w-4xl mx-auto gap-6">
    <div class="flex justify-between flex-wrap gap-16">
      <div class="flex flex-col text-center py-3 px-6 mx-auto">
        <div class="font-bold text-red-500">FULL</div>
        <div class="mt-3">Lịch khai giảng lớp CƠ BẢN</div>
        <div class="mt-3 font-bold">11-9-2023</div>
        <div class="mt-3 text-blue-400">
          ( học vào các ngày thứ 2 trong tuần )
        </div>
      </div>
      <div class="flex flex-col text-center py-3 px-6 mx-auto">
        <div class="font-bold text-red-500">FULL</div>
        <div class="mt-3">Lịch khai giảng lớp CƠ BẢN</div>
        <div class="mt-3 font-bold">11-9-2023</div>
        <div class="mt-3 text-blue-400">
          ( học vào các ngày thứ 2 trong tuần )
        </div>
      </div>
      <div class="flex flex-col text-center py-3 px-6 mx-auto">
        <div class="font-bold text-red-500">FULL</div>
        <div class="mt-3">Lịch khai giảng lớp CƠ BẢN</div>
        <div class="mt-3 font-bold">11-9-2023</div>
        <div class="mt-3 text-blue-400">
          ( học vào các ngày thứ 2 trong tuần )
        </div>
      </div>
    </div>
  </div>
</template>
