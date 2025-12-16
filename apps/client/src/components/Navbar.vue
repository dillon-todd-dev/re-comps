<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import Menu from 'primevue/menu';

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['logout']);

const menu = ref();

const menuItems = ref([
  {
    label: 'Account',
    items: [
      {
        label: props.email,
        icon: 'pi pi-user',
        disabled: true,
      },
      {
        separator: true,
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          emit('logout');
        },
      },
    ],
  },
]);

const toggleMenu = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="navbar">
    <div class="navbar-brand">
      <i class="pi pi-home"></i>
      <h1>PropertyHub</h1>
    </div>
    <div class="navbar-actions">
      <Button
        type="button"
        :label="email"
        icon="pi pi-chevron-down"
        iconPos="right"
        class="user-button"
        @click="toggleMenu"
        aria-haspopup="true"
        aria-controls="user_menu"
      />
      <Menu id="user_menu" ref="menu" :model="menuItems" :popup="true" />
    </div>
  </div>
</template>

<style scoped>
.navbar {
  background: white;
  padding: 1.25rem 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.navbar-brand h1 {
  font-family: 'Crimson Pro', serif;
  font-size: 1.75rem;
  color: var(--primary-dark);
  font-weight: 700;
}

.navbar-brand i {
  font-size: 1.75rem;
  color: var(--primary-color);
}

.navbar-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.user-button {
  background: var(--bg-light);
  border: 2px solid var(--primary-color);
  color: var(--primary-dark);
  font-weight: 600;
  border-radius: 12px;
  padding: 0.625rem 1.25rem;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.user-button :deep(.p-button-label) {
  font-weight: 600;
}

.user-button :deep(.p-button-icon) {
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

.user-button:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 118, 110, 0.3);
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }

  .navbar-brand h1 {
    font-size: 1.35rem;
  }

  .user-button {
    padding: 0.625rem 1rem;
    font-size: 0.85rem;
  }

  .user-button :deep(.p-button-label) {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
