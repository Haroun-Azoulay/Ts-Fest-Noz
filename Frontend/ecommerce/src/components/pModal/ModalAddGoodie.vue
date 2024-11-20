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
  <VueFinalModal class="fixed bottom-0 inset-x-0 flex justify-center items-start"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-violet-600 dark:bg-gray-900 border-4 border-white dark:border-gray-700 rounded-lg space-y-2 text-white"
    @update:model-value="val => emit('update:modelValue', val)">
    <h1 class="text-xl">
      {{ title }}
    </h1>
    <form @submit.prevent="" class="w-full">
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Nom</label>
            <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="text" placeholder="Entrez le nom" required>
        </div>
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Type</label>
            <select class="form-select" aria-label="">
                <option selected value="none">Sélectionnez le type</option>
                <slot/>
            </select>
        </div>
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Prix / Unité</label>
            <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="text" placeholder="Entrez le prix" required>
        </div>
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Quantité</label>
            <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="text" placeholder="Entrez la quantité" required>
        </div>
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Disponible</label>
            <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="text" placeholder="Exposer le produit ?" required>
        </div>
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Image</label>
            <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="text" placeholder="Entrez le nom" required>
        </div>
    </form>
    <button class="mt-1 ml-auto px-2 border border-white rounded-lg text-white hover:text-violet-600 bg-violet-600 hover:bg-white"
      @click="emit('confirm')">
      Ajouter
    </button>
  </VueFinalModal>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
