<template>
  <HeaderPage />
  <section id="subheader" class="text-light" data-bgimage="url(/images-dj/background/subheader.jpg) bottom">
    <div class="center-y relative text-center">
        <div class="container">
            <div class="row">
                
                <div class="col-md-12 text-center">
                  <h1>FORUM</h1>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
  </section>
  <div class="min-h-screen flex flex-col items-center" style="background:#371990">
    <div class="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 class="text-3xl font-extrabold text-gray-800 mb-6 text-center text-black">Ecrire un post</h2>
      <form @submit.prevent="addPost" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            v-model="request.title"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-violet-600 focus:ring-opacity-50"
            placeholder="Entrez le titre"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Sous-titre</label>
          <input
            type="text"
            v-model="request.subtitle"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-violet-600 focus:ring-opacity-50"
            placeholder="Entrez le sous-titre"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Paragraphe</label>
          <textarea
            v-model="request.content"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-violet-600 focus:ring-opacity-50"
            rows="5"
            placeholder="Entrez le contenu"
          ></textarea>
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="mt-1 bg-violet-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50"
          >
            CONFIRMER
          </button>
        </div>
      </form>
    </div>
  </div>
  <FooterPage/>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import HeaderPage from '../pages/Header/HeaderPage.vue';
  import FooterPage from '../pages/Footer/FooterPage.vue';
  import { useRouter } from 'vue-router';
  import ApiService from "@/services/ApiService";
  import { useJwt } from '@vueuse/integrations/useJwt';
  
  const router = useRouter();
  var userId = ref<string | null>(null);
  const authToken = ref<string | null>(null);
  const errorMessage = ref<string>('');
  const show = ref<boolean>(false);
interface JwtPayload {
  userId: string;
}

interface PostRequest {
  title: string;
  subtitle: string;
  content: string;
  userId: string;
}

onMounted(async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (token) {
      authToken.value = token;

      const { payload } = useJwt<JwtPayload>(token);

      if (payload.value) {
        userId.value = payload.value.userId;
        console.log('Payload:', payload.value);
        console.log('UserId:', userId.value);
      }
    }
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
  }
});
  
  const request = ref<PostRequest>({
  title: '',
  subtitle: '',
  content: '',
  userId: '',
});

  
const addPost = async (): Promise<void> => {
  try {
    if (!userId.value) {
      throw new Error("User ID is not defined. Please authenticate first.");
    }

    request.value.userId = userId.value;

    const response = await ApiService.post('/post/add-post', request.value, {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });

    router.push({ path: "/forum" });
  } catch (error: any) {
    console.error("Error while adding post:", error);
    errorMessage.value = error.response?.data?.message || error.message;
    show.value = true; // Display the error to the user
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
  