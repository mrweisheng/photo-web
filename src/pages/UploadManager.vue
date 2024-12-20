<style lang="scss" scoped>
.upload-manager {
  padding: 24px;
  
  .category-select {
    width: 100%;
    max-width: 300px;
    margin-bottom: 24px;
    position: relative;
    
    select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background: var(--component-background);
      color: var(--text-primary);
      font-size: 14px;
      cursor: pointer;
      appearance: none;
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
      
      &:hover {
        border-color: var(--primary-color);
      }
      
      option {
        padding: 8px 12px;
        background: var(--component-background);
        color: var(--text-primary);
        
        &:hover {
          background: var(--primary-color-light);
        }
      }
    }
    
    &::after {
      content: '\f107';
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-secondary);
      pointer-events: none;
    }
  }
  
  .upload-area {
    background: var(--component-background);
    border: 2px dashed var(--border-color);
    border-radius: 8px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover, &.dragging {
      border-color: var(--primary-color);
      background: var(--primary-color-light, rgba(64, 158, 255, 0.1));
    }
    
    .upload-icon {
      font-size: 48px;
      color: var(--primary-color);
      margin-bottom: 16px;
    }
    
    .upload-text {
      color: var(--text-primary);
      margin-bottom: 8px;
    }
    
    .upload-hint {
      color: var(--text-secondary);
      font-size: 14px;
    }
  }
}

// 暗色主题下拉菜单优化
[data-theme='dark'] {
  .category-select {
    select {
      background: #1a1a1a;
      color: #ffffff;
      border-color: #333;
      
      &:hover {
        border-color: var(--primary-color);
      }
      
      option {
        background-color: #ffffff;
        color: #333;
        
        &:hover, &:focus {
          background-color: var(--primary-color);
          color: #ffffff;
        }
        
        &:checked {
          background-color: var(--primary-color-dark);
          color: #ffffff;
        }
      }
    }
    
    &:focus-within {
      select {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
      }
    }
  }
  
  .upload-area {
    &:hover, &.dragging {
      background: rgba(64, 158, 255, 0.15);
      border-color: var(--primary-color);
    }
    
    .upload-hint {
      color: var(--text-secondary);
    }
  }
}

// 全局样式覆盖
:global([data-theme='dark']) {
  select option {
    background-color: #ffffff !important;
    color: #333 !important;
    
    &:hover {
      background-color: var(--primary-color) !important;
      color: #ffffff !important;
    }
  }
}

// 移动端适配
@media (max-width: $breakpoint-sm) {
  .upload-manager {
    padding: 16px;
    
    .upload-area {
      padding: 24px;
    }
  }
}
</style> 