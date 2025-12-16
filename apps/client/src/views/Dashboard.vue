<script setup>
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';
import Navbar from '../components/Navbar.vue';
import PropertyGrid from '../components/PropertyGrid.vue';
import EmptyState from '../components/EmptyState.vue';
import AddPropertyDialog from '../components/AddPropertyDialog.vue';
import { useProperties } from '../data/properties';

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});

defineEmits(['logout']);

const toast = useToast();
const { properties, addProperty } = useProperties();

const currentPage = ref(1);
const propertiesPerPage = 9;
const showAddDialog = ref(false);

const currentProperties = computed(() => {
  const start = (currentPage.value - 1) * propertiesPerPage;
  const end = start + propertiesPerPage;
  return properties.value.slice(start, end);
});

const onPageChange = (event) => {
  currentPage.value = event.page + 1;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handlePropertyAdded = (property) => {
  addProperty(property);
  currentPage.value = 1;
  toast.add({
    severity: 'success',
    summary: 'Property Added',
    detail: `${property.title} has been added to your portfolio`,
    life: 3000,
  });
};
</script>

<template>
  <div class="dashboard-container">
    <Navbar :username="username" @logout="$emit('logout')" />

    <div class="main-content">
      <div class="content-header">
        <div>
          <h2>My Properties</h2>
          <p class="property-count">
            {{ properties.length }}
            {{ properties.length === 1 ? 'property' : 'properties' }} in your
            portfolio
          </p>
        </div>
        <Button
          icon="pi pi-plus"
          label="Add Property"
          class="add-property-button"
          @click="showAddDialog = true"
        />
      </div>

      <PropertyGrid
        v-if="currentProperties.length > 0"
        :properties="currentProperties"
      />

      <EmptyState v-else @add-property="showAddDialog = true" />

      <div
        v-if="properties.length > propertiesPerPage"
        class="pagination-container"
      >
        <Paginator
          :rows="propertiesPerPage"
          :totalRecords="properties.length"
          @page="onPageChange"
          :first="(currentPage - 1) * propertiesPerPage"
        />
      </div>
    </div>

    <AddPropertyDialog
      v-model:visible="showAddDialog"
      @property-added="handlePropertyAdded"
    />
  </div>
</template>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdfa 0%, #e0f2f1 100%);
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.content-header h2 {
  font-family: 'Crimson Pro', serif;
  font-size: 2.5rem;
  color: var(--text-dark);
  font-weight: 700;
}

.property-count {
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 400;
  margin-top: 0.25rem;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .main-content {
    padding: 2rem 1rem;
  }

  .content-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .content-header h2 {
    font-size: 2rem;
  }
}
</style>
