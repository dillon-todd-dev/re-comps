import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useAuthStore } from './stores/auth.store';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { ToastService } from 'primevue';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark-mode',
    },
  },
});
app.use(ToastService);
app.use(pinia);
app.use(router);

const authStore = useAuthStore();
authStore.checkAuth();

app.mount('#app');
