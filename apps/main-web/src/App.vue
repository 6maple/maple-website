<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';

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
    <ElWatermark class="h-full" content="watermark" :gap="[600, 600]">
      <RouterView />
    </ElWatermark>
  </ElConfigProvider>
</template>

<style scoped></style>
