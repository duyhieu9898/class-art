<script lang="ts" setup>
defineProps({
  iframeSrc: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div>
    <div class="relative pb-[56.25%]">
      <iframe
        :src="iframeSrc"
        :title="title"
        allowfullscreen
        frameborder="0"
        class="w-full absolute top-0 left-0 h-full"
      >
      </iframe>
    </div>

    <div class="mt-2 text-center text-sm md:text-md">{{ title }}</div>
  </div>
</template>
