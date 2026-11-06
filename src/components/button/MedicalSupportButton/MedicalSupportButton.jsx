/*
 * MedicalSupportButton — Figma 「의료지원」 (메인 화면 node 2262:7170)
 * 메인 화면 「보건 주요 서비스」 맨 아래의 [의료비지원] 버튼 (의료비 아이콘 + 글자)
 *
 * Figma에 상태 변형·연결 대상 없음 → 이동 대상은 아직 정하지 않음
 * href가 있으면 링크, 없으면 버튼으로 동작한다.
 */
import medicalCostIcon from '../../../assets/icons/medical-cost.svg'
import './MedicalSupportButton.css'

function MedicalSupportButton({ label = '의료비지원', href, onClick }) {
  const content = (
    <>
      {/* 아이콘은 장식이라 alt를 비움. Figma처럼 24px 칸 안에 원본 크기(21.2×21.7) 그대로 놓음 */}
      <span className="medical-support-button__icon">
        <img src={medicalCostIcon} alt="" width="21.1965" height="21.6601" />
      </span>
      <span>{label}</span>
    </>
  )

  if (href) {
    return (
      <a className="medical-support-button" href={href}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className="medical-support-button" onClick={onClick}>
      {content}
    </button>
  )
}

export default MedicalSupportButton
