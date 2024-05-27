<template>
    <section class="min-h-screen flex items-center justify-center bg-slate-50">
      <div class="flex gap-16">
        <SigninPage></SigninPage>
        <div class="flex items-center justify-center">
          <img class="object-contain" src="../assets/authentification.png">
        </div>
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
  