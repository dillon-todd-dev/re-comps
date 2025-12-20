<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Message from 'primevue/message';

const emit = defineEmits(['login']);

const email = ref('');
const password = ref('');
const loginError = ref('');

const handleSubmit = () => {
  loginError.value = '';

  if (!email.value || !password.value) {
    loginError.value = 'Please enter both email and password';
    return;
  }

  emit('login', { email: email.value, password: password.value });
};

// Expose method to set errors from parent component
const setError = (error: string) => {
  loginError.value = error;
};

defineExpose({ setError });
</script>

<template>
  <div class="login-card">
    <div class="login-header">
      <h2>Welcome Back</h2>
      <p>Sign in to access your property dashboard</p>
    </div>
    <Message v-if="loginError" severity="error" :closable="false">
      {{ loginError }}
    </Message>
    <form @submit.prevent="handleSubmit">
      <div class="form-field">
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="email"
          type="email"
          placeholder="Enter your email"
          :class="{ 'p-invalid': loginError && !email }"
        />
      </div>
      <div class="form-field">
        <label for="password">Password</label>
        <Password
          id="password"
          v-model="password"
          placeholder="Enter your password"
          :feedback="false"
          toggleMask
          :class="{ 'p-invalid': loginError && !password }"
        />
      </div>
      <Button
        type="submit"
        label="Sign In"
        icon="pi pi-sign-in"
        class="login-button"
      />
    </form>
  </div>
</template>

<style scoped>
.login-card {
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  opacity: 0;
  animation: fadeInUp 0.8s ease 0.3s forwards;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  font-family: 'Crimson Pro', serif;
  font-size: 2rem;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.login-header p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.form-field {
  margin-bottom: 1.5rem;
}

.form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-dark);
  font-size: 0.95rem;
}

/* InputText styling */
.form-field :deep(.p-inputtext) {
  width: 100%;
  border-radius: 12px;
  border: 2px solid var(--border-color);
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-field :deep(.p-inputtext:focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
}

.form-field :deep(.p-inputtext.p-invalid) {
  border-color: #ef4444;
}

/* Password field styling */
.form-field :deep(.p-password) {
  width: 100%;
}

.form-field :deep(.p-password-input) {
  width: 100%;
  border-radius: 12px;
  border: 2px solid var(--border-color);
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-field :deep(.p-password-input:focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
}

.form-field :deep(.p-password.p-invalid .p-password-input) {
  border-color: #ef4444;
}

/* Button styling */
.login-button {
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  background: var(--primary-color);
  border: none;
  transition: all 0.3s ease;
}

.login-button:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(15, 118, 110, 0.2);
}

.login-button:active {
  transform: translateY(0);
}

/* Message styling */
:deep(.p-message) {
  margin-bottom: 1.5rem;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .login-card {
    padding: 2rem;
  }

  .login-header h2 {
    font-size: 1.75rem;
  }
}
</style>
