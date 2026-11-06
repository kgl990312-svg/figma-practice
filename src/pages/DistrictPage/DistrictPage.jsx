/*
 * DistrictPage — 화면 2 구 보건소 (Figma 「모바일 2 (360px-)」 node 2262:7216, 팔달 기준)
 * 주소: /paldal, /gwonseon, /jangan, /yeongtong — 4개 구가 이 화면 하나를 같이 쓴다
 *
 * 순서: 네비게이션(서브형) → 대제목 → 전화문의·위치보기 → 의료비지원 메뉴 11개 + 지원사업 아코디언 → 통합민원서비스 바로가기
 * 구마다 다른 것: 제목, 전화번호, 위치·교통 (districts.js). 의료비지원 내용은 모두 같음 (사용자 결정)
 * 문구는 Figma 완성본 그대로 (사용자 결정 — 제목 「○○보건소」, 버튼 「전화문의 번호」)
 * Figma에 TOP 버튼이 없어 넣지 않음
 *
 * 화면 이동: 위치보기 → /location?gu=구 (화면 4), 바로가기 → /services (화면 3)
 */
import MobileNav from '../../components/form/MobileNav/MobileNav.jsx'
import PageTitle from '../../components/section/PageTitle/PageTitle.jsx'
import MainButton from '../../components/button/MainButton/MainButton.jsx'
import JurisdictionService from '../../components/section/JurisdictionService/JurisdictionService.jsx'
import ShortcutButton from '../../components/button/ShortcutButton/ShortcutButton.jsx'
import locationBlue from '../../assets/icons/location-blue.svg'
import './DistrictPage.css'

function DistrictPage({ district }) {
  const { id, title, phone, location } = district

  return (
    <div className="district-page container">
      <div className="district-page__top">
        <MobileNav variant="sub" />
        <PageTitle title={title} />
      </div>

      <main className="district-page__content">
        <div className="district-page__buttons">
          {phone && (
            <MainButton variant="white" label={`전화문의 ${phone}`} href={`tel:${phone.replaceAll('-', '')}`} />
          )}
          <MainButton
            variant="white"
            label="위치보기"
            icon={locationBlue}
            href={location ? `/location?gu=${id}` : undefined}
          />
        </div>

        <section aria-label="의료비지원">
          <JurisdictionService />
        </section>

        <ShortcutButton label="통합민원서비스 바로가기" caption="거주구 관계없이 이용가능" href="/services" />
      </main>
    </div>
  )
}

export default DistrictPage
