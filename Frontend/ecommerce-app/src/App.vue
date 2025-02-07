<script setup lang="ts">
import { RouterView } from 'vue-router'
import type { Cart } from 'models/cart';

const cart : Cart = {
  totalPrice: 0,
  content: []
}

if (!(localStorage.getItem('festnozCart')) || localStorage.getItem('festnozCart') === '[]') {
  localStorage.setItem('festnozCart', JSON.stringify(cart));
}
</script>

<template>
  <RouterView />
</template>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
