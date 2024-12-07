import { useJwt } from '@vueuse/integrations/useJwt';

export default function authEvent({ next, router }) {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    return router.push({ path: '/signin' });
  }

  const { payload } = useJwt(authToken);
  const roleId = payload.value?.role;

  if (roleId === 'admin' || roleId === 'artist' || roleId === 'organizer') {
    return next();
  } else {
    return router.push({ path: '/signin' });
  }
}
