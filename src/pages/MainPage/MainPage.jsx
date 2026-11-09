/*
 * MainPage — 화면 1 메인 (Figma 「모바일 1(360px-)」 node 2262:7155)
 *
 * 순서: 네비게이션 → 배너 → 보건 주요 서비스 → 통합민원서비스 → 수원시 의료센터 → 공지사항 → 하단고정긴급
 * 문구와 구 버튼 상태는 Figma 완성본 그대로 (사용자 결정 — PRD와 다른 부분은 비교 보고에 정리)
 *
 * 화면 이동 (라이브러리 없이 주소 링크로 이동)
 *   - 구 버튼 → /paldal, /gwonseon, /jangan, /yeongtong (화면 2)
 *   - 통합민원 카드 → /services?open=… (화면 3, 누른 항목이 펼쳐진 상태)
 */
import { useState } from 'react'
import MobileNav from '../../components/form/MobileNav/MobileNav.jsx'
import DesktopNav from '../../components/form/DesktopNav/DesktopNav.jsx'
import SectionTitle from '../../components/section/SectionTitle/SectionTitle.jsx'
import CautionBox from '../../components/card/CautionBox/CautionBox.jsx'
import RegionButton from '../../components/button/RegionButton/RegionButton.jsx'
import MedicalSupportButton from '../../components/button/MedicalSupportButton/MedicalSupportButton.jsx'
import ServiceCard from '../../components/card/ServiceCard/ServiceCard.jsx'
import MedicalCenterCard from '../../components/card/MedicalCenterCard/MedicalCenterCard.jsx'
import NoticeTab from '../../components/button/NoticeTab/NoticeTab.jsx'
import NoticeArea from '../../components/section/NoticeArea/NoticeArea.jsx'
import EmergencyBar from '../../components/section/EmergencyBar/EmergencyBar.jsx'
import { DISTRICTS } from '../DistrictPage/districts.js'
import banner from '../../assets/images/banner.jpg'
import './MainPage.css'

// 구 버튼 — 누르면 그 구의 화면 2(/paldal 등)로 이동
const REGIONS = DISTRICTS.map((district) => ({ label: district.label, href: `/${district.id}` }))

// 통합민원 카드 — open 값은 화면 3에서 펼칠 아코디언
const SERVICES = [
  { label: '제증명발급', icon: 'document', open: 'certificate' },
  { label: '예방접종', icon: 'syringe', open: 'vaccination' },
  { label: '진료및검사', icon: 'stethoscope', open: 'treatment' },
  { label: '금연 서비스', icon: 'noSmoking', open: 'no-smoking' },
]

// 의료센터 — phone이 있으면 카드를 누를 때 전화 연결(tel:), 없으면 카드 모양만 보임
// 번호 출처: 수원시보건소 홈페이지 (사용자 확인, 2026-11-09)
// 치매안심센터는 주민등록상 주소지 구마다 번호가 다름 → 구별 번호(districts.js dementiaPhone)를 regions로 넘김
const MEDICAL_CENTERS = [
  { name: '어울림건강지원센터', phone: '031-5191-0162' },
  { name: '정신보건센터', phone: '031-253-5737' },
  {
    name: '치매안심센터',
    regions: DISTRICTS.map((district) => ({ label: district.label, phone: district.dementiaPhone })),
  },
]

const NOTICE_TABS = ['보건소식', '고시·공고', '카드뉴스']

function NoticeTabs() {
  const [selected, setSelected] = useState(0)

  // 탭 키보드 이동: 왼쪽/오른쪽 화살표
  function handleKeyDown(event) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
    if (!step) return
    const next = (selected + step + NOTICE_TABS.length) % NOTICE_TABS.length
    setSelected(next)
    event.currentTarget.querySelectorAll('[role="tab"]')[next].focus()
  }

  return (
    <div className="main-page__notice">
      <div className="main-page__tabs" role="tablist" aria-label="공지사항" onKeyDown={handleKeyDown}>
        {NOTICE_TABS.map((label, index) => (
          <NoticeTab
            key={label}
            id={`notice-tab-${index}`}
            controls="notice-panel"
            label={label}
            selected={index === selected}
            onClick={() => setSelected(index)}
          />
        ))}
      </div>
      {/* 공지 데이터는 보건소식 것만 있어 세 탭 모두 같은 목록을 보여 줌 */}
      <div id="notice-panel" role="tabpanel" aria-labelledby={`notice-tab-${selected}`}>
        <NoticeArea />
      </div>
    </div>
  )
}

function MainPage() {
  const [region, setRegion] = useState(null) // Figma처럼 처음에는 선택 없음

  function selectRegion({ label, href }) {
    setRegion(label)
    if (href) window.location.href = href
  }

  return (
    <div className="main-page container">
      {/* 네비게이션 — 모바일은 MobileNav, 데스크톱(841px 이상)은 DesktopNav (CSS로 하나만 보임) */}
      <div className="main-page__nav-mobile">
        <MobileNav />
      </div>
      <div className="main-page__nav-desktop">
        <DesktopNav />
      </div>

      <main className="main-page__content">
        <h1 className="sr-only">수원시보건소</h1>

        <img
          className="main-page__banner"
          src={banner}
          alt="우리 동네 건강 파트너. 건강한 오늘, 행복한 내일. 수원시 보건소가 함께합니다. 임산부부터 아이, 어르신까지 온 가족 건강을 위한."
          width="1376"
          height="768"
        />

        <section className="main-page__section" aria-labelledby="main-health">
          <SectionTitle id="main-health" title="보건 주요 서비스" />
          <CautionBox title="해당 지원 신청 전, 꼭 확인해주세요.">
            일부 사업은 실거주지가 아닌 주민등록등본에 등록된 주소의 관할 보건소에서만 신청할 수 있습니다.
          </CautionBox>
          <div className="main-page__region-box">
            <p className="main-page__region-guide" id="main-region-guide">
              주민등록상 주소지 구를 선택해주세요.
            </p>
            <ul className="main-page__regions" aria-labelledby="main-region-guide">
              {REGIONS.map((item) => (
                <li key={item.label}>
                  <RegionButton
                    label={item.label}
                    selected={region === item.label}
                    onClick={() => selectRegion(item)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <MedicalSupportButton />
        </section>

        <section className="main-page__section" aria-labelledby="main-services">
          <SectionTitle
            id="main-services"
            title="통합민원서비스"
            description="거주 구와 관계없이 이용할 수 있는 서비스입니다. 가까운 보건소로 방문하세요."
          />
          <ul className="main-page__services">
            {SERVICES.map((service) => (
              <li key={service.open}>
                <ServiceCard label={service.label} icon={service.icon} href={`/services?open=${service.open}`} />
              </li>
            ))}
          </ul>
        </section>

        <section className="main-page__section" aria-labelledby="main-centers">
          <SectionTitle
            id="main-centers"
            title="수원시 의료센터"
            description="수원시민 대상입니다. 자세한 이용 대상 센터에 문의주세요."
          />
          <ul className="main-page__centers">
            {MEDICAL_CENTERS.map((center) => (
              <li key={center.name}>
                <MedicalCenterCard name={center.name} phone={center.phone} regions={center.regions} />
              </li>
            ))}
          </ul>
        </section>

        <section className="main-page__section" aria-label="공지사항">
          <NoticeTabs />
        </section>
      </main>

      <EmergencyBar />
    </div>
  )
}

export default MainPage
