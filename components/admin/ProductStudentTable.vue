<script lang="ts" setup>
import { reactive } from 'vue'
import { useImageStore } from '~/stores/image'
import { IImage } from '~/utils/types'

const imageStore = useImageStore()
imageStore.fetchImageList()
const formInput = reactive<IImage>({
  url: '',
})
</script>
<template>
  <form id="form-class" @submit.prevent="imageStore.addProductImage(formInput)">
    <AdminCardBox>
      <AdminSectionTitle class="mb-2">Product Image</AdminSectionTitle>
      <div class="flex gap-2 flex-col">
        <AdminFormField label="Url image ID">
          <AdminFormControl v-model="formInput.url" />
        </AdminFormField>
        <p class="-mt-6 mb-3 text-neutral-500 text-sm break-all">
          https://drive.google.com/file/d/<span class="text-red-500 font-medium"
            >1H3mDhe86Bw6dS2PIzLXBi3HxSpY60doU</span
          >/view?usp=sharing
        </p>

        <div class="flex items-center">
          <Button id="form-class" type="submit" :loading="imageStore.loading"
            >Add image</Button
          >
          <Button type="secondary" class="mx-3">Reset</Button>
        </div>
      </div>
      <div class="py-8">
        <div>
          <h2 class="text-2xl font-semibold leading-tight">Image List</h2>
        </div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
          >
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Image ID
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Image Preview
                  </th>

                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <template
                  v-if="
                    imageStore.imageList && imageStore.imageList.length !== 0
                  "
                >
                  <tr
                    v-for="(imageItem, index) in imageStore.imageList"
                    :key="index"
                  >
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ imageItem.url }}
                      </p>
                    </td>

                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                    >
                      <img
                        :src="`https://drive.google.com/uc?export=view&id=${imageItem.url}`"
                        alt=""
                        loading="lazy"
                        class="w-[100px] h-[100px]"
                      />
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                    >
                      <div class="flex">
                        <Button
                          type="primary"
                          :loading="imageStore.loading"
                          @click="
                            imageStore.deleteProductImage(imageItem, index)
                          "
                          >Remove</Button
                        >
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="6" class="text-center py-4 px-4">
                      No data to display
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminCardBox>
  </form>
</template>
