/*
 * Breadcrumb — 현재 위치 안내 (예: 홈 > 팔달보건소)
 * Figma에 없는 컴포넌트 (사용자 결정 2026-11-09): 데스크톱에는 이전 버튼이 없어 지나온 길을 보여 줌
 *   앞 단계는 누르면 이동하는 링크, 마지막 단계는 현재 화면 (aria-current="page")
 *   어디에 보일지는 페이지가 정한다 (지금은 데스크톱 화면 2에만)
 *
 * items: [{ label, href }] — 마지막 항목은 href 없이 현재 화면
 */
import './Breadcrumb.css'

function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="현재 위치">
      <ol className="breadcrumb__list">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1
          return (
            <li key={item.label} className="breadcrumb__item">
              {isCurrent ? (
                <span className="breadcrumb__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <a className="breadcrumb__link" href={item.href}>
                    {item.label}
                  </a>
                  {/* 구분 기호는 장식 — 화면 낭독기는 목록 순서로 읽음 */}
                  <span className="breadcrumb__separator" aria-hidden="true">
                    &gt;
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
