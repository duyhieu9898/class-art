<template>
  <div class="min-h-screen pt-14 px-4 sm:px-6 lg:px-8">
    <div class="max-w-12xl mx-auto mt-6">
      <div class="flex justify-center">
        <img
          src="/images/logo.png"
          alt="logo"
          style="height: 3.75rem; width: auto"
        />
      </div>
      <h1
        class="leading-10 md:leading-12 uppercase italic mt-6 md:mt-2 text-3xl md:text-4xl font-extrabold text-center mb-3 bg-gradient-to-r from-pink-500 to-rose-700 text-transparent bg-clip-text"
      >
        REF Academy khai giảng hàng tháng
      </h1>
      <div
        class="font-bold text-[14px] flex justify-between mb-2 flex-col md:flex-row gap-2 text-center"
      >
        <div class="uppercase">refacademy - Học đồ hoạ</div>
        <div class="uppercase">liên hệ đăng ký: 0967749311 - Lê xuân thịnh</div>
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-2 f-svn-merge"
      >
        <div
          v-for="(course, index) in courses"
          :key="index"
          class="bg-gradient shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300 font-medium"
        >
          <!-- Course Image -->
          <div class="overflow-hidden" style="aspect-ratio: 3 / 3">
            <img
              :src="course.image"
              :alt="course.imageAlt"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <!-- Course Content -->
          <div class="pt-4 pb-2 px-2 relative z-1">
            <div
              class="absolute top-[-50px] left-0 right-0 p-4 z-10 flex justify-center"
            >
              <div
                v-for="(software, idx) in course.softwares"
                :key="idx"
                class="top-4 right-4 text-white px-1 py-1 rounded"
              >
                <img
                  :src="`/images/${software}.png`"
                  alt="software"
                  class="w-10 h-10"
                />
              </div>
            </div>
            <h2
              class="text-2xl font-bold text-white min-h-[47px] md:min-h-[50px] mb-2 leading-6 text-center flex items-center md:items-start"
            >
              {{ course.title }}
            </h2>
            <!-- Topics -->
            <ul class="space-y-0 min-h-[115px]">
              <li
                v-for="(topic, idx) in course.topics"
                :key="idx"
                class="flex items-start text-sm text-white"
              >
                <span class="w-1 h-1 bg-white rounded-full mr-2 mt-2"></span>
                {{ topic }}
              </li>
            </ul>

            <!-- Course Details -->
            <div
              class="border-t-2 border-dotted pt-2 mt-2 space-y-1 text-sm text-white"
            >
              <div class="flex items-center gap-2">
                <Clock class="w-4 h-4" />
                <span>{{ course.duration }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Calendar class="w-4 h-4" />
                <span>{{ course.period }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Timer class="w-4 h-4" />
                <span>{{ course.schedule }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Clock class="w-4 h-4" />
                <span>{{ course.classLength }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col justify-around mt-4 font-bold text-[14px] italic md:flex-row gap-2"
      >
        <div>refacademy.art</div>
        <div>
          <a href="https://www.facebook.com/refstudiodn" target="_blank"
            >https://www.facebook.com/refstudiodn</a
          >
        </div>
        <div>
          <a href="mailto:refstudiodn@gmail.com" target="_blank"
            >refstudiodn@gmail.com</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Clock, Calendar, Timer } from 'lucide-vue-next'

const courses = ref([
  {
    title: 'Photoshop',
    softwares: ['PS'],
    image: '/images/slide-1.png',
    imageAlt: 'Portrait photo editing example with dramatic lighting',
    topics: [
      'Nguyên lý thiết kế đồ họa',
      'Nguyên lý màu sắc',
      'Mask và Layer mask',
      'Retouch photo',
      'Xử lý ánh sáng nâng cao',
    ],
    duration: '12 buổi',
    period: 'Kéo dài 1.5 tháng',
    schedule: '2 buổi/tuần',
    classLength: '2h00/buổi',
  },
  {
    title: 'Illustrator',
    softwares: ['AI'],
    image: '/images/slide-2.png',
    imageAlt: 'Collection of business cards and graphic design materials',
    topics: [
      'Tối ưu giao diện và công cụ',
      'Kỹ thuật vector nâng cao',
      'Mastering pen tool',
      'Quản lý màu và hiệu ứng',
      'Thiết kế và xuất file cao cấp',
    ],
    duration: '12 buổi',
    period: 'Kéo dài 1.5 tháng',
    schedule: '2 buổi/tuần',
    classLength: '2h00/buổi',
  },
  {
    title: 'Minh Họa Ứng Dụng',
    softwares: ['PS'],
    image: '/images/slide-3.png',
    imageAlt: 'Vibrant dragon illustration in orange and red tones',
    topics: [
      'Nguyên tắc minh họa',
      'Tạo nhân vật và biểu tượng',
      'Minh họa trong giao diện',
    ],
    duration: '12 buổi',
    period: 'Kéo dài 1.5 tháng',
    schedule: '2 buổi/tuần',
    classLength: '2h00/buổi',
  },
  {
    title: 'Minh Họa Truyện',
    softwares: ['PS'],
    image: '/images/slide-4.png',
    imageAlt: 'Night scene illustration with clouds',
    topics: ['Bố cục truyện tranh', 'Thiết kế nhân vật', 'Render'],
    duration: '15 buổi',
    period: 'Kéo dài 2 tháng',
    schedule: '2 buổi/tuần',
    classLength: '2h00/buổi',
  },
  {
    title: 'Nghề Thiết Kế',
    softwares: ['PS'],
    image: '/images/slide-5.png',
    imageAlt: 'Mobile banking app interface design',
    topics: [
      'Tổng quan nghề thiết kế',
      'Sáng tạo và tư duy thiết kế',
      'Portfolio',
    ],
    duration: '24 buổi',
    period: 'Kéo dài 3 tháng',
    schedule: '2 buổi/tuần',
    classLength: '2h00/buổi',
  },
  {
    title: 'Game Casual',
    softwares: ['PS'],
    image: '/images/slide-6.png',
    imageAlt: 'Colorful isometric game design with island theme',
    topics: [
      'Thiết kế lối chơi đơn giản',
      'Tạo hình ảnh và giao diện',
      'UX/UI',
    ],
    duration: '15 buổi',
    period: 'Kéo dài 2 tháng',
    schedule: '2 buổi/tuần',
    classLength: '2h00/buổi',
  },
  {
    title: 'Branding Identity',
    softwares: ['PS', 'AI'],
    image: '/images/slide-7.png',
    imageAlt: 'Branding materials including cups and identity designs',
    topics: [
      'Thiết kế lối chơi đơn giản',
      'Tạo hình ảnh và giao diện',
      'UX/UI',
    ],
    duration: '15 buổi',
    period: 'Kéo dài 2 tháng',
    schedule: '2 buổi/tuần',
    classLength: '2h00/buổi',
  },
])
</script>

<style scoped>
.bg-gradient {
  background-image: linear-gradient(
    180deg,
    rgb(219, 46, 103),
    rgb(197, 27, 60)
  );
}
</style>
