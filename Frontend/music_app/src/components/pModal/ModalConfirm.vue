<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <VueFinalModal class="fixed inset-y-80 inset-x-0 flex justify-center items-start z-50"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-red-600 dark:bg-gray-900 border-4 border-black dark:border-gray-700 rounded-lg space-y-2 text-white"
    @update:model-value="val => emit('update:modelValue', val)">
    <h1 class="text-xl">
      {{ title }}
    </h1> 
    <slot />
    <button class="mt-1 ml-auto px-2 border border-white rounded-lg text-white bg-red-600 hover:bg-red-700"
      @click="emit('confirm')">
      Confirm
    </button>
  </VueFinalModal>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
