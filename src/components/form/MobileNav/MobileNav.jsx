/*
 * MobileNav — Figma 컴포넌트 「모바일네비게이션」 (node 1319:1812)
 * 모든 화면 맨 위의 네비게이션바
 *
 * 종류
 *   variant="main" → 메인 화면: 로고 + 「수원시보건소」, 오른쪽 검색 · 메뉴
 *   variant="sub"  → 서브 화면(화면 2~4): 뒤로가기 + 「수원시보건소」, 오른쪽 검색 · 홈
 *                    (Figma에서 같은 컴포넌트의 아이콘만 바꿔 쓰는 방식, 예: node 3056:4950)
 * 상태 (Figma 「Property 1」)
 *   네비게이션바기본 → 검색 아이콘
 *   네비게이션바클릭 → 검색 아이콘을 누르면 검색창이 열림
 *
 * 동작은 아직 정하지 않음 (사용자 결정): 검색 제출과 메뉴 버튼은 모양만 있고,
 * onSearch / onMenu를 넘기면 그때 동작한다.
 */
import { useId, useState } from 'react'
import logo from '../../../assets/icons/logo.svg'
import searchIcon from '../../../assets/icons/search.svg'
import searchSmall from '../../../assets/icons/search-small.svg'
import menuIcon from '../../../assets/icons/menu.svg'
import backIcon from '../../../assets/icons/back.svg'
import homeIcon from '../../../assets/icons/home.svg'
import './MobileNav.css'
import { toUrl } from '../../../utils/url.js'

// 이전 화면으로 — 바로 앞 화면이 이 사이트일 때만 뒤로가기
// 공유 링크로 바로 들어온 경우(앞 화면이 카카오톡 등 다른 곳이거나 없음)에는 메인으로 이동
function goBack() {
  let cameFromThisSite = false
  try {
    cameFromThisSite = new URL(document.referrer).origin === window.location.origin
  } catch {
    // referrer가 비어 있으면 주소가 아니라서 여기로 옴 → 메인으로
  }
  if (cameFromThisSite && window.history.length > 1) window.history.back()
  else window.location.href = toUrl('/')
}

function MobileNav({
  variant = 'main',
  homeHref = toUrl('/'),
  onBack = goBack,
  onSearch,
  onMenu,
  defaultSearchOpen = false, // 비교용 미리보기에서 검색창이 열린 모양을 보여 줄 때 사용
}) {
  const [searchOpen, setSearchOpen] = useState(defaultSearchOpen)
  const inputId = useId()

  function handleSubmit(event) {
    event.preventDefault()
    const keyword = new FormData(event.currentTarget).get('keyword')
    onSearch?.(keyword)
  }

  const title = (
    <span className="mobile-nav__title">
      <span className="mobile-nav__name">수원시보건소</span>
      <span className="mobile-nav__areas">팔달·권선·장안·영통</span>
    </span>
  )

  return (
    <header className="mobile-nav">
      <div className="mobile-nav__brand">
        {variant === 'main' ? (
          <a className="mobile-nav__home-link" href={homeHref}>
            {/* Figma 로고는 24px 칸 안에 22px 그림 (위·왼쪽 1px) */}
            <span className="mobile-nav__logo">
              <img src={logo} alt="" width="22.0001" height="22" />
            </span>
            {title}
          </a>
        ) : (
          <>
            <button type="button" className="mobile-nav__icon-button" aria-label="이전 화면" onClick={onBack}>
              <img src={backIcon} alt="" width="24" height="24" />
            </button>
            {title}
          </>
        )}
      </div>

      <div className="mobile-nav__actions">
        {searchOpen ? (
          <form className="mobile-nav__search" role="search" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor={inputId}>
              검색어
            </label>
            <input
              id={inputId}
              className="mobile-nav__search-input"
              name="keyword"
              type="search"
              placeholder="검색어를 입력하세요."
              autoFocus={!defaultSearchOpen}
            />
            <button type="submit" className="mobile-nav__search-submit" aria-label="검색">
              <img src={searchSmall} alt="" width="17.4199" height="17.4189" />
            </button>
          </form>
        ) : (
          <button
            type="button"
            className="mobile-nav__icon-button"
            aria-label="검색 열기"
            aria-expanded={false}
            onClick={() => setSearchOpen(true)}
          >
            <img src={searchIcon} alt="" width="24" height="24" />
          </button>
        )}

        {variant === 'main' ? (
          <button type="button" className="mobile-nav__icon-button" aria-label="전체 메뉴" onClick={onMenu}>
            <img src={menuIcon} alt="" width="24" height="24" />
          </button>
        ) : (
          <a className="mobile-nav__icon-button" href={homeHref} aria-label="홈">
            <img src={homeIcon} alt="" width="24" height="24" />
          </a>
        )}
      </div>
    </header>
  )
}

export default MobileNav
