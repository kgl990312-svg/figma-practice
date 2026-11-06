/*
 * TopButton — Figma 컴포넌트 「탑버튼」 (node 1214:30 아이콘, 화면 3 node 3056:4958)
 * 화면 오른쪽 아래에 고정된 원형 버튼. 누르면 페이지 맨 위로 이동
 * 화면 3 통합민원, 화면 4 위치·교통에서 쓴다 (Figma 기준 항상 보임)
 *
 * 움직임 줄이기 설정을 켠 사용자에게는 부드러운 스크롤 없이 바로 이동
 */
import arrowUp from '../../../assets/icons/arrow-up.svg'
import './TopButton.css'

function TopButton() {
  function scrollToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button type="button" className="top-button" aria-label="맨 위로" onClick={scrollToTop}>
      <img src={arrowUp} alt="" width="24" height="24" />
    </button>
  )
}

export default TopButton
