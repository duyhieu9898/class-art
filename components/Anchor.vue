<script lang="ts" setup>
// micro compiler
// @ts-ignore
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: '',
  },
})

// state
const href = toRef(props, 'href')
const to = toRef(props, 'to')
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="transition-colors duration-300 text-light-900 hover:text-light-50"
    exact-active-class="text-light-50 !font-normal"
  >
    <slot>{{ text }}</slot>
  </NuxtLink>
  <a v-else :class="`transition-colors duration-300`" :href="href">
    <slot>{{ text }}</slot>
  </a>
</template>
