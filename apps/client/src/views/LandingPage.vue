<script setup>
import { useToast } from 'primevue/usetoast';
import LoginForm from '../components/LoginForm.vue';

const emit = defineEmits(['login']);
const toast = useToast();

const handleLogin = (username) => {
  emit('login', username);
  toast.add({
    severity: 'success',
    summary: 'Welcome!',
    detail: `Good to see you, ${username}!`,
    life: 3000,
  });
};
</script>

<template>
  <div class="landing-container">
    <div class="landing-content">
      <div class="landing-text">
        <h1>Manage Your Properties with Ease</h1>
        <p class="subtitle">
          The modern platform for property management. Track, organize, and grow
          your real estate portfolio.
        </p>
        <ul class="feature-list">
          <li>
            <i class="pi pi-check-circle"></i> Comprehensive property dashboard
          </li>
          <li><i class="pi pi-check-circle"></i> Easy property management</li>
          <li><i class="pi pi-check-circle"></i> Secure and reliable</li>
          <li>
            <i class="pi pi-check-circle"></i> Beautiful, responsive design
          </li>
        </ul>
      </div>

      <LoginForm @login="handleLogin" />
    </div>
  </div>
</template>

<style scoped>
.landing-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-dark) 100%
  );
  position: relative;
  overflow: hidden;
}

.landing-container::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(245, 158, 11, 0.15) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: float 20s ease-in-out infinite;
}

.landing-container::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.08) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: float 15s ease-in-out infinite reverse;
}

.landing-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  align-items: center;
  position: relative;
  z-index: 1;
}

.landing-text {
  color: white;
}

.landing-text h1 {
  font-family: 'Crimson Pro', serif;
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

.landing-text .subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  margin-bottom: 2rem;
  font-weight: 400;
  opacity: 0;
  animation: fadeInUp 0.8s ease 0.2s forwards;
}

.feature-list {
  list-style: none;
  opacity: 0;
  animation: fadeInUp 0.8s ease 0.4s forwards;
}

.feature-list li {
  padding: 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
}

.feature-list i {
  color: var(--accent-color);
  font-size: 1.25rem;
}

@media (max-width: 1024px) {
  .landing-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .landing-text {
    text-align: center;
  }

  .landing-text h1 {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .landing-text h1 {
    font-size: 2.5rem;
  }

  .landing-content {
    gap: 2rem;
  }
}
</style>
