<script lang="ts" setup>
const dataBanner = {
  page: 'Sản phẩm học viên',
  desc: 'Hỗ trợ làm bài tập,giải đáp thắc mắc cho học viên 24/7 trong nhóm chat của lớp. \n Tư vấn nghề, job, hướng dẫn luyện tập cho học viên trọn đời.',
  desc2:
    'Địa chỉ đăng ký duy nhất tại class.vuogle.com và FB:facebook.com/vuogle.art',
}
const productList1 = [
  {
    href: 'dd',
    imageUrl: '/class1.jpg',
  },
  {
    href: 'dd',
    imageUrl: '/class1.jpg',
  },
  {
    href: 'dd',
    imageUrl: '/class1.jpg',
  },
  {
    href: 'dd',
    imageUrl: '/class1.jpg',
  },
  {
    href: 'dd',
    imageUrl: '/class1.jpg',
  },
]
const productList2 = [
  {
    href: 'dd',
    imageUrl: '/class1.jpg',
  },
]
</script>

<template>
  <div>
    <Banner :data="dataBanner" />
    <PageWrapper>
      <ChatBox />
    </PageWrapper>
    <div class="bg-neutral-800/95 text-light-100 mt-6">
      <PageWrapper class="max-w-5xl mx-auto">
        <p class="text-md md:text-lg leading-8 md:leading-12">
          Sản phẩm học viên lớp Minh họa kỹ thuật số - nâng cao
        </p>
      </PageWrapper>
    </div>

    <div class="max-w-6xl mx-auto mt-6">
      <div class="flex flex-wrap">
        <div
          v-for="(product, index) in productList1"
          :key="index"
          class="w-[25%] p-4"
        >
          <a :href="product.href">
            <div><nuxt-img :src="product.imageUrl"></nuxt-img></div>
          </a>
        </div>
      </div>
    </div>
    <div class="bg-neutral-800/95 text-light-100 mt-6">
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
          :key="index"
          class="w-[25%] p-4"
        >
          <a :href="product.href">
            <div><nuxt-img :src="product.imageUrl"></nuxt-img></div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
