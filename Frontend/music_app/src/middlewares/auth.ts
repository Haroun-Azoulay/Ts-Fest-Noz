import { useRouter } from 'vue-router';

export default function auth({ next, router }) {
  if (!localStorage.getItem('authToken')) {
    return router.push({ path: '/signin' });
  }
  return next();
}
