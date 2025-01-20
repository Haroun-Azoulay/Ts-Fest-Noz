<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-blue--500 to-green-300">
      <div class="flex gap-16">
        <SigninPage></SigninPage>
        <div class="flex items-center justify-center">
          <img class="object-contain rounded-full w-full max-md:hidden" src="../assets/images/authentification-image.avif" style="width: 100%">
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import SigninPage from '../pages/Authentification/SigninPage.vue';
  </script>
  
  <style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  </style>
  