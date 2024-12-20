<template>
  <div class="category-manager">
    <div class="page-header">
      <h2>分类管理</h2>
      <button class="add-btn" @click="showAddModal = true">
        <i class="fas fa-plus"></i>
        新增分类
      </button>
    </div>

    <div class="categories-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>分类名称</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>{{ formatDate(category.created_at) }}</td>
            <td>
              <button class="action-btn edit" @click="editCategory(category)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="action-btn delete" @click="confirmDelete(category)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 新增/编辑模态框 -->
    <Modal 
      v-model="showAddModal"
      :title="isEdit ? '编辑分类' : '新增分类'"
      @confirm="handleSubmit"
      @cancel="resetForm"
    >
      <div class="form-group">
        <label>分类名称</label>
        <input 
          v-model="formData.name"
          type="text"
          class="form-input"
          placeholder="请输入分类名称"
        >
      </div>
    </Modal>

    <!-- 删除确认模态框 -->
    <Modal
      v-model="showDeleteModal"
      title="删除确认"
      @confirm="handleDelete"
      @cancel="selectedCategory = null"
    >
      <p>确定要删除分类"{{ selectedCategory?.name }}"吗？</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Modal from '../components/common/Modal.vue'
import { useCategoryStore } from '../store/category'
import { categoryApi } from '../api/category'

const categoryStore = useCategoryStore()
const categories = ref([])
const showAddModal = ref(false)
const showDeleteModal = ref(false)
const isEdit = ref(false)
const selectedCategory = ref(null)
const formData = ref({
  name: ''
})

// 获取分类列表
const fetchCategories = async () => {
  try {
    await categoryStore.fetchCategories()
    categories.value = categoryStore.categories
  } catch (error) {
    console.error('获取分类列表失败:', error)
  }
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 新增/编辑分类
const handleSubmit = async () => {
  if (!formData.value.name.trim()) {
    alert('请输入分类名称')
    return
  }

  try {
    if (isEdit.value) {
      await categoryApi.updateCategory(selectedCategory.value.id, formData.value.name)
    } else {
      await categoryStore.addCategory(formData.value.name)
    }
    resetForm()
    await fetchCategories()
  } catch (error) {
    console.error('保存分类失败:', error)
    alert(error.message || '操作失败')
  }
}

// 编辑分类
const editCategory = (category) => {
  isEdit.value = true
  selectedCategory.value = category
  formData.value = { name: category.name }
  showAddModal.value = true
}

// 删除分类
const handleDelete = async () => {
  if (!selectedCategory.value) return
  
  try {
    await categoryApi.deleteCategory(selectedCategory.value.id)
    showDeleteModal.value = false
    selectedCategory.value = null
    await fetchCategories()
  } catch (error) {
    console.error('删除分类失败:', error)
    alert(error.message || '删除失败')
  }
}

// 确认删除
const confirmDelete = (category) => {
  selectedCategory.value = category
  showDeleteModal.value = true
}

// 重置表单
const resetForm = () => {
  formData.value = { name: '' }
  showAddModal.value = false
  isEdit.value = false
  selectedCategory.value = null
}

onMounted(() => {
  fetchCategories()
})
</script>

<style lang="scss" scoped>
.category-manager {
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  h2 {
    margin: 0;
    font-size: 20px;
    color: var(--text-primary);
  }
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: var(--primary-color-dark);
  }
}

.categories-table {
  background: var(--component-background);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px var(--shadow-color);
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
      color: var(--text-primary);
    }
    
    th {
      font-weight: 600;
      background: var(--background-color);
    }
  }
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  margin-right: 8px;
  
  &.edit {
    color: var(--primary-color);
  }
  
  &.delete {
    color: var(--danger-color);
  }
  
  &:hover {
    opacity: 0.8;
  }
}

.form-group {
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    color: var(--text-primary);
  }
  
  .form-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: var(--component-background);
    color: var(--text-primary);
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    
    &:hover {
      border-color: var(--primary-color-dark);
    }
  }
}
</style> 