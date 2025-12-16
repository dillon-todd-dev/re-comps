<script setup>
const props = defineProps({
  property: {
    type: Object,
    required: true,
  },
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US').format(price);
};
</script>

<template>
  <div class="property-card">
    <div class="property-image">
      <img v-if="property.image" :src="property.image" :alt="property.title" />
      <i v-else class="pi pi-home placeholder"></i>
    </div>
    <div class="property-details">
      <h3 class="property-title">{{ property.title }}</h3>
      <div class="property-location">
        <i class="pi pi-map-marker"></i>
        {{ property.location }}
      </div>
      <div class="property-price">${{ formatPrice(property.price) }}</div>
      <div class="property-features">
        <div class="feature-item">
          <i class="pi pi-th-large"></i>
          <span
            ><span class="feature-value">{{ property.bedrooms }}</span>
            beds</span
          >
        </div>
        <div class="feature-item">
          <i class="pi pi-circle"></i>
          <span
            ><span class="feature-value">{{ property.bathrooms }}</span>
            baths</span
          >
        </div>
        <div class="feature-item">
          <i class="pi pi-box"></i>
          <span
            ><span class="feature-value">{{ property.sqft }}</span> sqft</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.property-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.property-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.property-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
  background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-image .placeholder {
  font-size: 4rem;
  color: var(--primary-color);
  opacity: 0.3;
}

.property-details {
  padding: 1.5rem;
}

.property-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  font-family: 'Crimson Pro', serif;
}

.property-location {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.property-price {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.property-features {
  display: flex;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.feature-item i {
  color: var(--primary-color);
}

.feature-value {
  font-weight: 600;
  color: var(--text-dark);
}
</style>
