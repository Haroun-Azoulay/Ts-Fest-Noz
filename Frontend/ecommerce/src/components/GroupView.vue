
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
                        <input class="text-center w-full p-2 border rounded shadow-md" type="text" placeholder="Entrez le nom" required>
                    </div>
                    <button type="button" @click="addInputMember" class="w-full bg-violet-600 text-white p-2 rounded shadow-md hover:text-violet-600 hover:bg-violet-400 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50">Ajouter un membre</button>
                    <div id="add-member-area">

                    </div>
                    <button type="submit" class="w-full bg-violet-600 text-white p-2 rounded shadow-md hover:text-violet-600 hover:bg-violet-400 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50">
                        Créer
                    </button>
                </form>
            </div>
        </section>
    </div>
    <FooterPage></FooterPage>
</template>
  
  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import ApiService from "@/services/ApiService";
  import HeaderPage from '../pages/Header/HeaderPage.vue';
  import ModalConfirm from './pModal/ModalConfirm.vue';
  import FooterPage from '../pages/Footer/FooterPage.vue';
  
  const getAuthToken = async () => {
    return localStorage.getItem('authToken');
  };

  onMounted(() => {
  });

  const addInputMember = () => {
    var newInput = document.createElement("input");
    newInput.type="text";
    newInput.className = "text-center w-full p-2 border rounded shadow-md";
    newInput.placeholder = "Entrez l'email de la personne"
    document.getElementById("add-member-area")?.appendChild(newInput);
  }
</script>
  
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
  