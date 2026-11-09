/*
 * 구별 보건소 데이터 — 화면 2(구 보건소)와 화면 4(위치·교통)에서 쓴다
 *
 * 4개 구가 같은 화면을 쓰고, 구마다 다른 것은 아래 값뿐이다 (사용자 결정)
 *   - 의료비지원 메뉴·지원사업 내용은 4개 구 모두 같음 (JurisdictionService 데이터)
 *   - id         주소 (/paldal 등)
 *   - label      구 버튼 이름
 *   - title      화면 2 대제목 — Figma 「팔달보건소」 형식
 *   - phone      화면 2 [전화문의], 화면 4 전화번호 — 보건소 대표번호 (네이버 기준, 사용자 결정)
 *   - location   화면 4 위치·교통 — null이면 [위치보기]가 이동하지 않음
 *       address   주소
 *       map       구글 지도 '지도 퍼가기' 주소 (iframe의 src 값만, 없으면 지도 칸을 숨김)
 *       bus / subway / parking   교통 목록 (비어 있으면 그 칸을 숨김)
 *
 * 출처
 *   - 팔달: Figma 완성본 그대로. 전화번호 031-5191-0520은 네이버 대표번호와 같음 (사용자 확인)
 *   - 권선·장안·영통: 주소는 수원시보건소 공식 사이트 「찾아오시는 길」(2026-11-06 확인)
 *       https://health.suwon.go.kr/sub.asp?page_code=sub010301 ~ sub010304
 *     전화번호(대표번호)·버스정류장·주차시설은 사용자가 확인해 직접 입력 (2026-11-06)
 *     지하철은 정보가 없어 숨김 (사용자 결정)
 *   - 지도: 4개 구 모두 Figma 지도 이미지 대신 구글 지도 퍼가기 — 사용자가 코드 전달 (사용자 결정, 2026-11-09)
 *   - 운영시간·휴게시간은 4개 구 같음 (LocationPage)
 *   - Figma 오타 「주차창」 → 「주차장」 2곳 수정 (사용자 결정)
 */
export const DISTRICTS = [
  {
    id: 'paldal',
    label: '팔달',
    title: '팔달보건소',
    phone: '031-5191-0520',
    location: {
      address: '경기도 수원시 팔달구 팔달산로 6',
      map: 'https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x357b433c0f63fa4b%3A0xd29a30a7ac2ac809!2z7YyU64us6rWsIOuztOqxtOyGjA!5e0!3m2!1sko!2skr!4v1794184833312!5m2!1sko!2skr',
      bus: ['향교팔달보건소·중앙침례교회', '구도청사거리', '가족여성회관·이춘택병원 수원농협', '매교다리'],
      subway: ['매교역 6번출구에서 855m'],
      parking: ['팔달구보건소 제2부설주차장', '아미노 수원매산타워주차장', '매일주차장', '아미노 삼천리도시가스수원 사옥 주차장'],
    },
  },
  {
    id: 'gwonseon',
    label: '권선',
    title: '권선보건소',
    phone: '031-5191-0320',
    location: {
      address: '경기도 수원시 권선구 호매실로 22-50',
      map: 'https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x357b4266b1a83a8b%3A0x8fbbc021a495fdf0!2z6raM7ISg6rWsIOuztOqxtOyGjA!5e0!3m2!1sko!2skr!4v1794185059798!5m2!1sko!2skr',
      bus: ['한봄고등학교', '한국산업인력공단', '권선구청·경기종합노동복지회관', '권선경찰서·권선구청·덕산병원', '권선구행정타운입구'],
      parking: ['경기종합노동복지회관주차장', '나이스파크 고색 파크뷰 주차장', '권선구청주차장', '아미노 이편한세상시티고색주차장']
    },
  },
  {
    id: 'jangan',
    label: '장안',
    title: '장안보건소',
    phone: '031-5191-0117',
    location: {
      address: '경기도 수원시 장안구 송원로 101',
      map: 'https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x357b5cc2f4ac62b3%3A0x920254145d8f89d6!2z7J6l7JWI6rWsIOuztOqxtOyGjA!5e0!3m2!1sko!2skr!4v1794185085679!5m2!1sko!2skr',
      bus: ['장안구청', '한일타운', '조원2동주민센터', '장안지하차도·수원KT위즈파크'],
      parking: ['홈플러스 북수원점 주차장', '북수원패션아울렛주차장', '장안구청주차장']
    },
  },
  {
    id: 'yeongtong',
    label: '영통',
    title: '영통보건소',
    phone: '031-5191-0728',
    location: {
      address: '경기도 수원시 영통구 영통로 396',
      map: 'https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x357b44d049cb83cb%3A0x70c026bf4cafec93!2z7JiB7Ya16rWs67O06rG07IaM!5e0!3m2!1sko!2skr!4v1794185126158!5m2!1sko!2skr',
      bus: ['지역난방공사·신나무실쌍용아파트', '영통구보건소 앞', '대광빌리지', '영덕중학교·은혜와와진리교회', '수원가정법원·경기도선거관리위원회'],
      parking: ['투루파킹 수원 경기방송점 주차장', '투루파킹 영통동아점 주차장', '영통훼미리타워주차장', '영통하우스토리운영위원회']
    },
  },
]

export function findDistrict(id) {
  return DISTRICTS.find((district) => district.id === id)
}
