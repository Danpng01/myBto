import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../components/Dashboard.vue';
import Calendar from '../components/Calendar.vue';
import Recommendations from '../components/Recommendations.vue';
import Settings from '../components/Settings.vue';
import { auth } from '../../scripts/firebase';
import CheckEligibility from '../components/CheckEligibility.vue';
import { useAuthStore } from '../stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, props: route => ({ tasks: route.meta.tasks }),   meta: { requiresAuth: true } },
    { path: '/calendar', name: 'Calendar', component: Calendar,  meta: { requiresAuth: true }},
    { path: '/recommendations', name: 'Recommendations', component: Recommendations,  meta: { requiresAuth: true }},
    { path: '/settings', name: 'Settings', component: Settings,   meta: { requiresAuth: true }},
    { path: '/check-eligibility', name: 'CheckEligibility', component: CheckEligibility, meta: { requiresAuth: true }},
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
  ]
})

// Enhanced 'beforeEach' guard to handle waiting for auth
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.authReady) {
    // Wait for authentication to be ready
    await new Promise(resolve => {
      const unsubscribe = authStore.$subscribe((mutation, state) => {
        if (state.authReady) {
          unsubscribe();
          resolve();
        }
      });
    });
  }
  // Redirect to dashboard if user is already logged in and trying to access login/register
  if ((to.path === '/' || to.path === '/register') && authStore.user) {
    next('/dashboard');
  } else if (to.meta.requiresAuth && !authStore.user) {
    // Redirect to login if user is not logged in and trying to access a protected route
    next('/');
  } else {
    // Proceed as normal for all other cases
    next();
  }
});

export default router
