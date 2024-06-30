<template>
  <div class="bg-gray-100 min-h-screen">
    <HeaderPage />
    <p class>Bienvenue dans le forum</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderPage from '../components/Header/HeaderPage.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

</script>