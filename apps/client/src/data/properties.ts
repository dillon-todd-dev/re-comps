import { ref } from 'vue';

// Mock property data
const mockProperties = [
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    location: 'Downtown District',
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Luxury Waterfront Villa',
    location: 'Waterfront District',
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3500,
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Cozy Suburban House',
    location: 'Suburban Area',
    price: 325000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Contemporary Loft',
    location: 'Arts District',
    price: 680000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1500,
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'Elegant Penthouse Suite',
    location: 'Uptown',
    price: 2100000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Charming Garden Cottage',
    location: 'Riverside',
    price: 285000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 950,
    image:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
  },
  {
    id: 7,
    title: 'Spacious Family Home',
    location: 'Hillside',
    price: 525000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2600,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
  },
  {
    id: 8,
    title: 'Urban Studio',
    location: 'City Center',
    price: 195000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
  },
  {
    id: 9,
    title: 'Executive Townhouse',
    location: 'Business District',
    price: 875000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2200,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
  },
  {
    id: 10,
    title: 'Mediterranean Estate',
    location: 'Coastal Area',
    price: 3500000,
    bedrooms: 6,
    bathrooms: 5,
    sqft: 6000,
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
  },
];

const properties = ref([...mockProperties]);

export function useProperties() {
  const addProperty = (property: any) => {
    properties.value.unshift(property);
  };

  const removeProperty = (id: any) => {
    const index = properties.value.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      properties.value.splice(index, 1);
    }
  };

  const updateProperty = (id: any, updates: any) => {
    const index = properties.value.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      properties.value[index] = { ...properties.value[index], ...updates };
    }
  };

  return {
    properties,
    addProperty,
    removeProperty,
    updateProperty,
  };
}
