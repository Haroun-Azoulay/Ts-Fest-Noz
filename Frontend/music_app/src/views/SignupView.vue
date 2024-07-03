<template>
    <section class="min-h-screen flex items-center justify-center bg-slate-50">
      <div class="flex gap-16">
            <SignupPage></SignupPage>
            <img class="object-contain" src="../assets/authentification.png">
        </div>
    </section>
</template>

<script setup lang="ts">
import SignupPage from '../components/Authentification/SignupPage.vue';
</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
  