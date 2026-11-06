/*
 * LocationCard — Figma 컴포넌트 「위치안내」 (node 1313:149)
 * 화면 4 위치·교통 맨 위: 「수원시 ○○구 보건소 위치」 + 주소 + 전화번호(누르면 전화 연결)
 *
 * Figma에 상태 변형 없음
 */
import './LocationCard.css'

function LocationCard({ district, address, phone }) {
  return (
    <div className="location-card">
      <h2 className="location-card__title">수원시 {district} 보건소 위치</h2>
      <dl className="location-card__info">
        <div className="location-card__row">
          <dt>주소:</dt>
          <dd>{address}</dd>
        </div>
        {phone && (
          <div className="location-card__row">
            <dt>전화번호:</dt>
            <dd>
              <a className="location-card__phone" href={`tel:${phone.replaceAll('-', '')}`}>
                {phone}
              </a>
            </dd>
          </div>
        )}
      </dl>
    </div>
  )
}

export default LocationCard
