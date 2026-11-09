import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages는 /figma-practice/paldal 같은 주소를 새로고침하면 파일이 없어 404.html을 보여 준다
// → 빌드 끝에 index.html을 404.html로 복사해 두면 404 대신 사이트가 열리고, App이 주소를 보고 화면을 고른다
const githubPages404 = {
  name: 'github-pages-404',
  apply: 'build',
  closeBundle() {
    const dist = resolve(import.meta.dirname, 'dist')
    copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), githubPages404],
  // GitHub Pages 주소가 https://<사용자>.github.io/figma-practice/ 이므로 저장소 이름을 기준 경로로 둔다
  base: '/figma-practice/',
})
