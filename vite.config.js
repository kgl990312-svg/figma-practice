import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 주소가 https://<사용자>.github.io/figma-practice/ 이므로 저장소 이름을 기준 경로로 둔다
  base: '/figma-practice/',
})
