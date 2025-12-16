<script setup>
import { ref } from 'vue';
import Toast from 'primevue/toast';
import LandingPage from './views/LandingPage.vue';
import Dashboard from './views/Dashboard.vue';

const isLoggedIn = ref(false);
const email = ref('');

const handleLogin = (userEmail) => {
  email.value = userEmail;
  isLoggedIn.value = true;
};

const handleLogout = () => {
  isLoggedIn.value = false;
  email.value = '';
};
</script>

<template>
  <div class="app-container">
    <Toast />
    <LandingPage v-if="!isLoggedIn" @login="handleLogin" />
    <Dashboard v-else :email="email" @logout="handleLogout" />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
}
</style>
