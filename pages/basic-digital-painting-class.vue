<script lang="ts" setup>
const dataBanner = {
  page: 'Digital Painting Cơ bản',
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
    <div class="bg-neutral-800/95 text-light-100 mt-6">
      <PageWrapper class="max-w-5xl mx-auto">
        <p class="text-md md:text-lg leading-8 md:leading-12">
          LỚP DIGITAL PAINTING CƠ BẢN (ONLINE ) <br />
          Sẽ có 3 lớp Basic ( 1 lớp học vào các ngày thứ 3 hàng tuần ,1 lớp học
          vào các ngày thứ 4 hàng tuần và 1 lớp học vào các ngày thứ 5 hàng tuần
          )<br />
          Thời gian học: 8h tối - 10h00 tối . Học qua Google Meet <br />
          <b>Học phí :</b> 4.000.000 VND<br />
          Yêu cầu học viên: Chăm chỉ, có máy tính ( máy bàn hoặc laptop ko quan
          trọng ),có bảng vẽ điện tử.<br />
          Phần mềm để học sẽ không quan trọng. Bạn có thể dùng bất kì phần mềm
          gì.<br />
          Nếu bạn dùng Photoshop thì sẽ có lợi hơn vì mình hướng dẫn bằng
          Photoshop ( Nếu bạn sử dụng phần mềm khác Photoshop, bạn sẽ cần tự tìm
          hiểu phần mềm đó )<br />
          <b>Giáo trình :</b><br />
          Tổng 12 buổi ( Học trong 3 tháng. 1 tuần / 1 buổi )<br />
          - Tập làm quen với photoshop và các công cụ<br />
          - Hướng dẫn về quy trình làm việc trên máy<br />
          - Dựng hình, tỉ lệ người cơ bản, tỉ lệ mặt, pose, gesture, luật xa
          gần<br />
          - phối cảnh, đậm nhạt, màu sắc, vẽ tượng, tĩnh vật, phong cảnh, chân
          dung... <br />
          - Thực hành trên lớp, nhận xét bài và vẽ demo tất cả các buổi. <br />
          - Định hướng luyện tập và định hướng nghề ( Lưu ý: Định hướng nghề
          không phải là xin việc làm cho học viên mà là hướng dẫn học viên con
          đường đi trong nghề, xây dựng portfolio như thế nào, đi làm cty ra
          sao, làm freelance cần những gì ..v...v) <br />
          Lớp dành cho người chưa biết vẽ và các bạn mới tập vẽ vì vậy kiến thức
          sẽ rất cơ bản. <br />
          Chỉ cần bạn chăm chỉ là đủ Liên hệ: 0975 736 456 hoặc inbox để được tư
          vấn. Thanks<br />
        </p>
        <Button type="secondary" class="w-full mt-4 h-9"
          >Sản phẩm học viên</Button
        >
      </PageWrapper>
    </div>
  </div>
</template>
