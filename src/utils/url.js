/*
 * 사이트 안 주소 도우미 — GitHub Pages처럼 사이트가 하위 폴더(/figma-practice/)에 있을 때도 링크가 맞게
 * 기준 경로는 vite.config.js의 base 값 (import.meta.env.BASE_URL)
 *
 *   toUrl('/services?open=x')  → '/figma-practice/services?open=x'
 *   toUrl('/')                 → '/figma-practice/'
 *   currentPath()              → 주소에서 기준 경로를 뺀 화면 경로 (예: '/paldal')
 *
 * 사이트 안으로 가는 링크는 꼭 toUrl()로 감싼다. tel:, https:// 같은 바깥 주소는 그대로 쓴다.
 */
const BASE = import.meta.env.BASE_URL

export function toUrl(path) {
  return BASE + path.replace(/^\//, '')
}

export function currentPath() {
  const { pathname } = window.location
  return pathname.startsWith(BASE) ? `/${pathname.slice(BASE.length)}` : pathname
}
