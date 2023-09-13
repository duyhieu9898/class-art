<script setup>
definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div>
    <AdminSectionTitle>Config Data</AdminSectionTitle>
    <AdminSectionMain>
      <!-- <AdminFormField
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
        </AdminFormField> -->
      <AdminTable />
      <AdminProductStudentTable />
    </AdminSectionMain>
  </div>
</template>
