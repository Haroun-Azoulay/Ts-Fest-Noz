<template>
  <div class="bg-gray-100 min-h-screen">
  <Navbar />
  <div class="flex"> 
    <section class="p-6 text-center grid grid-cols-1 w-1/4 bg-blue-400 min-h-screen">
      <h2 class="text-white bold font-bold">Commentaires Récents</h2>
    <div class="bg-gray-300 mb-1 mt-1" v-for="commentary in commentaries.slice(-10)" :key="commentary.id" style="height:8rem">
      <span>Message de: {{ commentary.user.pseudo }}</span>
    <br>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ truncateText(commentary.content, 40) }}</p>
    <a href="#"
    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Voir annonce
    </a>
    </div>
  </section>
  <section class="text-center grid grid-cols-2 w-3/4 min-h-screen">
    <div class="p-6" v-for="article in articles" :key="article.id">
<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ truncateText(article.title, 10) }}</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ article.content}}</p>
    <a href="#" 
    @click="goToLookArticle(article.id)"
    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Consulter
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</div>
    </div>
  </section>
  </div>
</div>

</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Navbar from '../components/Navbar.vue';
// @ts-ignore
import ApiService from "@/services/ApiService";
import { useRouter } from "vue-router";

// Interface pour décrire la structure d'un article
interface Article {
  id: number;
  title: string;
  content: string;
}

interface User {
  id: number;
  name: string;
}


interface Commentaries {
  id: number;
  content: string;
  userId: number;
  user: {
    id: number;
    pseudo: string;
  };
}

const router = useRouter();
const articles = ref<Article[]>([]); // Articles typés comme un tableau de n'importe quel type
const users = ref<User[]>([]); // Utilisateurs typés comme un tableau de n'importe quel type
const isAdmin = ref<boolean>(false);
const commentaries = ref<Commentaries[]>([])

const goToLookArticle = (articleId: number) => {
  console.log(articleId); // Vérifiez la valeur de articleId
  router.push(`announcement/${articleId}`);
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  } else {
    return text;
  }
}

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

    const response = await ApiService.get("/commentaries/get-all-commentary", config);
    commentaries.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});
</script>
