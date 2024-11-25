<script lang="ts" setup>
import { ref } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { IClass } from '~/utils/types'

defineProps({
  classInfo: {
    type: Object as PropType<IClass>,
    required: true,
  },
})

const slides = ref([
  {
    image: '/images/class-banner-1.png',
    courseType: 'LỚP ADOBE ILLUSTRATOR',
    title: 'THIẾT KẾ \nBRANDING',
    subtitle: 'Breathing Coffee Brand Design',
  },
  {
    image: '/images/class-banner-2.png',
    courseType: 'DIGITAL PAINTING',
    title: 'MINH HỌA \nTRUYỆN TRANH',
    subtitle: 'The Snow Queen',
  },
  {
    image: '/images/class-banner-3.png',
    courseType: 'LỚP ADOBE PHOTOSHOP',
    title: 'THIẾT KẾ \nSOCIAL MEDIA',
    subtitle: 'Agribank E-Mobile Banking',
  },
])
</script>
<template>
  <div class="pb-8 flex justify-center flex-col text-center px-4">
    <div class="text-lg md:text-xl uppercase font-bold tracking-wider mb-1">
      Bài tập của học viên tại
    </div>
    <div
      class="text-xl md:text-4xl font-extrabold tracking-widest text-primary mb-8"
    >
      REF ACADEMY
    </div>

    <Carousel
      v-bind="{
        gap: 10,
        breakpoints: {
          300: {
            itemsToShow: 1,
            snapAlign: 'center',
          },
          600: {
            itemsToShow: 3,
            snapAlign: 'start',
          },
        },
      }"
    >
      <Slide
        v-for="(slide, index) in slides"
        :key="index"
        style="width: 300px; height: 300px"
      >
        <div class="relative h-full">
          <img :src="slide.image" :alt="slide.title" class="w-full h-full" />
          <div
            class="absolute bg-black/60 h-[100px] bottom-[0] w-full py-1 px-4"
          >
            <div class="text-white w-full text-left">
              <p class="text-sm font-medium mb-1">
                {{ slide.courseType }}
              </p>
              <h2 class="text-xl font-bold whitespace-pre">
                {{ slide.title }}
              </h2>
            </div>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>

    <div class="text-sm uppercase font-bold tracking-widest mt-8">
      Thông tin về lớp học REF ACADEMY
    </div>
    <Button
      type="primary"
      class="mt-3 w-[320px] md:w-[350px] mx-auto"
      to="/basic-casual-game-class"
      >Chi tiết</Button
    >
  </div>
</template>

<style lang="scss">
.carousel__pagination {
  bottom: -20px;
}
</style>
