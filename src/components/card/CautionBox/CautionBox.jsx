/*
 * CautionBox — Figma 컴포넌트 「신청카드박스원본」 (node 1195:1258)
 * 주황색 주의 안내 박스: 경고 아이콘 + 제목, 아래 안내문
 * 메인 화면 「보건 주요 서비스」의 "해당 지원 신청 전, 꼭 확인해주세요." 에 쓴다
 *
 * Figma에 상태 변형 없음 (누르는 요소가 아님)
 */
import warningIcon from '../../../assets/icons/warning.svg'
import './CautionBox.css'

function CautionBox({ title, children }) {
  return (
    <div className="caution-box">
      <p className="caution-box__title">
        {/* 아이콘은 장식이라 alt를 비움 — 주의 내용은 글자로 읽힘 */}
        <img className="caution-box__icon" src={warningIcon} alt="" width="24" height="24" />
        {title}
      </p>
      <p className="caution-box__body">{children}</p>
    </div>
  )
}

export default CautionBox
