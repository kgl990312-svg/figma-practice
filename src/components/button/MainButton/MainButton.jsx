/*
 * MainButton — Figma 컴포넌트 「메인버튼」 (node 1199:1462)
 * 아이콘 + 글자로 된 큰 버튼. 화면 2의 [전화문의 031-5191-0520], [위치보기] 등에 쓴다
 *
 * 종류 (Figma 「속성 1」)
 *   variant="primary" → 기본       (파란 배경, 흰 글자·아이콘)
 *   variant="white"   → 화이트버튼 (흰 배경, 파란 테두리·글자·아이콘)
 * Figma에 hover / pressed / disabled 상태는 없음 → 만들지 않음
 *
 * href가 있으면 링크(전화 tel:, 화면 이동), 없으면 버튼으로 동작한다.
 * copyText가 있으면 누를 때 그 글자(전화번호)를 복사하고 2초 동안 「번호를 복사했어요」를 보여 준다
 *   — 데스크톱 전화문의 버튼용 (PC는 전화를 걸 수 없음, 사용자 결정 2026-11-09. 의료센터 카드와 같은 방식)
 * 아이콘 기본값은 Figma처럼 전화 아이콘, 다른 아이콘은 icon에 이미지 주소를 넘긴다.
 */
import { useEffect, useState } from 'react'
import phoneWhite from '../../../assets/icons/phone-white.svg'
import phoneBlue from '../../../assets/icons/phone-blue.svg'
import './MainButton.css'

const DEFAULT_ICON = { primary: phoneWhite, white: phoneBlue }
const COPY_MESSAGE = { ok: '번호를 복사했어요', fail: '복사하지 못했어요' }

function MainButton({ label, variant = 'primary', icon, href, onClick, copyText }) {
  const [copied, setCopied] = useState(null) // 'ok' | 'fail' | null

  useEffect(() => {
    if (!copied) return undefined
    const timer = setTimeout(() => setCopied(null), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied('ok')
    } catch {
      setCopied('fail')
    }
  }

  const className = `main-button main-button--${variant}`
  const iconSrc = icon ?? DEFAULT_ICON[variant]
  const content = (
    <>
      {/* 아이콘은 장식이라 alt를 비움 — 버튼 이름은 글자로 읽힘 */}
      {iconSrc && <img className="main-button__icon" src={iconSrc} alt="" width="20" height="20" />}
      <span>{copied ? COPY_MESSAGE[copied] : label}</span>
    </>
  )

  if (copyText) {
    return (
      <>
        <button type="button" className={className} aria-label={`${label} 번호 복사`} onClick={copy}>
          {content}
        </button>
        {/* 복사 결과를 화면 낭독기에 알려 주는 칸 (눈에는 안 보임) */}
        <span className="sr-only" role="status">
          {copied ? COPY_MESSAGE[copied] : ''}
        </span>
      </>
    )
  }

  if (href) {
    return (
      <a className={className} href={href}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  )
}

export default MainButton
