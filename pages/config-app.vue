<script setup>
import { reactive } from 'vue'

definePageMeta({
  layout: 'admin',
})

const form = reactive({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '',
  subject: '',
  question: '',
})

const submit = () => {
  //
}
</script>

<template>
  <div>
    <AdminSectionTitle>Config Data</AdminSectionTitle>
    <AdminSectionMain>
      <AdminCardBox form @submit.prevent="submit">
        <AdminFormField
          label="With help line"
          help="Do not enter the leading zero"
        >
          <AdminFormControl v-model="form.name" />
        </AdminFormField>

        <AdminFormField
          label="Question"
          help="Your question. Max 255 characters"
        >
          <AdminFormControl
            type="textarea"
            placeholder="Explain how we can help you"
          />
        </AdminFormField>
        <div class="flex">
          <Button type="primary">Save</Button>
          <Button type="secondary" class="mx-3">Reset</Button>
        </div>
      </AdminCardBox>
    </AdminSectionMain>
  </div>
</template>
