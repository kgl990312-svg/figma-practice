/*
 * NoticeFilterButton — Figma 컴포넌트 「공지버튼완본」 (node 1317:1507)
 * 메인 화면 공지사항의 지역 필터 버튼 (공통 · 팔달 · 권선 · 장안 · 영통)
 *
 * 상태 (Figma 「속성 1」)
 *   selected = true  → 공지클릭   (연한 파란 배경, 굵은 파란 테두리, 큰 글자)
 *   selected = false → 공지미클릭 (흰 배경, 회색 테두리·글자)
 * Figma에 hover / pressed / disabled 상태는 없음 → 만들지 않음
 */
import './NoticeFilterButton.css'

function NoticeFilterButton({ label, selected = false, onClick }) {
  return (
    <button
      type="button"
      className={`notice-filter-button${selected ? ' notice-filter-button--selected' : ''}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default NoticeFilterButton
