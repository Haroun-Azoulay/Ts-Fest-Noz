<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <HeaderPage />
    <div class="container mx-auto p-4 flex-grow">
      <h1
        class="font-inter text-2xl md:text-5xl font-extrabold leading-tight tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 text-center">
        Bienvenue sur le Forum !
      </h1>
      <div class="flex justify-center mb-6">
        <label v-if="isAuthorized">
        <button
          class="<ButtonPrimary w-full md:w-80 h-12 px-6 m-2 py-2.5 bg-gradient-to-r from-violet-500 to-purple-700 rounded-lg flex justify-center items-center shadow-lg transform hover:scale-105 transition-transform duration-300>"
          @click="goToAddPost">
          <span class="ButtonSecondary text-center text-white text-base font-bold font-['Roboto']">
            Écrire un post
          </span>
        </button>
        </label>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in post" :key="item.id" class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
          <p class="text-gray-700 mb-4">{{ item.description }}</p>
          <button
            class="ButtonPrimary text-white w-full md:w-80 h-12 px-6 m-2 py-2.5 bg-gradient-to-r from-violet-500 to-purple-700 rounded-lg flex justify-center items-center shadow-lg transform hover:scale-105 transition-transform duration-300"
            @click="goTosingleForum(item.id)">
            Consulter le post
          </button>
        </div>
      </div>
    </div>
    <FooterPage class="mt-auto" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import HeaderPage from '../components/Header/HeaderPage.vue';
import { useRouter } from 'vue-router';
import ApiService from "@/services/ApiService";
import { useJwt } from '@vueuse/integrations/useJwt';
import FooterPage from '../components/Footer/FooterPage.vue';
const router = useRouter();
const post = ref({});
const isAuthorized = ref<boolean>(false);
  let userId: string | null = null;
  let userRole: string | null = null;

  onMounted(async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("L'utilisateur n'est pas authentifié.");
      return;
    }

    const { payload } = useJwt(authToken);
    userId = payload.value.userId;
    userRole = payload.value.role; 

    if (["admin", "artist", "organizer"].includes(userRole)) {
      isAuthorized.value = true;
    } else {
      console.warn("Utilisateur non autorisé.");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await ApiService.get("/post/get-all-posts", config);
    post.value = response.data;
    console.log(post.value);
    console.log("test");
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});

const goTosingleForum = (postId: number) => {
  if (postId) {
    router.push(`/forum/${postId}`);
  } else {
    console.error("L'ID du post manquant");
  }
};

const goToAddPost = () => {
  router.push({ path: '/forum/add' });
}

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