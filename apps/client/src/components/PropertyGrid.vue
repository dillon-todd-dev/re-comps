<script setup>
import PropertyCard from './PropertyCard.vue';

defineProps({
  properties: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="properties-grid">
    <PropertyCard
      v-for="property in properties"
      :key="property.id"
      :property="property"
    />
  </div>
</template>

<style scoped>
.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (max-width: 1024px) {
  .properties-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .properties-grid {
    grid-template-columns: 1fr;
  }
}
</style>
