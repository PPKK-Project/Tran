// 회원 가입
export type SignUpType = {
  email:string;
  password:string;
  nickname:string;
}
/**
 * 백엔드 PlaceResponse Record와 일치하는 타입
 */
export type PlaceResponse = {
  placeId: number;    // Long
  name: string;
  address: string;
  type: string;       // (e.g., "숙소", "관광지", "음식점")
  latitude: number;   // Double
  longitude: number;  // Double
}

/**
 * 백엔드 TravelPlanResponse Record와 일치하는 타입
 */
export type TravelPlan = {
  planId: number;      // Long
  dayNumber: number;   // int
  sequence: number;    // int
  memo: string | null;
  place: PlaceResponse; // PlaceResponse 타입으로 변경
}

/**
 * 백엔드 AddPlanRequest Record와 일치하는 타입
 */
export type AddPlanRequest = {
  placeId: number;
  dayNumber: number;
  sequence: number;
  memo: string | null;
}

/**
 * 왼쪽 사이드바 장소 검색 결과 (Mock 데이터용 타입)
 * (이것은 백엔드 DTO와 다를 수 있음. 장소 검색 API의 응답)
 */
export type PlaceSearchResult = {
  placeId: number; 
  name: string;
  // 'type' 필드 대신 'category'를 Mock 데이터에서 사용 (UI 표시용)
  category: '숙소' | '관광지' | '음식점';
  rating: number;
  reviewCount: number;
  imageUrl: string;
  price?: number; 
  latitude: number;
  longitude: number;
}

