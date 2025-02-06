import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '@/views/Authentification/SignupView.vue'
import SigninView from '@/views/Authentification/SigninView.vue'
import HomeView from '@/views/Home/HomeView.vue'
import AddEvent from '@/views/City/AddEventView.vue'
import CityView from '@/views/City/CityView.vue'
import EventView from '@/views/Events/EventView.vue'
import AdminHomeView from '@/views/Admin/AdminHomeView.vue'
import SingleEventView from '@/views/Events/SingleEventView.vue'
import SingleForumView from '@/views/Forum/SingleForumView.vue'
import ForumView from '@/views/Forum/ForumView.vue'
import SinglePaymentPageView from '@/views/SinglePaymentPageView.vue'
import SingleTokenView from '@/views/SingleTokenView.vue'
import ContactView from '@/views/Contact/ContactView.vue'
import ErrorView from '@/views/404/404View.vue'
import PostView from '@/views/Forum/AddPostView.vue'
import authMiddleware from '@/middlewares/auth'
import authEvent from '@/middlewares/authEvent'
import authAdmin from '@/middlewares/authAdmin'
import auth from '@/middlewares/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/forum',
    name: 'forum',
    component: ForumView,
    meta: {
      middleware: [authMiddleware]
    }
  },
  {
    path: '/forum/add',
    name: 'addPost',
    component: PostView,
    meta: {
      middleware: [authEvent]
    }
  },
  {
    path: '/forum/:idpost',
    name: 'SingleForum',
    component: SingleForumView
  },
  {
    path: '/add',
    name: 'add',
    component: AddEvent,
    meta: {
      middleware: [authEvent]
    }
  },
  {
    path: '/city',
    name: 'city',
    component: CityView,
    meta: {
      middleware: [authMiddleware]
    }
  },
  {
    path: '/event',
    name: 'event',
    component: EventView,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminHomeView,
    meta: {
      middleware: [authAdmin]
    }
  },
  {
    path: '/event/:id',
    name: 'Singleevent',
    component: SingleEventView,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/event/:id/:userid',
    name: 'Singlepayment',
    component: SinglePaymentPageView
  },
  {
    path: '/event/token/3AGZEYG&1386SFAFTFDA',
    name: 'Singletoken',
    component: SingleTokenView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: ErrorView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    context.next(...parameters)
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
    const context = { from, next, router, to }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
})

export default router
