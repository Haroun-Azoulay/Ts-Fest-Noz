<template>
    <section class="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-blue--500 to-green-300">
      <div class="flex gap-16">
            <SignupPage></SignupPage>
            <div class="flex items-center justify-center">
            <img class="object-contain rounded-full" src="../assets/images/authentification-image.avif">
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import SignupPage from '../pages/Authentification/SignupPage.vue';
</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
  