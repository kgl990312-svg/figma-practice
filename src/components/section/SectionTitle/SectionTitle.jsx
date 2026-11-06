/*
 * SectionTitle — Figma 컴포넌트 「섹션타이틀」 (node 1197:1353)
 * 섹션 제목 + (선택) 보조 설명. 예: 보건 주요 서비스, 통합민원서비스, 수원시 의료센터
 *
 * 종류 (Figma 「설명 유무」)
 *   description 있음 → 제목 아래 설명 한 줄 (간격 8px)
 *   description 없음 → 제목만
 *
 * id를 넘기면 제목에 붙는다 — 섹션의 aria-labelledby로 연결할 때 사용
 */
import './SectionTitle.css'

function SectionTitle({ title, description, id, as: Heading = 'h2' }) {
  return (
    <div className="section-title">
      <Heading id={id} className="section-title__title">
        {title}
      </Heading>
      {description && <p className="section-title__description">{description}</p>}
    </div>
  )
}

export default SectionTitle
