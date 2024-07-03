<template>
  <div class="bg-gray-100 min-h-screen">
    <HeaderPage />
    <p class>Bienvenue dans le forum</p>
    <p v-for="item in post">
      {{ item.title }}
  <button
                        class="ButtonPrimary w-full md:w-80 h-12 px-6 m-2 py-2.5 bg-violet-600 rounded-lg flex justify-center items-center"
                        @click="goTosingleForum(item.id)">
                        <span class="ButtonSecondary text-center text-white text-base font-bold font-['Roboto']">
                            Consulter le post
                        </span>
                    </button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import HeaderPage from '../components/Header/HeaderPage.vue';
import { useRouter } from 'vue-router';
import ApiService from "@/services/ApiService";
const router = useRouter();
const post = ref({});

onMounted(async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("L'utilisateur n'est pas authentifié.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    
    const response = await ApiService.get("/post/get-all-posts", config);
    post.value = response.data;
    console.log(post.value)
    console.log("test")
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});
const goTosingleForum = (postId: number) => {
  if (postId) {
    router.push(`forum/${postId}`);
  } else {
    console.error("L'ID du post manquant");
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