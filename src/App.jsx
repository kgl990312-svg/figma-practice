import './App.css'
import MainPage from './pages/MainPage/MainPage.jsx'
import DistrictPage from './pages/DistrictPage/DistrictPage.jsx'
import { findDistrict } from './pages/DistrictPage/districts.js'
import ServicesPage from './pages/ServicesPage/ServicesPage.jsx'
import LocationPage from './pages/LocationPage/LocationPage.jsx'
import { currentPath } from './utils/url.js'

/*
 * 화면 고르기 — 라이브러리 없이 주소(pathname)를 보고 페이지를 정한다 (사용자 결정)
 * 링크를 누르면 페이지를 새로 불러오므로, 새로고침해도 같은 화면이 나온다.
 *   /                                         화면 1 메인
 *   /paldal, /gwonseon, /jangan, /yeongtong   화면 2 구 보건소
 *   /services?open=…                          화면 3 통합민원
 *   /location?gu=…                            화면 4 위치·교통 (구 값이 없거나 틀리면 팔달)
 * 그 밖의 주소는 메인을 보여 준다.
 */
function App() {
  const path = currentPath()
  const district = findDistrict(path.slice(1))

  if (district) return <DistrictPage district={district} />
  if (path === '/services') return <ServicesPage />
  if (path === '/location') {
    const gu = new URLSearchParams(window.location.search).get('gu')
    return <LocationPage district={findDistrict(gu) ?? findDistrict('paldal')} />
  }
  return <MainPage />
}

export default App
