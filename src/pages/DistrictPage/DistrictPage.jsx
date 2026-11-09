/*
 * DistrictPage — 화면 2 구 보건소 (Figma 「모바일 2 (360px-)」 node 2262:7216, 팔달 기준)
 * 주소: /paldal, /gwonseon, /jangan, /yeongtong — 4개 구가 이 화면 하나를 같이 쓴다
 *
 * 순서: 네비게이션(서브형) → 대제목 → 전화문의·위치보기 → 의료비지원 메뉴 11개 + 지원사업 아코디언 → 통합민원서비스 바로가기
 * 구마다 다른 것: 제목, 전화번호, 위치·교통 (districts.js). 의료비지원 내용은 모두 같음 (사용자 결정)
 * 문구는 Figma 완성본 그대로 (사용자 결정 — 제목 「○○보건소」, 버튼 「전화문의 번호」)
 * Figma에 TOP 버튼이 없어 넣지 않음
 *
 * 화면 이동: 위치보기 → /location?gu=구 (화면 4), 바로가기 → /services?from=구 (화면 3)
 *   from은 화면 3 데스크톱 브레드크럼 「홈 > ○○보건소 > 통합민원」에 쓰는 표시 (사용자 결정)
 *
 * 데스크톱 (841px 이상) — Figma 「데스크탑2(1440px-)」 node 3466:3704
 *   네비게이션은 DesktopNav, 큰 제목(PageTitle) 대신 「○○구 주민 전용 서비스」 제목 + 주의 박스(데스크톱만, 사용자 결정)
 *     Figma 처음 문구 「관할서비스」 → 행정 용어 대신 쉬운 말로 바꿈 (사용자 결정 2026-11-09)
 *   Figma 설명 자리의 「내지역버튼>」은 들어온 경로 메모 → 대신 네비게이션 아래 브레드크럼 「홈 > ○○보건소」 (사용자 결정)
 *   「○○보건소」 제목과 전화문의·위치보기 버튼을 파란 테두리 상자에 넣고 버튼은 나란히
 *   전화문의: 모바일은 전화 연결, 데스크톱은 누르면 번호 복사 (사용자 결정 3A)
 */
import MobileNav from '../../components/form/MobileNav/MobileNav.jsx'
import DesktopNav from '../../components/form/DesktopNav/DesktopNav.jsx'
import SectionTitle from '../../components/section/SectionTitle/SectionTitle.jsx'
import CautionBox from '../../components/card/CautionBox/CautionBox.jsx'
import Breadcrumb from '../../components/section/Breadcrumb/Breadcrumb.jsx'
import PageTitle from '../../components/section/PageTitle/PageTitle.jsx'
import MainButton from '../../components/button/MainButton/MainButton.jsx'
import JurisdictionService from '../../components/section/JurisdictionService/JurisdictionService.jsx'
import ShortcutButton from '../../components/button/ShortcutButton/ShortcutButton.jsx'
import locationBlue from '../../assets/icons/location-blue.svg'
import locationWhite from '../../assets/icons/location-white.svg'
import './DistrictPage.css'

function DistrictPage({ district }) {
  const { id, label, title, phone, location } = district

  return (
    <div className="district-page container">
      {/* 네비게이션 — 모바일은 MobileNav + 큰 제목, 데스크톱은 DesktopNav (CSS로 하나만 보임) */}
      <div className="district-page__top">
        <MobileNav variant="sub" />
        <PageTitle title={title} />
      </div>
      <div className="district-page__nav-desktop">
        <DesktopNav />
        <Breadcrumb items={[{ label: '홈', href: '/' }, { label: title }]} />
      </div>

      <main className="district-page__content">
        {/* 데스크톱만 — 「○○구 주민 전용 서비스」 제목 + 주의 박스 */}
        <section className="district-page__intro" aria-labelledby="district-intro">
          <SectionTitle id="district-intro" title={`${label}구 주민 전용 서비스`} />
          <CautionBox title="해당 지원 신청 전, 꼭 확인해주세요.">
            일부 사업은 실거주지가 아닌 주민등록등본에 등록된 주소의 관할 보건소에서만 신청할 수 있습니다.
          </CautionBox>
        </section>

        <div className="district-page__box">
          {/* 데스크톱 제목 — 모바일은 위의 PageTitle이 제목 */}
          <h1 className="district-page__box-title">{title}</h1>
          <div className="district-page__buttons">
            {phone && (
              <>
                <div className="district-page__mobile-only">
                  <MainButton variant="white" label={`전화문의 ${phone}`} href={`tel:${phone.replaceAll('-', '')}`} />
                </div>
                <div className="district-page__desktop-only">
                  <MainButton variant="white" label={`전화문의 ${phone}`} copyText={phone} />
                </div>
              </>
            )}
            <MainButton
              variant="white"
              label="위치보기"
              icon={locationBlue}
              hoverIcon={locationWhite}
              href={location ? `/location?gu=${id}` : undefined}
            />
          </div>
        </div>

        <section aria-label="의료비지원">
          <JurisdictionService />
        </section>

        <ShortcutButton label="통합민원서비스 바로가기" caption="거주구 관계없이 이용가능" href={`/services?from=${id}`} />
      </main>
    </div>
  )
}

export default DistrictPage
