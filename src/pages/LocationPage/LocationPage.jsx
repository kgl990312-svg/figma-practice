/*
 * LocationPage — 화면 4 위치·교통 (Figma 「모바일7 (360px-)」 node 2262:7110, 팔달 기준)
 * 주소: /location?gu=paldal | gwonseon | jangan | yeongtong — 4개 구가 이 화면 하나를 같이 쓴다
 *
 * 순서: 네비게이션(서브형) → 대제목 → 보건소 위치(주소·전화) → 지도 → 운영시간 박스 → 교통 주차 시설 → TOP 버튼(고정)
 * 구별 내용은 districts.js. 지도·지하철·주차 정보가 없는 구는 그 칸을 숨김 (사용자 결정)
 */
import MobileNav from '../../components/form/MobileNav/MobileNav.jsx'
import PageTitle from '../../components/section/PageTitle/PageTitle.jsx'
import SectionTitle from '../../components/section/SectionTitle/SectionTitle.jsx'
import LocationCard from '../../components/card/LocationCard/LocationCard.jsx'
import InfoBox from '../../components/card/InfoBox/InfoBox.jsx'
import TransportGuide from '../../components/section/TransportGuide/TransportGuide.jsx'
import TopButton from '../../components/button/TopButton/TopButton.jsx'
import './LocationPage.css'

// 운영시간·휴게시간 — 4개 구 같음 (Figma, 공식 사이트 「이용시간/휴무일」과 같음)
const HOURS = [
  [{ label: '운영시간:', icon: 'clock', value: '09:00-18:00', note: '(토·일요일/공휴일휴무)' }],
  [{ label: '휴게시간:', icon: 'lunch', value: '12:00-13:00' }],
]

function LocationPage({ district }) {
  const { label, phone, location } = district

  const transport = [
    { title: '대중교통안내', icon: 'bus', label: '주변버스정류장', items: location.bus },
    { icon: 'subway', label: '주변지하철', items: location.subway },
    { icon: 'parking', label: '주차시설', items: location.parking },
  ]

  return (
    <div className="location-page container">
      <div className="location-page__top">
        <MobileNav variant="sub" />
        <PageTitle title="위치·교통" />
      </div>

      <main className="location-page__content">
        <LocationCard district={`${label}구`} address={location.address} phone={phone} />

        {location.map && (
          <div className="location-page__map">
            <img src={location.map} alt={`${label}구보건소 위치 지도`} width="989" height="673" />
          </div>
        )}

        <InfoBox variant="split" groups={HOURS} />

        <section className="location-page__transport" aria-labelledby="transport-title">
          <SectionTitle id="transport-title" title="교통 주차 시설" />
          <TransportGuide groups={transport} />
        </section>
      </main>

      <TopButton />
    </div>
  )
}

export default LocationPage
