/*
 * TransportGuide — Figma 「교통안내」 (화면 4 node 2262:7134)
 * 주변버스정류장 · 주변지하철 · 주차시설 목록
 *
 * groups[]
 *   title   묶음 제목 (Figma는 첫 묶음에만 「대중교통안내」, 나머지는 같은 높이의 빈칸)
 *   icon    'bus' | 'subway' | 'parking' — 지하철 아이콘은 Figma에서도 비어 있어 빈칸
 *   label   소제목 (주변버스정류장 등)
 *   items[] 목록 — 비어 있는 묶음은 보여 주지 않음
 */
import busIcon from '../../../assets/icons/bus.svg'
import parkingIcon from '../../../assets/icons/parking.svg'
import subwayIcon from '../../../assets/icons/subway.svg'
import './TransportGuide.css'

// Figma처럼 20px 칸 안에 원본 그림을 Figma 위치 그대로 놓음
// 지하철: 화면 4 Figma에서는 빈칸이지만 아이콘 원본(「아이콘영역」 지하철)이 있어 사용 (사용자 결정: 아이콘은 모두 Figma 원본)
const ICONS = {
  subway: { src: subwayIcon, width: 20, height: 20, className: 'transport-guide__glyph--subway' },
  bus: { src: busIcon, width: 17.9232, height: 12.9167, className: 'transport-guide__glyph--bus' },
  parking: { src: parkingIcon, width: 17.9167, height: 17.9167, className: 'transport-guide__glyph--parking' },
}

function TransportGuide({ groups }) {
  const visible = groups.filter((group) => group.items?.length > 0)

  return (
    <div className="transport-guide">
      {visible.map((group) => {
        const icon = ICONS[group.icon]
        return (
          <div key={group.label} className="transport-guide__group">
            <div className="transport-guide__head">
              {group.title ? (
                <h3 className="transport-guide__title">{group.title}</h3>
              ) : (
                <span className="transport-guide__title" aria-hidden="true" />
              )}
              <h4 className="transport-guide__label">
                <span className="transport-guide__icon">
                  {/* 아이콘은 장식이라 alt를 비움 */}
                  {icon && (
                    <img
                      className={`transport-guide__glyph ${icon.className}`}
                      src={icon.src}
                      alt=""
                      width={icon.width}
                      height={icon.height}
                    />
                  )}
                </span>
                {group.label}
              </h4>
            </div>
            <ul className="transport-guide__list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default TransportGuide
