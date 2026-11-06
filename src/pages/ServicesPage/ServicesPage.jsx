/*
 * ServicesPage — 화면 3 통합민원 (Figma 「모바일 3~6」 — 한 페이지의 펼침 상태 4가지)
 * 주소: /services?open=certificate | vaccination | treatment | no-smoking
 *
 * 순서: 네비게이션(서브형) → 대제목 → 섹션타이틀 → 아코디언 4개 → TOP 버튼(고정)
 * 동작
 *   - 주소의 open 값에 맞는 항목이 펼쳐진 채로 열림. 값이 없으면 제증명발급 (Figma 모바일 3)
 *   - 한 번에 하나만 펼침 (사용자 결정). 펼친 항목을 주소에도 반영해 새로고침해도 유지
 */
import { useState } from 'react'
import MobileNav from '../../components/form/MobileNav/MobileNav.jsx'
import PageTitle from '../../components/section/PageTitle/PageTitle.jsx'
import SectionTitle from '../../components/section/SectionTitle/SectionTitle.jsx'
import Accordion from '../../components/section/Accordion/Accordion.jsx'
import InfoBox from '../../components/card/InfoBox/InfoBox.jsx'
import TopButton from '../../components/button/TopButton/TopButton.jsx'
import { SERVICES, NO_SMOKING_INFO } from './services.js'
import './ServicesPage.css'

const ITEMS = SERVICES.map((service) =>
  service.id === 'no-smoking' ? { ...service, extra: <InfoBox groups={NO_SMOKING_INFO} /> } : service,
)

function getInitialOpen() {
  const open = new URLSearchParams(window.location.search).get('open')
  return SERVICES.some((service) => service.id === open) ? open : SERVICES[0].id
}

function ServicesPage() {
  const [openId, setOpenId] = useState(getInitialOpen)

  function toggle(id) {
    const next = id === openId ? null : id
    setOpenId(next)
    const url = next ? `?open=${next}` : window.location.pathname
    window.history.replaceState(null, '', url)
  }

  return (
    <div className="services-page container">
      <div className="services-page__top">
        <MobileNav variant="sub" />
        <PageTitle title="통합민원" />
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

      <TopButton />
    </div>
  )
}

export default ServicesPage
