<template>
    <HeaderPage />
    <div class="bg-gray-100 min-h-screen p-4 md:p-8">
    <div class="pt-16 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div v-if="postSingle">
        <h1 class="text-2xl font-bold mb-4">{{ postSingle.title }}</h1>
        <p class="mb-6">{{ postSingle.content }}</p>
        <div v-for="item in commentarySingle" :key="item.id" class="mb-4 p-4 border-b border-gray-200">
          <p>{{ item.content }}</p>
        </div>
      </div>
      <form @submit.prevent="addCommentary" class="mt-8 bg-white p-6 rounded-lg shadow-md">
        <label for="comment" class="block text-lg font-medium text-gray-700 mb-2">Votre commentaire</label>
        <textarea 
          id="comment" 
          v-model="request.content" 
          class="w-full h-32 p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          placeholder="Écrire votre commentaire ici..."></textarea>
        <button
          type="submit"
          class="w-full md:w-80 h-12 px-6 py-2.5 bg-violet-600 rounded-lg flex justify-center items-center transition duration-300 ease-in-out transform hover:bg-violet-700 hover:scale-105"
        >
          <span class="text-white text-base font-bold font-['Roboto']">Écrire commentaire</span>
        </button>
      </form>
    </div>
  </div>
</template>
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import HeaderPage from '../components/Header/HeaderPage.vue';
  import { useRoute } from 'vue-router';
  import ApiService from "@/services/ApiService";
  
  const route = useRoute();
  const postSingle = ref<{ id: string; title: string; content: string } | null>(null);
  const authToken = ref<string | null>(localStorage.getItem("authToken"));
const commentarySingle = ref<{ id: string; content: string } | null>(null);

  onMounted(async () => {
    try {
      if (!authToken.value) {
        console.error("L'utilisateur n'est pas authentifié.");
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${authToken.value}`,
          "Content-Type": "application/json",
        },
      };
  
      const postId = route.params.idpost;
      if (postId) {
        const response = await ApiService.get(`/post/get-post/${postId}`, config);
        postSingle.value = response.data;
        const responseCommentary = await ApiService.get(`/commentary/get-commentary/${postId}`, config);
        commentarySingle.value = responseCommentary.data;
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  });
  
  const request = ref({
    content: '',
  });
  
  const addCommentary = async () => {
    try {
      if (!authToken.value) {
        console.error("L'utilisateur n'est pas authentifié.");
        return;
      }
  
      const postId = route.params.idpost;
      const response = await ApiService.post(
        `/commentary/create-commentary/${postId}`,
        request.value,
        {
          headers: {
            Authorization: `Bearer ${authToken.value}`,
          },
        }
      );
      location.reload(); 
    } catch (error: any) {
      console.error(error);
    }
  };
  </script>
  
  <style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  .ButtonPrimary {
    @apply w-full md:w-80 h-12 px-6 m-2 py-2.5 bg-violet-600 rounded-lg flex justify-center items-center;
  }
  
  .ButtonSecondary {
    @apply text-center text-white text-base font-bold font-['Roboto'];
  }
  </style>
  