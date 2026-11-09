/*
 * DesktopNav — Figma 컴포넌트 「데스크원본」 (node 3465:3357)
 * 데스크톱(841px 이상) 화면 맨 위의 네비게이션바
 *   왼쪽: 로고 + 「수원시보건소 / 팔달·권선·장안·영통」 (모바일 네비게이션과 같은 글자·크기)
 *   가운데: 메뉴 4개 (메뉴 16/20 Bold, 간격 40px)
 *   오른쪽: 검색창 (항상 열려 있음 — 모바일처럼 아이콘을 눌러 여는 방식 아님)
 *
 * 메뉴 이동 주소는 아직 없음 (사용자 결정 1A) → href가 없으면 버튼으로 둔다. 주소를 받으면 MENUS에 채운다.
 * 검색 제출은 MobileNav처럼 onSearch를 넘기면 그때 동작한다.
 */
import { useId } from 'react'
import logo from '../../../assets/icons/logo.svg'
import searchSmall from '../../../assets/icons/search-small.svg'
import './DesktopNav.css'
import { toUrl } from '../../../utils/url.js'

const MENUS = [
  { label: '보건소안내' },
  { label: '보건행정서비스' },
  { label: '보건소사업' },
  { label: '정보광장' },
]

function DesktopNav({ homeHref = toUrl('/'), onSearch }) {
  const inputId = useId()

  function handleSubmit(event) {
    event.preventDefault()
    const keyword = new FormData(event.currentTarget).get('keyword')
    onSearch?.(keyword)
  }

  return (
    <header className="desktop-nav">
      <a className="desktop-nav__home-link" href={homeHref}>
        {/* Figma 로고는 24px 칸 안에 22px 그림 (MobileNav와 같은 그림) */}
        <span className="desktop-nav__logo">
          <img src={logo} alt="" width="22.0001" height="22" />
        </span>
        <span className="desktop-nav__title">
          <span className="desktop-nav__name">수원시보건소</span>
          <span className="desktop-nav__areas">팔달·권선·장안·영통</span>
        </span>
      </a>

      <nav aria-label="주메뉴">
        <ul className="desktop-nav__menus">
          {MENUS.map((menu) => (
            <li key={menu.label}>
              {menu.href ? (
                <a className="desktop-nav__menu" href={menu.href}>
                  {menu.label}
                </a>
              ) : (
                <button type="button" className="desktop-nav__menu">
                  {menu.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <form className="desktop-nav__search" role="search" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={inputId}>
          검색어
        </label>
        <input
          id={inputId}
          className="desktop-nav__search-input"
          name="keyword"
          type="search"
          placeholder="검색어를 입력하세요."
        />
        <button type="submit" className="desktop-nav__search-submit" aria-label="검색">
          <img src={searchSmall} alt="" width="17.4199" height="17.4189" />
        </button>
      </form>
    </header>
  )
}

export default DesktopNav
