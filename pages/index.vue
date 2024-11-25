<script lang="ts" setup>
import { useAppStore } from '~/stores/app'
const dataBanner = {
  logo: 'REFSTUDIO',
  page: 'Casual Game Basic',
  desc: 'Hỗ trợ làm bài tập,giải đáp thắc mắc cho học viên 24/7 trong nhóm chat của lớp. \n Tư vấn nghề, job, hướng dẫn luyện tập cho học viên trọn đời.',
  desc2:
    'Địa chỉ đăng ký duy nhất tại refstudio.org và FB:facebook.com/refstudiodn',
}

const appStore = useAppStore()
appStore.fetchClassList()
</script>

<template>
  <div>
    <Banner :data="dataBanner" />
    <PageWrapper>
      <PageSectionRegisterClass />
      <hr class="mt-8" />
    </PageWrapper>
    <!-- <PageSectionGuide /> -->
    <PageSectionClasses />
    <PageSectionLessonYoutube />
  </div>
</template>
