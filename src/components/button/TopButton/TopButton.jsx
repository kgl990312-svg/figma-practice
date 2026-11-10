/*
 * TopButton — Figma 컴포넌트 「탑버튼」 (node 1214:30 아이콘, 화면 3 node 3056:4958)
 * 화면 오른쪽 아래에 고정된 원형 버튼. 누르면 페이지 맨 위로 이동
 * 화면 3 통합민원, 화면 4 위치·교통에서 쓴다
 *
 * 보이는 때: 화면 높이의 절반 이상 내려갔을 때만 (사용자 결정 2026-11-10)
 *   맨 위에서는 할 일이 없고 내용을 가리기만 해서 숨김. 숨길 때는 아예 그리지 않아 Tab 순서에서도 빠짐
 *
 * 움직임 줄이기 설정을 켠 사용자에게는 부드러운 스크롤 없이 바로 이동
 */
import { useEffect, useState } from 'react'
import arrowUp from '../../../assets/icons/arrow-up.svg'
import './TopButton.css'

function TopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function update() {
      setVisible(window.scrollY > window.innerHeight / 2)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  function scrollToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  if (!visible) return null

  return (
    <button type="button" className="top-button" aria-label="맨 위로" onClick={scrollToTop}>
      <img src={arrowUp} alt="" width="24" height="24" />
    </button>
  )
}

export default TopButton
