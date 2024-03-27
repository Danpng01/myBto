import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../components/Dashboard.vue';
import Calendar from '../components/Calendar.vue';
import Recommendations from '../components/Recommendations.vue';
import Settings from '../components/Settings.vue';
import { auth } from '../../scripts/firebase';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, props: route => ({ tasks: route.meta.tasks }),   meta: { requiresAuth: true } },
    { path: '/calendar', name: 'Calendar', component: Calendar,  meta: { requiresAuth: true }},
    { path: '/recommendations', name: 'Recommendations', component: Recommendations,  meta: { requiresAuth: true }},
    { path: '/settings', name: 'Settings', component: Settings,   meta: { requiresAuth: true }},
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

// Ensure user has to be logged in to access the other components
// 'beforeEach' guard runs before every route transition. It checks if the target route (to) requires authentication by looking for requiresAuth in the route's meta fields.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next('/'); // Redirect to the login page
  } else {
    next(); // Proceed to the route
  }
});

export default router
