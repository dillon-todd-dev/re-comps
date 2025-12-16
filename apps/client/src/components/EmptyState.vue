<script setup>
import Button from 'primevue/button';

defineEmits(['add-property']);
</script>

<template>
  <div class="empty-state">
    <i class="pi pi-home"></i>
    <h3>No Properties Yet</h3>
    <p>Start building your portfolio by adding your first property</p>
    <Button
      icon="pi pi-plus"
      label="Add Your First Property"
      class="add-property-button"
      @click="$emit('add-property')"
    />
  </div>
</template>

<style scoped>
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.empty-state i {
  font-size: 5rem;
  color: var(--text-muted);
  opacity: 0.3;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  font-family: 'Crimson Pro', serif;
  font-size: 1.75rem;
  color: var(--text-dark);
  margin-bottom: 0.75rem;
}

.empty-state p {
  color: var(--text-muted);
  font-size: 1.05rem;
  margin-bottom: 2rem;
}
</style>
