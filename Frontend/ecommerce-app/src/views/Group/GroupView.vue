
<template>
    <div>
        <HeaderPage></HeaderPage>
        <section id="subheader" class="text-light" data-bgimage="url(/images-dj/background/subheader.jpg) bottom">
            <div class="center-y relative text-center">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 text-center">
                        <h1>Groupe</h1>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </section>
        <h2 class="" style="text-align:center;background:#371990;margin-bottom:0;">
            Entrez le nom de votre<br/> <span class="id-color">groupe</span>
        </h2>
        <section class="flex flex-col lg:flex-row justify-center items-center">
            <div class="w-full max-w-lg flex justify-center items-center flex-col p-4 rounded-md shadow-lg bg-white">
                <h1 class="text-black mb-4 text-xl font-bold text-center">Créez un groupe</h1>
                <form @submit.prevent="" class="w-full">
                    <div class="mb-4">
                        <label class="block text-black text-m font-medium leading-tight">Nom</label>
                        <input v-model="groupName" class="text-center w-full p-2 border rounded shadow-md" type="text" placeholder="Entrez le nom" required>
                    </div>
                    <button type="button" @click="addInputMember" class="w-full bg-violet-600 text-white p-2 rounded shadow-md hover:text-violet-600 hover:bg-violet-400 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50">Ajouter un membre</button>
                    <div id="add-member-area">
                        <div v-for="(input, index) in inputs" :key="index">
                            <input
                            type="text"
                            :placeholder="`Entrez l'email de la personne ${index + 1}`"
                            ref="dynamicInputs"
                            class="text-center w-full p-2 border rounded shadow-md"
                            />
                        </div>
                    </div>
                    <button type="submit" @click="addMember" class="w-full bg-violet-600 text-white p-2 rounded shadow-md hover:text-violet-600 hover:bg-violet-400 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50">
                        Créer
                    </button>
                </form>
            </div>
        </section>
        <ModalConfirm v-model="showError" title="Erreur" @confirm="confirmError">
            <p>{{ errorMessage }}</p>
        </ModalConfirm>
        <ModalConfirm v-model="showSuccess" title="Confirmation" @confirm="confirmSuccess">
            <p>{{ successMessage }}</p>
        </ModalConfirm>
    </div>
    <FooterPage></FooterPage>
</template>
  
  
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import ApiService from "@/services/ApiService";
    import HeaderPage from '../../composables/Header/HeaderPage.vue';
    import ModalConfirm from '../../components/pModal/ModalConfirm.vue';
    import FooterPage from '../../composables/Footer/FooterPage.vue';
    import { useJwt } from '@vueuse/integrations/useJwt';
    
    const router = useRouter();
    const route = useRoute();
    const groupName = ref('');
    const inputs = ref([]);
    const dynamicInputs = ref([]);
    const showError = ref(false);
    const errorMessage = ref('');
    const successMessage = ref('');
    const showSuccess = ref(false);

    const confirmError = () => {
        showError.value = false;
    };

    const confirmSuccess = () => {
        showSuccess.value = false;
        const elem = document.getElementById('add-event-map');
        if (elem) {
            elem.style.height = '100%';
        }
    };

    const createGroup = {
        name: "",
        members: []
    };

    const addInputMember = () => {
        inputs.value.push('');
    };

    const getRefs = () => {
        console.log(dynamicInputs.value);
    };

    const getAuthToken = async () => {
        return localStorage.getItem('authToken');
    };

    // onMounted(async () => {
    //     try {
    //         const authToken = localStorage.getItem('authToken');
    //         if (!authToken)  {
    //             router.push({ path : '/' });
    //         } else {
    //             const { payload } = useJwt(authToken);
    //             const roleId = payload.value?.role;
    //             if (roleId !== "artist") {
    //                 router.push({ path : '/' });
    //             }
    //             const response = await ApiService.get('/get-all-groups', {
    //                 headers: {
    //                     Authorization: `Bearer ${authToken}`,
    //                 },
    //             });
    //             if ('message' in response.data === false) {
    //                 router.push({ path : '/' });
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Erreur lors de la requête :', error);
    //     }
    // });

    const addMember = async () => {
        try {
            const authToken = await getAuthToken();
            createGroup.name = groupName.value;
            createGroup.members = [];
            dynamicInputs.value.forEach((element) => createGroup.members.push(element.value));
            const response = await ApiService.post('/create-group', createGroup, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            successMessage.value = "Le groupe a été crée !";
            showSuccess.value = true;
            window.location.reload();
        } catch (error: any) {
            console.error(error);
            errorMessage.value = error.response?.data?.message || error.message;
            showError.value = true;
        }
        createGroup.members = [];
    };
</script>
  
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
  