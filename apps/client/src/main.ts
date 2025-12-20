import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useAuthStore } from './stores/auth.store';
import router from './router';

const app = createApp(App);

app.use(router);

const authStore = useAuthStore();
authStore.checkAuth();

app.mount('#app');
