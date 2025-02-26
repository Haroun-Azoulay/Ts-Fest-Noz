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
            <label class="block text-m font-medium leading-tight text-light">Description</label>
            <input class="text-center w-full p-2 border rounded shadow-md text-dark" type="text" v-model="request.goodieDescription" placeholder="Entrez une description" required />
        </div>
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Type</label>
            <select class="form-select" v-model="request.goodieTypeId" aria-label="">
              <option selected value="none">Sélectionnez le type</option>
    <slot name="goodieTypes"/>
</select>
        </div>
        <div class="mb-4">
            <label class="block text-m font-medium leading-tight text-light">Nom du groupe</label>
            
<select class="form-select" v-model="request.group" aria-label="">
  <option selected value="none">Sélectionnez le groupe</option>
    <slot name="groupOptions"/>
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
            <input ref="fileInput" class="text-center w-full p-2 border rounded shadow-md text-dark" 
            type="file" accept="image/*" @change="goodieChangeImage" required />
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
import { ref, onMounted } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useRouter } from 'vue-router';

const router = useRouter();
const authToken = localStorage.getItem('authToken');

const request = ref({
  groupId: "199a484a-ff01-4acc-b689-4bec3ecad030",
  userId: "",
  goodieTypeId: "",
  name: "toto",
  description: "toto",
  quantity: 10,
  price: 10,
  available: true,
});

// Variable pour stocker le fichier sélectionné
const selectedFile = ref<File | null>(null);

defineProps<{
  title?: string
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
  (e: 'confirm'): void;
}>();

// Fonction pour gérer la sélection d'image
const goodieChangeImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]; // Stocker le fichier directement
    console.log("✅ Fichier sélectionné :", selectedFile.value.name);
  } else {
    console.error("❌ Aucun fichier sélectionné !");
  }
};

onMounted(async () => {
  try {
    if (authToken) {
      const { payload } = useJwt(authToken);
      if (payload.value?.userId) {
        request.value.userId = payload.value.userId;
      } else {
        console.error("❌ Impossible de récupérer l'ID utilisateur.");
      }
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du User ID :', error);
  }
});

const submitAddGoodie = async () => {
  try {
    if (!authToken) {
      console.error("❌ Utilisateur non authentifié.");
      return;
    }

    // Création de l'objet FormData
    const formData = new FormData();
    formData.append("groupId", request.value.groupId);
    formData.append("userId", request.value.userId);
    formData.append("goodieTypeId", request.value.goodieTypeId);
    formData.append("name", request.value.name);
    formData.append("description", request.value.description);
    formData.append("quantity", String(request.value.quantity));
    formData.append("price", String(request.value.price));
    formData.append("available", request.value.available.toString());

    // Vérification et ajout de l'image
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      formData.append("image", fileInput.files[0]); // ⚠️ Doit être "file" pour Multer
    } else {
      console.error("❌ Aucune image sélectionnée !");
      return;
    }

    // Envoi des données à l'API
    const response = await ApiService.post("/create-goodie", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 201) {
      console.log("✅ Goodie ajouté avec succès !");
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

