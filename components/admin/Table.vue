<script lang="ts" setup>
import { reactive } from 'vue'
import { IClass } from '~/utils/types'
import { useAppStore } from '~/stores/app'
import { formatterNumber } from '~/utils/helper'

const appStore = useAppStore()
appStore.fetchClassList()

const formInput = reactive<IClass>({
  className: 'class1',
  studentTotal: 20,
  studentRegister: 10,
  date: '2023-09-14',
  description: '123',
  price: 4000000,
})
</script>
<template>
  <form id="form-class" @submit.prevent="appStore.createClass(formInput)">
    <AdminCardBox>
      <AdminSectionTitle class="mb-2">Class</AdminSectionTitle>
      <div class="flex gap-2 flex-col">
        <AdminFormField label="Class name">
          <AdminFormControl v-model="formInput.className" />
        </AdminFormField>
        <div class="flex gap-2">
          <AdminFormField label="Student Total" class="flex-1">
            <AdminFormControl v-model="formInput.studentTotal" type="number" />
          </AdminFormField>
          <AdminFormField label="Student Register" class="flex-1">
            <AdminFormControl
              v-model="formInput.studentRegister"
              type="number"
            />
          </AdminFormField>
        </div>
        <div class="flex gap-2">
          <AdminFormField label="Price (VND)" class="flex-1">
            <AdminFormControl v-model="formInput.price" type="number" />
          </AdminFormField>
          <AdminFormField label="Date" class="flex-1">
            <AdminFormControl v-model="formInput.date" type="date" />
          </AdminFormField>
        </div>
        <AdminFormField label="Description">
          <AdminFormControl v-model="formInput.description" type="textarea" />
        </AdminFormField>
        <div class="flex items-center">
          <Button id="form-class" type="submit" :loading="appStore.loading"
            >Create</Button
          >
          <Button type="secondary" class="mx-3">Reset</Button>
        </div>
      </div>
      <div class="py-8">
        <div>
          <h2 class="text-2xl font-semibold leading-tight">Class List</h2>
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
                    Class Name
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Num student Max
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Num student register
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Description
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
                  v-if="appStore.classList && appStore.classList.length !== 0"
                >
                  <tr
                    v-for="(classItem, index) in appStore.classList"
                    :key="index"
                  >
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ classItem.className }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ classItem.studentTotal }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ classItem.studentRegister }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ formatterNumber.format(classItem.price) }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ classItem.date }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ classItem.description }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                    >
                      <div class="flex">
                        <Button
                          type="primary"
                          :loading="appStore.loading"
                          @click="appStore.deleteClass(classItem, index)"
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
