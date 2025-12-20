import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/LandingPage.vue';
import Dashboard from '../views/Dashboard.vue';
import AuthLayout from '../components/AuthLayout.vue';
import { useAuthStore } from '../stores/auth.store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/',
    component: AuthLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Wait for auth check if still loading
  if (authStore.loading) {
    await authStore.checkAuth();
  }

  // Redirect authenticated users away from landing page
  if (to.name === 'home' && authStore.isAuthenticated) {
    next({ name: 'dashboard' });
    return;
  }

  // Redirect unauthenticated users to landing page
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'home' });
    return;
  }

  next();
});

export default router;
