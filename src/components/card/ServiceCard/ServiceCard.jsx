/*
 * ServiceCard — Figma 컴포넌트 「통합서비스카드」 (node 1964:11241)
 * 메인 화면 통합민원서비스 카드 (제증명발급 · 예방접종 · 진료및검사 · 금연서비스)
 * 누르면 통합민원 화면으로 이동하며, 누른 항목이 펼쳐진 상태로 열린다 (PRD 6-1)
 *
 * 상태 (Figma 「Property 1」)
 *   미클릭 → 기본 (연한 파란 배경, 회색 테두리·글자·아이콘)
 *   클릭   → 누르는 동안 (CSS :active — 연한 파란 배경, 굵은 파란 테두리, 파란 글자·아이콘)
 * Figma에 hover / disabled 상태는 없음 → 만들지 않음
 */
import documentGrey from '../../../assets/icons/document-grey.svg'
import documentBlue from '../../../assets/icons/document-blue.svg'
import syringeGrey from '../../../assets/icons/syringe-grey.svg'
import syringeBlue from '../../../assets/icons/syringe-blue.svg'
import stethoscopeGrey from '../../../assets/icons/stethoscope-grey.svg'
import stethoscopeBlue from '../../../assets/icons/stethoscope-blue.svg'
import noSmokingGrey from '../../../assets/icons/no-smoking-grey.svg'
import noSmokingBlue from '../../../assets/icons/no-smoking-blue.svg'
import './ServiceCard.css'

// icon 값 → [기본 아이콘, 누른 상태 아이콘] (Figma 서류/블루서류, 주사/블루주사, 청진기/블루청진기, 금연/블루금연)
const ICONS = {
  document: [documentGrey, documentBlue],
  syringe: [syringeGrey, syringeBlue],
  stethoscope: [stethoscopeGrey, stethoscopeBlue],
  noSmoking: [noSmokingGrey, noSmokingBlue],
}

// showPressed: 비교용 미리보기에서 누른 모양을 고정해 보여 줄 때만 사용 (실제 화면에서는 쓰지 않음)
function ServiceCard({ label, icon = 'document', href, showPressed = false }) {
  const [iconDefault, iconPressed] = ICONS[icon] ?? ICONS.document
  // 금연 아이콘은 Figma 원본이 24px 칸 안의 18px 그림 → 같은 크기로 놓고 바깥에 3px 여백
  const size = icon === 'noSmoking' ? 18 : 24
  const iconClass = `service-card__icon${size === 18 ? ' service-card__icon--inset' : ''}`

  return (
    <a className={`service-card${showPressed ? ' service-card--pressed' : ''}`} href={href}>
      {/* 아이콘은 장식이라 alt를 비움 — 카드 이름은 글자로 읽힘 */}
      <img className={`${iconClass} service-card__icon--default`} src={iconDefault} alt="" width={size} height={size} />
      <img className={`${iconClass} service-card__icon--pressed`} src={iconPressed} alt="" width={size} height={size} />
      <span className="service-card__label">{label}</span>
    </a>
  )
}

export default ServiceCard
