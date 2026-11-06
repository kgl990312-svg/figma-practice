/*
 * MenuButton — Figma 컴포넌트 「메뉴버튼」 (node 1199:1522)
 * 화면 2(팔달구보건소)의 의료비지원 메뉴 선택 버튼 (모성지원 등 11개)
 *
 * 상태 (Figma 「속성 1」)
 *   selected = true  → 클릭메뉴버튼   (파란 배경, 흰 글자)
 *   selected = false → 미클릭메뉴버튼 (흰 배경, 파란 테두리·글자)
 * Figma에 hover / pressed / disabled 상태는 없음 → 만들지 않음
 */
import './MenuButton.css'

function MenuButton({ label, selected = false, onClick }) {
  return (
    <button
      type="button"
      className={`menu-button${selected ? ' menu-button--selected' : ''}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default MenuButton
