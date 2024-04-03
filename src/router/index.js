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
import FinancialPlanning from '../components/FinancialPlanning.vue';
import SalesLaunches from '../components/SalesLaunches.vue';
import SubmitApplication from '../components/SubmitApplication.vue';
import ApplicationOutcome from '../components/ApplicationOutcome.vue';
import BookFlat from '../components/BookFlat.vue';
import Lease from '../components/Lease.vue';
import Keys from '../components/Keys.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, props: route => ({ tasks: route.meta.tasks }),   meta: { requiresAuth: true } },
    { path: '/calendar', name: 'Calendar', component: Calendar,  meta: { requiresAuth: true }},
    { path: '/recommendations', name: 'Recommendations', component: Recommendations,  meta: { requiresAuth: true }},
    { path: '/settings', name: 'Settings', component: Settings,   meta: { requiresAuth: true }},
    { path: '/check-eligibility', name: 'CheckEligibility', component: CheckEligibility, meta: { requiresAuth: true }},
    { path: '/financial-planning', name: 'FinancialPlanning', component: FinancialPlanning, meta: { requiresAuth: true }},
    { path: '/sales-launches', name: 'SalesLaunches', component: SalesLaunches, meta: { requiresAuth: true }},
    { path: '/submit-application', name: 'Application', component: SubmitApplication, meta: { requiresAuth: true }},
    { path: '/application-outcome', name: 'ApplicationOutcome', component: ApplicationOutcome, meta: { requiresAuth: true }},
    { path: '/book-flat', name: 'BookFlat', component: BookFlat, meta: { requiresAuth: true }},
    { path: '/lease', name: 'Lease', component: Lease, meta: { requiresAuth: true }},
    { path: '/keys', name: 'Keys', component: Keys, meta: { requiresAuth: true }},
    { path: '/', name: 'Login', component: Login,},
    { path: '/register', name: 'Register', component: Register, },
  ],
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
