<template>
  <div class="category-selector">
    <label>选择分类</label>
    <select 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="selector"
    >
      <option value="">请选择分类</option>
      <option 
        v-for="category in categories" 
        :key="category.id" 
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '../../store/category'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  }
})

defineEmits(['update:modelValue'])

const categoryStore = useCategoryStore()
const categories = ref([])

onMounted(async () => {
  await categoryStore.fetchCategories()
  categories.value = categoryStore.categories
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.category-selector {
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    color: $text-primary;
  }
}

.selector {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid $border-color;
  border-radius: 4px;
  background: var(--component-background);
  color: $text-primary;
  
  &:focus {
    outline: none;
    border-color: $primary-color;
  }
  
  option {
    padding: 8px;
    background: var(--component-background);
    color: var(--text-primary);
    
    &:hover {
      background: var(--primary-color);
      color: #fff;
    }
  }
}
</style> 