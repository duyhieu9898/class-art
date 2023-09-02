<script lang="ts" setup>
import { IMenuItem } from '~/utils/types'

defineProps({
  mode: {
    type: String,
    default: 'normal',
  },
  menus: {
    type: Object as () => IMenuItem[],
    required: true,
  },
  toggleDrawer: {
    type: Function,
    required: true,
  },
})
const sidebar = ref(null)
</script>

<template>
  <aside
    ref="sidebar"
    aria-label="Sidebar"
    :class="{
      'fixed top-0 hidden pt-12 lg:flex lg:w-60 xl:w-80 h-screen':
        mode === 'normal',
      'relative flex-1 flex flex-col w-full': mode === 'mobile',
    }"
  >
    <div class="overflow-y-auto py-5 px-4 h-full">
      <ul v-if="menus && menus.length" class="space-y-2 text-lg">
        <li
          v-for="(item, i) in menus"
          :key="i"
          class="flex flex-col justify-center p-2 font-normal text-white rounded-md"
        >
          <Anchor
            v-if="item.type === 'link'"
            :to="item.route ? item.route : undefined"
            :href="item.href ? item.href : undefined"
            class=""
            >{{ item.text }}</Anchor
          >
          <Button
            v-else-if="item.type === 'button'"
            :text="item.text"
            size="xs"
            class="font-medium capitalize"
            :to="item.route ? item.route : undefined"
            :href="item.href ? item.href : undefined"
          />
        </li>
      </ul>
    </div>
  </aside>
</template>
