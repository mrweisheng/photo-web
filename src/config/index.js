const config = {
  development: {
    apiBaseUrl: 'http://localhost:3000/api',
    uploadUrl: 'http://localhost:3000/api/upload',
    maxUploadSize: 5 * 1024 * 1024, // 5MB
    maxUploadFiles: 20
  },
  production: {
    apiBaseUrl: '/api',
    uploadUrl: '/api/upload',
    maxUploadSize: 5 * 1024 * 1024,
    maxUploadFiles: 20
  }
}

export default config[import.meta.env.MODE || 'development'] 