<script setup>
import { reactive } from 'vue'
import SectionMain from '~/components/Admin/SectionMain'
import CardBox from '~/components/Admin/CardBox'
import FormField from '~/components/Admin/FormField'
import FormControl from '~/components/Admin/FormControl'
import SectionTitle from '~/components/Admin/SectionTitle'

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
    <SectionTitle>Config Data</SectionTitle>
    <SectionMain>
      <CardBox form @submit.prevent="submit">
        <FormField label="With help line" help="Do not enter the leading zero">
          <FormControl v-model="form.name" />
        </FormField>

        <FormField label="Question" help="Your question. Max 255 characters">
          <FormControl
            type="textarea"
            placeholder="Explain how we can help you"
          />
        </FormField>
        <div class="flex">
          <Button type="primary">Save</Button>
          <Button type="secondary" class="mx-3">Reset</Button>
        </div>
      </CardBox>
    </SectionMain>
  </div>
</template>
