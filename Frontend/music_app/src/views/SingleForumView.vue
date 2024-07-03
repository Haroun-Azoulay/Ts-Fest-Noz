<template>
    <div class="bg-gray-100 min-h-screen">
        <HeaderPage />
        <div v-if="postSingle">
            <h1 class="text-xl font-bold">{{ postSingle.title }}</h1>
            <p>{{ postSingle.content }}</p>
        </div>
        <button
            class="ButtonPrimary w-full md:w-80 h-12 px-6 m-2 py-2.5 bg-violet-600 rounded-lg flex justify-center items-center">
            <span class="ButtonSecondary text-center text-white text-base font-bold font-['Roboto']">
                Ecrire commentaire
            </span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import HeaderPage from '../components/Header/HeaderPage.vue';
import { useRoute } from 'vue-router';
import ApiService from "@/services/ApiService";
const route = useRoute();
const postSingle = ref<{ id: string, title: string, content: string } | null>(null);

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
        const postId = route.params.idpost;
        console.log(postId);

        if (postId) {
            console.log(postId);
            const response = await ApiService.get(`/post/get-post/${postId}`, config);
            console.log(response);
            postSingle.value = response.data;
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
    }
});
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
