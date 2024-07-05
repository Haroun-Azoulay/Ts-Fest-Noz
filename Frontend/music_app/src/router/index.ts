import { createRouter, createWebHistory } from 'vue-router';
import SignupView from '@/views/SignupView.vue';
import SigninView from '@/views/SigninView.vue';
import HomeView from '@/views/HomeView.vue';
import AddEvent from '@/views/AddEventView.vue';
import CityView from '@/views/CityView.vue';
import EventView from '@/views/EventView.vue';
import AdminHomeView from '@/views/AdminHomeView.vue';
import SingleEventView from '@/views/SingleEventView.vue';
import SingleForumView from '@/views/SingleForumView.vue';
import SinglePaymentPageView from '@/views/SinglePaymentPageView.vue';
import SingleTokenView from '@/views/SingleTokenView.vue';
import ForumView from '@/views/ForumView.vue';
import ErrorView from '@/views/404View.vue';
import PostView from '@/views/AddPostView.vue';
import authMiddleware from '@/middlewares/auth';
import authEvent from '@/middlewares/authEvent';
import authAdmin from '@/middlewares/authAdmin';

const routes = [
  {
    path: '/',
    name: 'home',
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
    meta: {
      middleware: [authMiddleware],
    },
  },
  {
    path: '/forum/add',
    name: 'addPost',
    component: PostView,
    meta: {
      middleware: [authMiddleware],
    },
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
    meta: {
      middleware: [authEvent],
    },
  },
  {
    path: '/city',
    name: 'city',
    component: CityView,
    meta: {
      middleware: [authMiddleware],
    },
  },
  {
    path: '/event',
    name: 'event',
    component: EventView,
    meta: {
      middleware: [authEvent],
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminHomeView,
    meta: {
      middleware: [authAdmin],
    },
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
    path: '/error',
    name: 'ErrorView',
    component: ErrorView,
  },
  {
    path: '/event/token/3AGZEYG&1386SFAFTFDA',
    name: 'Singletoken',
    component: SingleTokenView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
    const context = { from, next, router, to };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
