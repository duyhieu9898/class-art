<template>
  <div class="bg-app text-white px-4 py-10">
    <div class="max-w-5xl mx-auto px-4 text-center">
      <div class="text-lg md:text-xl">
        Một số video trích đoạn bài giảng. ( Ghi chú các bài giảng này đều được
        giảng trực tiếp. Giảng viên demo, sửa bài, nhận xét bài và trả lời học
        viên ngay trong từng buổi học. Đây không phải là khóa học bán các video
        quay lại. )
      </div>
      <!-- <div class="mt-4">
        <PageSectionYoutubeFrame></PageSectionYoutubeFrame>
      </div> -->
    </div>
    <div class="max-w-7xl px-4 flex justify-center mx-auto mt-14">
      <div class="flex flex-wrap w-full">
        <div class="w-[100%] md:w-[50%] py-4 md:px-4">
          <PageSectionYoutubeFrame
            iframe-src="https://www.youtube.com/embed/oJjGWTjLjt0?si=LKMfzt9iCu73ikwa"
            title="Angry Birds | Fan Art"
          ></PageSectionYoutubeFrame>
        </div>
        <div class="w-[100%] md:w-[50%] py-4 md:px-4">
          <PageSectionYoutubeFrame
            iframe-src="https://www.youtube.com/embed/qtWpQv1LqmQ?si=wapLk2O9Ue2NJte5"
            title="Xứ Sở Các Nguyên Tố - Elemental (2023) | Fanart"
          ></PageSectionYoutubeFrame>
        </div>
      </div>
    </div>
  </div>
</template>
