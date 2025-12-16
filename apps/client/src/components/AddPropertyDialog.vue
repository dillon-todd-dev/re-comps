<script setup>
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:visible', 'property-added']);

const formData = ref({
  title: '',
  location: '',
  price: null,
  bedrooms: null,
  bathrooms: null,
  sqft: null,
  image: '',
});

const resetForm = () => {
  formData.value = {
    title: '',
    location: '',
    price: null,
    bedrooms: null,
    bathrooms: null,
    sqft: null,
    image: '',
  };
};

const closeDialog = () => {
  emit('update:visible', false);
  resetForm();
};

const handleSubmit = () => {
  if (validateForm()) {
    const property = {
      id: Date.now(),
      title: formData.value.title,
      location: formData.value.location,
      price: formData.value.price,
      bedrooms: formData.value.bedrooms,
      bathrooms: formData.value.bathrooms,
      sqft: formData.value.sqft,
      image: formData.value.image || '',
    };

    emit('property-added', property);
    closeDialog();
  }
};

const validateForm = () => {
  return (
    formData.value.title &&
    formData.value.location &&
    formData.value.price !== null &&
    formData.value.bedrooms !== null &&
    formData.value.bathrooms !== null &&
    formData.value.sqft !== null
  );
};

watch(
  () => props.visible,
  (newVal) => {
    if (!newVal) {
      resetForm();
    }
  },
);
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    modal
    header="Add New Property"
    :style="{ width: '600px' }"
    :breakpoints="{ '960px': '90vw' }"
  >
    <form @submit.prevent="handleSubmit">
      <div class="dialog-form-field">
        <label for="title">Property Title *</label>
        <InputText
          id="title"
          v-model="formData.title"
          placeholder="e.g., Modern Downtown Apartment"
          required
        />
      </div>

      <div class="dialog-form-field">
        <label for="location">Location *</label>
        <InputText
          id="location"
          v-model="formData.location"
          placeholder="e.g., Downtown District"
          required
        />
      </div>

      <div class="dialog-form-field">
        <label for="price">Price *</label>
        <InputNumber
          id="price"
          v-model="formData.price"
          mode="currency"
          currency="USD"
          placeholder="Property price"
          :min="0"
          required
        />
      </div>

      <div class="dialog-form-field">
        <label for="bedrooms">Bedrooms *</label>
        <InputNumber
          id="bedrooms"
          v-model="formData.bedrooms"
          placeholder="Number of bedrooms"
          :min="0"
          :max="20"
          required
        />
      </div>

      <div class="dialog-form-field">
        <label for="bathrooms">Bathrooms *</label>
        <InputNumber
          id="bathrooms"
          v-model="formData.bathrooms"
          placeholder="Number of bathrooms"
          :min="0"
          :max="20"
          :minFractionDigits="0"
          :maxFractionDigits="1"
          required
        />
      </div>

      <div class="dialog-form-field">
        <label for="sqft">Square Feet *</label>
        <InputNumber
          id="sqft"
          v-model="formData.sqft"
          placeholder="Property size in sqft"
          :min="0"
          required
        />
      </div>

      <div class="dialog-form-field">
        <label for="image">Image URL (optional)</label>
        <InputText
          id="image"
          v-model="formData.image"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div class="dialog-actions">
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="closeDialog"
          class="p-button-text"
          type="button"
        />
        <Button
          type="submit"
          label="Add Property"
          icon="pi pi-check"
          class="add-property-button"
        />
      </div>
    </form>
  </Dialog>
</template>

<style scoped>
.dialog-form-field {
  margin-bottom: 1.5rem;
}

.dialog-form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-dark);
}

.dialog-form-field .p-inputtext,
.dialog-form-field .p-inputnumber {
  width: 100%;
}

.dialog-form-field :deep(.p-inputtext) {
  border-radius: 12px;
  border: 2px solid var(--border-color);
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.dialog-form-field :deep(.p-inputtext:focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
}

.dialog-form-field :deep(.p-inputnumber-input) {
  border-radius: 12px;
  border: 2px solid var(--border-color);
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.dialog-form-field :deep(.p-inputnumber-input:focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
}

.dialog-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}
</style>
