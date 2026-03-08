<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';
import MainLayout from './layouts/MainLayout.vue';

const zIndex = 3000;
const size = 'default';

useHead({
  title: 'Website Title',
  meta: [
    {
      name: 'description',
      content: 'Website description',
    },
  ],
});
</script>

<template>
  <ElConfigProvider :size="size" :z-index="zIndex">
    <MainLayout> <RouterView /> </MainLayout>
  </ElConfigProvider>
</template>

<style scoped></style>
