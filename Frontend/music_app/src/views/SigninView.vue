<template>
    <section class="flex row justify-center content-center">
        <div class="flex">
            <SigninPage></SigninPage>
            <img class="object-contain" src="../assets/authentification.png">
        </div>
    </section>
</template>

<script setup lang="ts">
import SigninPage from '../components/Authentification/SigninPage.vue';
</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
  