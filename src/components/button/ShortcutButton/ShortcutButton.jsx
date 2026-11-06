/*
 * ShortcutButton — Figma 컴포넌트 「하단메인버튼」 (node 1206:1537)
 * 화면 2 맨 아래의 [통합민원서비스 바로가기] 큰 버튼: 제목 + 보조 문구 + 오른쪽 화살표
 *
 * Figma에 상태 변형 없음 (「속성 1=기본」만 있음)
 * href가 있으면 링크, 없으면 버튼으로 동작한다.
 */
import chevronRightBlue from '../../../assets/icons/chevron-right-blue.svg'
import './ShortcutButton.css'

function ShortcutButton({ label, caption, href, onClick }) {
  const content = (
    <span className="shortcut-button__inner">
      <span className="shortcut-button__text">
        <span className="shortcut-button__label">{label}</span>
        {caption && <span className="shortcut-button__caption">{caption}</span>}
      </span>
      {/* 아이콘은 장식이라 alt를 비움 */}
      <img className="shortcut-button__icon" src={chevronRightBlue} alt="" width="18" height="18" />
    </span>
  )

  if (href) {
    return (
      <a className="shortcut-button" href={href}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className="shortcut-button" onClick={onClick}>
      {content}
    </button>
  )
}

export default ShortcutButton
