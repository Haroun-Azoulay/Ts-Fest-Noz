<template>
  <Navbar />
  <div class="bg-gray-100 min-h-screen">
  <main>
    <section class="text-center bg-white m-4">
        {{  article.title }} 
        {{  article.content }} 
    </section>
    <section class="text-center bg-blue-400 m-4">
      <h2>Messages</h2>
      <div class="p-6 bg-grey-100 m-4" v-for="commentary in commentaries" :key="commentary.id">     
        <p>{{ commentary.content }}</p>
        <p>{{ commentary.createdAt }}</p>
        <p>{{ commentary.updatedAt }}</p>
        <p>Message de: {{ commentary.user.pseudo }}</p>
      </div>
    </section>
    <section class="text-center bg-white m-4"> 
    <form  @submit.prevent="postCommentary">
      <h2>Laisser un message</h2>
    <textarea v-model="addCommentary.content" placeholder="Votre message" rows="2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
    <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Envoyer
      </button>
      </form>
    </section>
  </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"; // Importez ref depuis Vue
// @ts-ignore
import ApiService from "@/services/ApiService";
import Navbar from '../components/Navbar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
console.log(router);
  
// Obtenez le paramètre id depuis la route
const articleId = router.currentRoute.value.params.id as string;
console.log(articleId);

interface Article {
  id: number;
  content: string;
  title: string;
}
const article = ref<Article>({ id: 0, content: '', title: '' });

interface Commentary {
  content:string;
}

const addCommentary = ref<Commentary>({
  content:'',
})

interface Commentaries{
  id: number;
  content: string;
  userId: number;
  user: {
    id: number;
    pseudo: string;
  };
  createdAt: string;
  updatedAt: string
}

const commentaries = ref<Commentaries[]>([])

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
        'Content-Type': 'application/json',
        Origin: 'http://localhost:5173',
      },
    };

    const response = await ApiService.get(`/posts/get-post/${articleId}`, config);
    article.value = response.data; // Affectez directement la réponse à l'objet article
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});

const postCommentary = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    console.log("Token d'authentification :", authToken);
    if (!authToken) {
      console.error("L'utilisateur n'est pas authentifié.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Origin: "http://localhost:5173",
      },
    };

    console.log("Configuration de la requête :", config, addCommentary);

    await ApiService.post(`/commentaries/create-commentary/${articleId}`, addCommentary.value, config);
    console.log("test")
    console.log(article)
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
};

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
        'Content-Type': 'application/json',
        Origin: 'http://localhost:5173',
      },
    };

    const articleResponse = await ApiService.get(`/posts/get-post/${articleId}`, config);
    article.value = articleResponse.data;

    const commentariesResponse = await ApiService.get(`/commentaries/get-commentary/${articleId}`, config);
    commentaries.value = commentariesResponse.data;
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});
</script>
