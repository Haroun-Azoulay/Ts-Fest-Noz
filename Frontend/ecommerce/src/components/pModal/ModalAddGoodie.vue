<template>
  <VueFinalModal class="fixed bottom-0 inset-x-0 flex justify-center items-start"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-violet-600 dark:bg-gray-900 border-4 border-white dark:border-gray-700 rounded-lg space-y-2 text-white"
    @update:model-value="val => emit('update:modelValue', val)">
    <h1 class="text-xl">
      {{ title }}
    </h1>
    <form @submit.prevent="submitAddGoodie" class="w-full">
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Nom</label>
            <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="text" v-model="request.goodieName" placeholder="Entrez le nom" required />
        </div>
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Type</label>
            <select class="form-select" v-model="request.goodieTypeId" aria-label="">
                <option selected value="none">Sélectionnez le type</option>
                <slot/>
            </select>
        </div>
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Prix / Unité</label>
            <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="number" v-model="request.goodiePrice" placeholder="Entrez le prix" required />
        </div>
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Quantité</label>
            <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="text" v-model="request.goodieQuantity" placeholder="Entrez la quantité" required />
        </div>
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Disponible</label>
            <select class="form-select" v-model="request.goodieAvailable" aria-label="">
                <option selected value="none">Exposer le produit ?</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
            </select>
        </div>
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Image</label>
            <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="file" @change="goodieChangeImage" placeholder="Envoyez une image" required />
        </div>
        <button type="submit" class="mt-1 ml-auto px-2 border border-white rounded-lg text-white hover:text-violet-600 bg-violet-600 hover:bg-white">
          Ajouter
        </button>
    </form>
  </VueFinalModal>
</template>

<script setup lang="ts">
  import ApiService from '@/services/ApiService';
  import { useJwt } from '@vueuse/integrations/useJwt';
  import { ref } from 'vue';
  import { VueFinalModal } from 'vue-final-modal';
  import { useRouter } from 'vue-router';
  import type { Goodie } from '../../../models/goodie';

  const router = useRouter();
  const request = ref<Goodie>({
    goodieName: '',
    goodieTypeId: '',
    goodiePrice: '',
    goodieQuantity: '',
    goodieAvailable: false,
    goodieImage: null 
  });

  defineProps<{
    title?: string
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: boolean): void
    (e: 'confirm'): void
  }>()

  const goodieChangeImage = (event: { target: { files: any[]; }; }) => {
    request.value.goodieImage = event.target.files[0];
  }

  const submitAddGoodie = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const { payload } = useJwt(authToken);
      const roleId = payload.value?.role;
      if (roleId !== "artist") {
          router.push({ path : '/' });
      }
      const formData = new FormData();
      formData.append('goodieName', request.value.goodieName);
      formData.append('goodieTypeId', request.value.goodieTypeId);
      formData.append('goodiePrice', request.value.goodiePrice);
      formData.append('goodieQuantity', request.value.goodieQuantity);
      formData.append('goodieAvailable', request.value.goodieAvailable.toString());
      formData.append('goodieImage', request.value.goodieImage);
      console.log(formData);
      const response = await ApiService.post('/goodie/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
      });
      window.location.reload();
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  }
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
