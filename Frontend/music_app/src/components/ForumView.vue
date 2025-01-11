<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <HeaderPage />
    <section id="subheader" class="text-light" data-bgimage="url(/images-dj/background/subheader.jpg) bottom">
      <div class="center-y relative text-center">
          <div class="container">
              <div class="row">
                  
                  <div class="col-md-12 text-center">
                    <h1>Forum</h1>
                  </div>
                  <div class="clearfix"></div>
              </div>
          </div>
      </div>
    </section>
    <div class="p-4" style="background:#371990;">
      <h1
        class="font-inter text-2xl md:text-5xl font-extrabold leading-tight tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 text-center">
        Bienvenue sur le Forum !
      </h1>
      <div class="flex justify-center mb-6">
        <label v-if="isAuthorized">
        <button
          class="<ButtonPrimary w-full md:w-80 h-12 px-6 m-2 py-2.5 bg-gradient-to-r from-violet-500 to-purple-700 rounded-lg flex justify-center items-center shadow-lg transform hover:scale-105 transition-transform duration-300>"
          @click="goToAddPost">
          <span class=" text-center text-white font-bold">
            NOUVEAU POST
          </span>
        </button>
        </label>
      </div>
      <div id="list-forum-posts" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in post" :key="item.id" class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 class="text-xl font-semibold mb-2 text-black">{{ item.title }}</h2>
          <p class="text-black-700 mb-4">{{ item.description }}</p>
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
import HeaderPage from '../pages/Header/HeaderPage.vue';
import { useRouter } from 'vue-router';
import ApiService from "@/services/ApiService";
import { useJwt } from '@vueuse/integrations/useJwt';
import FooterPage from '../pages/Footer/FooterPage.vue';


const router = useRouter();


interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  userId: string;
}

interface CustomJwtPayload {
  userId: string;
  role: string;
}

const post = ref<Post[]>([]);
const isAuthorized = ref<boolean>(false);

let userId: string | null = null;
let userRole: string | null = null;

onMounted(async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("The user is not authenticated.");
      return;
    }

    const { payload } = useJwt<CustomJwtPayload>(authToken);
    if (payload.value) {
      userId = payload.value.userId;
      userRole = payload.value.role;

      if (["admin", "artist", "organizer"].includes(userRole)) {
        isAuthorized.value = true;
      } else {
        console.warn("User is not authorized.");
      }
    } else {
      console.error("Failed to decode the JWT payload.");
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
    console.error("Missing post ID.");
  }
};

const goToAddPost = () => {
  router.push({ path: '/forum/add' });
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