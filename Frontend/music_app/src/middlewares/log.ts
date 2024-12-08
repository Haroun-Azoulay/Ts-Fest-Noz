import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default function log({
  next,
  to,
}: {
  next: NavigationGuardNext;
  to: RouteLocationNormalized;
}) {
  console.log(to.name);
  return next();
}
