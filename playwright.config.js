import {defineConfig} from '@playwright/test'
export default defineConfig({
  testDir:'./tests',timeout:120000,
  use:{baseURL:'http://127.0.0.1:5187',reducedMotion:'reduce'},
  webServer:{command:'npm run build && npm run preview -- --host 127.0.0.1 --port 5187 --strictPort',url:'http://127.0.0.1:5187',reuseExistingServer:false}
})
