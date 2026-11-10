/*
 * Accordion — Figma 컴포넌트 「버튼형아코디언」 (node 1579:11046) · 「아코디언일반」 (node 1563:10338)
 * 제목 줄(누르면 펼치기/접기) + 펼친 내용(라벨 상자 + 본문 + 버튼)
 * 화면 2 지원사업(JurisdictionService 안), 화면 3 통합민원에서 쓴다
 *
 * 한 번에 하나만 펼친다 (사용자 결정). 어떤 항목이 펼쳐질지는 부모가 정한다:
 *   openId   펼친 항목의 id (없으면 모두 접힘)
 *   onToggle 제목 줄을 눌렀을 때 그 항목의 id를 넘김
 *
 * items[]
 *   id, title
 *   sections[]   라벨 상자(label) + 본문(body, 줄바꿈 \n 유지) + 버튼(buttons — SubClickButton 속성)
 *   extra        내용 맨 아래에 붙일 요소 (예: 금연서비스의 InfoBox)
 *
 * Figma에 hover 상태 없음 → 만들지 않음
 */
import { useId } from 'react'
import SubClickButton from '../../button/SubClickButton/SubClickButton.jsx'
import chevronDown from '../../../assets/icons/chevron-down.svg'
import chevronUp from '../../../assets/icons/chevron-up.svg'
import './Accordion.css'

function AccordionSection({ label, body, buttons = [] }) {
  return (
    <div className="accordion__section">
      <p className="accordion__label">{label}</p>
      <p className="accordion__body">{body}</p>
      {buttons.length > 0 && (
        <div className={`accordion__buttons accordion__buttons--${buttons.length}`}>
          {buttons.map((button) => (
            <SubClickButton
              key={button.label}
              label={button.label}
              icon={button.icon}
              caption={button.caption}
              href={button.href || undefined}
              // 외부 사이트(http)만 새 탭 — 사이트 안 화면(위치·교통 등)은 같은 탭
              newWindow={Boolean(button.href?.startsWith('http'))}
              copyText={button.copyText}
              desktopLabel={button.desktopLabel}
              callName={button.callName}
              notice={button.notice}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function Accordion({ items, openId, onToggle, spacing = 'normal', headingLevel = 'h3' }) {
  const baseId = useId()
  const Heading = headingLevel

  return (
    <div className={`accordion accordion--${spacing}`}>
      {items.map((item) => {
        const isOpen = item.id === openId
        const panelId = `${baseId}-${item.id}`
        const sections = item.sections ?? []
        return (
          <div key={item.id} className="accordion__item">
            <Heading className="accordion__heading">
              <button
                type="button"
                className="accordion__toggle"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => onToggle(item.id)}
              >
                <span className="accordion__title">{item.title}</span>
                {/* 아이콘은 장식 — 펼침 상태는 aria-expanded로 전달 */}
                <img className="accordion__chevron" src={isOpen ? chevronUp : chevronDown} alt="" width="20" height="20" />
              </button>
            </Heading>
            <div id={panelId} className="accordion__panel" hidden={!isOpen}>
              {sections.length > 0 && (
                <div className="accordion__sections">
                  {sections.map((section) => (
                    <AccordionSection key={section.label} {...section} />
                  ))}
                </div>
              )}
              {item.extra}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
