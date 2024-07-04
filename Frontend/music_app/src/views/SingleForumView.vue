<template>
    <div class="bg-gray-100 min-h-screen">
      <HeaderPage />
      <div v-if="postSingle">
        <h1 class="text-xl font-bold">{{ postSingle.title }}</h1>
        <p>{{ postSingle.content }}</p>
        <p v-for="item in commentarySingle">
          {{ item.content }}
        </p>
      </div>
      <form @submit.prevent="addCommentary">
        <textarea v-model="request.content"></textarea>
        <button
          type="submit"
          class="ButtonPrimary w-full md:w-80 h-12 px-6 m-2 py-2.5 bg-violet-600 rounded-lg flex justify-center items-center"
        >
          <span class="ButtonSecondary text-center text-white text-base font-bold font-['Roboto']">
            Ecrire commentaire
          </span>
        </button>
      </form>
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
  