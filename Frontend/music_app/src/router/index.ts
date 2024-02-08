import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '@/views/SignupView.vue';
import SigninView from '@/views/SigninView.vue';
import HomeView from '@/views/HomeView.vue';
import MapView from '@/views/MapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name:'home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
  ]
});
export default router
