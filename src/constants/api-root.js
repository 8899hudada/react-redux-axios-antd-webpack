import DEV_API_ROOT from '@root/config/dev-api-root'

const API_ROOT = {
  dev: DEV_API_ROOT,
  mock: DEV_API_ROOT,
  test: 'http//127.0.0.1:8080',
  prod: 'http//127.0.0.1:8080'
}

export default API_ROOT