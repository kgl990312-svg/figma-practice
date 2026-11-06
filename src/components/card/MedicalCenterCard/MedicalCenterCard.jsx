/*
 * MedicalCenterCard — Figma 컴포넌트 「의료지원센터」 (node 1273:1726)
 * 메인 화면 「수원시 의료센터」의 센터 카드 (어울림건강지원센터 · 정신보건센터 · 치매안심센터)
 * 누르면 전화가 바로 연결된다 (tel:, 이동 안내 팝업 없음 — PRD 6-1)
 *
 * 상태 (Figma 「속성 1」)
 *   기본 → 연한 파란 배경, 회색 테두리, 「전화문의」 회색
 *   클릭 → 누르는 동안 (CSS :active — 연파랑 배경, 굵은 남색 테두리, 「전화문의」 파랑)
 * Figma에 hover / disabled 상태는 없음 → 만들지 않음
 *
 * Figma와 다른 점: 「전화문의」 글자가 Figma에서는 Inter 폰트 → Pretendard GOV로 맞춤 (결정 J)
 */
import phoneGrey from '../../../assets/icons/phone-grey.svg'
import phoneBlue from '../../../assets/icons/phone-blue.svg'
import './MedicalCenterCard.css'

// showPressed: 비교용 미리보기에서 누른 모양을 고정해 보여 줄 때만 사용 (실제 화면에서는 쓰지 않음)
function MedicalCenterCard({ name, phone, showPressed = false }) {
  const className = `medical-center-card${showPressed ? ' medical-center-card--pressed' : ''}`
  const content = (
    <>
      <span className="medical-center-card__name">{name}</span>
      <span className="medical-center-card__call">
        전화문의
        {/* 아이콘은 장식이라 alt를 비움 */}
        <img className="medical-center-card__icon medical-center-card__icon--default" src={phoneGrey} alt="" width="20" height="20" />
        <img className="medical-center-card__icon medical-center-card__icon--pressed" src={phoneBlue} alt="" width="20" height="20" />
      </span>
    </>
  )

  // 전화번호가 없으면 링크가 아닌 카드 모양만 보여 준다 (번호를 지어내지 않음)
  if (!phone) {
    return <div className={className}>{content}</div>
  }

  return (
    <a
      className={className}
      href={`tel:${phone.replaceAll('-', '')}`}
      aria-label={`${name} 전화문의 ${phone}`}
    >
      {content}
    </a>
  )
}

export default MedicalCenterCard
