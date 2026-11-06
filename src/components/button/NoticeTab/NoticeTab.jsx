/*
 * NoticeTab — Figma 컴포넌트 「공지사항타이틀」 (node 1315:1429)
 * 메인 화면 공지사항의 탭 (보건소식 · 고시·공고 · 카드뉴스)
 *
 * 상태 (Figma 「속성 1」)
 *   selected = true  → 클릭   (파란 글자, 아래 굵은 파란 선)
 *   selected = false → 미클릭 (회색 글자, 아래 얇은 회색 선)
 * Figma에 hover / pressed / disabled 상태는 없음 → 만들지 않음
 *
 * 탭 묶음(role="tablist")은 이 컴포넌트를 쓰는 부모가 만든다.
 */
import './NoticeTab.css'

function NoticeTab({ label, selected = false, onClick, id, controls }) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={selected}
      aria-controls={controls}
      tabIndex={selected ? 0 : -1}
      className={`notice-tab${selected ? ' notice-tab--selected' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default NoticeTab
