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
 */
import { useId } from 'react'
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
function SubClickButton({ label, icon, caption, href, newWindow = false, onClick, showPressed = false }) {
  const captionId = useId()
  const [iconDefault, iconPressed] = icon ? ICONS[icon] : []
  // 파일 아이콘은 Figma 원본이 20px 칸 안의 14.8×17.3 그림 → 같은 크기로 놓고 Figma 위치만큼 여백
  const isFile = icon === 'file'
  const [w, h] = isFile ? [14.8125, 17.3125] : [20, 20]
  const iconClass = `sub-click-button__icon${isFile ? ' sub-click-button__icon--file' : ''}`
  const className = `sub-click-button__button${showPressed ? ' sub-click-button__button--pressed' : ''}`
  const content = (
    <>
      <span className="sub-click-button__label">{label}</span>
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
  const describedBy = caption ? captionId : undefined

  return (
    <div className="sub-click-button">
      {href ? (
        <a
          className={className}
          href={href}
          aria-describedby={describedBy}
          {...(newWindow ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {content}
        </a>
      ) : (
        <button type="button" className={className} aria-describedby={describedBy} onClick={onClick}>
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
