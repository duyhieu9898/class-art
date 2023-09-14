<script lang="ts" setup>
import { useImageStore } from '~/stores/image'

const dataBanner = {
  page: 'Sản phẩm học viên',
  desc: 'Hỗ trợ làm bài tập,giải đáp thắc mắc cho học viên 24/7 trong nhóm chat của lớp. \n Tư vấn nghề, job, hướng dẫn luyện tập cho học viên trọn đời.',
  desc2:
    'Địa chỉ đăng ký duy nhất tại refstudio.org và FB:facebook.com/refstudiodn',
}
const imageStore = useImageStore()
await imageStore.fetchImageList()
</script>

<template>
  <div>
    <Banner :data="dataBanner" />
    <PageWrapper>
      <ChatBox />
    </PageWrapper>
    <div class="bg-app text-light-100 mt-6">
      <PageWrapper class="max-w-5xl mx-auto">
        <p class="text-md md:text-lg leading-6 md:leading-12">
          Sản phẩm học viên lớp CASUAL GAME BASIC A01 ONLINE
        </p>
      </PageWrapper>
    </div>

    <div class="max-w-6xl mx-auto mt-6">
      <div class="flex flex-wrap">
        <div
          v-for="(imageItem, index) in imageStore.imageList"
          :key="`sp1-${index}`"
          class="w-[100%] md:w-[25%] p-4"
        >
          <div>
            <img
              :src="`https://drive.google.com/uc?export=view&id=${imageItem.url}`"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="bg-app text-light-100 mt-6">
      <PageWrapper class="max-w-5xl mx-auto">
        <p class="text-md md:text-lg leading-8 md:leading-12">
          Sản phẩm học viên lớp Digital Painting - Cơ bản
        </p>
      </PageWrapper>
    </div>
    <div class="max-w-6xl mx-auto mt-6">
      <div class="flex flex-wrap">
        <div
          v-for="(product, index) in productList2"
          :key="`sp2-${index}`"
          class="w-[25%] p-4"
        >
          <a :href="product.href">
            <div><img :src="product.imageUrl" /></div>
          </a>
        </div>
      </div>
    </div> -->
  </div>
</template>
