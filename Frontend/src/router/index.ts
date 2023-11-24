import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth } from '../utils/authGuard';
import HomeView from '@views/HomeView.vue'
import ConnexionView from '@views/ConnexionView.vue'
import Navbar from '@components/Navbar.vue';
import AnnouncementView from '@views/AnnouncementView.vue';
import PostAnnoucementView from '@views/PostAnnoucementView.vue';
import SingleAnnoucementView from '@views/SingleAnnoucementView.vue';
import AllArticlesForumView from '@views/AllArticlesForumView.vue';
import AdminView from '@views/AdminView.vue';
const router = createRouter({
  history: createWebHistory('/music_app/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: ConnexionView
    },
    {
      path: '/announcement',
      name: 'AnnouncementView',
      component: AnnouncementView,
    },
    {
      path: '/announcement/:id',
      name: 'SingleAnnoucement',
      component: SingleAnnoucementView,
    },
    {
      path: '/admin',
      name: 'AdminView', //mettre un before admin etc important
      component: AdminView,
    },
    {
      path: '/post-annoucement',
      name: 'PostAnnoucementView',
      //beforeEnter: requireAuth,
      component: PostAnnoucementView,
    },
  ]
})

export default router
