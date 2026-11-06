/*
 * PageTitle — Figma 컴포넌트 「대제목」 (node 1201:38)
 * 서브 화면(화면 2~4) 네비게이션 아래의 페이지 제목. 예: 팔달보건소, 통합민원, 위치·교통
 *
 * 페이지에서 가장 큰 제목이라 h1로 만든다.
 * Figma에 상태 변형 없음
 */
import './PageTitle.css'

function PageTitle({ title }) {
  return (
    <div className="page-title">
      <h1 className="page-title__text">{title}</h1>
    </div>
  )
}

export default PageTitle
