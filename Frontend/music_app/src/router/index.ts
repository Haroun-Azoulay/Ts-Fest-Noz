import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '@/views/SignupView.vue';
import SigninView from '@/views/SigninView.vue';
import HomeView from '@/views/HomeView.vue';
import AddEvent from '@/views/AddEventView.vue';
import CityView from '@/views/CityView.vue'
import EventView from '@/views/EventView.vue';

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
      path: '/add',
      name: 'add',
      component: AddEvent,
    },
    {
      path: '/city',
      name: 'city',
      component: CityView,
    },
    {
      path: '/event',
      name: 'event',
      component: EventView,
    },
  ]
});
export default router
