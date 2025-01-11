import { useRouter } from 'vue-router';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default function auth({ next, router }: {
  next: NavigationGuardNext;
  router: any;
}) {
  if (!localStorage.getItem('authToken')) {
    return router.push({ path: '/signin' });
  }
  return next();
}
