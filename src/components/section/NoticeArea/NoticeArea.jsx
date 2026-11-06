/*
 * NoticeArea — Figma 컴포넌트 「공지영역원본」 (node 1344:3385)
 * 동작은 최종본 「공지프로토타입」 (node 1347:2160) 기준
 *
 * 메인 화면 공지사항의 지역 필터 버튼 5개 + 공지 목록 3개
 *   - 처음에는 '공통'이 선택됨 (PRD 6-1)
 *   - 지역 버튼을 누르면 그 지역의 최근 공지 3개로 바뀜 (날짜 최신순)
 *   - 이미 선택된 버튼을 다시 눌러도 변화 없음
 *
 * 사용하는 컴포넌트: NoticeFilterButton, NoticeItem
 * 위쪽 탭(NoticeTab: 보건소식 등)은 Figma에서도 별도라 이 컴포넌트에 넣지 않음
 */
import { useState } from 'react'
import NoticeFilterButton from '../../button/NoticeFilterButton/NoticeFilterButton.jsx'
import NoticeItem from '../../card/NoticeItem/NoticeItem.jsx'
import { NOTICE_REGIONS, NOTICES } from './notices.js'
import './NoticeArea.css'

const MAX_ITEMS = 3

// '2026.10.06' 형식 날짜를 최신순으로 정렬 (같은 날짜는 원래 순서 유지)
function latestFirst(items) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date)).slice(0, MAX_ITEMS)
}

function NoticeArea({ notices = NOTICES, regions = NOTICE_REGIONS, defaultRegion = '공통' }) {
  const [region, setRegion] = useState(defaultRegion)
  const items = latestFirst(notices[region] ?? [])

  return (
    <div className="notice-area">
      <ul className="notice-area__filters" aria-label="공지 지역 선택">
        {regions.map((name) => (
          <li key={name} className="notice-area__filter">
            <NoticeFilterButton
              label={name}
              selected={name === region}
              onClick={() => setRegion(name)}
            />
          </li>
        ))}
      </ul>

      {/* 지역을 바꾸면 스크린리더가 바뀐 목록을 알 수 있도록 aria-live */}
      <ul className="notice-area__list" aria-label={`${region} 공지`} aria-live="polite">
        {items.map((item) => (
          <NoticeItem key={`${item.date}-${item.title}`} title={item.title} date={item.date} href={item.href} />
        ))}
      </ul>
    </div>
  )
}

export default NoticeArea
