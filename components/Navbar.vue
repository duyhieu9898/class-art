<script lang="ts" setup>
import { IMenuItem } from '~/utils/types'
const navbar = ref(null)
const showDrawer = useState<boolean>('navbar.showDrawer', () => false)
const appMenus: IMenuItem[] = [
  {
    type: 'link',
    text: 'Trang chủ',
    route: {
      path: '/',
    },
  },
  {
    type: 'link',
    text: 'Lớp digital painting cơ bản',
    route: {
      path: '/class-digital-painting-basic',
    },
  },
  {
    type: 'link',
    text: 'Lớp minh họa nâng cao',
    route: {
      path: '/class-digital-painting-basic',
    },
  },
  {
    type: 'link',
    text: 'Sản phẩm học viên',
    route: {
      path: '/class-digital-painting-basic',
    },
  },
  {
    type: 'link',
    text: 'Q&A',
    route: {
      path: '/class-digital-painting-basic',
    },
  },
  {
    type: 'link',
    text: 'Liên hệ',
    route: {
      path: '/class-digital-painting-basic',
    },
  },
]
onMounted(() => {
  if (!navbar.value) return

  // scroll
  const { onScroll } = useSticky(navbar.value, 56)
  setTimeout(() => onScroll(), 50)

  // on show on mobile
  // must in mobile
  const minW = 1024
  if (window.innerWidth < minW) {
    updateDrawerOptions()
  }
})

const updateDrawerOptions = () => {
  // drawer
  if (showDrawer.value) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
}

const toggleDrawer = () => (showDrawer.value = !showDrawer.value)
</script>

<template>
  <div
    ref="navbar"
    class="app-navbar fixed z-999 top-0 left-0 w-full text-white"
  >
    <div class="h-56px flex items-center">
      <div class="max-w-8xl w-full mx-auto">
        <div class="px-4 xl:px-8 w-full">
          <div class="relative flex items-center justify-between w-full">
            <!-- drawer:toggle -->
            <div
              class="lg:hidden flex items-center self-center justify-center mr-3"
            >
              <button
                class="flex items-center focus:outline-none"
                aria-label="Toggle Drawer Menu"
                @click="toggleDrawer()"
              >
                <span
                  class="flex items-center text-gray-600 dark:text-gray-300 text-2xl"
                  aria-hidden="true"
                >
                  <Icon v-if="!showDrawer" name="uil:bars" />
                  <Icon v-else name="uil:times" />
                </span>
              </button>
            </div>

            <!-- menu -->
            <div class="relative flex items-center w-full justify-between">
              <!-- logo -->
              <slot name="title">
                <NuxtLink
                  class="mr-3 overflow-hidden md:w-auto flex items-center text-xl"
                  :to="{ name: 'index' }"
                  aria-label="page home"
                >
                  Vuogle
                </NuxtLink>
              </slot>

              <nav class="hidden lg:block leading-6" role="navigation">
                <ul class="flex items-center lg:space-x-1 xl:space-x-6 w-full">
                  <li v-for="(item, i) in appMenus" :key="i">
                    <Anchor
                      v-if="item.type === 'link'"
                      :to="item.route ? item.route : undefined"
                      :href="item.href ? item.href : undefined"
                      class="font-light"
                      >{{ item.text }}</Anchor
                    >
                    <Button
                      v-else-if="item.type === 'button'"
                      :text="item.text"
                      size="xs"
                      class="font-extrabold capitalize"
                      :to="item.route ? item.route : undefined"
                      :href="item.href ? item.href : undefined"
                    />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ClientOnly>
      <Teleport to="#app-after">
        <!-- drawer -->
        <Transition name="slide-fade-from-up" mode="out-in">
          <div
            v-if="showDrawer"
            class="fixed lg:hidden bg-neutral-800 pt-12 top-0 left-0 w-screen h-screen z-2 flex flex-col"
          >
            <div class="flex-1 flex flex-col relative overflow-y-auto">
              <SidebarNavigation
                :toggle-drawer="toggleDrawer"
                mode="mobile"
                :menus="appMenus"
              />
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.app-navbar ul > li > a.router-link-active {
  color: rgba(125, 182, 177, 1);
  font-weight: 400;
}
.app-navbar {
  transition-duration: 0.5ms;
  &.sticky {
    background-color: rgba(33, 33, 33, 1);
  }
}

.slide-fade-from-up-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-from-up-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-from-up-enter-from,
.slide-fade-from-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
