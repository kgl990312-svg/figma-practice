/*
 * RegionButton — Figma 컴포넌트 「지역클릭원본」 (node 1175:172)
 * 메인 화면의 구 선택 버튼 (팔달·권선·장안·영통)
 *
 * 상태 (Figma 변형 「지역색깔」)
 *   selected = true  → 지역선택   (파란 배경, 흰 글자)
 *   selected = false → 지역미선택 (흰 배경, 회색 테두리)
 * Figma에 hover / pressed / disabled 상태는 없음
 *   데스크톱만 마우스를 올리면 지역선택 모습 (모바일에서 누를 때와 같게, 사용자 결정 2026-11-09)
 *   누르는 순간 지역선택 모습
 *
 * size="small" → 높이 46px (화면 4 데스크톱 보건소 선택 버튼, Figma 「데스크탑7」 지역버튼)
 *   마우스를 올려도 바뀌지 않고, 누르는 순간 지역선택 모습 (사용자 결정)
 * current → 지금 보고 있는 구 (aria-current, 누르는 버튼 대신 현재 위치 표시)
 * href    → 있으면 링크(<a>)로 그림 — 화면 이동용 (메인 구 버튼, 화면 4 보건소 선택)
 */
import './RegionButton.css'

function RegionButton({ label, selected = false, size, current = false, describedBy, href, onClick }) {
  const className = `region-button${selected ? ' region-button--selected' : ''}${size === 'small' ? ' region-button--small' : ''}`

  // href가 있으면 링크 — 누르면 화면 이동 (모양은 버튼과 같음)
  //   화면 낭독기가 「링크」로 읽고, Ctrl+클릭·휠 클릭으로 새 탭에서도 열 수 있음
  if (href) {
    return (
      <a
        className={className}
        href={href}
        aria-current={current ? 'page' : undefined}
        aria-describedby={describedBy}
        onClick={onClick}
      >
        {label}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={className}
      aria-pressed={current ? undefined : selected}
      aria-current={current ? 'page' : undefined}
      aria-describedby={describedBy}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default RegionButton
