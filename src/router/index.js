import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../components/Dashboard.vue';
import Calendar from '../components/Calendar.vue';
import Recommendations from '../components/Recommendations.vue';
import CheckEligibility from '../components/CheckEligibility.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, props: route => ({ tasks: route.meta.tasks }) },
    { path: '/calendar', name: 'Calendar', component: Calendar },
    { path: '/recommendations', name: 'Recommendations', component: Recommendations },
    { path: '/check-eligibility', name: 'CheckEligibility', component: CheckEligibility },
    { path: '/home',bname: 'Home', component: Home },
    { path: '/', name: 'Login', component: Login, },
    { path: '/register', name: 'Register', component: Register, },
  ]
})

export default router
