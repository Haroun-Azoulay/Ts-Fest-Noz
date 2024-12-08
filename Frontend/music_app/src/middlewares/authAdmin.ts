import { useJwt } from '@vueuse/integrations/useJwt';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';


interface CustomJwtPayload {
    role?: string;
  }
export default function authEvent({ next, router }: {
    next: NavigationGuardNext;
    router: any;
  }) {
    const authToken = localStorage.getItem('authToken');
    const { payload } = useJwt<CustomJwtPayload>(authToken || "");
    const roleId = payload.value?.role;

    if (roleId === 'admin') {
        return next();
    } else {
        return router.push({ path: '/' });
    }
}
