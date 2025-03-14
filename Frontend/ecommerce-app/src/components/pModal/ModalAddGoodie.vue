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
        <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="text" v-model="request.name"
          placeholder="Entrez le nom" required />
      </div>
      <div class="mb-4">
        <label class="block text-m font-medium leading-tight text-light">Description</label>
        <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="text"
          v-model="request.description" placeholder="Entrez une description" required />
      </div>
      <div class="mb-4">
        <label class="block text-m font-medium leading-tight text-light">Type</label>
        <select v-model="request.goodieTypeId" class="form-select">
          <option value="none" disabled selected>Sélectionnez le type</option>
          <option v-for="goodie in goodies" :key="goodie.id" :value="goodie.id">
            {{ goodie.name }}
          </option>
        </select>

      </div>
      <div class="mb-4">
        <label class="block text-m font-medium leading-tight text-light">Prix / Unité</label>
        <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="number" v-model="request.price"
          placeholder="Entrez le prix" required />
      </div>
      <div class="mb-4">
        <label class="block text-m font-medium leading-tight text-light">Quantité</label>
        <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="text" v-model="request.quantity"
          placeholder="Entrez la quantité" required />
      </div>
      <div class="mb-4">
        <label class="block text-m font-medium leading-tight text-light">Disponible</label>
        <select class="form-select" v-model="request.available" aria-label="">
          <option selected value="none">Exposer le produit ?</option>
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-m font-medium leading-tight text-light">Image</label>
        <input ref="fileInput" class="text-center w-full p-2 border rounded shadow-md text-dark" type="file"
          accept="image/*" @change="goodieChangeImage" required />
      </div>
      <button type="submit"
        class="mt-1 ml-auto px-2 border border-white rounded-lg text-white hover:text-violet-600 bg-violet-600 hover:bg-white">
        Ajouter
      </button>
    </form>
  </VueFinalModal>
</template>

<script setup lang="ts">
import ApiService from '@/services/ApiService';
import { useJwt } from '@vueuse/integrations/useJwt.mjs';
import { ref, onMounted } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useRouter } from 'vue-router';

const router = useRouter();
const authToken = localStorage.getItem('authToken');
const goodies = ref([]);
const requestGoodies = ref({ goodieTypeId: 'none' });

const request = ref({
  groupId: "",
  userId: "",
  goodieTypeId: "",
  name: "",
  description: "",
  quantity: 0,
  price: 0,
  available: true,
});


const selectedFile = ref<File | null>(null);

defineProps<{
  title?: string
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
  (e: 'confirm'): void;
}>();

const goodieChangeImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
    console.log("Fichier sélectionné :", selectedFile.value.name);
  } else {
    console.error("Aucun fichier sélectionné !");
  }
};

const fetchGoodies = async () => {
  try {
    const response = await ApiService.get('/get-all-types', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    goodies.value = response.data;
  } catch (error) {
    console.error('Error fetching goodies:', error);
  }
};

onMounted(async () => {
  try {
    if (authToken) {
      const { payload } = useJwt(authToken);
      if (payload.value?.userId) {
        request.value.userId = payload.value.userId;
        fetchGoodies()
      } else {
        console.error("Impossible de récupérer l'ID utilisateur.");
      }
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du User ID :', error);
  }
});

const submitAddGoodie = async () => {
  try {
    if (!authToken) {
      console.error("Utilisateur non authentifié.");
      return;
    }


    const formData = new FormData();
    const getMyGroupDetails = await ApiService.get('/get-my-group', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });





    request.value.groupId = getMyGroupDetails.data.group.id;
    formData.append("groupId", request.value.groupId);
    formData.append("userId", request.value.userId);
    formData.append("goodieTypeId", request.value.goodieTypeId);
    formData.append("name", request.value.name);
    formData.append("description", request.value.description);
    formData.append("quantity", String(request.value.quantity));
    formData.append("price", String(request.value.price));
    formData.append("available", request.value.available.toString());

    console.log(request.value);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      formData.append("image", fileInput.files[0]);
    } else {
      console.error("❌ Aucune image sélectionnée !");
      return;
    }

    const response = await ApiService.post("/create-goodie", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 201) {
      console.log("✅ Goodie ajouté avec succès !");
      window.location.reload()
    } else {
      console.error("❌ Erreur :", response);
    }
  } catch (error) {
    console.error("❌ Une erreur s'est produite :", error);
  }
};

</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
