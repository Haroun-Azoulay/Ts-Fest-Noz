<template>
    <div class="bg-gray-100 min-h-screen">
      <Navbar />
      <div class="my-8 flex justify-center items-center">
      </div>
      <AdminMapboxMap />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  // @ts-ignore
  import ApiService from "@/services/ApiService";
  import AdminMapboxMap from '@/components/AdminMap.vue'; 
  import Navbar from '../components/Navbar.vue';
  
  </script>