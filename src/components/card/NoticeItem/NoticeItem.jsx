/*
 * NoticeItem — Figma 컴포넌트 「공지텍스트원본」 (node 1317:1517, 공지영역원본 안에서 사용)
 * 공지 목록 한 줄: 제목(길면 말줄임) + 날짜
 *
 * 목록(<ul>)은 이 컴포넌트를 쓰는 부모(NoticeArea)가 만든다.
 * href가 있으면 공지 상세로 가는 링크, 없으면 글자만 표시한다.
 * 날짜는 Figma 표기(2026.10.06) 그대로 받는다.
 */
import './NoticeItem.css'

function NoticeItem({ title, date, href }) {
  const isoDate = date ? date.replaceAll('.', '-') : undefined
  const content = (
    <>
      {/* 말줄임으로 잘린 제목은 마우스를 올리면 전체가 보이도록 title 속성에 넣음 */}
      <span className="notice-item__title" title={title}>
        {title}
      </span>
      <time className="notice-item__date" dateTime={isoDate}>
        {date}
      </time>
    </>
  )

  return (
    <li className="notice-item">
      {href ? (
        <a className="notice-item__row" href={href}>
          {content}
        </a>
      ) : (
        <div className="notice-item__row">{content}</div>
      )}
    </li>
  )
}

export default NoticeItem
