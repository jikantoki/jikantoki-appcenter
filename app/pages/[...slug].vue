<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}
</script>

<template>
  <v-alert v-if="!page" type="error">Page not found</v-alert>
  <v-text-field label="Markdown Content" readonly />
  <ContentRenderer v-if="page" :value="page" />
</template>
