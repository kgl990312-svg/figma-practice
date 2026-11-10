/*
 * ServicesPage — 화면 3 통합민원 (Figma 「모바일 3~6」 — 한 페이지의 펼침 상태 4가지)
 * 주소: /services?open=certificate | vaccination | treatment | no-smoking
 *
 * 순서: 네비게이션(서브형) → 대제목 → 섹션타이틀 → 아코디언 4개 → TOP 버튼(고정)
 * 동작
 *   - 주소의 open 값에 맞는 항목이 펼쳐진 채로 열림. 값이 없으면 제증명발급 (Figma 모바일 3)
 *   - 한 번에 하나만 펼침 (사용자 결정). 펼친 항목을 주소에도 반영해 새로고침해도 유지
 *
 * 데스크톱 (841px 이상) — Figma 「데스크탑3~6(1440px-)」 node 3466:3566 등
 *   네비게이션은 DesktopNav + 브레드크럼, 큰 제목(PageTitle)은 숨김
 *     브레드크럼은 들어온 길 기준 (사용자 결정): 구 보건소 화면에서 왔으면(주소 from=구) 「홈 > ○○보건소 > 통합민원」,
 *     그 밖에는 「홈 > 통합민원」
 *   문구는 모바일과 같게 (Figma 데스크톱의 「통합민원」 제목·파란 안내 상자는 수정 전 상태 — 사용자 확인)
 *   TOP 버튼 없음 (사용자 결정). 아코디언은 좌우 16px 들여 쓰고 사이 간격 36px (Figma)
 */
import { useState } from 'react'
import MobileNav from '../../components/form/MobileNav/MobileNav.jsx'
import DesktopNav from '../../components/form/DesktopNav/DesktopNav.jsx'
import Breadcrumb from '../../components/section/Breadcrumb/Breadcrumb.jsx'
import PageTitle from '../../components/section/PageTitle/PageTitle.jsx'
import SectionTitle from '../../components/section/SectionTitle/SectionTitle.jsx'
import Accordion from '../../components/section/Accordion/Accordion.jsx'
import InfoBox from '../../components/card/InfoBox/InfoBox.jsx'
import TopButton from '../../components/button/TopButton/TopButton.jsx'
import { SERVICES, NO_SMOKING_INFO } from './services.js'
import { DISTRICTS, findDistrict } from '../DistrictPage/districts.js'
import './ServicesPage.css'
import { toUrl } from '../../utils/url.js'

// 가까운보건소방문 → 위치·교통 화면 (사용자 결정 2026-11-10)
//   구 보건소 화면에서 왔으면(from=구) 그 구로 바로 이동
//   그 밖에는 구 4곳을 고르는 상자 — 모바일 위치·교통 화면에는 구를 바꾸는 버튼이 없어서
const NEARBY_NOTICE = {
  title: '가까운 보건소 방문',
  description: '방문할 보건소를 골라 주세요. 위치와 교통 안내를 볼 수 있어요.',
  links: DISTRICTS.map((district) => ({
    label: `${district.label}구 보건소`,
    href: toUrl(`/location?gu=${district.id}`),
  })),
}

function fillLocation(button) {
  if (!button.toLocation) return button
  const from = findDistrict(new URLSearchParams(window.location.search).get('from'))
  return from ? { ...button, href: toUrl(`/location?gu=${from.id}`) } : { ...button, notice: NEARBY_NOTICE }
}

const ITEMS = SERVICES.map((service) => {
  const sections = service.sections?.map((section) => ({
    ...section,
    buttons: section.buttons?.map(fillLocation),
  }))
  return service.id === 'no-smoking'
    ? { ...service, sections, extra: <InfoBox groups={NO_SMOKING_INFO} /> }
    : { ...service, sections }
})

function getInitialOpen() {
  const open = new URLSearchParams(window.location.search).get('open')
  return SERVICES.some((service) => service.id === open) ? open : SERVICES[0].id
}

// 브레드크럼 — 구 보건소 화면에서 들어왔으면 그 구를 가운데에 넣음
function getBreadcrumb() {
  const from = findDistrict(new URLSearchParams(window.location.search).get('from'))
  return [
    { label: '홈', href: toUrl('/') },
    ...(from ? [{ label: from.title, href: toUrl(`/${from.id}`) }] : []),
    { label: '통합민원' },
  ]
}

function ServicesPage() {
  const [openId, setOpenId] = useState(getInitialOpen)

  // 펼친 항목을 주소에 반영 (from 등 다른 값은 그대로 둠)
  function toggle(id) {
    const next = id === openId ? null : id
    setOpenId(next)
    const params = new URLSearchParams(window.location.search)
    if (next) params.set('open', next)
    else params.delete('open')
    const query = params.toString()
    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname)
  }

  return (
    <div className="services-page container">
      {/* 네비게이션 — 모바일은 MobileNav + 큰 제목, 데스크톱은 DesktopNav + 브레드크럼 (CSS로 하나만 보임) */}
      <div className="services-page__top">
        <MobileNav variant="sub" />
        <PageTitle title="통합민원" />
      </div>
      <div className="services-page__nav-desktop">
        <DesktopNav />
        <Breadcrumb items={getBreadcrumb()} />
        {/* 데스크톱에서는 큰 제목이 없어 화면 낭독기용 제목만 둠 */}
        <h1 className="sr-only">통합민원</h1>
      </div>

      <main className="services-page__content">
        <section className="services-page__section" aria-labelledby="services-title">
          <SectionTitle
            id="services-title"
            title="통합민원서비스"
            description="거주 구와 관계없이 이용할 수 있는 서비스입니다. 가까운 보건소로 방문하세요."
          />
          <Accordion items={ITEMS} openId={openId} onToggle={toggle} spacing="loose" />
        </section>
      </main>

      {/* TOP 버튼 — 모바일만 (데스크톱은 사용자 결정으로 뺌) */}
      <div className="services-page__top-button">
        <TopButton />
      </div>
    </div>
  )
}

export default ServicesPage
