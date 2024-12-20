// 文件类型和大小限制
export const FILE_CONSTRAINTS = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
  maxFiles: 20
}

// 验证单个文件
export const validateFile = (file) => {
  // 检查文件类型
  if (!FILE_CONSTRAINTS.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: '不支持的文件格式，仅支持 JPG、PNG、GIF 格式'
    }
  }
  
  // 检查文件大小
  if (file.size > FILE_CONSTRAINTS.maxSize) {
    return {
      valid: false,
      error: '文件大小不能超过 5MB'
    }
  }
  
  return {
    valid: true,
    error: null
  }
}

// 验证文件列表
export const validateFiles = (files) => {
  if (files.length > FILE_CONSTRAINTS.maxFiles) {
    return {
      valid: false,
      error: `一次最多只能上传 ${FILE_CONSTRAINTS.maxFiles} 个文件`
    }
  }
  
  for (const file of files) {
    const result = validateFile(file)
    if (!result.valid) {
      return result
    }
  }
  
  return {
    valid: true,
    error: null
  }
} 