<script lang="ts" setup>
import { useAppStore } from '~/stores/app'
const appStore = useAppStore()
</script>
<template>
  <div
    v-if="appStore.classList && appStore.classList.length !== 0"
    class="mt-8 max-w-4xl mx-auto gap-6"
  >
    <div class="flex justify-between flex-wrap gap-16">
      <PageRegisterClassInfo
        v-for="(classInfo, index) in appStore.classList"
        :key="`r-${index}`"
        :class-info="classInfo"
      ></PageRegisterClassInfo>
    </div>
  </div>
</template>
