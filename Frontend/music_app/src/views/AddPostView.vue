<template>
    <div class="bg-gray-100 min-h-screen">
      <HeaderPage />
      <p>Ecrire un post</p>
      <form @submit.prevent="addPost">
        <label>titre</label>
        <input type="text" v-model="request.title" />
        <label>sous titre</label>
        <input type="text" v-model="request.subtitle" />
        <label>paragraphe</label>
        <textarea v-model="request.content"></textarea>
        <button
          type="submit"
          class="mt-1 bg-white text-violet-600 p-2 rounded hover:text-white hover:bg-violet-300 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50"
        >
          Ajout du post
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import HeaderPage from '../components/Header/HeaderPage.vue';
  import { useRouter } from 'vue-router';
  import ApiService from "@/services/ApiService";
  import { useJwt } from '@vueuse/integrations/useJwt';
  
  const router = useRouter();
  var userId = ref<string | null>(null);
  const authToken = ref<string | null>(null);
  const errorMessage = ref<string>('');
  const show = ref<boolean>(false);
  
  onMounted(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        authToken.value = token;
        const { payload } = useJwt(token);
        console.log(payload.value)
        userId = payload.value.userId;
        console.log("test")
        console.log(userId)
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  });
  
  const request = ref({
    title: '',
    subtitle: '',
    content: '',
    userId: '',
  });
  
  const addPost = async () => {
    try {
      request.value.userId = userId;
  
      const response = await ApiService.post('/post/add-post', request.value, {
        headers: {
          Authorization: `Bearer ${authToken.value}`,
        },
      });
      
      const token = response.data.token;
      router.push({ path: "/forum" });
    } catch (error: any) {
      console.error(error);
      errorMessage.value = error.response?.data?.message || error.message;
      show.value = true;
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
  