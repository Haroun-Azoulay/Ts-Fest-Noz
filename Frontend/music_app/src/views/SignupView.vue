<template>
    <section class="flex row justify-center content-center">
        <div class="flex">
            <SignupPage></SignupPage>
            <img src="../assets/authentification.png">
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
  