<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <HeaderPage />
    <section id="subheader" class="text-light" data-bgimage="url(/images-dj/background/subheader.jpg) bottom">
      <div class="center-y relative text-center">
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center">
              <h1>Annonces</h1>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </section>
    <div class="p-4" style="background:#371990;">
      <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div v-if="postSingle">
          <h1 class="text-2xl font-bold mb-4 text-black">{{ postSingle.title }}</h1>
          <p class="mb-6 text-black">{{ postSingle.subtitle }}</p>
          <p class="mb-6 text-gray-600">{{ postSingle.content }}</p>
          <div v-for="item in commentarySingle" :key="item.id" class="mb-4 p-4 border-b border-gray-200">
            <div v-for="user in users" :key="user.id">
              <div v-if="item?.userId == user?.id">
                <div class="flex items-start">
                  <img src="../../assets/images/user_logo.png" alt="Avatar" class="w-10 h-10 rounded-full mr-4">
                  <div>
                    <span class="text-black font-bold">{{ user.pseudo }}</span>
                    <span class="text-gray-500 text-sm ml-2">{{ new Date(item.createdAt).toLocaleString('fr-FR') }}</span>
                    <p class="text-black mt-2">{{ item.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form @submit.prevent="addCommentary" class="mt-8 bg-white p-6 rounded-lg shadow-md">
          <label for="comment" class="block text-lg font-medium text-gray-700 mb-2">Votre commentaire</label>
          <textarea 
            id="comment" 
            v-model="request.content" 
            class="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Écrire votre commentaire ici..."></textarea>
            <button
  type="submit"
  class="w-full md:w-80 h-12 px-6 py-2.5 bg-gradient-to-b from-[#cdff6b] to-[#2B86C5] rounded-lg flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-110"
>
  <span class="font-semibold text-white">Ajouter un commentaire</span>
  <svg class="w-6 h-6 ml-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l9 6 9-6M3 8V6a2 2 0 012-2h14a2 2 0 012 2v2M3 8l9 6 9-6M5 20h14a2 2 0 002-2v-8M3 20a2 2 0 002-2v-8" />
  </svg>
</button>

        </form>
      </div>
    </div>
    <FooterPage />
  </div>
</template>

  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useJwt } from '@vueuse/integrations/useJwt';
  import HeaderPage from '../../composables/Header/HeaderPage.vue';
  import FooterPage from '../../composables/Footer/FooterPage.vue';
  import { useRoute } from 'vue-router';
  import ApiService from "@/services/ApiService";
  
  const route = useRoute();
  const postSingle = ref<{ id: string; title: string; subtitle:string; content: string; userId: string;} | null>(null);
  const authToken = ref<string | null>(localStorage.getItem("authToken"));
  const commentarySingle = ref<{ id: string; content: string; userId: string; createdAt: string;} | null>(null);
  const users = ref<{ id: string; pseudo: string;} | null>(null);
  var userId = "";

  onMounted(async () => {
    try {
      if (!authToken.value) {
        console.error("The user is not authenticate.");
        return;
      }
      const { payload } = useJwt(authToken);
      userId = payload.value.userId;
      const config = {
        headers: {
          Authorization: `Bearer ${authToken.value}`,
          "Content-Type": "application/json",
        },
      };
  
      const postId = route.params.idpost;
      if (postId) {
        const response = await ApiService.get(`/get-post/${postId}`, config);
        postSingle.value = response.data;
        const responseCommentary = await ApiService.get(`/get-commentary/${postId}`, config);
        commentarySingle.value = responseCommentary.data;
        const getAllUsers = await ApiService.get(`/get-all-users`, config);
        users.value = getAllUsers.data;
      }
    } catch (error) {
      console.error("Error with the request :", error);
    }
  });
  
  const request = ref({
    content: '',
    userId: ''
  });
  
  const addCommentary = async () => {
    try {
      if (!authToken.value) {
        console.error("The user is not authenticate.");
        return;
      }
      
      const postId = route.params.idpost;
      request.value.userId = userId;
      const response = await ApiService.post(
        `/create-commentary/${postId}`,
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
  