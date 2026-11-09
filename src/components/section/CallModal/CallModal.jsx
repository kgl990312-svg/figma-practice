/*
 * CallModal — 모바일 전화 연결 상자 (화면 가운데 모달)
 * Figma에 없는 컴포넌트 (사용자 요청 2026-11-09): 치매안심센터처럼 구마다 번호가 다를 때
 *   구를 골라 바로 전화 연결 (tel:)
 *   모양: 사용자 참고 이미지 — 위쪽 제목 + X(닫기), 구분선, 안쪽에 고르는 목록
 *   X 아이콘은 Figma 「3-3. 컴퍼넌트설계 › 아이콘영역」의 「엑스」(node 1224:133)
 *
 * 접근성: 브라우저 기본 <dialog>를 모달로 열어
 *   - 열리면 상자 안으로 포커스가 들어가고, 바깥은 Tab으로 갈 수 없음
 *   - Esc, X, 바깥 어두운 곳을 누르면 닫힘. 닫히면 연 버튼으로 포커스가 돌아감
 *
 * props
 *   open        열림 여부
 *   onClose     닫힐 때 호출
 *   title       제목 (예: 치매안심센터 전화 연결)
 *   description 안내 문장
 *   items       [{ label, phone }] — 한 줄에 「label … 번호 📞」
 */
import { useEffect, useId, useRef } from 'react'
import closeIcon from '../../../assets/icons/close.svg'
import phoneBlue from '../../../assets/icons/phone-blue.svg'
import phoneWhite from '../../../assets/icons/phone-white.svg'
import './CallModal.css'

function CallModal({ open, onClose, title, description, items }) {
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
      className="call-modal"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onClick={handleClick}
    >
      <div className="call-modal__head">
        <h2 id={titleId} className="call-modal__title">
          {title}
        </h2>
        <button type="button" className="call-modal__close" aria-label="닫기" onClick={onClose}>
          <img src={closeIcon} alt="" width="20" height="20" />
        </button>
      </div>

      <div className="call-modal__body">
        {description && (
          <p id={descriptionId} className="call-modal__description">
            {description}
          </p>
        )}
        <ul className="call-modal__list">
          {items.map((item) => (
            <li key={item.label}>
              <a
                className="call-modal__item"
                href={`tel:${item.phone.replaceAll('-', '')}`}
                aria-label={`${item.label} 전화 ${item.phone}`}
              >
                <span className="call-modal__item-label">{item.label}</span>
                <span className="call-modal__item-phone">
                  {item.phone}
                  {/* 아이콘은 장식 */}
                  <img className="call-modal__icon--default" src={phoneBlue} alt="" width="20" height="20" />
                  <img className="call-modal__icon--pressed" src={phoneWhite} alt="" width="20" height="20" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  )
}

export default CallModal
