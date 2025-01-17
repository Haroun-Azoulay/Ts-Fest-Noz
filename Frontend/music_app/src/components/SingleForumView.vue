<template>
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
    <div class="min-h-screen p-4 md:p-8" style="background:#371990;">
    <div class="pt-16 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div v-if="postSingle">
        <h1 class="text-2xl font-bold mb-4 text-black">Titre : {{ postSingle.title }}</h1>
        <p class="mb-6 text-black">Sous-titre : {{ postSingle.subtitle }}</p>
        <p class="mb-6" style="color:gray;">{{ postSingle.content }}</p>
        <div v-for="item in commentarySingle" :key="item.id" class="mb-4 p-4 border-b border-gray-200">
          <div v-for="user in users" :key="user.id">
            <div v-if="item?.userId == user?.id">
              <div class="row">
                <div class="col-sm-2 user-avatar-forum-comment">
                  <img src="../assets/images/user_logo.png" alt="Avatar" style="width:30px;border-radius:50%;">
                </div>
                <div class="col-sm-10 forum-comment">
                  <span class="text-black font-bold">{{ user.pseudo }}</span>
                  <span style="color:gray;">{{ item?.createdAt }}</span>
                  <p class="text-black">{{ item.content }}</p>
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
          class="w-full h-32 p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          placeholder="Écrire votre commentaire ici..."></textarea>
        <button
          type="submit"
          class="w-full md:w-80 h-12 px-6 py-2.5 bg-violet-600 rounded-lg flex justify-center items-center transition duration-300 ease-in-out transform hover:bg-violet-700 hover:scale-105"
        >
          <span class="font-semibold">AJOUTER UN COMMENTAIRE</span>
        </button>
      </form>
    </div>
  </div>
  <FooterPage/>
</template>
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useJwt } from '@vueuse/integrations/useJwt';
  import HeaderPage from '../pages/Header/HeaderPage.vue';
  import FooterPage from '../pages/Footer/FooterPage.vue';
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
        console.error("L'utilisateur n'est pas authentifié.");
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
        const response = await ApiService.get(`/post/get-post/${postId}`, config);
        postSingle.value = response.data;
        const responseCommentary = await ApiService.get(`/commentary/get-commentary/${postId}`, config);
        commentarySingle.value = responseCommentary.data;
        const getAllUsers = await ApiService.get(`/users/get-all-users`, config);
        users.value = getAllUsers.data;
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  });
  
  const request = ref({
    content: '',
    userId: ''
  });
  
  const addCommentary = async () => {
    try {
      if (!authToken.value) {
        console.error("L'utilisateur n'est pas authentifié.");
        return;
      }
      
      const postId = route.params.idpost;
      request.value.userId = userId;
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
  