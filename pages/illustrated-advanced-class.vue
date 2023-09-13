<script lang="ts" setup>
const dataBanner = {
  page: 'Minh họa kỹ thuật số - Lớp nâng cao',
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
    </PageWrapper>
    <div class="bg-app text-light-100 mt-6">
      <PageWrapper class="max-w-5xl mx-auto">
        <p class="text-md md:text-lg leading-8 md:leading-12">
          Sẽ chỉ có 1 lớp nâng cao duy nhất học vào các ngày thứ 2 trong tuần
          <br />
          Thời gian học: 8h tối - 10h00 tối các ngày thứ 2 trong tuần ( 1 tuần/
          1 buổi.) - Học qua Google Meet<br />
          Yêu cầu học viên: Đã biết vẽ máy ( Cần xem vài tranh trước khi đăng ký
          )<br />
          Học Phí: 4.500.000 VND<br />
          Nội dung khóa học:<br />
          Tổng 12 buổi học kéo dài 3 tháng. (1 tuần 1 buổi )<br />
          Minh họa kỹ thuật số là gì?<br />
          Chia sẻ kinh nghiệm về ứng dụng của minh họa kỹ thuật số, công việc
          freelance và quy trình làm việc với đối tác.<br />
          Các công cụ Photoshop và phần mềm hỗ trợ<br />
          Artstyle ( Phong cách và phương pháp xây dựng )<br />
          Storytelling<br />
          Thumbnail sketch<br />
          Bố cục<br />
          Nguyên lý thị giác, Màu sắc<br />
          Quy trình làm việc và hoàn thiện tác phẩm với Photoshop<br />
          Value Sketch - Color sketch - Render Detail - Final<br />
          Định hướng phương pháp luyện tập<br />
          Khóa học sẽ tập trung chủ yếu vào các kiến thức cơ bản cần thiết cho
          minh họa<br />
          Chia sẻ những kinh nghiệm mình có được trong nghành minh họa<br />
          Các bài tập sẽ được lấy từ chính order của các công ty,cá nhân đã từng
          thuê mình làm việc để giúp các bạn nắm rõ hơn về cách khách hàng yêu
          cầu, mình sẽ hướng dẫn và giúp các bạn hoàn thiện từng bước một để ra
          được sản phẩm một cách tốt nhất.<br />
          Liên hệ: 0975 736 456 hoặc inbox để được tư vấn. Thanks<br />
        </p>
        <Button type="secondary" class="w-full mt-4 h-9"
          >Sản phẩm học viên</Button
        >
      </PageWrapper>
    </div>
  </div>
</template>
