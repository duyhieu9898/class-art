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
    class="transition-colors duration-300 hover:text-teal-300"
    exact-active-class="text-teal-300"
  >
    <slot>{{ text }}</slot>
  </NuxtLink>
  <a
    v-else
    :class="`transition-colors duration-300 text-teal-300 hover:text-teal-500`"
    :href="href"
  >
    <slot>{{ text }}</slot>
  </a>
</template>
