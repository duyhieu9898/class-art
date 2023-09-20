<script setup lang="ts">
import { useAppStore } from '~/stores/app'
const appStore = useAppStore()
</script>
<template>
  <div
    v-if="appStore.classList && appStore.classList.length !== 0"
    class="max-w-8xl mx-auto flex flex-wrap justify-center"
  >
    <PageSectionCourse
      v-for="(classInfo, index) in appStore.classList"
      :key="`class-${index}`"
      :class-info="classInfo"
    >
    </PageSectionCourse>
  </div>
</template>
