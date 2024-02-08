<template>
    <container class="text-center">
    <h1>Bienvenue sur le forum</h1>
    <p>Derniers articles</p>
    <div class="p-6" v-for="article in articles" :key="article.id">
      {{ article.title }}
      {{ article.content }}
      <button
        @click="goToLookArticle(article.id)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Repondre
      </button>
    </div>
  </container>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
// @ts-ignore
import ApiService from "@/services/ApiService";
import { useRouter } from "vue-router";

const router = useRouter();

interface Article {
    id: number;
    title: string;
    content: string;
}

const articles = ref<Article[]>([]);

onMounted(async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    console.log("Token d'authentification :", authToken);
    if (!authToken) {
      console.error("L'utilisateur n'est pas authentifié.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        Origin: "http://localhost:5173",
      },
    };

    const response = await ApiService.get("/posts/get-all-posts", config);
    articles.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});


const goToLookArticle = (articleId: number) => {
  console.log(articleId); // Vérifiez la valeur de articleId
  router.push(`article/${articleId}`);
};

</script>