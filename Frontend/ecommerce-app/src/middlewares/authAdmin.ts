import { useJwt } from '@vueuse/integrations/useJwt.mjs';

export default function authEvent({ next, router }) {
    const authToken = localStorage.getItem('authToken');
    const { payload } = useJwt(authToken);
    const roleId = payload.value?.role;

    if (roleId === 'admin') {
        return next();
    } else {
        return router.push({ path: '/' });
    }
}
