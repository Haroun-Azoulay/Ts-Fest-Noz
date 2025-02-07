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
          <button @click="goToAddPost"
            class="hover:scale-110 inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-gradient-to-b from-[#cdff6b] to-[#2B86C5] rounded-lg transition-all">
            Nouveau post
            <svg class="w-6 h-6 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 2l8 8-7 7H9v-6L14 2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 12l-4 4m0 0l-4 4m4-4h12v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8h12l-4-4" />
            </svg>
          </button>
        </label>
      </div>

      <div id="list-forum-posts" class="flex flex-row flex-wrap gap-6 justify-center mt-6">
        <div v-for="item in post" :key="item.id"
          class="flex mt-6 hover:scale-110 flex-col items-center max-w-sm p-6 bg-gradient-to-b from-[#5D26C1] to-[#2B86C5] border-4 border-white rounded-2xl shadow-lg"
          style="height: 12rem">
          <p class="mb-12 text-xl font-extrabold tracking-tight text-[#F9F9F9]">
            {{ item.title }}
          </p>
          <button @click="goTosingleForum(item.id)"
            class="hover:scale-110 inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-gradient-to-b from-[#cdff6b] to-[#2B86C5] rounded-lg transition-all">
            Consulter le post
            <svg class="rtl:rotate-180 w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </div>
      </div>
    </div>


    <FooterPage class="mt-auto" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import HeaderPage from '../../composables/Header/HeaderPage.vue';
import { useRouter } from 'vue-router';
import ApiService from "@/services/ApiService";
import { useJwt } from '@vueuse/integrations/useJwt';
import FooterPage from '../../composables/Footer/FooterPage.vue';


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

    const response = await ApiService.get("/get-all-posts", config);
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