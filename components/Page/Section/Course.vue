<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { formatterNumber } from '~/utils/helper'
import { IClass } from '~/utils/types'

import 'swiper/css'

import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

defineProps({
  classInfo: {
    type: Object as PropType<IClass>,
    required: true,
  },
})
</script>
<template>
  <div class="py-8 flex justify-center flex-col text-center px-4">
    <div class="text-lg md:text-xl">Lớp {{ classInfo.className }}</div>
    <div class="text-2xl md:text-4xl text-blue-500 font-bold mt-3">
      {{ formatterNumber.format(classInfo.price) }}
    </div>

    <swiper
      :effect="'coverflow'"
      :grab-cursor="true"
      :centered-slides="true"
      :slides-per-view="'auto'"
      :initial-slide="1"
      :coverflow-effect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="true"
      :modules="[EffectCoverflow, Pagination]"
    >
      <swiper-slide>
        <img
          src="/images/class-banner-1.png"
          class="mt-4 rounded"
          loading="lazy"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          src="/images/class-banner-2.png"
          class="mt-4 rounded"
          loading="lazy"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          src="/images/class-banner-3.png"
          class="mt-4 rounded"
          loading="lazy"
        />
      </swiper-slide>
    </swiper>

    <div class="text-sm mt-3">
      Thông tin về khóa
      <span class="capitalize">{{ classInfo.className }}</span>
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
.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
