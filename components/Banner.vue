<script lang="ts" setup>
interface Data {
  logo?: string
  page: string
  desc: string
  desc2?: string
}
defineProps({
  data: {
    type: Object as () => Data,
    required: true,
  },
})
</script>
<template>
  <div
    id="navbar-banner"
    class="banner flex flex-col justify-center text-center text-white"
  >
    <div v-if="data.logo" class="text-4xl md:text-6xl leading-relaxed f-oswald">
      {{ data.logo }}
    </div>
    <h1
      v-if="data.page"
      class="text-4xl md:text-6xl mt-2 md:mt-8 leading-relaxed f-oswald"
    >
      {{ data.page }}
    </h1>
    <div
      class="text-lg md:text-2xl mt-2 md:mt-6 leading-relaxed font-medium c-app-cyan"
    >
      <pre v-if="data.desc" class="f-oswald leading-10 whitespace-pre-wrap">{{
        data.desc
      }}</pre>
    </div>

    <div
      v-if="data.desc2"
      class="f-oswald text-lg md:text-2xl leading-relaxed font-medium mt-2 md:mt-4 c-app-violet"
    >
      {{ data.desc2 }}
    </div>
  </div>
</template>

<style lang="scss">
.banner {
  padding: 95px 20px;
  background-color: rgba(55, 71, 79, 1);
  background-image: url('/images/z-katarina.jpg');
  background-size: cover;
  background-position: center center;
  box-shadow: inset 0 0 0 2000px rgb(0 0 0 / 30%);
}
</style>
