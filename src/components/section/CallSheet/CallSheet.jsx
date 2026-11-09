/*
 * CallSheet — 모바일 전화 연결 상자 (아래에서 올라오는 모달, 바텀시트)
 * Figma에 없는 컴포넌트 (사용자 요청 2026-11-09): 치매안심센터처럼 구마다 번호가 다를 때
 *   구를 골라 바로 전화 연결 (tel:)
 *
 * 접근성: 브라우저 기본 <dialog>를 모달로 열어
 *   - 열리면 상자 안으로 포커스가 들어가고, 바깥은 Tab으로 갈 수 없음
 *   - Esc, [닫기], 바깥 어두운 곳을 누르면 닫힘. 닫히면 연 버튼으로 포커스가 돌아감
 *
 * props
 *   open      열림 여부
 *   onClose   닫힐 때 호출
 *   title     제목 (예: 치매안심센터 전화 연결)
 *   description 안내 문장
 *   items     [{ label, phone }] — 버튼 글자는 「label 번호」
 */
import { useEffect, useId, useRef } from 'react'
import MainButton from '../../button/MainButton/MainButton.jsx'
import './CallSheet.css'

function CallSheet({ open, onClose, title, description, items }) {
  const dialogRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // 바깥 어두운 부분(dialog 자신)을 누르면 닫기
  function handleClick(event) {
    if (event.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="call-sheet"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onClick={handleClick}
    >
      <div className="call-sheet__panel">
        <div className="call-sheet__head">
          <h2 id={titleId} className="call-sheet__title">
            {title}
          </h2>
          <button type="button" className="call-sheet__close" onClick={onClose}>
            닫기
          </button>
        </div>
        {description && (
          <p id={descriptionId} className="call-sheet__description">
            {description}
          </p>
        )}
        <ul className="call-sheet__list">
          {items.map((item) => (
            <li key={item.label}>
              <MainButton
                variant="white"
                label={`${item.label} ${item.phone}`}
                href={`tel:${item.phone.replaceAll('-', '')}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  )
}

export default CallSheet
