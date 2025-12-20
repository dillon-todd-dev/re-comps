import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: App,
  },
  {
    path: '/test',
    name: 'test',
    component: HelloWorld,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
