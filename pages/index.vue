<script lang="ts" setup>
const dataBanner = {
  logo: 'REFSTUDIO',
  page: 'Digital Painting Class',
  desc: 'Hỗ trợ làm bài tập,giải đáp thắc mắc cho học viên 24/7 trong nhóm chat của lớp. \n Tư vấn nghề, job, hướng dẫn luyện tập cho học viên trọn đời.',
  desc2:
    'Địa chỉ đăng ký duy nhất tại refstudio.org và FB:facebook.com/refstudiodn',
}
</script>

<template>
  <div>
    <Banner :data="dataBanner" />
    <PageWrapper>
      <ChatBox />
      <hr class="mt-8" />
      <PageSectionRegisterClass></PageSectionRegisterClass>
    </PageWrapper>
    <PageSectionGuide></PageSectionGuide>
    <PageSectionClass></PageSectionClass>
    <PageSectionLessonYoutube></PageSectionLessonYoutube>
  </div>
</template>
