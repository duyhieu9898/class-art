<script lang="ts" setup>
// @ts-ignore
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
})

// state:styles
const defaultStyle = `
  cursor-pointer
  border transition-color duration-300
  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:dark:ring-offset-gray-50 focus:dark:ring-gray-400 focus:ring-gray-600/[0.6] focus:ring-offset-gray-800/[0.6]
  flex items-center justify-center
`
const styles = reactive<{
  [key: string]: string
}>({
  none: '',
  text: 'capitalize text-blue-400 border-none',
  primary: 'text-white bg-app-neutral hover:bg-neutral-800 border-neutral-700',
  secondary:
    'text-slate-800 bg-gray-200 border-gray-200 hover:bg-gray-300 dark:text-white dark:border-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700',
  opposite:
    'text-white bg-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-900 dark:text-gray-800 dark:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:border-white',
  'primary-outlined': `
    font-medium text-center text-sm text-yellow-400 dark:text-yellow-300
    rounded-md  px-5 py-2  mr-2 mb-2 border border-yellow-400 dark:border-yellow-300
    hover:shadow-md dark:hover:bg-neutral-700
    focus:outline-none focus:ring-yellow-300 focus:ring-4 dark:focus:ring-neutral-700`,
})
const sizes = reactive<{
  [key: string]: string
}>({
  lg: 'h-13 px-8 text-lg rounded-lg',
  md: 'h-10 px-6 text-base rounded',
  sm: 'h-9 px-4 text-sm rounded',
  xs: 'h-6 px-3 text-xs rounded',
})

// state
const selectedStyle = computed(() => styles[props.type] || styles.primary)
const selectedSize = computed(() => sizes[props.size] || sizes.lg)

// methods
const onClick = (event: MouseEvent) => {
  const router = useRouter()
  if (props.to) {
    router.push(props.to)
  }
  if (!props.href) {
    event.preventDefault()
  }
}
</script>

<template>
  <NuxtLink
    v-if="to"
    tag="a"
    :to="to"
    :class="`${defaultStyle} ${selectedStyle} ${selectedSize}`"
  >
    <slot>{{ text }}</slot>
  </NuxtLink>
  <a
    v-else-if="href"
    :class="`${defaultStyle} ${selectedStyle} ${selectedSize}`"
    :href="href"
    @click="onClick"
  >
    <slot>{{ text }}</slot>
  </a>
  <button
    v-else
    :class="`${defaultStyle} ${selectedStyle} ${selectedSize}`"
    :href="href"
    @click="onClick"
  >
    <slot>{{ text }}</slot>
  </button>
</template>
