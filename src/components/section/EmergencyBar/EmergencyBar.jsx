/*
 * EmergencyBar — Figma 「하단고정긴급」 (메인 화면 node 2411:4247)
 * 화면 하단에 고정된 「긴급원클릭서비스」: 휴일지킴이 · 자동심장충격기찾기 · 달빛어린이병원
 *
 * 동작 (PRD 6-1)
 *   - 처음에는 펼친 상태
 *   - 제목 줄을 누르면 접기/펼치기 (펼침: 아래 화살표, 접힘: 위 화살표)
 *   - 버튼은 이동 안내 팝업 없이 바로 연결 — 주소를 아직 받지 못해 href가 비어 있으면 버튼 모양만 보여 줌
 *
 * Figma와 다른 점 (사용자 결정)
 *   - 휴일지킴이 보조 문구: 「(야간·휴일진료)」 → 「(야간·휴일 약국)」
 *   - 자동심장충격기찾기 아이콘: Figma는 달 아이콘 → 심장 아이콘
 *   - 제목 줄: 누르는 영역을 44px로 넓히고, 늘어난 만큼 아래 간격(26px)을 줄여 보이는 위치는 같게 함
 */
import { useId, useState } from 'react'
import pharmacyRed from '../../../assets/icons/pharmacy-red.svg'
import heartRed from '../../../assets/icons/heart-red.svg'
import moonRed from '../../../assets/icons/moon-red.svg'
import chevronDown from '../../../assets/icons/chevron-down.svg'
import chevronUp from '../../../assets/icons/chevron-up.svg'
import './EmergencyBar.css'

const EMERGENCY_SERVICES = [
  { lines: ['휴일지킴이', '(야간·휴일 약국)'], icon: pharmacyRed, href: '' },
  { lines: ['자동심장', '충격기찾기'], icon: heartRed, href: '' },
  { lines: ['달빛어린이병원', '(야간·휴일진료)'], icon: moonRed, href: '' },
]

function EmergencyBar({ services = EMERGENCY_SERVICES, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  const listId = useId()

  return (
    <aside className="emergency-bar" aria-label="긴급원클릭서비스">
      <button
        type="button"
        className="emergency-bar__toggle"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen(!open)}
      >
        <span className="emergency-bar__title">긴급원클릭서비스</span>
        {/* 아이콘은 장식 — 펼침 상태는 aria-expanded로 전달 */}
        <img src={open ? chevronDown : chevronUp} alt="" width="20" height="20" />
      </button>

      <ul id={listId} className="emergency-bar__list" hidden={!open}>
        {services.map((service) => {
          const content = (
            <>
              {/* 심장 아이콘은 Figma 원본이 24×22.5 (24px 칸 위쪽에 붙음) → 아래 1.5px 여백 */}
              <img
                className={service.icon === heartRed ? 'emergency-bar__icon--heart' : undefined}
                src={service.icon}
                alt=""
                width="24"
                height={service.icon === heartRed ? 22.5001 : 24}
              />
              <span className="emergency-bar__label">
                {service.lines.map((line) => (
                  <span key={line} className="emergency-bar__line">
                    {line}
                  </span>
                ))}
              </span>
            </>
          )
          return (
            <li key={service.lines[0]} className="emergency-bar__item">
              {service.href ? (
                <a className="emergency-bar__button" href={service.href}>
                  {content}
                </a>
              ) : (
                <button type="button" className="emergency-bar__button">
                  {content}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default EmergencyBar
