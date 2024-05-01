<template>
    <HeaderPage></HeaderPage>
    <section class="flex row justify-center content-center">
        <div>
            <h1
                class="font-inter text-5xl font-extrabold leading-normal tracking-normal text-left text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Les Meilleurs Evenements
                sont tout autour de vous !</h1>
            <h3 class="font-inter text-5xl font-extrabold leading-normal tracking-normal text-left">Proposez ou assistez aux
                meilleurs évenements proche de chez vous ou que vous soyez !</h3>
            <div class="flex row">
                <button class="ButtonPrimary w-80 h-12 px-12 m-5
                      py-2.5 bg-violet-600 rounded-lg flex-col
                      justify-center items-center gap-2.5 flex" @click="goToCityPage">
                    <div class="Fram
  e590 px-2 justify-center items-center gap-2.5 inline-flex">
                        <span class="ButtonSecondary text-center text-white text-base font-bold font-['Roboto']">
                            Trouver un evenement
                        </span>
                    </div>
                </button>
                <button class="ButtonPrimary w-80 h-12 px-12 m-5
                      py-2.5 bg-violet-600 rounded-lg flex-col
                      justify-center items-center gap-2.5 flex" @click="goAddEventPage">
                    <div class="Fram
  e590 px-2 justify-center items-center gap-2.5 inline-flex">
                        <span class="ButtonSecondary text-center text-white text-base font-bold font-['Roboto']">
                            Proposer un evenement
                        </span>
                    </div>
                </button>

            </div>
        </div>
        <img src="../assets/home.png">
    </section>
</template>

<script setup lang="ts">
import HeaderPage from '../components/Header/HeaderPage.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const goToCityPage = () => {
    router.push({ path: "/city" })
}

const goAddEventPage = () => {
    router.push({ path: "/add" })
}

</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
  