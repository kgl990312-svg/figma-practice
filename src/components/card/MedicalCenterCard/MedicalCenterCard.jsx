/*
 * MedicalCenterCard — Figma 컴포넌트 「의료지원센터」 (node 1273:1726)
 * 메인 화면 「수원시 의료센터」의 센터 카드 (어울림건강지원센터 · 정신보건센터 · 치매안심센터)
 *
 * 상태 (Figma 「속성 1」)
 *   기본 → 연한 파란 배경, 회색 테두리, 「전화문의」 회색
 *   클릭 → 누르는 동안 (CSS :active — 연파랑 배경, 굵은 남색 테두리, 「전화문의」 파랑)
 * Figma에 hover / disabled 상태는 없음 → 만들지 않음
 *
 * 모바일 / 데스크톱 (사용자 결정, 2026-11-09)
 *   모바일(841px 미만): 「전화문의」 — 누르면 연결 상자(CallModal)에서 번호를 보고 눌러 전화 연결 (사용자 요청)
 *   데스크톱(841px 이상): 「전화문의」 대신 전화번호를 진하게 보여 줌 (PC는 전화를 걸 수 없음)
 *     누르면 번호를 복사하고 2초 동안 「번호를 복사했어요」 표시, 마우스를 올리면 누른 모양
 *   두 모양을 모두 그려 두고 CSS로 하나만 보이게 한다 (숨긴 쪽은 화면 낭독기·키보드에서도 빠짐)
 *
 * 구마다 번호가 다른 센터 (regions — 치매안심센터, 사용자 결정 1A)
 *   모바일: 카드를 누르면 아래에서 연결 상자(CallModal, 모달)가 올라오고, 구를 고르면 그 구 센터로 전화 연결 (사용자 요청)
 *   데스크톱: 펼치지 않고 카드 안에 「구 이름 + 번호」 4개를 바로 보여 줌 — 번호마다 누르면 복사
 *   Figma에 없는 모양 → 연결 상자의 버튼은 메인버튼(화이트)을 다시 씀
 *
 * Figma와 다른 점: 「전화문의」 글자가 Figma에서는 Inter 폰트 → Pretendard GOV로 맞춤 (결정 J)
 */
import { useState } from 'react'
import { useCopyText } from '../../../hooks/useCopyText.js'
import phoneGrey from '../../../assets/icons/phone-grey.svg'
import phoneBlue from '../../../assets/icons/phone-blue.svg'
import CallModal from '../../section/CallModal/CallModal.jsx'
import './MedicalCenterCard.css'

function CallIcons() {
  // 아이콘은 장식이라 alt를 비움
  return (
    <>
      <img className="medical-center-card__icon medical-center-card__icon--default" src={phoneGrey} alt="" width="20" height="20" />
      <img className="medical-center-card__icon medical-center-card__icon--pressed" src={phoneBlue} alt="" width="20" height="20" />
    </>
  )
}

// showPressed: 비교용 미리보기에서 누른 모양을 고정해 보여 줄 때만 사용 (실제 화면에서는 쓰지 않음)
function MedicalCenterCard({ name, phone, regions, showPressed = false }) {
  const [open, setOpen] = useState(false)
  const { copiedText: lastCopied, message, copy } = useCopyText()
  // 방금 복사한 번호 자리에만 결과 문구를 보여 줌
  const copiedText = (target) => (lastCopied === target ? message : null)
  // 복사 결과를 화면 낭독기에 알려 주는 칸 (눈에는 안 보임)
  const status = (
    <span className="sr-only" role="status">
      {message ? `${name} ${message}` : ''}
    </span>
  )
  const className = `medical-center-card${showPressed ? ' medical-center-card--pressed' : ''}`
  const nameEl = <span className="medical-center-card__name">{name}</span>

  // 구마다 번호가 다른 센터 (치매안심센터)
  if (regions) {
    return (
      <div className="medical-center-card-group">
        {/* 모바일 — 누르면 연결 상자(모달)가 열림 */}
        <div className="medical-center-card__mobile">
          <button type="button" className={className} aria-haspopup="dialog" onClick={() => setOpen(true)}>
            {nameEl}
            <span className="medical-center-card__call">
              전화문의
              <CallIcons />
            </span>
          </button>
          <CallModal
            open={open}
            onClose={() => setOpen(false)}
            title={`${name} 전화 연결`}
            description="주민등록상 주소지 구의 센터를 골라 주세요."
            items={regions.map((region) => ({ label: `${region.label}구`, phone: region.phone }))}
          />
        </div>

        {/* 데스크톱 — 구별 번호를 바로 보여 줌, 번호를 누르면 복사 */}
        <div className="medical-center-card__desktop">
          <div className={`${className} medical-center-card--static medical-center-card--regions`}>
            {nameEl}
            <ul className="medical-center-card__numbers">
              {regions.map((region) => (
                <li key={region.label}>
                  <button
                    type="button"
                    className="medical-center-card__number"
                    aria-label={`${region.label}구 ${name} 전화번호 ${region.phone} 복사`}
                    onClick={() => copy(region.phone)}
                  >
                    <span className="medical-center-card__number-label">{region.label}</span>
                    {copiedText(region.phone) ?? region.phone}
                    {/* 다른 의료센터 카드처럼 번호 옆 전화 아이콘 (사용자 요청) */}
                    <CallIcons />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {status}
        </div>
      </div>
    )
  }

  // 전화번호가 없으면 링크가 아닌 카드 모양만 보여 준다 (번호를 지어내지 않음)
  if (!phone) {
    return (
      <div className={className}>
        {nameEl}
        <span className="medical-center-card__call">
          전화문의
          <CallIcons />
        </span>
      </div>
    )
  }

  return (
    <div className="medical-center-card-group">
      {/* 모바일 — 누르면 연결 상자(모달)가 열리고, 번호를 누르면 전화 연결 (치매안심센터와 같은 방식, 사용자 요청) */}
      <div className="medical-center-card__mobile">
        <button type="button" className={className} aria-haspopup="dialog" onClick={() => setOpen(true)}>
          {nameEl}
          <span className="medical-center-card__call">
            전화문의
            <CallIcons />
          </span>
        </button>
        <CallModal
          open={open}
          onClose={() => setOpen(false)}
          title={`${name} 전화 연결`}
          items={[{ label: name, phone }]}
        />
      </div>

      {/* 데스크톱 — 번호를 진하게 보여 주고, 누르면 번호 복사 */}
      <div className="medical-center-card__desktop">
        <button
          type="button"
          className={`${className} medical-center-card--copy`}
          aria-label={`${name} 전화번호 ${phone} 복사`}
          onClick={() => copy(phone)}
        >
          {nameEl}
          <span className="medical-center-card__call">
            {copiedText(phone) ?? phone}
            <CallIcons />
          </span>
        </button>
        {status}
      </div>
    </div>
  )
}

export default MedicalCenterCard
