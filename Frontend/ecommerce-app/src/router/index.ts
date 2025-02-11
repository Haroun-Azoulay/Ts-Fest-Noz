import { createRouter, createWebHistory } from 'vue-router';
import SignupView from '@/views/Authentification/SignupView.vue';
import SigninView from '@/views/Authentification/SigninView.vue';
import HomeView from '@/views/Home/HomeView.vue';
import DashboardView from '@/views/Dashboard/DashboardView.vue';
import GroupView from '@/views/Group/GroupView.vue';
import AdminHomeView from '@/views/Admin/AdminHomeView.vue';
import ContactView from '@/views/Contact/ContactView.vue';
import ErrorView from '@/views/404/404View.vue';
import authMiddleware from '@/middlewares/auth';
import authAdmin from '@/middlewares/authAdmin';
import GoodieDetailsView from '@/views/Goodie/GoodieDetailsView.vue';
import CartView from '@/views/Cart/CartView.vue';
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
    path: '/goodie-details/:goodieId',
    name: 'goodiedetails',
    component: GoodieDetailsView,
  },
  {
    path: '/group',
    name: 'group',
    component: GroupView,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
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
