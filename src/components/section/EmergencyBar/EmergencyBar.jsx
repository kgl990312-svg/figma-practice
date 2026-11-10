/*
 * EmergencyBar — Figma 「하단고정긴급」 (메인 화면 node 2411:4247)
 * 화면 하단에 고정된 「긴급원클릭서비스」: 휴일지킴이 · 자동심장충격기찾기 · 달빛어린이병원
 *
 * 동작 (PRD 6-1)
 *   - 처음에는 펼친 상태
 *   - 제목 줄을 누르면 접기/펼치기 (펼침: 아래 화살표, 접힘: 위 화살표)
 *   - 누르는 동안: Figma 「Property 1=클릭」(node 2402:3074) — 빨간 배경, 흰 글자·흰 아이콘
 *   - 접힘: Figma 「Property 1=접기」(node 2402:3073) — 배경 red/300, 높이 64px
 *     제목·위 화살표는 red/900 (Figma 수정본 기준, 2026-11-10)
 *   - 버튼은 이동 안내 팝업 없이 바로 연결 — 주소를 아직 받지 못해 href가 비어 있으면 버튼 모양만 보여 줌
 *   - 외부 사이트(http로 시작)는 새 탭에서 열고, 화면 낭독기에 「새 창」을 알려 줌 (사용자 결정 2026-11-09)
 *
 * Figma와 다른 점 (사용자 결정)
 *   - 휴일지킴이 보조 문구: 「(야간·휴일진료)」 → 「(야간·휴일 약국)」
 *   - 자동심장충격기찾기 아이콘: Figma는 달 아이콘 → 심장 아이콘
 *   - 제목 줄: 누르는 영역을 44px로 넓히고, 늘어난 만큼 아래 간격(26px)을 줄여 보이는 위치는 같게 함
 *   - 데스크톱(841px 이상): 고정하지 않고 페이지 맨 끝에 놓으며, 접기/펼치기 없이 버튼 3개를 항상 보여 줌
 *     (Figma 데스크톱에는 화살표가 있지만 가리는 내용이 없어 아코디언을 뺌 — 사용자 결정 3A·5A)
 *     → 데스크톱에서는 접기 버튼 대신 제목 글자(emergency-bar__heading)만 보임 (CSS로 전환)
 */
import { useId, useState } from 'react'
import pharmacyRed from '../../../assets/icons/pharmacy-red.svg'
import heartRed from '../../../assets/icons/heart-red.svg'
import moonRed from '../../../assets/icons/moon-red.svg'
import pharmacyWhite from '../../../assets/icons/pharmacy-white.svg'
import heartWhite from '../../../assets/icons/heart-white.svg'
import moonWhite from '../../../assets/icons/moon-white.svg'
import chevronDown from '../../../assets/icons/chevron-down.svg'
import chevronUpRed from '../../../assets/icons/chevron-up-red.svg'
import './EmergencyBar.css'

const EMERGENCY_SERVICES = [
  // 휴일지킴이약국 (대한약사회) — 사용자 전달 2026-11-09
  { lines: ['휴일지킴이', '(야간·휴일 약국)'], icon: pharmacyRed, iconPressed: pharmacyWhite, href: 'https://www.pharm114.or.kr/' },
  // 자동심장충격기(AED) 찾기 — 응급의료포털 E-Gen (중앙응급의료센터), 로그인 없이 지도 검색. 사용자 전달 2026-11-09
  { lines: ['자동심장', '충격기찾기'], icon: heartRed, iconPressed: heartWhite, href: 'https://www.e-gen.or.kr/egen/search_aed.do' },
  // 수원시 달빛어린이병원 목록 — 수원시보건소 홈페이지 (병원·전화·운영시간·협약약국). 사용자 전달 2026-11-09
  { lines: ['달빛어린이병원', '(야간·휴일진료)'], icon: moonRed, iconPressed: moonWhite, href: 'https://health.suwon.go.kr/sub.asp?page_code=sub0612' },
]

function EmergencyBar({ services = EMERGENCY_SERVICES, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  const listId = useId()

  return (
    <aside className={`emergency-bar${open ? '' : ' emergency-bar--collapsed'}`} aria-label="긴급원클릭서비스">
      {/* 데스크톱 제목 — 접기 버튼 없이 글자만 */}
      <p className="emergency-bar__heading">긴급원클릭서비스</p>
      <button
        type="button"
        className="emergency-bar__toggle"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen(!open)}
      >
        <span className="emergency-bar__title">긴급원클릭서비스</span>
        {/* 아이콘은 장식 — 펼침 상태는 aria-expanded로 전달 */}
        <img src={open ? chevronDown : chevronUpRed} alt="" width="20" height="20" />
      </button>

      <ul id={listId} className="emergency-bar__list" hidden={!open}>
        {services.map((service) => {
          const content = (
            <>
              {/* 심장 아이콘은 Figma 원본이 24×22.5 (24px 칸 위쪽에 붙음) → 아래 1.5px 여백 */}
              {/* 기본은 빨간 아이콘, 누르는 동안은 흰 아이콘 (CSS로 전환) */}
              {[
                [service.icon, 'emergency-bar__icon--default'],
                [service.iconPressed, 'emergency-bar__icon--pressed'],
              ].map(([src, iconClass]) => (
                <img
                  key={iconClass}
                  className={`${iconClass}${service.icon === heartRed ? ' emergency-bar__icon--heart' : ''}`}
                  src={src}
                  alt=""
                  width="24"
                  height={service.icon === heartRed ? 22.5001 : 24}
                />
              ))}
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
                <a
                  className="emergency-bar__button"
                  href={service.href}
                  {...(service.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {content}
                  {service.href.startsWith('http') && <span className="sr-only">(새 창)</span>}
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
