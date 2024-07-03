import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '@/views/SignupView.vue';
import SigninView from '@/views/SigninView.vue';
import HomeView from '@/views/HomeView.vue';
import AddEvent from '@/views/AddEventView.vue';
import CityView from '@/views/CityView.vue'
import EventView from '@/views/EventView.vue';
import AdminHomeView from '@/views/AdminHomeView.vue';
import SingleEventView from '@/views/SingleEventView.vue';
import SingleForumView from '@/views/SingleForumView.vue';
import SinglePaymentPageView from '@/views/SinglePaymentPageView.vue';
import SingleTokenView from '@/views/SingleTokenView.vue';
import ForumView from '@/views/ForumView.vue';

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
      path: '/forum',
      name: 'forum',
      component: ForumView,
    },
    {
      path: '/forum/:idpost',
      name: 'SingleForum',
      component: SingleForumView,
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
    {
      path: '/admin',
      name: 'admin',
      component: AdminHomeView,
    },
    {
      path: '/event',
      name: 'event',
      component: EventView,
    },
    {
      path: '/event/:id',
      name: 'Singleevent',
      component: SingleEventView,
    },
    {
      path: '/event/:id/:userid',
      name: 'Singlepayment',
      component: SinglePaymentPageView,
    },
    {
      path: '/event/token/3AGZEYG&1386SFAFTFDA',
      name: 'Singletoken',
      component: SingleTokenView,
    },
    
  ]
  
});
export default router
