/*
 * Figma 비교용 미리보기 — 개발 서버에서 /preview.html 로 연다 (배포 빌드에는 포함되지 않음)
 * 컴포넌트를 Figma 컴포넌트 프레임과 같은 크기·배치로 놓아 스크린샷을 비교한다.
 * 아래 고정 px 값은 Figma 프레임을 재현하기 위한 비교용 값이며, 실제 화면 코드에는 쓰지 않는다.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegionButton from './components/button/RegionButton/RegionButton.jsx'
import MenuButton from './components/button/MenuButton/MenuButton.jsx'
import NoticeTab from './components/button/NoticeTab/NoticeTab.jsx'
import NoticeFilterButton from './components/button/NoticeFilterButton/NoticeFilterButton.jsx'
import NoticeItem from './components/card/NoticeItem/NoticeItem.jsx'
import NoticeArea from './components/section/NoticeArea/NoticeArea.jsx'
import ServiceCard from './components/card/ServiceCard/ServiceCard.jsx'
import MedicalCenterCard from './components/card/MedicalCenterCard/MedicalCenterCard.jsx'
import MainButton from './components/button/MainButton/MainButton.jsx'
import SubClickButton from './components/button/SubClickButton/SubClickButton.jsx'
import MobileNav from './components/form/MobileNav/MobileNav.jsx'
import JurisdictionService from './components/section/JurisdictionService/JurisdictionService.jsx'

const frameStyle = {
  display: 'flex',
  gap: '10px',
  padding: '20px',
  background: '#eeeeee', // Figma 컴포넌트 프레임 배경 (비교용)
}

function Frame({ title, nodeId, direction = 'row', gap = '10px', children }) {
  return (
    <section style={{ marginBottom: '24px' }}>
      <p style={{ font: 'var(--typo-caption)', marginBottom: '8px' }}>
        {title} <span style={{ color: 'var(--color-grey-400)' }}>node {nodeId}</span>
      </p>
      <div style={{ ...frameStyle, flexDirection: direction, gap, width: 'fit-content' }}>
        {children}
      </div>
    </section>
  )
}

function Preview() {
  return (
    <main style={{ padding: '16px' }}>
      <Frame title="모바일네비게이션 → MobileNav (메인형)" nodeId="1319:1812" direction="column" gap="2px">
        <div style={{ width: '328px' }}>
          <MobileNav />
        </div>
        <div style={{ width: '328px' }}>
          <MobileNav defaultSearchOpen />
        </div>
      </Frame>

      <Frame title="MobileNav (서브형)" nodeId="3056:4950" direction="column" gap="2px">
        <div style={{ width: '328px' }}>
          <MobileNav variant="sub" />
        </div>
        <div style={{ width: '328px' }}>
          <MobileNav variant="sub" defaultSearchOpen />
        </div>
      </Frame>

      <Frame title="서브클릭버튼 → SubClickButton" nodeId="1220:443" direction="column" gap="19px">
        <div style={{ width: '178px', marginLeft: '6px' }}>
          <SubClickButton label="보건소방문하기" icon="file" caption="정부24 페이지이동" href="#" newWindow />
        </div>
        <div style={{ width: '178px', marginLeft: '7px' }}>
          <SubClickButton label="보건소방문하기" icon="file" caption="정부24 페이지이동" href="#" newWindow showPressed />
        </div>
      </Frame>

      <section style={{ marginBottom: '24px' }}>
        <p style={{ font: 'var(--typo-caption)', marginBottom: '8px' }}>
          SubClickButton 아이콘 종류 <span style={{ color: 'var(--color-grey-400)' }}>(아이콘 없음 · 전화 · 바로가기, 누른 상태)</span>
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '328px' }}>
          <SubClickButton label="가까운보건소방문" />
          <SubClickButton label="치과주치의 전화문의" icon="phone" href="#" />
          <SubClickButton label="수원시보건소 홈페이지" icon="external" caption="현황참조 본 페이지이동" href="#" newWindow />
          <SubClickButton label="수원시보건소 홈페이지" icon="external" caption="현황참조 본 페이지이동" href="#" newWindow showPressed />
        </div>
      </section>

      <Frame title="메인버튼 → MainButton" nodeId="1199:1462" direction="column" gap="16px">
        <div style={{ width: '290px' }}>
          <MainButton label="전화문의 031-5191-0520" href="tel:03151910520" />
        </div>
        <div style={{ width: '290px' }}>
          <MainButton label="전화문의 031-5191-0520" variant="white" href="tel:03151910520" />
        </div>
      </Frame>

      <Frame title="의료지원센터 → MedicalCenterCard" nodeId="1273:1726" direction="column" gap="16px">
        <div style={{ width: '299px' }}>
          <MedicalCenterCard name="어울림건강지원센터" />
        </div>
        <div style={{ width: '299px' }}>
          <MedicalCenterCard name="어울림건강지원센터" showPressed />
        </div>
      </Frame>

      <Frame title="통합서비스카드 → ServiceCard" nodeId="1964:11241" gap="13px">
        <div style={{ width: '178px' }}>
          <ServiceCard label="제증명발급" icon="document" href="#" />
        </div>
        <div style={{ width: '178px' }}>
          <ServiceCard label="제증명발급" icon="document" href="#" showPressed />
        </div>
      </Frame>

      <section style={{ marginBottom: '24px' }}>
        <p style={{ font: 'var(--typo-caption)', marginBottom: '8px' }}>
          ServiceCard 4종 <span style={{ color: 'var(--color-grey-400)' }}>(메인 화면 2열, 328px)</span>
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '328px' }}>
          <ServiceCard label="제증명발급" icon="document" href="#" />
          <ServiceCard label="예방접종" icon="syringe" href="#" />
          <ServiceCard label="진료및검사" icon="stethoscope" href="#" />
          <ServiceCard label="금연서비스" icon="noSmoking" href="#" />
        </div>
      </section>

      <Frame title="지역클릭원본 → RegionButton" nodeId="1175:172">
        <div style={{ width: '98px' }}>
          <RegionButton label="팔달" selected />
        </div>
        <div style={{ width: '98px' }}>
          <RegionButton label="팔달" />
        </div>
      </Frame>

      <Frame title="메뉴버튼 → MenuButton" nodeId="1199:1522" direction="column" gap="6px">
        <div style={{ width: '132px' }}>
          <MenuButton label="모성지원" selected />
        </div>
        <div style={{ width: '132px' }}>
          <MenuButton label="모성지원" />
        </div>
      </Frame>

      <Frame title="공지사항타이틀 → NoticeTab" nodeId="1315:1429" direction="column" gap="21px">
        <div role="tablist" aria-label="미리보기" style={{ display: 'contents' }}>
          <div style={{ width: '80px' }}>
            <NoticeTab label="보건소식" />
          </div>
          <div style={{ width: '80px' }}>
            <NoticeTab label="보건소식" selected />
          </div>
        </div>
      </Frame>

      <Frame title="공지버튼완본 → NoticeFilterButton" nodeId="1317:1507" gap="13px">
        <div style={{ width: '79px' }}>
          <NoticeFilterButton label="공통" />
        </div>
        <div style={{ width: '79px' }}>
          <NoticeFilterButton label="공통" selected />
        </div>
      </Frame>

      <section style={{ marginBottom: '24px' }}>
        <p style={{ font: 'var(--typo-caption)', marginBottom: '8px' }}>
          공지텍스트원본 → NoticeItem <span style={{ color: 'var(--color-grey-400)' }}>node 1317:1517 (Figma 448px, 여백 없음)</span>
        </p>
        <ul style={{ width: '448px', background: '#ffffff' }}>
          <NoticeItem title="2026년 의료기관 신고의무자 교육 결과 제출 안내" date="2026.10.06" />
        </ul>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <p style={{ font: 'var(--typo-caption)', marginBottom: '8px' }}>
          NoticeItem 말줄임 확인 <span style={{ color: 'var(--color-grey-400)' }}>(공지영역원본 안의 328px)</span>
        </p>
        <ul style={{ width: '328px', background: '#ffffff' }}>
          <NoticeItem title="2026년 의료기관 신고의무자 교육 결과 제출 안내" date="2026.10.06" href="#" />
        </ul>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <p style={{ font: 'var(--typo-caption)', marginBottom: '8px' }}>
          공지프로토타입 → NoticeArea <span style={{ color: 'var(--color-grey-400)' }}>node 1347:2160 (328px, 공통·팔달)</span>
        </p>
        <div style={{ ...frameStyle, flexDirection: 'column', gap: '18px', width: 'fit-content' }}>
          <div style={{ width: '328px' }}>
            <NoticeArea />
          </div>
          <div style={{ width: '328px' }}>
            <NoticeArea defaultRegion="팔달" />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <p style={{ font: 'var(--typo-caption)', marginBottom: '8px' }}>
          NoticeArea 줄바꿈 확인 <span style={{ color: 'var(--color-grey-400)' }}>(320px 화면 = 콘텐츠 288px)</span>
        </p>
        <div style={{ width: '288px', background: '#ffffff' }}>
          <NoticeArea />
        </div>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <p style={{ font: 'var(--typo-caption)', marginBottom: '8px' }}>
          NoticeArea 글자 200% 확대 확인 <span style={{ color: 'var(--color-grey-400)' }}>(360px 화면 = 콘텐츠 328px)</span>
        </p>
        <div style={{ width: '328px', background: '#ffffff', fontSize: '200%' }}>
          <div style={{ zoom: 2, width: '164px' }}>
            <NoticeArea />
          </div>
        </div>
      </section>

      <Frame title="관할서비스 → JurisdictionService" nodeId="1779:2792 (328px, 메뉴를 눌러 11개 변형 확인)" direction="column">
        <div style={{ width: '328px', background: '#ffffff' }}>
          <JurisdictionService />
        </div>
      </Frame>
    </main>
  )
}

createRoot(document.getElementById('preview')).render(
  <StrictMode>
    <Preview />
  </StrictMode>,
)
