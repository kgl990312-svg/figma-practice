/*
 * JurisdictionService — Figma 컴포넌트 「관할서비스」 (node 1779:2792, 변형 11개)
 * 화면 2(구 보건소)의 의료비지원 메뉴 11개 + 선택한 메뉴의 지원사업 아코디언
 *
 * 동작
 *   - 처음 선택은 첫 메뉴(모성지원) — PRD 6-2
 *   - 메뉴를 바꾸면 그 메뉴의 첫 지원사업이 펼쳐진 상태로 시작 (Figma 변형 11개 모두 첫 항목 펼침)
 *   - 아코디언은 한 번에 하나만 펼침 (사용자 결정, PRD 6-2)
 *
 * 재사용: MenuButton(메뉴 버튼), Accordion(지원사업 아코디언 — 안에서 SubClickButton 사용)
 * 데이터: jurisdictionServices.js
 */
import { useState } from 'react'
import MenuButton from '../../button/MenuButton/MenuButton.jsx'
import Accordion from '../Accordion/Accordion.jsx'
import { JURISDICTION_SERVICES } from './jurisdictionServices.js'
import './JurisdictionService.css'

// 버튼의 toLocation 표시를 실제 위치·교통 주소로 바꿈 (관할보건소방문하기, 서식 다운로드 안내 상자 속 링크)
function fillLocation(button, locationHref) {
  if (button.toLocation) return { ...button, href: locationHref }
  if (button.notice?.toLocation) {
    const links = locationHref ? [{ label: button.notice.linkLabel, href: locationHref }] : []
    return { ...button, notice: { ...button.notice, links } }
  }
  return button
}

// locationHref: 지금 보고 있는 구의 위치·교통 주소 (화면 2가 넘겨 줌, 예: /location?gu=paldal)
function JurisdictionService({ services = JURISDICTION_SERVICES, defaultServiceId, locationHref }) {
  const [selectedId, setSelectedId] = useState(defaultServiceId ?? services[0].id)
  const [openIndex, setOpenIndex] = useState(0)

  const selected = services.find((service) => service.id === selectedId) ?? services[0]
  // Accordion은 id로 펼친 항목을 구분 → 순서 번호를 id로 쓴다
  const items = selected.items.map((item, index) => ({
    ...item,
    id: String(index),
    sections: item.sections?.map((section) => ({
      ...section,
      buttons: section.buttons?.map((button) => fillLocation(button, locationHref)),
    })),
  }))

  const selectService = (id) => {
    if (id === selectedId) return
    setSelectedId(id)
    setOpenIndex(0)
  }

  const toggle = (id) => {
    const index = Number(id)
    setOpenIndex(index === openIndex ? -1 : index)
  }

  return (
    <div className="jurisdiction-service">
      <div className="jurisdiction-service__menu" role="group" aria-label="의료비지원 메뉴">
        {services.map((service) => (
          <MenuButton
            key={service.id}
            label={service.label}
            selected={service.id === selected.id}
            onClick={() => selectService(service.id)}
          />
        ))}
      </div>

      <Accordion items={items} openId={String(openIndex)} onToggle={toggle} />
    </div>
  )
}

export default JurisdictionService
