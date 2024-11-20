import { createRouter, createWebHistory } from 'vue-router';
import SignupView from '@/components/SignupView.vue';
import SigninView from '@/components/SigninView.vue';
import HomeView from '@/components/HomeView.vue';
import DashboardView from '@/components/DashboardView.vue';
import GroupView from '@/components/GroupView.vue';
import AdminHomeView from '@/components/AdminHomeView.vue';
import ContactView from '@/components/ContactView.vue';
import ErrorView from '@/components/404View.vue';
import authMiddleware from '@/middlewares/auth';
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
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
  },
  {
    path: '/group',
    name: 'group',
    component: GroupView,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
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
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: ErrorView,
  },
];

const router = createRouter({
  history: createWebHistory(),
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
