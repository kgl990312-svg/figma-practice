/*
 * InfoBox — Figma 「운영박스」 (화면 3 금연서비스 node 2191:4463, 화면 4 운영시간 node 2262:7120)
 * 주황색 안내 박스: 왼쪽 항목 이름 + 오른쪽 내용(전화번호·시간)
 *
 * 모양 (variant)
 *   'center' (기본) → 화면 3: 이름 | 내용(오른쪽 끝, 사용자 결정 2026-11-09) + 내용 옆 아이콘
 *   'split'         → 화면 4: 아이콘 + 이름(왼쪽) | 내용(오른쪽 끝), 묶음 사이 2px 구분선
 *                     row.note 가 있으면 내용 아래 작은 글씨 한 줄 (예: 휴무일)
 *
 * groups[]   줄 묶음 (묶음 사이 16px, 묶음 안 줄 사이 4px)
 *   rows[]
 *     label   왼쪽 이름 (비우면 빈칸)
 *     value   오른쪽 내용 — 글자 또는 요소
 *     size    'large' → 16/26 SemiBold (전화번호), 기본 → 14/20 Medium (시간)
 *     icon    'phone' | 'clock' (선택)
 *     href    있으면 내용이 링크 (예: tel:15449030)
 *     align   'end' → 지금은 모든 내용이 오른쪽 끝이라 효과 없음 (예전 가운데 정렬 때 쓰던 값)
 *
 * Figma에 상태 변형 없음
 */
// 화면 3 금연 박스의 전화 아이콘은 Figma에서 주황색(orange/700)
import phoneOrange from '../../../assets/icons/phone-orange.svg'
import clockIcon from '../../../assets/icons/clock.svg'
import lunchIcon from '../../../assets/icons/lunch.svg'
import './InfoBox.css'

function RowIcon({ icon }) {
  if (icon === 'phone') return <img className="info-box__icon" src={phoneOrange} alt="" width="20" height="20" />
  if (icon === 'lunch') return <img className="info-box__icon" src={lunchIcon} alt="" width="24" height="24" />
  if (icon === 'clock') {
    // Figma처럼 24px 칸 안에 원본 크기(21.7×21.7) 그대로 놓음
    return (
      <span className="info-box__clock">
        <img src={clockIcon} alt="" width="21.6667" height="21.6667" />
      </span>
    )
  }
  return null
}

// 화면 4 모양: 아이콘 + 이름 | 내용(오른쪽 끝)
function SplitInfoBox({ groups }) {
  return (
    <div className="info-box info-box--split">
      {groups.map((rows, groupIndex) => (
        <dl key={groupIndex} className="info-box__group">
          {rows.map((row) => (
            <div key={row.label} className="info-box__split-row">
              <dt className="info-box__split-label">
                {/* 아이콘은 장식이라 alt를 비움 */}
                <RowIcon icon={row.icon} />
                {row.label}
              </dt>
              <dd className="info-box__split-value">
                <span className="info-box__split-main">{row.value}</span>
                {row.note && <span className="info-box__split-note">{row.note}</span>}
              </dd>
            </div>
          ))}
        </dl>
      ))}
    </div>
  )
}

function InfoBox({ groups, variant = 'center' }) {
  if (variant === 'split') return <SplitInfoBox groups={groups} />

  return (
    <div className="info-box">
      {groups.map((rows, groupIndex) => (
        <dl key={groupIndex} className="info-box__group">
          {rows.map((row, rowIndex) => {
            const content = (
              <>
                <span>{row.value}</span>
                {/* 아이콘은 장식이라 alt를 비움 */}
                <RowIcon icon={row.icon} />
              </>
            )
            const valueClass = [
              'info-box__value',
              row.size === 'large' && 'info-box__value--large',
              row.align === 'end' && 'info-box__value--end',
            ]
              .filter(Boolean)
              .join(' ')
            return (
              <div key={rowIndex} className="info-box__row">
                {/* 이름이 빈 줄은 위 줄 이름에 이어지는 내용 (화면에서는 빈칸) */}
                <dt className="info-box__label">{row.label}</dt>
                <dd className={valueClass}>
                  {row.href ? (
                    <a className="info-box__link" href={row.href}>
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
      ))}
    </div>
  )
}

export default InfoBox
