<template>
    <div class="flex flex-row justify-center items-center">
        <div class="px-16 bg-white rounded-2xl
                  shadow-md flex-col justify-center items-center gap-1 inline-flex">
                  <a href="/" class="flex items-center justify-center">
            <img src="../../assets/logo.png" style="height: 200px">
            </a>
            <div class="">
                Se Connecter
            </div>
            <div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Button
                </button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Button
                </button>
            </div>
            <div class="w-96 h-24 px-2.5 pt-2.5 flex-col justify-start items-start gap-1 flex">
                <div class="Label w-96 text-gray-800 text-sm font-normal font-['Roboto'] leading-tight">
                    Votre Pseudo
                </div>
                <input class="InputText self-stretch h-11 p-4
                      bg-white rounded-lg border border-neutral-400
                      justify-center items-center gap-1 inline-flex grow shrink basis-0
                          text-neutral-400 text-sm font-normal font-['Roboto'] leading-tight"
                    placeholder="Saisissez votre pseudo" v-model="request.pseudo" />
            </div>
            <div class="w-96 h-24 px-2.5 pb-2.5 flex-col justify-start items-start gap-2.5 flex">
                <div class="Label w-96 text-gray-800 text-sm font-normal font-['Roboto'] leading-tight">
                    Mot de passe
                </div>
                <input class="InputText self-stretch h-11 p-4
                      bg-white rounded-lg border border-neutral-400
                      justify-center items-center gap-2.5 inline-flex grow shrink basis-0
                          text-neutral-400 text-sm font-normal font-['Roboto'] leading-tight"
                    id="password" type="password" placeholder="******************" v-model="request.password" />
            </div>

            <button class="ButtonPrimary w-80 h-12 px-12
                      py-2.5 bg-violet-600 rounded-lg flex-col
                      justify-center items-center gap-2.5 flex">
                <div class="Fram
  e590 px-2 justify-center items-center gap-2.5 inline-flex">
                    <span class="ButtonSecondary text-center text-white text-base font-bold font-['Roboto']"
                        @click="signin">
                        Se connecter
                    </span>
                </div>
            </button>
            <div class="ButtonSecondary w-80 h-11 px-12 py-2.5
                      rounded-lg border border-slate-900 border-opacity-0
                      flex-col justify-center items-center gap-2.5 flex">
                <div class="Frame590 px-2 justify-center items-center gap-2.5 inline-flex">
                    <div class="ButtonSecondary text-center
              text-slate-900">
                        Nouveau venu ?
                        <a href="/signup" class="flex items-center justify-center">
                        <span class="text-violet-600"> Connectez-vous !</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Signin } from '@/models/authentification';
import ApiService from "@/services/ApiService";
import { ref } from 'vue';
const router = useRouter();

const request = ref<Signin>({
  password: '',
  pseudo: '',
});

const signin = async () => {
  try {
    const response = await ApiService.post('/users/signin', request.value);
    const token = response.data.token;
    router.push({ path: "/" });
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.error("Erreur d'authentification :", error);
  }
};

</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

</style>