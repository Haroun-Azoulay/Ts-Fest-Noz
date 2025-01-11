import { useJwt } from '@vueuse/integrations/useJwt';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

interface CustomJwtPayload {
  role?: string;
}

export default function authEvent({
  next,
  router,
}: {
  next: NavigationGuardNext;
  router: any;
}) {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    return router.push({ path: '/signin' });
  }


  const { payload } = useJwt<CustomJwtPayload>(authToken);
  const roleId = payload.value?.role;

  if (roleId === 'admin' || roleId === 'artist' || roleId === 'organizer') {
    return next();
  } else {
    return router.push({ path: '/signin' });
  }
}
