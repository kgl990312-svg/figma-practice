/*
 * SubClickButton — Figma 컴포넌트 「서브클릭버튼」 (node 1220:443)
 * 아코디언 안의 작은 버튼 + 아래 보조 문구
 * 예: [가까운보건소방문], [온라인발급하기 📄] + 「정부24 페이지이동」, [서식 다운로드], [수원시보건소 홈페이지 ↗]
 *
 * 상태 (Figma 「Property 1」)
 *   미클릭버튼 → 기본 (흰 배경, 파란 테두리·글자·아이콘)
 *   클릭       → 누르는 동안 (CSS :active — 파란 배경, 흰 글자·아이콘)
 * Figma에 hover / disabled 상태는 없음 → 만들지 않음
 *
 * Figma와 다른 점: 미클릭 50px, 클릭 52px → 두 상태 모두 최소 50px (결정 B)
 *
 * copyText가 있으면 데스크톱(841px 이상)에서는 desktopLabel(번호가 들어간 글자)을 보여 주고,
 * 누르면 번호를 복사해 2초 동안 「번호를 복사했어요」를 보여 준다 — PC는 전화를 걸 수 없음 (사용자 결정 2026-11-09)
 * 모바일에서는 label(번호 없음)을 보여 주고, 누르면 연결 상자(CallModal)가 열려 번호를 눌러 전화 연결 (사용자 요청)
 *   callName → 모달 제목 「○○ 전화 연결」과 줄 이름 (예: 건강보험공단, 치과주치의)
 * 예: 화면 2 치과주치의 전화문의, 건강보험공단 문의하기
 *
 * notice가 있으면 누를 때 안내 상자(CallModal)를 연다 — 연결할 주소가 없는 버튼용 (사용자 결정 2026-11-10)
 *   notice = { title, description, links: [{ label, href }] } — 상자 안에 사이트 안 화면으로 가는 링크 목록
 * 예: 화면 2 서식 다운로드 → 「서식 파일은 준비 중이에요…」 + 「관할 보건소 위치·교통 보기」
 *     화면 3 가까운보건소방문 → 구 보건소 4곳 중 골라 위치·교통으로
 */
import { useId, useState } from 'react'
import CallModal from '../../section/CallModal/CallModal.jsx'
import { useCopyText } from '../../../hooks/useCopyText.js'
import fileBlue from '../../../assets/icons/file-blue.svg'
import fileWhite from '../../../assets/icons/file-white.svg'
import phoneBlue from '../../../assets/icons/phone-blue.svg'
import phoneWhite from '../../../assets/icons/phone-white.svg'
import externalLink from '../../../assets/icons/external-link.svg'
import './SubClickButton.css'

// icon 값 → [기본 아이콘, 누른 상태 아이콘]
// external(바로가기)은 Figma에 흰색 버전이 없어 누른 상태에도 같은 아이콘을 쓴다
const ICONS = {
  file: [fileBlue, fileWhite],
  phone: [phoneBlue, phoneWhite],
  external: [externalLink, externalLink],
}

// showPressed: 비교용 미리보기에서 누른 모양을 고정해 보여 줄 때만 사용 (실제 화면에서는 쓰지 않음)
function SubClickButton({ label, icon, caption, href, newWindow = false, onClick, showPressed = false, copyText, desktopLabel, callName, notice }) {
  const captionId = useId()
  const [callOpen, setCallOpen] = useState(false)
  const { message, copy } = useCopyText()
  const [iconDefault, iconPressed] = icon ? ICONS[icon] : []
  // 파일 아이콘은 Figma 원본이 20px 칸 안의 14.8×17.3 그림 → 같은 크기로 놓고 Figma 위치만큼 여백
  const isFile = icon === 'file'
  const [w, h] = isFile ? [14.8125, 17.3125] : [20, 20]
  const iconClass = `sub-click-button__icon${isFile ? ' sub-click-button__icon--file' : ''}`
  const className = `sub-click-button__button${showPressed ? ' sub-click-button__button--pressed' : ''}`
  const renderContent = (text) => (
    <>
      <span className="sub-click-button__label">{text}</span>
      {/* 아이콘은 장식이라 alt를 비움 */}
      {iconDefault && (
        <>
          <img className={`${iconClass} sub-click-button__icon--default`} src={iconDefault} alt="" width={w} height={h} />
          <img className={`${iconClass} sub-click-button__icon--pressed`} src={iconPressed} alt="" width={w} height={h} />
        </>
      )}
      {newWindow && <span className="sr-only">(새 창)</span>}
    </>
  )
  const content = renderContent(label)
  const describedBy = caption ? captionId : undefined

  // 데스크톱 복사 버튼 — 모바일용 버튼과 함께 그려 두고 CSS로 화면 폭에 따라 하나만 보여 준다
  const desktopLabelText = desktopLabel ?? label
  const copyButton = copyText && (
    <>
      <button
        type="button"
        className={`${className} sub-click-button__button--desktop`}
        aria-label={`${desktopLabelText} 번호 복사`}
        aria-describedby={describedBy}
        onClick={() => copy(copyText)}
      >
        {renderContent(message ?? desktopLabelText)}
      </button>
      {/* 복사 결과를 화면 낭독기에 알려 주는 칸 (눈에는 안 보임) */}
      <span className="sr-only" role="status">
        {message ?? ''}
      </span>
    </>
  )
  const mobileClass = copyText ? `${className} sub-click-button__button--mobile` : className
  const modalName = callName ?? label

  return (
    <div className="sub-click-button">
      {copyButton}
      {copyText ? (
        // 모바일 전화 버튼 — 누르면 연결 상자(모달)
        <>
          <button
            type="button"
            className={mobileClass}
            aria-haspopup="dialog"
            aria-describedby={describedBy}
            onClick={() => setCallOpen(true)}
          >
            {content}
          </button>
          <CallModal
            open={callOpen}
            onClose={() => setCallOpen(false)}
            title={`${modalName} 전화 연결`}
            items={[{ label: modalName, phone: copyText }]}
          />
        </>
      ) : notice ? (
        // 안내 상자 버튼 — 누르면 안내 상자(모달)
        <>
          <button
            type="button"
            className={mobileClass}
            aria-haspopup="dialog"
            aria-describedby={describedBy}
            onClick={() => setCallOpen(true)}
          >
            {content}
          </button>
          <CallModal
            open={callOpen}
            onClose={() => setCallOpen(false)}
            title={notice.title}
            description={notice.description}
            links={notice.links}
          />
        </>
      ) : href ? (
        <a
          className={mobileClass}
          href={href}
          aria-describedby={describedBy}
          {...(newWindow ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {content}
        </a>
      ) : (
        <button type="button" className={mobileClass} aria-describedby={describedBy} onClick={onClick}>
          {content}
        </button>
      )}
      {caption && (
        <span id={captionId} className="sub-click-button__caption">
          {caption}
        </span>
      )}
    </div>
  )
}

export default SubClickButton
