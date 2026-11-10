/*
 * LocationPage — 화면 4 위치·교통 (Figma 「모바일7 (360px-)」 node 2262:7110, 팔달 기준)
 * 주소: /location?gu=paldal | gwonseon | jangan | yeongtong — 4개 구가 이 화면 하나를 같이 쓴다
 *
 * 순서: 네비게이션(서브형) → 대제목 → 보건소 위치(주소·전화) → 지도 → 운영시간 박스 → 교통 주차 시설 → TOP 버튼(고정)
 * 구별 내용은 districts.js. 지도·지하철·주차 정보가 없는 구는 그 칸을 숨김 (사용자 결정)
 *
 * 데스크톱 (841px 이상) — Figma 「데스크탑7(1440px-)」 node 3466:3638
 *   DesktopNav → 브레드크럼 「홈 > ○○보건소 > 위치·교통」 → 제목 「보건소 위치·교통안내」(모바일 큰 제목은 「위치·교통」 — 데스크톱만 설명형 제목, 사용자 결정) → 구 바꾸기 버튼 4개
 *   → 2칸: 왼쪽(위치 안내 + 지도) | 오른쪽(운영시간 박스 + 교통 주차 시설). TOP 버튼 없음
 *   Figma 설명 자리의 「내지역버튼>」은 들어온 경로 메모라 빼고 브레드크럼으로 (사용자 결정)
 */
import MobileNav from '../../components/form/MobileNav/MobileNav.jsx'
import DesktopNav from '../../components/form/DesktopNav/DesktopNav.jsx'
import Breadcrumb from '../../components/section/Breadcrumb/Breadcrumb.jsx'
import RegionButton from '../../components/button/RegionButton/RegionButton.jsx'
import { DISTRICTS } from '../DistrictPage/districts.js'
import PageTitle from '../../components/section/PageTitle/PageTitle.jsx'
import SectionTitle from '../../components/section/SectionTitle/SectionTitle.jsx'
import LocationCard from '../../components/card/LocationCard/LocationCard.jsx'
import InfoBox from '../../components/card/InfoBox/InfoBox.jsx'
import TransportGuide from '../../components/section/TransportGuide/TransportGuide.jsx'
import TopButton from '../../components/button/TopButton/TopButton.jsx'
import './LocationPage.css'
import { toUrl } from '../../utils/url.js'

// 운영시간·휴게시간 — 4개 구 같음 (Figma, 공식 사이트 「이용시간/휴무일」과 같음)
const HOURS = [
  [{ label: '운영시간:', icon: 'clock', value: '09:00-18:00', note: '(토·일요일/공휴일휴무)' }],
  [{ label: '휴게시간:', icon: 'lunch', value: '12:00-13:00' }],
]

function LocationPage({ district }) {
  const { id, label, title, phone, location } = district

  const transport = [
    { title: '대중교통안내', icon: 'bus', label: '주변버스정류장', items: location.bus },
    { icon: 'subway', label: '주변지하철', items: location.subway },
    { icon: 'parking', label: '주차시설', items: location.parking },
  ]

  return (
    <div className="location-page container">
      {/* 네비게이션 — 모바일은 MobileNav + 큰 제목, 데스크톱은 DesktopNav + 브레드크럼 (CSS로 하나만 보임) */}
      <div className="location-page__top">
        <MobileNav variant="sub" />
        <PageTitle title="위치·교통" />
      </div>
      <div className="location-page__nav-desktop">
        <DesktopNav />
        <Breadcrumb items={[{ label: '홈', href: toUrl('/') }, { label: title, href: toUrl(`/${id}`) }, { label: '위치·교통' }]} />
      </div>

      <main className="location-page__content">
        {/* 데스크톱만 — 제목 + 구 바꾸기 버튼 (누르면 그 구의 위치·교통으로 이동) */}
        <div className="location-page__desktop-head">
          <h1 className="location-page__desktop-title">보건소 위치·교통안내</h1>
          <ul className="location-page__regions" aria-label="보건소 선택">
            {DISTRICTS.map((item) => (
              <li key={item.id}>
                <RegionButton
                  label={`${item.label}구 보건소`}
                  size="small"
                  selected={item.id === id}
                  current={item.id === id}
                  href={toUrl(`/location?gu=${item.id}`)}
                  onClick={(event) => {
                    // 지금 보고 있는 구는 다시 불러오지 않음
                    if (item.id === id) event.preventDefault()
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="location-page__columns">
          <div className="location-page__column">
            <LocationCard district={`${label}구`} address={location.address} phone={phone} />

            {location.map && (
              <div className="location-page__map">
                <iframe
                  src={location.map}
                  title={`${label}구보건소 위치 지도 (구글 지도)`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          <div className="location-page__column location-page__column--info">
            <InfoBox variant="split" groups={HOURS} />

            <section className="location-page__transport" aria-labelledby="transport-title">
              <SectionTitle id="transport-title" title="교통 주차 시설" />
              <TransportGuide groups={transport} />
            </section>
          </div>
        </div>
      </main>

      {/* TOP 버튼 — 모바일만 (데스크톱은 화면 3과 같이 뺌) */}
      <div className="location-page__top-button">
        <TopButton />
      </div>
    </div>
  )
}

export default LocationPage
