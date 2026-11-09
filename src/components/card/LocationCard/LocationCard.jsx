/*
 * LocationCard — Figma 컴포넌트 「위치안내」 (node 1313:149)
 * 화면 4 위치·교통 맨 위: 「수원시 ○○구 보건소 위치」 + 주소 + 전화번호(누르면 전화 연결)
 *
 * Figma에 상태 변형 없음
 *
 * 전화번호: 모바일은 누르면 전화 연결, 데스크톱(841px 이상)은 누르면 번호 복사 + 2초 동안 「번호를 복사했어요」
 *   (PC는 전화를 걸 수 없음 — 의료센터 카드·화면 2 전화문의와 같은 방식, 사용자 결정 2026-11-09)
 */
import { useEffect, useState } from 'react'
import './LocationCard.css'

const COPY_MESSAGE = { ok: '번호를 복사했어요', fail: '복사하지 못했어요' }

function LocationCard({ district, address, phone }) {
  const [copied, setCopied] = useState(null) // 'ok' | 'fail' | null

  useEffect(() => {
    if (!copied) return undefined
    const timer = setTimeout(() => setCopied(null), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(phone)
      setCopied('ok')
    } catch {
      setCopied('fail')
    }
  }

  return (
    <div className="location-card">
      <h2 className="location-card__title">수원시 {district} 보건소 위치</h2>
      <dl className="location-card__info">
        <div className="location-card__row">
          <dt>주소:</dt>
          <dd>{address}</dd>
        </div>
        {phone && (
          <div className="location-card__row">
            <dt>전화번호:</dt>
            <dd>
              {/* 모바일 — 전화 연결 */}
              <a className="location-card__phone location-card__phone--mobile" href={`tel:${phone.replaceAll('-', '')}`}>
                {phone}
              </a>
              {/* 데스크톱 — 번호 복사 */}
              <button
                type="button"
                className="location-card__phone location-card__phone--desktop"
                aria-label={`전화번호 ${phone} 복사`}
                onClick={copy}
              >
                {copied ? COPY_MESSAGE[copied] : phone}
              </button>
              <span className="sr-only" role="status">
                {copied ? COPY_MESSAGE[copied] : ''}
              </span>
            </dd>
          </div>
        )}
      </dl>
    </div>
  )
}

export default LocationCard
