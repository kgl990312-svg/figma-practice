/*
 * RegionButton — Figma 컴포넌트 「지역클릭원본」 (node 1175:172)
 * 메인 화면의 구 선택 버튼 (팔달·권선·장안·영통)
 *
 * 상태 (Figma 변형 「지역색깔」)
 *   selected = true  → 지역선택   (파란 배경, 흰 글자)
 *   selected = false → 지역미선택 (흰 배경, 회색 테두리)
 * Figma에 hover / pressed / disabled 상태는 없음
 *   데스크톱만 마우스를 올리면 지역선택 모습 (사용자 결정, RegionButton.css)
 */
import './RegionButton.css'

function RegionButton({ label, selected = false, onClick }) {
  return (
    <button
      type="button"
      className={`region-button${selected ? ' region-button--selected' : ''}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default RegionButton
