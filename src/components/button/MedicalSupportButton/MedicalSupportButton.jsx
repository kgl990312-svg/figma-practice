/*
 * MedicalSupportButton — Figma 「의료지원」 (메인 화면 node 2262:7170)
 * 메인 화면 「보건 주요 서비스」 구 버튼 아래의 안내 문장 (의료비 아이콘 + 글자)
 *
 * 누르는 버튼이 아니라 설명 카드 (사용자 결정 2026-11-09) — 연결 링크 없음
 *   "구 버튼을 누르면 그 구의 의료비지원 사업으로 간다"는 안내
 *   Figma는 테두리 상자 안에 「의료비지원」 한 단어 → 버튼처럼 보여 테두리를 없애고 문장으로 바꿈 (사용자 결정)
 *   id를 넘기면 구 버튼이 aria-describedby로 이 문장을 함께 읽어 줌
 */
import medicalCostIcon from '../../../assets/icons/medical-cost.svg'
import './MedicalSupportButton.css'

function MedicalSupportButton({ id }) {
  return (
    <p id={id} className="medical-support-button">
      {/* 아이콘은 장식이라 alt를 비움. Figma처럼 24px 칸 안에 원본 크기(21.2×21.7) 그대로 놓음 */}
      <span className="medical-support-button__icon">
        <img src={medicalCostIcon} alt="" width="21.1965" height="21.6601" />
      </span>
      <span>
        구를 선택하면 <strong className="medical-support-button__strong">의료비지원</strong> 사업을 확인할 수 있어요.
      </span>
    </p>
  )
}

export default MedicalSupportButton
